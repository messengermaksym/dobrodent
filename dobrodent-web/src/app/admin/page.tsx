"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import PriceEditor from "@/components/admin/PriceEditor";
import SpecialistsEditor from "@/components/admin/SpecialistsEditor";
import GalleryEditor from "@/components/admin/GalleryEditor";
import staticPrices from "@/content/prices.json";
import staticSpecialists from "@/content/specialists.json";
import staticGallery from "@/content/gallery.json";
import { commitJsonToGithub } from "@/lib/githubService";
import { PriceCategory } from "@/data/defaultPrices";
import { Specialist } from "@/data/defaultSpecialists";
import { GalleryImage } from "@/data/defaultGallery";
import {
  Tag,
  Users,
  Image as ImageIcon,
  LogOut,
  AlertCircle,
  AlertTriangle,
  X,
  Save,
  CheckCircle2,
  Loader2,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Toast notification
// ---------------------------------------------------------------------------
type ToastType = "success" | "error" | "info";
interface ToastState {
  id: number;
  type: ToastType;
  message: string;
}

function Toast({ toast, onClose }: { toast: ToastState; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4500);
    return () => clearTimeout(t);
  }, [onClose]);

  const colors: Record<ToastType, string> = {
    success: "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300",
    error: "bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-300",
    info: "bg-primary/10 border-primary/30 text-primary",
  };
  const icons: Record<ToastType, React.ReactNode> = {
    success: <CheckCircle2 className="w-5 h-5 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 shrink-0" />,
    info: <AlertCircle className="w-5 h-5 shrink-0" />,
  };

  return (
    <div
      className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl border shadow-lg text-sm font-semibold backdrop-blur-sm transition-all ${colors[toast.type]}`}
    >
      {icons[toast.type]}
      <span>{toast.message}</span>
      <button onClick={onClose} className="ml-2 opacity-60 hover:opacity-100 cursor-pointer transition-opacity">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Custom confirm dialog (replaces browser's window.confirm)
// ---------------------------------------------------------------------------
interface ConfirmDialogProps {
  isDirty: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmDialog({ isDirty, onConfirm, onCancel }: ConfirmDialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel} />

      {/* Modal */}
      <div className="relative bg-background border border-border rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8">
        {/* Close button */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Icon */}
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-5 ${
            isDirty ? "bg-amber-500/15" : "bg-muted"
          }`}
        >
          {isDirty ? (
            <AlertTriangle className="w-6 h-6 text-amber-500" />
          ) : (
            <AlertCircle className="w-6 h-6 text-muted-foreground" />
          )}
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-foreground text-center mb-2">
          {isDirty ? "Є незбережені зміни!" : "Вийти з адмін-панелі?"}
        </h2>

        {/* Body */}
        <p className="text-sm text-muted-foreground text-center leading-relaxed mb-7">
          {isDirty
            ? "Ви внесли зміни, які ще не збережено на сайт. Якщо вийдете зараз — усі зміни будуть втрачені."
            : "Змін не було зроблено. Ви впевнені, що хочете вийти з адмін-панелі?"}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 px-4 bg-muted hover:bg-muted/80 text-foreground text-sm font-semibold rounded-xl transition-colors cursor-pointer border border-border"
          >
            {isDirty ? "Залишитися і зберегти" : "Залишитися"}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-2.5 px-4 text-sm font-semibold rounded-xl transition-colors cursor-pointer shadow-sm ${
              isDirty
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-primary hover:bg-primary/90 text-primary-foreground"
            }`}
          >
            {isDirty ? "Вийти без збереження" : "Вийти"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Admin Page
// ---------------------------------------------------------------------------
export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<"prices" | "specialists" | "gallery">("prices");
  const [isLoading, setIsLoading] = useState(true);

  // Editable States
  const [prices, setPrices] = useState<PriceCategory[]>(staticPrices as PriceCategory[]);
  const [specialists, setSpecialists] = useState<Specialist[]>(staticSpecialists as Specialist[]);
  const [gallery, setGallery] = useState<GalleryImage[]>(staticGallery as GalleryImage[]);

  // Saved references (to detect unsaved changes)
  const [savedPrices, setSavedPrices] = useState<PriceCategory[]>(staticPrices as PriceCategory[]);
  const [savedSpecialists, setSavedSpecialists] = useState<Specialist[]>(staticSpecialists as Specialist[]);
  const [savedGallery, setSavedGallery] = useState<GalleryImage[]>(staticGallery as GalleryImage[]);

  const [githubToken, setGithubToken] = useState("");
  const [isSavingAll, setIsSavingAll] = useState(false);

  // Custom confirm dialog state
  const [confirmDialog, setConfirmDialog] = useState<{
    isDirty: boolean;
    onConfirm: () => void;
  } | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastState[]>([]);
  const toastIdRef = useRef(0);

  const addToast = useCallback((type: ToastType, message: string) => {
    const id = ++toastIdRef.current;
    setToasts((prev) => [...prev, { id, type, message }]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Dirty state
  const isPricesDirty = JSON.stringify(prices) !== JSON.stringify(savedPrices);
  const isSpecialistsDirty = JSON.stringify(specialists) !== JSON.stringify(savedSpecialists);
  const isGalleryDirty = JSON.stringify(gallery) !== JSON.stringify(savedGallery);
  const isDirty = isPricesDirty || isSpecialistsDirty || isGalleryDirty;

  // Ref to skip beforeunload when we intentionally navigate via our custom dialog
  const isIntentionalNavRef = useRef(false);

  useEffect(() => {
    const logged = sessionStorage.getItem("dobrodent_admin_logged") === "true";
    setIsLoggedIn(logged);
    const savedToken =
      localStorage.getItem("dobrodent_github_token") || process.env.NEXT_PUBLIC_GITHUB_TOKEN || "";
    setGithubToken(savedToken);
    setIsLoading(false);
  }, []);

  // Prevent closing the tab / reloading (browser-native dialog — unavoidable for tab close).
  // We skip it when we already confirmed via our custom dialog.
  useEffect(() => {
    if (!isLoggedIn) return;
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty && !isIntentionalNavRef.current) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty, isLoggedIn]);

  // Intercept anchor link clicks (navigation away from /admin).
  // Only active when the user IS logged in.
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      // If not logged in — don't intercept anything
      if (!isLoggedIn) return;

      const target = (e.target as HTMLElement).closest("a");
      if (target && target.href) {
        const url = new URL(target.href);
        if (url.pathname !== window.location.pathname) {
          e.preventDefault();
          e.stopPropagation();

          const href = target.href;
          setConfirmDialog({
            isDirty,
            onConfirm: () => {
              setConfirmDialog(null);
              isIntentionalNavRef.current = true;
              window.location.href = href;
            },
          });
        }
      }
    };
    document.addEventListener("click", handleAnchorClick, true);
    return () => document.removeEventListener("click", handleAnchorClick, true);
  }, [isDirty, isLoggedIn]);

  // ---- Logout ----
  const handleLogout = useCallback(() => {
    setConfirmDialog({
      isDirty,
      onConfirm: () => {
        setConfirmDialog(null);
        sessionStorage.removeItem("dobrodent_admin_logged");
        setIsLoggedIn(false);
      },
    });
  }, [isDirty]);

  // ---- Save All ----
  const handleSaveAll = useCallback(async () => {
    if (!isDirty) return;
    setIsSavingAll(true);

    const tasks: Promise<{ section: string; success: boolean; message: string }>[] = [];

    if (isPricesDirty) {
      tasks.push(
        commitJsonToGithub(
          "prices.json",
          prices,
          "feat: оновлено прайс-лист через адмін-панель",
          githubToken
        ).then((res) => ({ section: "Прайс-лист", ...res }))
      );
    }
    if (isSpecialistsDirty) {
      tasks.push(
        commitJsonToGithub(
          "specialists.json",
          specialists,
          "feat: оновлено спеціалістів через адмін-панель",
          githubToken
        ).then((res) => ({ section: "Спеціалісти", ...res }))
      );
    }
    if (isGalleryDirty) {
      tasks.push(
        commitJsonToGithub(
          "gallery.json",
          gallery,
          "feat: оновлено фотогалерею через адмін-панель",
          githubToken
        ).then((res) => ({ section: "Галерея", ...res }))
      );
    }

    const results = await Promise.all(tasks);

    results.forEach((res) => {
      if (res.success) {
        if (res.section === "Прайс-лист") setSavedPrices(prices);
        if (res.section === "Спеціалісти") setSavedSpecialists(specialists);
        if (res.section === "Галерея") setSavedGallery(gallery);
        addToast("success", `✅ ${res.section}: збережено!`);
      } else {
        addToast("error", `❌ ${res.section}: ${res.message}`);
      }
    });

    setIsSavingAll(false);
  }, [isDirty, isPricesDirty, isSpecialistsDirty, isGalleryDirty, prices, specialists, gallery, githubToken, addToast]);

  // ---- Render: not logged in ----
  if (!isLoggedIn) {
    return <AdminLoginForm onSuccess={() => setIsLoggedIn(true)} />;
  }

  // ---- Render: admin panel ----
  return (
    <>
      {/* Toast Container */}
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-2 items-end pointer-events-none">
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto">
            <Toast toast={t} onClose={() => removeToast(t.id)} />
          </div>
        ))}
      </div>

      {/* Custom Confirm Dialog */}
      {confirmDialog && (
        <ConfirmDialog
          isDirty={confirmDialog.isDirty}
          onConfirm={confirmDialog.onConfirm}
          onCancel={() => setConfirmDialog(null)}
        />
      )}

      <div className="pt-8 pb-16 sm:pt-12 sm:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-border">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary block mb-1">
              Клініка Добродент
            </span>
            <h1 className="text-3xl font-bold text-foreground">Панель Управління Контентом</h1>
          </div>

          {/* Header actions */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Save All button — only visible when there are unsaved changes */}
            {isDirty && (
              <button
                onClick={handleSaveAll}
                disabled={isSavingAll}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-xl hover:bg-primary/90 active:scale-[0.98] cursor-pointer transition-all shadow-sm disabled:opacity-60 disabled:cursor-wait"
              >
                {isSavingAll ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Зберігається…
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Зберегти все
                  </>
                )}
              </button>
            )}

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 text-foreground text-sm font-medium rounded-xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer transition-all border border-border shadow-sm"
            >
              <LogOut className="w-4 h-4" />
              Вийти з кабінету
            </button>
          </div>
        </div>

        {/* Unsaved Changes Warning Banner */}
        {isDirty && (
          <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center gap-3 text-amber-800 dark:text-amber-300 shadow-sm">
            <AlertCircle className="w-5 h-5 shrink-0 text-amber-600 dark:text-amber-400" />
            <div className="text-sm font-semibold">
              ⚠️ Є незбережені зміни! Натисніть{" "}
              <button
                onClick={handleSaveAll}
                disabled={isSavingAll}
                className="underline underline-offset-2 cursor-pointer hover:no-underline disabled:opacity-60"
              >
                «Зберегти все»
              </button>{" "}
              або кнопку «Зберегти зміни» у відповідній вкладці.
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-border no-scrollbar">
          <button
            onClick={() => setActiveTab("prices")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all whitespace-nowrap cursor-pointer hover:scale-[1.02] active:scale-[0.98] ${
              activeTab === "prices"
                ? "bg-primary text-primary-foreground shadow-sm font-bold"
                : "bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Tag className="w-4 h-4" />
            Прайс-лист{" "}
            {isPricesDirty && (
              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block ml-1" title="Є зміни" />
            )}
          </button>

          <button
            onClick={() => setActiveTab("specialists")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all whitespace-nowrap cursor-pointer hover:scale-[1.02] active:scale-[0.98] ${
              activeTab === "specialists"
                ? "bg-primary text-primary-foreground shadow-sm font-bold"
                : "bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Users className="w-4 h-4" />
            Спеціалісти{" "}
            {isSpecialistsDirty && (
              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block ml-1" title="Є зміни" />
            )}
          </button>

          <button
            onClick={() => setActiveTab("gallery")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all whitespace-nowrap cursor-pointer hover:scale-[1.02] active:scale-[0.98] ${
              activeTab === "gallery"
                ? "bg-primary text-primary-foreground shadow-sm font-bold"
                : "bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            Фотогалерея{" "}
            {isGalleryDirty && (
              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block ml-1" title="Є зміни" />
            )}
          </button>
        </div>

        {/* Tab Content */}
        {isLoading ? (
          <div className="py-12 text-center text-muted-foreground">Завантаження контенту...</div>
        ) : (
          <div className="space-y-6">
            <div className={activeTab === "prices" ? "block" : "hidden"}>
              <PriceEditor
                categories={prices}
                onChange={setPrices}
                onSave={async (newPrices) => {
                  const res = await commitJsonToGithub(
                    "prices.json",
                    newPrices,
                    "feat: оновлено прайс-лист через адмін-панель",
                    githubToken
                  );
                  if (res.success) {
                    setSavedPrices(newPrices);
                    addToast("success", "✅ Прайс-лист збережено і опубліковано!");
                  } else {
                    addToast("error", `❌ Помилка: ${res.message}`);
                  }
                  return res.success;
                }}
              />
            </div>

            <div className={activeTab === "specialists" ? "block" : "hidden"}>
              <SpecialistsEditor
                specialists={specialists}
                onChange={setSpecialists}
                onSave={async (newList) => {
                  const res = await commitJsonToGithub(
                    "specialists.json",
                    newList,
                    "feat: оновлено спеціалістів через адмін-панель",
                    githubToken
                  );
                  if (res.success) {
                    setSavedSpecialists(newList);
                    addToast("success", "✅ Спеціалістів збережено і опубліковано!");
                  } else {
                    addToast("error", `❌ Помилка: ${res.message}`);
                  }
                  return res.success;
                }}
              />
            </div>

            <div className={activeTab === "gallery" ? "block" : "hidden"}>
              <GalleryEditor
                images={gallery}
                onChange={setGallery}
                onSave={async (newImages) => {
                  const res = await commitJsonToGithub(
                    "gallery.json",
                    newImages,
                    "feat: оновлено фотогалерею через адмін-панель",
                    githubToken
                  );
                  if (res.success) {
                    setSavedGallery(newImages);
                    addToast("success", "✅ Фотогалерею збережено і опубліковано!");
                  } else {
                    addToast("error", `❌ Помилка: ${res.message}`);
                  }
                  return res.success;
                }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
