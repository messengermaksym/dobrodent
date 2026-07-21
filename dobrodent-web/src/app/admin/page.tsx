"use client";

import { useState, useEffect } from "react";
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
import { Tag, Users, Image as ImageIcon, LogOut, Key, GitCommit, CheckCircle2, AlertCircle } from "lucide-react";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<"prices" | "specialists" | "gallery" | "settings">("prices");
  const [isLoading, setIsLoading] = useState(true);

  // Editable States
  const [prices, setPrices] = useState<PriceCategory[]>(staticPrices as PriceCategory[]);
  const [specialists, setSpecialists] = useState<Specialist[]>(staticSpecialists as Specialist[]);
  const [gallery, setGallery] = useState<GalleryImage[]>(staticGallery as GalleryImage[]);

  // Saved References (to check for dirty state)
  const [savedPrices, setSavedPrices] = useState<PriceCategory[]>(staticPrices as PriceCategory[]);
  const [savedSpecialists, setSavedSpecialists] = useState<Specialist[]>(staticSpecialists as Specialist[]);
  const [savedGallery, setSavedGallery] = useState<GalleryImage[]>(staticGallery as GalleryImage[]);

  const [githubToken, setGithubToken] = useState("");
  const [tokenSaved, setTokenSaved] = useState(false);

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

  // 1. Prevent closing the tab / reloading if there are unsaved changes
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

  // 2. Intercept local link transitions / navigation clicks
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      if (!isDirty) return;
      const target = (e.target as HTMLElement).closest("a");
      if (target && target.href) {
        const url = new URL(target.href);
        // If transitioning outside admin or to another route on the website
        if (url.pathname !== window.location.pathname) {
          const confirmLeave = window.confirm(
            "У вас є незбережені зміни! Вони будуть втрачені, якщо ви залишите сторінку. Продовжити?"
          );
          if (!confirmLeave) {
            e.preventDefault();
            e.stopPropagation();
          }
        }
      }
    };
    document.addEventListener("click", handleAnchorClick, true);
    return () => document.removeEventListener("click", handleAnchorClick, true);
  }, [isDirty]);

  const handleLogout = () => {
    if (isDirty) {
      const confirmLeave = window.confirm("У вас є незбережені зміни! Ви дійсно хочете вийти?");
      if (!confirmLeave) return;
    }
    sessionStorage.removeItem("dobrodent_admin_logged");
    setIsLoggedIn(false);
  };

  const handleSaveToken = () => {
    localStorage.setItem("dobrodent_github_token", githubToken.trim());
    setTokenSaved(true);
    setTimeout(() => setTokenSaved(false), 3000);
  };

  if (!isLoggedIn) {
    return <AdminLoginForm onSuccess={() => setIsLoggedIn(true)} />;
  }

  return (
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

        <button
          onClick={() => setActiveTab("settings")}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all whitespace-nowrap cursor-pointer hover:scale-[1.02] active:scale-[0.98] ${
            activeTab === "settings"
              ? "bg-primary text-primary-foreground shadow-sm font-bold"
              : "bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          <Key className="w-4 h-4" />
          Налаштування GitHub
        </button>
      </div>

      {/* Tab Content (using hidden/block so states are preserved when switching tabs) */}
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
                  alert(res.message);
                } else {
                  alert(res.message);
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
                const res = await commitJsonToGithub("specialists.json", newList, "feat: оновлено спеціалістів через адмін-панель", githubToken);
                if (res.success) {
                  setSavedSpecialists(newList);
                  alert(res.message);
                } else {
                  alert(res.message);
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
                const res = await commitJsonToGithub("gallery.json", newImages, "feat: оновлено фотогалерею через адмін-панель", githubToken);
                if (res.success) {
                  setSavedGallery(newImages);
                  alert(res.message);
                } else {
                  alert(res.message);
                }
                return res.success;
              }}
            />
          </div>

          <div className={activeTab === "settings" ? "block" : "hidden"}>
            <div className="bg-background rounded-2xl border border-border p-6 sm:p-8 space-y-6 max-w-3xl">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Авто-комміти через GitHub API</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                  Щоб кнопка <strong>«Опублікувати на сайт»</strong> могла автоматично робити комміт у ваш репозиторій на GitHub, вкажіть ваш GitHub Personal Access Token з правом <code>repo</code>:
                </p>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-foreground">
                  GitHub Access Token (ghp_...)
                </label>
                <div className="flex gap-3">
                  <input
                    type="password"
                    value={githubToken}
                    onChange={(e) => setGithubToken(e.target.value)}
                    placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                    className="flex-grow px-4 py-2.5 bg-muted/40 border border-border rounded-xl text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    onClick={handleSaveToken}
                    className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
                  >
                    {tokenSaved ? <CheckCircle2 className="w-4 h-4 text-green-300" /> : <GitCommit className="w-4 h-4" />}
                    {tokenSaved ? "Збережено!" : "Зберегти токен"}
                  </button>
                </div>
                {process.env.NEXT_PUBLIC_GITHUB_TOKEN && (
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Системний секретний токен автоматично налаштовано на сервері деплою.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
