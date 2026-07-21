const GITHUB_REPO_OWNER = "messengermaksym";
const GITHUB_REPO_NAME = "dobrodent";
const GITHUB_BRANCH = "main";

export async function commitJsonToGithub(
  filePath: string,
  jsonContent: any,
  commitMessage: string,
  token?: string
): Promise<{ success: boolean; message: string }> {
  const authToken =
    (token && token.trim().length > 0 ? token.trim() : null) ||
    localStorage.getItem("dobrodent_github_token") ||
    process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  if (!authToken) {
    return {
      success: false,
      message: "Потрібно вказати GitHub Personal Access Token (ghp_...) у вкладці Налаштування."
    };
  }

  const fullPath = `dobrodent-web/src/content/${filePath}`;
  const apiUrl = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${fullPath}`;

  try {
    // 1. Get current file SHA
    let sha = "";
    const getRes = await fetch(apiUrl, {
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

    // 3. Update file via GitHub API
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
        message: "Зміни успішно збережені на сайті! За ~1 хвилину оновлення відобразиться на всіх пристроях.",
      };
    } else {
      const errJson = await putRes.json();
      return {
        success: false,
        message: errJson.message || "Помилка збереження в GitHub API",
      };
    }
  } catch (e: any) {
    return {
      success: false,
      message: e.message || "Помилка мережі при з'єднанні з GitHub API",
    };
  }
}
