"use client";

import { useState } from "react";
import { Lock, Key, AlertCircle } from "lucide-react";

interface AdminLoginFormProps {
  onSuccess: () => void;
}

export default function AdminLoginForm({ onSuccess }: AdminLoginFormProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "dobrodent2026";

    if (password === correctPassword) {
      sessionStorage.setItem("dobrodent_admin_logged", "true");
      onSuccess();
    } else {
      setError("Невірний пароль доступу. Спробуйте ще раз.");
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-background rounded-2xl border border-border p-8 shadow-lg">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary">
            <Lock className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Вхід в адмін-панель</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Введіть пароль адміністратора клініки Добродент
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Пароль доступу
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 pl-11 bg-muted/40 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder:text-muted-foreground/60 transition-colors"
              />
              <Key className="w-5 h-5 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Увійти в кабінет
          </button>
        </form>

      </div>
    </div>
  );
}
