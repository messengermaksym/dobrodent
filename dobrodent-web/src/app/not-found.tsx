"use client";

import Link from "next/link";
import { Home, Calendar, PhoneCall, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 relative overflow-hidden bg-gradient-to-b from-background via-background/90 to-background/50">
      {/* Decorative background blobs */}
      <div className="absolute top-1/4 left-1/10 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl w-full text-center relative z-10 py-12 px-6 sm:px-12 bg-background/60 backdrop-blur-md border border-border/80 rounded-3xl shadow-xl">
        {/* Animated icon container */}
        <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-8 text-primary shadow-inner hover:scale-110 transition-transform duration-300">
          <FileQuestion className="w-12 h-12" />
        </div>

        {/* 404 Huge text */}
        <h1 className="text-8xl sm:text-9xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-500 mb-4 select-none">
          404
        </h1>

        {/* Headline */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-4">
          Сторінку не знайдено
        </h2>

        {/* Description */}
        <p className="text-muted-foreground max-w-md mx-auto mb-10 leading-relaxed text-sm sm:text-base">
          На жаль, сторінка, яку ви шукаєте, не існує, була видалена або її адреса змінилася. Перевірте правильність написання або поверніться на головну.
        </p>

        {/* Navigation Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-all shadow-md hover:shadow-lg active:scale-98"
          >
            <Home className="w-5 h-5" />
            <span>На головну</span>
          </Link>

          <Link
            href="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-muted hover:bg-muted/80 text-foreground font-semibold rounded-xl transition-all border border-border active:scale-98"
          >
            <Calendar className="w-5 h-5" />
            <span>Наші послуги</span>
          </Link>

          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-muted hover:bg-muted/80 text-foreground font-semibold rounded-xl transition-all border border-border active:scale-98"
          >
            <PhoneCall className="w-5 h-5" />
            <span>Контакти</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
