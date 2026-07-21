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

  const [prices, setPrices] = useState<PriceCategory[]>(staticPrices as PriceCategory[]);
  const [specialists, setSpecialists] = useState<Specialist[]>(staticSpecialists as Specialist[]);
  const [gallery, setGallery] = useState<GalleryImage[]>(staticGallery as GalleryImage[]);

  const [githubToken, setGithubToken] = useState("");
  const [tokenSaved, setTokenSaved] = useState(false);

  useEffect(() => {
    const logged = sessionStorage.getItem("dobrodent_admin_logged") === "true";
    setIsLoggedIn(logged);

    const savedToken = localStorage.getItem("dobrodent_github_token") || "";
    setGithubToken(savedToken);

    setIsLoading(false);
  }, []);

  const handleLogout = () => {
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
          <h1 className="text-3xl font-bold text-foreground">Панель Управління Контентом (Git-SSG)</h1>
        </div>
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 text-foreground text-sm font-medium rounded-xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer transition-all border border-border shadow-sm"
        >
          <LogOut className="w-4 h-4" />
          Вийти з кабінету
        </button>
      </div>

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
          Прайс-лист
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
          Спеціалісти
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
          Фотогалерея
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
          Налаштування GitHub Git-SSG
        </button>
      </div>

      {/* Tab Content */}
      {isLoading ? (
        <div className="py-12 text-center text-muted-foreground">Завантаження контенту...</div>
      ) : (
        <div>
          {activeTab === "prices" && (
            <PriceEditor
              initialCategories={prices}
              onSave={async (newPrices) => {
                const res = await commitJsonToGithub("prices.json", newPrices, "feat: оновлено прайс-лист через адмін-панель", githubToken);
                if (res.success) {
                  setPrices(newPrices);
                  alert(res.message);
                } else {
                  alert(res.message);
                }
                return res.success;
              }}
            />
          )}

          {activeTab === "specialists" && (
            <SpecialistsEditor
              initialSpecialists={specialists}
              onSave={async (newList) => {
                const res = await commitJsonToGithub("specialists.json", newList, "feat: оновлено спеціалістів через адмін-панель", githubToken);
                if (res.success) {
                  setSpecialists(newList);
                  alert(res.message);
                } else {
                  alert(res.message);
                }
                return res.success;
              }}
            />
          )}

          {activeTab === "gallery" && (
            <GalleryEditor
              initialImages={gallery}
              onSave={async (newImages) => {
                const res = await commitJsonToGithub("gallery.json", newImages, "feat: оновлено фотогалерею через адмін-панель", githubToken);
                if (res.success) {
                  setGallery(newImages);
                  alert(res.message);
                } else {
                  alert(res.message);
                }
                return res.success;
              }}
            />
          )}

          {activeTab === "settings" && (
            <div className="bg-background rounded-2xl border border-border p-6 sm:p-8 space-y-6 max-w-3xl">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Авто-комміти через GitHub API (Git-SSG)</h2>
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
                <p className="text-xs text-muted-foreground">
                  Створити токен можна у GitHub: <code>Settings -&gt; Developer Settings -&gt; Personal access tokens (classic) -&gt; Generate new token</code> із відміченим прапорцем <strong>repo</strong>.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
