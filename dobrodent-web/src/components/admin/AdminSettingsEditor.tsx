"use client";

import { useState } from "react";
import { User, Key, Lock, Eye, EyeOff, Save, Loader2, ShieldCheck, CheckCircle2 } from "lucide-react";
import { commitJsonToGithub } from "@/lib/githubService";

interface AdminSettingsEditorProps {
  currentUsername: string;
  currentPasswordHash?: string;
  onUpdateSuccess: (newUsername: string, newPassword: string) => void;
  showToast: (type: "success" | "error" | "info", message: string) => void;
}

export default function AdminSettingsEditor({
  currentUsername,
  onUpdateSuccess,
  showToast,
}: AdminSettingsEditorProps) {
  const [username, setUsername] = useState(currentUsername || "admin");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim()) {
      showToast("error", "Будь ласка, введіть логін.");
      return;
    }

    const currentPassword = (typeof window !== "undefined" ? localStorage.getItem("dobrodent_admin_pass") : null) || "dobrodent2026";
    const isUsernameSame = username.trim() === currentUsername;
    const isPasswordSame = !newPassword || newPassword === currentPassword;

    if (isUsernameSame && isPasswordSame) {
      showToast("info", "Введені дані збігаються з поточними. Збереження не потрібне.");
      return;
    }

    if (newPassword && newPassword.length < 6) {
      showToast("error", "Пароль має містити щонайменше 6 символів.");
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      showToast("error", "Паролі не збігаються.");
      return;
    }

    setIsSaving(true);

    try {
      const updatedConfig = {
        username: username.trim(),
        password: newPassword ? newPassword : undefined, // If empty, keep existing password handling
      };

      // Read current config or combine
      const finalConfig = {
        username: updatedConfig.username,
        password: newPassword ? newPassword : (typeof window !== "undefined" ? localStorage.getItem("dobrodent_admin_pass") : null) || "dobrodent2026",
      };

      const res = await commitJsonToGithub(
        "admin_config.json",
        finalConfig,
        "Оновлення даних доступу в адмін-панель Добродент"
      );

      if (res.success) {
        if (typeof window !== "undefined") {
          localStorage.setItem("dobrodent_admin_user", finalConfig.username);
          localStorage.setItem("dobrodent_admin_pass", finalConfig.password);
        }
        showToast("success", "Дані доступу успішно оновлено! Зміни збережено в репозиторій.");
        onUpdateSuccess(finalConfig.username, finalConfig.password);
        setNewPassword("");
        setConfirmPassword("");
      } else {
        showToast("error", res.message || "Не вдалося зберегти нові дані доступу.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Помилка збереження";
      showToast("error", msg);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-background rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">Налаштування доступу адмін-панелі</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Зміна логіна та пароля для входу в кабінет адміністратора
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Username Field */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Логін адміністратора
          </label>
          <div className="relative">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              required
              className="w-full px-4 py-3 pl-11 bg-muted/40 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder:text-muted-foreground/60 transition-colors"
            />
            <User className="w-5 h-5 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
          <p className="text-xs text-muted-foreground mt-1.5">
            Логін використовується для авторизації на сторінці входу в адмінку.
          </p>
        </div>

        {/* New Password Field */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Новий пароль <span className="text-xs font-normal text-muted-foreground">(залиште порожнім, якщо не міняєте)</span>
          </label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Введіть новий пароль"
              className="w-full px-4 py-3 pl-11 pr-11 bg-muted/40 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder:text-muted-foreground/60 transition-colors"
            />
            <Key className="w-5 h-5 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
            >
              {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Confirm Password Field */}
        {newPassword.length > 0 && (
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Підтвердження нового пароля
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Повторіть новий пароль"
                required
                className="w-full px-4 py-3 pl-11 bg-muted/40 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder:text-muted-foreground/60 transition-colors"
              />
              <Lock className="w-5 h-5 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-border flex items-center justify-end gap-4">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center justify-center gap-2.5 px-6 py-3.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Збереження...</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>Зберегти нові дані доступу</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
