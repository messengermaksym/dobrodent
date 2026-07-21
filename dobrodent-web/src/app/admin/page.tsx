"use client";

import { useState, useEffect } from "react";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import PriceEditor from "@/components/admin/PriceEditor";
import SpecialistsEditor from "@/components/admin/SpecialistsEditor";
import GalleryEditor from "@/components/admin/GalleryEditor";
import {
  fetchPrices,
  savePrices,
  fetchSpecialists,
  saveSpecialists,
  fetchGallery,
  saveGallery,
} from "@/lib/contentService";
import { isFirebaseConfigured } from "@/lib/firebase";
import { PriceCategory } from "@/data/defaultPrices";
import { Specialist } from "@/data/defaultSpecialists";
import { GalleryImage } from "@/data/defaultGallery";
import { Tag, Users, Image as ImageIcon, LogOut, ShieldAlert, Key } from "lucide-react";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<"prices" | "specialists" | "gallery" | "settings">("prices");
  const [isLoading, setIsLoading] = useState(true);

  const [prices, setPrices] = useState<PriceCategory[]>([]);
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);

  useEffect(() => {
    const logged = sessionStorage.getItem("dobrodent_admin_logged") === "true";
    setIsLoggedIn(logged);

    async function loadAllData() {
      setIsLoading(true);
      const [p, s, g] = await Promise.all([
        fetchPrices(),
        fetchSpecialists(),
        fetchGallery(),
      ]);
      setPrices(p);
      setSpecialists(s);
      setGallery(g);
      setIsLoading(false);
    }

    loadAllData();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("dobrodent_admin_logged");
    setIsLoggedIn(false);
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

      {/* Firebase Config Notice */}
      {!isFirebaseConfigured && (
        <div className="mb-8 p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-600 dark:text-amber-400 text-sm flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold block mb-1">Тестовий режим (Без бази даних Firebase)</strong>
            <p className="leading-relaxed">
              Ви зараз можете редагувати контент для перевірки! Зміни зберігатимуться локально у вашому браузері. Щоб зміни бачили всі відвідувачі вашого сайту — підключіть безкоштовну базу Firebase за підказками у вкладці <strong>Налаштування</strong>.
            </p>
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
          Налаштування Firebase
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
                const ok = await savePrices(newPrices);
                if (ok) setPrices(newPrices);
                return ok;
              }}
            />
          )}

          {activeTab === "specialists" && (
            <SpecialistsEditor
              initialSpecialists={specialists}
              onSave={async (newList) => {
                const ok = await saveSpecialists(newList);
                if (ok) setSpecialists(newList);
                return ok;
              }}
            />
          )}

          {activeTab === "gallery" && (
            <GalleryEditor
              initialImages={gallery}
              onSave={async (newImages) => {
                const ok = await saveGallery(newImages);
                if (ok) setGallery(newImages);
                return ok;
              }}
            />
          )}

          {activeTab === "settings" && (
            <div className="bg-background rounded-2xl border border-border p-6 sm:p-8 space-y-6 max-w-3xl">
              <h2 className="text-2xl font-bold text-foreground">Налаштування зв'язку з Firebase</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Щоб адмін-панель зберігала дані у безкоштовну хмарну базу Google Firebase, виконайте 3 прості кроки:
              </p>

              <ol className="space-y-4 list-decimal list-inside text-sm text-foreground">
                <li className="leading-relaxed">
                  Перейдіть на сайт <a href="https://console.firebase.google.com/" target="_blank" rel="noreferrer" className="text-primary underline font-bold hover:text-primary/80">Firebase Console</a> та увійдіть через свій Google-акаунт.
                </li>
                <li className="leading-relaxed">
                  Натисніть <strong>«Створити проєкт» (Add project)</strong>, введіть назву <code>dobrodent</code> та виберіть створити безкоштовну базу даних <strong>Firestore Database</strong> та <strong>Storage</strong>.
                </li>
                <li className="leading-relaxed">
                  Скопіюйте 6 ключів проєкту у файл <code>.env.local</code> вашого сайту:
                </li>
              </ol>

              <div className="bg-muted p-4 rounded-xl font-mono text-xs text-foreground overflow-x-auto border border-border space-y-1">
                <p>NEXT_PUBLIC_FIREBASE_API_KEY=ваш_api_key</p>
                <p>NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=dobrodent.firebaseapp.com</p>
                <p>NEXT_PUBLIC_FIREBASE_PROJECT_ID=dobrodent</p>
                <p>NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=dobrodent.appspot.com</p>
                <p>NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789</p>
                <p>NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef</p>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  Статус Firebase зараз: {isFirebaseConfigured ? <span className="text-green-500 font-bold">🟢 Підключено</span> : <span className="text-amber-500 font-bold">🟡 Очікує ключі (працює локальний режим)</span>}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
