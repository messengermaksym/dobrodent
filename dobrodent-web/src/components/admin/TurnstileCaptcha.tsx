"use client";

import { useEffect, useRef, useState } from "react";
import { ShieldCheck, Loader2 } from "lucide-react";

interface TurnstileCaptchaProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
        }
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId: string) => void;
    };
    onloadTurnstileCallback?: () => void;
  }
}

export default function TurnstileCaptcha({ onVerify, onExpire }: TurnstileCaptchaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isScriptError, setIsScriptError] = useState(false);
  const [fallbackChecked, setFallbackChecked] = useState(false);

  useEffect(() => {
    const siteKey =
      process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"; // Cloudflare official test key

    let isMounted = true;

    const renderWidget = () => {
      if (!isMounted || !containerRef.current || !window.turnstile) return;
      
      try {
        if (widgetIdRef.current) {
          window.turnstile.reset(widgetIdRef.current);
        }
        
        containerRef.current.innerHTML = "";
        const id = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: (token: string) => {
            if (isMounted) {
              setIsLoading(false);
              onVerify(token);
            }
          },
          "expired-callback": () => {
            if (isMounted) {
              onExpire?.();
            }
          },
          "error-callback": () => {
            if (isMounted) {
              setIsScriptError(true);
            }
          },
          theme: "auto",
        });
        widgetIdRef.current = id;
        setIsLoading(false);
      } catch (err) {
        console.error("Turnstile render error:", err);
        setIsScriptError(true);
      }
    };

    if (window.turnstile) {
      renderWidget();
    } else {
      const existingScript = document.getElementById("turnstile-script");
      if (!existingScript) {
        const script = document.createElement("script");
        script.id = "turnstile-script";
        script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
        script.async = true;
        script.defer = true;
        script.onload = () => {
          renderWidget();
        };
        script.onerror = () => {
          if (isMounted) setIsScriptError(true);
        };
        document.body.appendChild(script);
      } else {
        const checkInterval = setInterval(() => {
          if (window.turnstile) {
            clearInterval(checkInterval);
            renderWidget();
          }
        }, 100);

        setTimeout(() => clearInterval(checkInterval), 5000);
      }
    }

    return () => {
      isMounted = false;
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch (err) {
          console.warn("Turnstile remove warning:", err);
        }
      }
    };
  }, [onVerify, onExpire]);

  // Direct fallback checkbox if Turnstile script is blocked by client adblocker
  if (isScriptError) {
    return (
      <div className="p-3.5 bg-muted/40 border border-border rounded-xl flex items-center justify-between gap-3">
        <label className="flex items-center gap-3 cursor-pointer text-sm text-foreground font-medium select-none">
          <input
            type="checkbox"
            checked={fallbackChecked}
            onChange={(e) => {
              const checked = e.target.checked;
              setFallbackChecked(checked);
              if (checked) {
                onVerify("fallback-human-verified");
              } else {
                onExpire?.();
              }
            }}
            className="w-4 h-4 text-primary rounded border-border focus:ring-primary"
          />
          <span>Я людина (підтвердження доступу)</span>
        </label>
        <ShieldCheck className="w-5 h-5 text-emerald-500" />
      </div>
    );
  }

  return (
    <div className="relative min-h-[65px] flex items-center justify-center bg-muted/20 border border-border/60 rounded-xl p-2">
      {isLoading && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground py-2">
          <Loader2 className="w-4 h-4 animate-spin text-primary" />
          <span>Завантаження перевірки безпеки...</span>
        </div>
      )}
      <div ref={containerRef} className={isLoading ? "hidden" : "block"} />
    </div>
  );
}
