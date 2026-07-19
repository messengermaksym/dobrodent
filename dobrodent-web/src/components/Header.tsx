"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Phone, MapPin, Clock, Menu, X } from 'lucide-react';
import { useBookingModal } from '@/context/BookingModalContext';

const prefix = process.env.NODE_ENV === 'production' ? '/dobrodent' : '';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { openModal } = useBookingModal();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

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
            <a href="tel:+380313154377" className="flex items-center gap-1.5 hover:text-primary-foreground/80 transition-colors">
              <Phone className="w-4 h-4" />
              <span>(03131) 5-43-77</span>
            </a>
            <a href="tel:+380993693277" className="flex items-center gap-1.5 hover:text-primary-foreground/80 transition-colors">
              <Phone className="w-4 h-4" />
              <span>099 369 32 77</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              className="flex items-center gap-0"
              onClick={() => {
                closeMenu();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              {/* Responsive logo_transparent.png (larger icon) and ДоброДЕНТ with subtitle */}
              <img src={`${prefix}/logo_transparent.png`} alt="Добродент" className="h-14 md:h-16 lg:h-18 w-auto object-contain" />
              <div className="flex flex-col justify-center -ml-1.5 md:-ml-2.5">
                <span className="text-xl md:text-2xl lg:text-3xl font-bold text-primary tracking-tight leading-none">
                  Добро<span className="font-medium">ДЕНТ</span>
                </span>
                <span className="text-[7px] md:text-[9px] lg:text-[10px] text-muted-foreground uppercase tracking-widest mt-1 leading-none font-semibold block">
                  стоматологічний центр
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav (optimized for tablets) */}
          <nav className="hidden md:flex md:space-x-2 lg:space-x-5 xl:space-x-8">
            <Link href="/" className="text-foreground hover:text-primary px-1.5 lg:px-3 py-2 text-xs lg:text-sm font-medium transition-colors">
              Головна
            </Link>
            <Link href="/specialists" className="text-foreground hover:text-primary px-1.5 lg:px-3 py-2 text-xs lg:text-sm font-medium transition-colors">
              Спеціалісти
            </Link>
            <Link href="/services" className="text-foreground hover:text-primary px-1.5 lg:px-3 py-2 text-xs lg:text-sm font-medium transition-colors">
              Послуги
            </Link>
            <Link href="/prices" className="text-foreground hover:text-primary px-1.5 lg:px-3 py-2 text-xs lg:text-sm font-medium transition-colors">
              Ціни
            </Link>
            <Link href="/gallery" className="text-foreground hover:text-primary px-1.5 lg:px-3 py-2 text-xs lg:text-sm font-medium transition-colors">
              Фотогалерея
            </Link>
            <Link href="/contact" className="text-foreground hover:text-primary px-1.5 lg:px-3 py-2 text-xs lg:text-sm font-medium transition-colors">
              Контакти
            </Link>
          </nav>

          {/* CTA Button (Hidden on tablets, visible from laptop screen sizes) */}
          <div className="hidden lg:flex items-center">
            <button onClick={openModal} className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 xl:px-5 py-2.5 rounded-md text-sm font-medium transition-colors cursor-pointer">
              Записатись на прийом
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              className="text-foreground hover:text-primary p-2 transition-colors"
              onClick={toggleMenu}
            >
              <span className="sr-only">Відкрити меню</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 w-full border-t border-b border-border bg-background shadow-lg animate-in slide-in-from-top-5 duration-200 z-50">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 shadow-inner">
            <Link
              href="/"
              onClick={closeMenu}
              className="block px-3 py-3 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-muted transition-colors"
            >
              Головна
            </Link>
            <Link
              href="/specialists"
              onClick={closeMenu}
              className="block px-3 py-3 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-muted transition-colors"
            >
              Спеціалісти
            </Link>
            <Link
              href="/services"
              onClick={closeMenu}
              className="block px-3 py-3 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-muted transition-colors"
            >
              Послуги
            </Link>
            <Link
              href="/prices"
              onClick={closeMenu}
              className="block px-3 py-3 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-muted transition-colors"
            >
              Ціни
            </Link>
            <Link
              href="/gallery"
              onClick={closeMenu}
              className="block px-3 py-3 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-muted transition-colors"
            >
              Фотогалерея
            </Link>
            <Link
              href="/contact"
              onClick={closeMenu}
              className="block px-3 py-3 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-muted transition-colors"
            >
              Контакти
            </Link>
            <div className="pt-4 pb-2 px-3">
              <button
                onClick={() => {
                  closeMenu();
                  openModal();
                }}
                className="w-full text-center bg-primary text-primary-foreground hover:bg-primary/90 px-5 py-3 rounded-md text-base font-medium transition-colors shadow-sm cursor-pointer"
              >
                Записатись на прийом
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
