import Link from 'next/link';
import { Phone, MapPin, Clock, Menu } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full border-b border-border bg-background sticky top-0 z-50">
      {/* Top bar with contact info */}
      <div className="bg-primary text-primary-foreground text-xs sm:text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <span>м.Мукачево, вул. Я. Мудрого, 55/5</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>Пн-Пт: 9:00 - 18:00</span>
            </div>
          </div>
          <div className="flex items-center gap-4 font-medium">
            <div className="flex items-center gap-1.5">
              <Phone className="w-4 h-4" />
              <span>(03131) 5-43-77</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Phone className="w-4 h-4" />
              <span>099 369 32 77</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-3">
              <img src="/logo.png" alt="Добродент" className="h-10 w-auto object-contain" />
              <span className="text-xl font-bold text-primary tracking-tight hidden sm:block">
                Добродент
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors">
              Головна
            </Link>
            <Link href="/specialists" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors">
              Спеціалісти
            </Link>
            <Link href="/services" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors">
              Послуги
            </Link>
            <Link href="/prices" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors">
              Ціни
            </Link>
            <Link href="/gallery" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors">
              Фотогалерея
            </Link>
            <Link href="/contact" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors">
              Контакти
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <Link href="/contact" className="bg-primary text-primary-foreground hover:bg-primary/90 px-5 py-2.5 rounded-md text-sm font-medium transition-colors">
              Записатись на прийом
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button type="button" className="text-foreground hover:text-primary p-2">
              <span className="sr-only">Відкрити меню</span>
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
