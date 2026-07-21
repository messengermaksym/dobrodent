const GITHUB_REPO_OWNER = "messengermaksym";
const GITHUB_REPO_NAME = "dobrodent";
const GITHUB_BRANCH = "serif";
const BASE_CONTENT_PATH = "dobrodent-web/src/content";
const API_BASE = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}`;

function getAuthToken(token?: string): string | null {
  return (
    (token && token.trim().length > 0 ? token.trim() : null) ||
    (typeof window !== "undefined" ? localStorage.getItem("dobrodent_github_token") : null) ||
    process.env.NEXT_PUBLIC_GITHUB_TOKEN ||
    null
  );
}

// ---------------------------------------------------------------------------
// Single-file commit (used by individual "Зберегти зміни" buttons per tab)
// ---------------------------------------------------------------------------
export async function commitJsonToGithub(
  filePath: string,
  jsonContent: unknown,
  commitMessage: string,
  token?: string
): Promise<{ success: boolean; message: string }> {
  const authToken = getAuthToken(token);

  if (!authToken) {
    return {
      success: false,
      message: "Потрібно вказати GitHub Personal Access Token (ghp_...).",
    };
  }

  const fullPath = `${BASE_CONTENT_PATH}/${filePath}`;
  const apiUrl = `${API_BASE}/contents/${fullPath}`;

  try {
    // 1. Get current file SHA from the correct branch
    let sha = "";
    const getRes = await fetch(`${apiUrl}?ref=${GITHUB_BRANCH}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        Accept: "application/vnd.github+json",
      },
    });
    if (getRes.ok) {
      const getJson = await getRes.json();
      sha = getJson.sha;
    }

    // 2. Encode JSON content to UTF-8 base64
    const contentString = JSON.stringify(jsonContent, null, 2);
    const base64Content = btoa(
      encodeURIComponent(contentString).replace(/%([0-9A-F]{2})/g, (_, p1) =>
        String.fromCharCode(parseInt(p1, 16))
      )
    );

    // 3. Update file via GitHub Contents API
    const putRes = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authToken}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: commitMessage,
        content: base64Content,
        sha: sha || undefined,
        branch: GITHUB_BRANCH,
      }),
    });

    if (putRes.ok) {
      return {
        success: true,
        message: "Зміни успішно збережено! Сайт оновиться за ~1 хвилину.",
      };
    } else {
      const errJson = await putRes.json();
      return {
        success: false,
        message: errJson.message || "Помилка збереження в GitHub API",
      };
    }
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Невідома помилка";
    return { success: false, message: msg };
  }
}

// ---------------------------------------------------------------------------
// Multi-file atomic commit using Git Trees API
// All files go into one single commit — no race conditions.
// ---------------------------------------------------------------------------
export async function commitMultipleJsonToGithub(
  files: { path: string; content: unknown }[],
  commitMessage: string,
  token?: string
): Promise<{ success: boolean; message: string }> {
  const authToken = getAuthToken(token);

  if (!authToken) {
    return {
      success: false,
      message: "Потрібно вказати GitHub Personal Access Token (ghp_...).",
    };
  }

  try {
    // Step 1: Get current HEAD commit SHA of the branch
    const branchRes = await fetch(`${API_BASE}/git/refs/heads/${GITHUB_BRANCH}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        Accept: "application/vnd.github+json",
      },
    });
    if (!branchRes.ok) {
      const err = await branchRes.json();
      throw new Error(err.message || "Не вдалося отримати поточний стан гілки");
    }
    const branchData = await branchRes.json();
    const latestCommitSha: string = branchData.object.sha;

    // Step 2: Get the tree SHA from the latest commit
    const commitRes = await fetch(`${API_BASE}/git/commits/${latestCommitSha}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        Accept: "application/vnd.github+json",
      },
    });
    if (!commitRes.ok) throw new Error("Не вдалося отримати дерево поточного коміту");
    const commitData = await commitRes.json();
    const baseTreeSha: string = commitData.tree.sha;

    // Step 3: Create Git blobs for each file (parallel — blobs are independent)
    const treeEntries = await Promise.all(
      files.map(async ({ path, content }) => {
        const contentString = JSON.stringify(content, null, 2);
        const blobRes = await fetch(`${API_BASE}/git/blobs`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
            Accept: "application/vnd.github+json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: contentString, encoding: "utf-8" }),
        });
        if (!blobRes.ok) {
          const err = await blobRes.json();
          throw new Error(err.message || `Помилка створення blob для ${path}`);
        }
        const blobData = await blobRes.json();
        return {
          path: `${BASE_CONTENT_PATH}/${path}`,
          mode: "100644" as const,
          type: "blob" as const,
          sha: blobData.sha as string,
        };
      })
    );

    // Step 4: Create a new tree that includes all file changes
    const newTreeRes = await fetch(`${API_BASE}/git/trees`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ base_tree: baseTreeSha, tree: treeEntries }),
    });
    if (!newTreeRes.ok) {
      const err = await newTreeRes.json();
      throw new Error(err.message || "Помилка створення нового дерева");
    }
    const newTreeData = await newTreeRes.json();

    // Step 5: Create a new commit pointing to the new tree
    const newCommitRes = await fetch(`${API_BASE}/git/commits`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: commitMessage,
        tree: newTreeData.sha,
        parents: [latestCommitSha],
      }),
    });
    if (!newCommitRes.ok) {
      const err = await newCommitRes.json();
      throw new Error(err.message || "Помилка створення коміту");
    }
    const newCommitData = await newCommitRes.json();

    // Step 6: Move the branch HEAD to the new commit
    const updateRefRes = await fetch(`${API_BASE}/git/refs/heads/${GITHUB_BRANCH}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${authToken}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sha: newCommitData.sha }),
    });
    if (!updateRefRes.ok) {
      const err = await updateRefRes.json();
      throw new Error(err.message || "Помилка оновлення гілки");
    }

    return {
      success: true,
      message: `Всі зміни збережено одним комітом! Сайт оновиться за ~1 хвилину.`,
    };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Невідома помилка";
    return { success: false, message: msg };
  }
}
