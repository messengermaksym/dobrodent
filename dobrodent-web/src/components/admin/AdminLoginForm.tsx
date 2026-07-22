"use client";

import { useState, useEffect, useCallback } from "react";
import { Lock, Key, User, AlertCircle, ShieldAlert, CheckCircle2 } from "lucide-react";
import TurnstileCaptcha from "./TurnstileCaptcha";
import adminConfig from "@/content/admin_config.json";

interface AdminLoginFormProps {
  onSuccess: () => void;
}

const MAX_FAILED_ATTEMPTS = 3;
const LOCKOUT_DURATION_MS = 5 * 60 * 1000; // 5 minutes

export default function AdminLoginForm({ onSuccess }: AdminLoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [lockoutTimeLeft, setLockoutTimeLeft] = useState<number>(0);

  // Check initial lockout state
  useEffect(() => {
    const lockoutUntilStr = localStorage.getItem("dobrodent_admin_lockout_until");
    if (lockoutUntilStr) {
      const lockoutUntil = parseInt(lockoutUntilStr, 10);
      const now = Date.now();
      if (lockoutUntil > now) {
        setLockoutTimeLeft(Math.ceil((lockoutUntil - now) / 1000));
      } else {
        localStorage.removeItem("dobrodent_admin_lockout_until");
        localStorage.removeItem("dobrodent_admin_failed_attempts");
      }
    }
  }, []);

  // Timer countdown for lockout
  useEffect(() => {
    if (lockoutTimeLeft <= 0) return;

    const timer = setInterval(() => {
      setLockoutTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          localStorage.removeItem("dobrodent_admin_lockout_until");
          localStorage.removeItem("dobrodent_admin_failed_attempts");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [lockoutTimeLeft]);

  const handleCaptchaVerify = useCallback((token: string) => {
    setCaptchaToken(token);
    setError("");
  }, []);

  const handleCaptchaExpire = useCallback(() => {
    setCaptchaToken(null);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (lockoutTimeLeft > 0) {
      return;
    }

    if (!captchaToken) {
      setError("Будь ласка, підтвердіть перевірку на людяність (CAPTCHA).");
      return;
    }

    // Dynamic credentials fallback chain: localStorage > admin_config.json > process.env
    const expectedUsername =
      (typeof window !== "undefined" ? localStorage.getItem("dobrodent_admin_user") : null) ||
      adminConfig.username ||
      process.env.NEXT_PUBLIC_ADMIN_USERNAME ||
      "admin";

    const expectedPassword =
      (typeof window !== "undefined" ? localStorage.getItem("dobrodent_admin_pass") : null) ||
      adminConfig.password ||
      process.env.NEXT_PUBLIC_ADMIN_PASSWORD ||
      "dobrodent2026";

    const isUsernameCorrect = username.trim().toLowerCase() === expectedUsername.toLowerCase();
    const isPasswordCorrect = password === expectedPassword;

    if (isUsernameCorrect && isPasswordCorrect) {
      // Clear failed attempt counters
      localStorage.removeItem("dobrodent_admin_failed_attempts");
      localStorage.removeItem("dobrodent_admin_lockout_until");
      sessionStorage.setItem("dobrodent_admin_logged", "true");
      onSuccess();
    } else {
      // Record failed attempt
      const attempts = parseInt(localStorage.getItem("dobrodent_admin_failed_attempts") || "0", 10) + 1;
      localStorage.setItem("dobrodent_admin_failed_attempts", attempts.toString());

      if (attempts >= MAX_FAILED_ATTEMPTS) {
        const lockoutUntil = Date.now() + LOCKOUT_DURATION_MS;
        localStorage.setItem("dobrodent_admin_lockout_until", lockoutUntil.toString());
        setLockoutTimeLeft(LOCKOUT_DURATION_MS / 1000);
        setError(`Перевищено кількість спроб входу. Форму заблоковано на 5 хвилин для захисту від підбору.`);
      } else {
        const remaining = MAX_FAILED_ATTEMPTS - attempts;
        setError(
          `Невірний логін або пароль. Залишилось спроб до тимчасового блокування: ${remaining}.`
        );
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full bg-background rounded-2xl border border-border p-8 shadow-lg">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary">
            <Lock className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Вхід в адмін-панель</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Введіть логін та пароль адміністратора клініки Добродент
          </p>
        </div>

        {lockoutTimeLeft > 0 ? (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-sm flex items-center gap-3">
            <ShieldAlert className="w-6 h-6 flex-shrink-0" />
            <div>
              <p className="font-semibold">Форму тимчасово заблоковано</p>
              <p className="text-xs mt-1">
                Захист від брутфорсу активний. Спробуйте знову через{" "}
                <span className="font-bold underline">{formatTime(lockoutTimeLeft)}</span>.
              </p>
            </div>
          </div>
        ) : error ? (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username Field */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Логін
            </label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError("");
                }}
                placeholder="admin"
                disabled={lockoutTimeLeft > 0}
                required
                className="w-full px-4 py-3 pl-11 bg-muted/40 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder:text-muted-foreground/60 transition-colors disabled:opacity-50"
              />
              <User className="w-5 h-5 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Password Field */}
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
                disabled={lockoutTimeLeft > 0}
                required
                className="w-full px-4 py-3 pl-11 bg-muted/40 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder:text-muted-foreground/60 transition-colors disabled:opacity-50"
              />
              <Key className="w-5 h-5 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Turnstile CAPTCHA verification */}
          {lockoutTimeLeft <= 0 && (
            <div className="pt-1">
              <TurnstileCaptcha
                onVerify={handleCaptchaVerify}
                onExpire={handleCaptchaExpire}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={lockoutTimeLeft > 0 || !captchaToken}
            className="w-full py-3.5 px-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {lockoutTimeLeft > 0
              ? `Заблоковано (${formatTime(lockoutTimeLeft)})`
              : "Увійти в кабінет"}
          </button>
        </form>
      </div>
    </div>
  );
}
