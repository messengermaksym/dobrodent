"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const prefix = process.env.NODE_ENV === 'production' ? '/dobrodent' : '';

export default function Contact() {
  const [phone, setPhone] = useState("");

  const formatPhone = (value: string) => {
    let digits = value.replace(/\D/g, '');
    if (digits.startsWith('38')) {
      digits = digits.substring(2);
    }
    digits = digits.substring(0, 10);

    let formatted = '+38 (';
    if (digits.length > 0) {
      formatted += digits.substring(0, 3);
    }
    if (digits.length > 3) {
      formatted += ') ' + digits.substring(3, 6);
    }
    if (digits.length > 6) {
      formatted += '-' + digits.substring(6, 8);
    }
    if (digits.length > 8) {
      formatted += '-' + digits.substring(8, 10);
    }
    return formatted;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    
    if (!input) {
      setPhone('');
      return;
    }

    const digits = input.replace(/\D/g, '');
    if (digits === '' || digits === '3' || digits === '38') {
      if (input.length < phone.length) {
        setPhone('');
        return;
      }
    }

    setPhone(formatPhone(input));
  };

  const handlePhoneFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setPhone('+38 (');
    }
  };
  return (
    <div className="pt-8 pb-16 sm:pt-12 sm:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header (Option A: Centered typographic) */}
      <ScrollReveal variant="fadeUp">
        <div className="max-w-3xl mx-auto text-center mb-16 pb-8 border-b border-border">
          <span className="text-primary font-semibold tracking-wider text-xs uppercase mb-3 block">
            Зворотний зв&apos;язок
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
            Завжди на зв&apos;язку з вами
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Запишіться на прийом, отримайте первинну консультацію або задайте нам будь-яке запитання. Ми завжди раді допомогти вам зберегти здоров&apos;я та красу вашої усмішки.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Info */}
        <ScrollReveal variant="fadeLeft">
          <div>
            <div className="bg-muted rounded-2xl p-8 border border-border mb-8">
              <h2 className="text-2xl font-bold mb-6 text-foreground">Наші координати</h2>
              
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="bg-background p-3 rounded-full border border-border">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <strong className="block text-foreground text-lg mb-1">Адреса</strong>
                    <span className="text-muted-foreground">м. Мукачево<br />вул. Я. Мудрого, 55/5</span>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <div className="bg-background p-3 rounded-full border border-border">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <strong className="block text-foreground text-lg mb-1">Телефони</strong>
                    <a href="tel:+380313154377" className="text-muted-foreground block hover:text-primary transition-colors">(03131) 5-43-77</a>
                    <a href="tel:+380993693277" className="text-muted-foreground block hover:text-primary transition-colors">099 369 32 77</a>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <div className="bg-background p-3 rounded-full border border-border">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <strong className="block text-foreground text-lg mb-1">Електронна пошта</strong>
                    <span className="text-muted-foreground">dobrodent@i.ua</span>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="bg-background p-3 rounded-full border border-border">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <strong className="block text-foreground text-lg mb-1">Графік роботи</strong>
                    <span className="text-muted-foreground block">Пн - Пт: 9:00 - 18:00</span>
                    <span className="text-muted-foreground block">Сб - Нд: Вихідний</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </ScrollReveal>

        {/* Contact Form */}
        <ScrollReveal variant="fadeRight" delay={0.1}>
          <div>
            <div className="bg-background rounded-2xl p-8 border border-border shadow-sm">
              <h2 className="text-2xl font-bold mb-6 text-foreground">Надіслати повідомлення</h2>
              
              <form className="space-y-6" action="#">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Ваше ім&apos;я
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                    placeholder="Іван Іванов"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    Номер телефону
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                    placeholder="+38 (099) 000-00-00"
                    value={phone}
                    onChange={handlePhoneChange}
                    onFocus={handlePhoneFocus}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Повідомлення (необов&apos;язково)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow resize-none"
                    placeholder="Опишіть вашу проблему або питання..."
                  ></textarea>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="consent"
                      name="consent"
                      type="checkbox"
                      required
                      className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="consent" className="text-muted-foreground">
                      Я погоджуюся, щоб цей веб-сайт зберігав надану мною інформацію.
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md font-medium transition-colors"
                >
                  Відправити
                </button>
              </form>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
