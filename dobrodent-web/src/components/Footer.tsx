import Link from 'next/link';
import { Phone, MapPin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-12 pb-8 border-t border-primary/20 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Column 1: About */}
          <div>
            <h3 className="text-xl font-bold mb-4 tracking-tight">Добродент</h3>
            <p className="text-primary-foreground/80 text-sm leading-relaxed mb-4">
              Добродент - це клініка нового покоління з сучасною технікою та кваліфікованим персоналом. 
              З нами Ви можете зекономити свій час та заощадити кошти.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Швидкі посилання</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Головна</Link>
              </li>
              <li>
                <Link href="/specialists" className="hover:text-white transition-colors">Спеціалісти</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">Послуги</Link>
              </li>
              <li>
                <Link href="/prices" className="hover:text-white transition-colors">Ціни</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакти</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 shrink-0" />
                <span>м.Мукачево<br />вул. Я. Мудрого, 55/5</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 shrink-0" />
                <span>(03131) 5-43-77<br />099 369 32 77</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 shrink-0" />
                <span>dobrodent@i.ua</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-primary-foreground/60">
          <p>
            &copy; 2007 - {new Date().getFullYear()} Стоматологічна клініка "Добродент" в Мукачеві. Всі права захищені.
          </p>
        </div>
      </div>
    </footer>
  );
}
