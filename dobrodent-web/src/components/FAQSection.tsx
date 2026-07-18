"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "Які послуги надає ваша клініка?",
    answer: "Ми пропонуємо повний спектр стоматологічних послуг: професійну гігієну та профілактику, лікування карієсу та каналів, дитячу та дорослу ортодонтію (брекети), імплантацію зубів, протезування (коронки, вініри), а також рентген-діагностику."
  },
  {
    question: "Чи проводиться лікування безболісно?",
    answer: "Так, усі процедури в нашій клініці проводяться під надійною місцевою анестезією. Ми використовуємо сертифіковані сучасні препарати, які гарантують повну безболісність та комфорт під час лікування."
  },
  {
    question: "Як часто потрібно проходити професійну гігієну зубів?",
    answer: "Для підтримання здоров'я зубів та ясен рекомендується відвідувати гігієніста кожні 6 місяців. Якщо ви носите брекети або проходите лікування пародонту, чистку може знадобитися робити частіше — раз на 3-4 місяці."
  },
  {
    question: "Чи потрібен попередній запис?",
    answer: "Так, щоб забезпечити максимальний комфорт, приділити вам достатньо часу та уникнути черг, ми приймаємо пацієнтів за попереднім записом. Записатися можна телефоном або через форму на сторінці контактів."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="border border-border rounded-xl bg-muted overflow-hidden transition-all duration-200">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center font-bold text-lg p-6 text-left text-foreground focus:outline-none"
            >
              <span>{faq.question}</span>
              <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
              <div className="overflow-hidden">
                <p className="px-6 pb-6 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
