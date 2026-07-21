"use client";

import { useState, useEffect, useCallback } from "react";
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
import { Tag, Users, Image as ImageIcon, LogOut, AlertCircle, AlertTriangle, X } from "lucide-react";

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
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative bg-background border border-border rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Icon */}
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-5 ${isDirty ? "bg-amber-500/15" : "bg-muted"}`}>
          {isDirty
            ? <AlertTriangle className="w-6 h-6 text-amber-500" />
            : <AlertCircle className="w-6 h-6 text-muted-foreground" />
          }
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

  // Saved References (to detect unsaved changes)
  const [savedPrices, setSavedPrices] = useState<PriceCategory[]>(staticPrices as PriceCategory[]);
  const [savedSpecialists, setSavedSpecialists] = useState<Specialist[]>(staticSpecialists as Specialist[]);
  const [savedGallery, setSavedGallery] = useState<GalleryImage[]>(staticGallery as GalleryImage[]);

  const [githubToken, setGithubToken] = useState("");

  // Custom confirm dialog state
  const [confirmDialog, setConfirmDialog] = useState<{
    show: boolean;
    isDirty: boolean;
    onConfirm: () => void;
  } | null>(null);

  // Check if anything has been modified but not saved
  const isPricesDirty = JSON.stringify(prices) !== JSON.stringify(savedPrices);
  const isSpecialistsDirty = JSON.stringify(specialists) !== JSON.stringify(savedSpecialists);
  const isGalleryDirty = JSON.stringify(gallery) !== JSON.stringify(savedGallery);
  const isDirty = isPricesDirty || isSpecialistsDirty || isGalleryDirty;

  useEffect(() => {
    const logged = sessionStorage.getItem("dobrodent_admin_logged") === "true";
    setIsLoggedIn(logged);

    const savedToken = localStorage.getItem("dobrodent_github_token") || process.env.NEXT_PUBLIC_GITHUB_TOKEN || "";
    setGithubToken(savedToken);

    setIsLoading(false);
  }, []);

  // Prevent closing the tab / reloading if there are unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "У вас є незбережені зміни! Ви дійсно хочете залишити сторінку?";
        return e.returnValue;
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  // Intercept anchor link clicks (navigation away from /admin)
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (target && target.href) {
        const url = new URL(target.href);
        if (url.pathname !== window.location.pathname) {
          e.preventDefault();
          e.stopPropagation();

          const href = target.href;
          setConfirmDialog({
            show: true,
            isDirty,
            onConfirm: () => {
              setConfirmDialog(null);
              window.location.href = href;
            },
          });
        }
      }
    };
    document.addEventListener("click", handleAnchorClick, true);
    return () => document.removeEventListener("click", handleAnchorClick, true);
  }, [isDirty]);

  const handleLogout = useCallback(() => {
    setConfirmDialog({
      show: true,
      isDirty,
      onConfirm: () => {
        setConfirmDialog(null);
        sessionStorage.removeItem("dobrodent_admin_logged");
        setIsLoggedIn(false);
      },
    });
  }, [isDirty]);

  if (!isLoggedIn) {
    return <AdminLoginForm onSuccess={() => setIsLoggedIn(true)} />;
  }

  return (
    <>
      {/* Custom Confirm Dialog */}
      {confirmDialog?.show && (
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
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 text-foreground text-sm font-medium rounded-xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer transition-all border border-border shadow-sm"
          >
            <LogOut className="w-4 h-4" />
            Вийти з кабінету
          </button>
        </div>

        {/* Unsaved Changes Warning Banner */}
        {isDirty && (
          <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center gap-3 text-amber-800 dark:text-amber-300 shadow-sm animate-pulse">
            <AlertCircle className="w-5 h-5 shrink-0 text-amber-600 dark:text-amber-400" />
            <div className="text-sm font-semibold">
              ⚠️ Увага: Внесено зміни, які не збережено! Натисніть кнопку «Зберегти зміни» у відповідній вкладці, щоб опублікувати їх на сайт.
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
            Прайс-лист {isPricesDirty && <span className="w-2 h-2 rounded-full bg-amber-500 inline-block animate-ping ml-1" title="Є зміни" />}
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
            Спеціалісти {isSpecialistsDirty && <span className="w-2 h-2 rounded-full bg-amber-500 inline-block animate-ping ml-1" title="Є зміни" />}
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
            Фотогалерея {isGalleryDirty && <span className="w-2 h-2 rounded-full bg-amber-500 inline-block animate-ping ml-1" title="Є зміни" />}
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
                  const res = await commitJsonToGithub("prices.json", newPrices, "feat: оновлено прайс-лист через адмін-панель", githubToken);
                  if (res.success) {
                    setSavedPrices(newPrices);
                  }
                  alert(res.message);
                  return res.success;
                }}
              />
            </div>

            <div className={activeTab === "specialists" ? "block" : "hidden"}>
              <SpecialistsEditor
                specialists={specialists}
                onChange={setSpecialists}
                onSave={async (newList) => {
                  const res = await commitJsonToGithub("specialists.json", newList, "feat: оновлено спеціалістів через адмін-панель", githubToken);
                  if (res.success) {
                    setSavedSpecialists(newList);
                  }
                  alert(res.message);
                  return res.success;
                }}
              />
            </div>

            <div className={activeTab === "gallery" ? "block" : "hidden"}>
              <GalleryEditor
                images={gallery}
                onChange={setGallery}
                onSave={async (newImages) => {
                  const res = await commitJsonToGithub("gallery.json", newImages, "feat: оновлено фотогалерею через адмін-панель", githubToken);
                  if (res.success) {
                    setSavedGallery(newImages);
                  }
                  alert(res.message);
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
