import Link from "next/link";
import { ArrowRight, ShieldCheck, Stethoscope, Baby, Activity, TestTube } from "lucide-react";

const prefix = process.env.NODE_ENV === 'production' ? '/dobrodent' : '';

export default function Services() {
  const services = [
    {
      title: "Професійна гігієна та профілактика",
      description: "Комплексне лікування захворювань тканин пародонту, професійне чищення зубів, зняття зубного каменю та навчання правильному догляду.",
      slug: "hygiene",
      icon: <ShieldCheck className="w-8 h-8 text-primary" />
    },
    {
      title: "Лікування зубів",
      description: "Сучасна терапевтична стоматологія, безболісне лікування карієсу та його ускладнень з використанням найкращих матеріалів.",
      slug: "treatment",
      icon: <Stethoscope className="w-8 h-8 text-primary" />
    },
    {
      title: "Дитяча та доросла ортодонтія",
      description: "Виправлення прикусу та вирівнювання зубного ряду за допомогою брекет-систем та інших сучасних ортодонтичних апаратів.",
      slug: "orthodontics",
      icon: <Baby className="w-8 h-8 text-primary" />
    },
    {
      title: "Імплантація зубів",
      description: "Надійне та довговічне відновлення втрачених зубів за допомогою сучасних титанових імплантатів.",
      slug: "implants",
      icon: <Activity className="w-8 h-8 text-primary" />
    },
    {
      title: "Протезування зубів",
      description: "Усі види знімного та незнімного протезування для відновлення жувальної функції та естетики вашої усмішки.",
      slug: "prosthetics",
      icon: <TestTube className="w-8 h-8 text-primary" />
    },
    {
      title: "Зубозберігаючі технології",
      description: "Сучасні зубозберігаючі операції (резекція верхівки кореня, гемісекція) та безболісне і безпечне видалення зубів.",
      slug: "surgery",
      icon: <ShieldCheck className="w-8 h-8 text-primary" />
    },
    {
      title: "Рентгенологія",
      description: "Точна діагностика стану зубів та щелеп за допомогою сучасного безпечного рентгенологічного обладнання.",
      slug: "xray",
      icon: <Activity className="w-8 h-8 text-primary" />
    }
  ];

  return (
    <div className="pt-8 pb-16 sm:pt-12 sm:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header (Option A: Centered typographic) */}
      <div className="max-w-3xl mx-auto text-center mb-16 pb-8 border-b border-border">
        <span className="text-primary font-semibold tracking-wider text-xs uppercase mb-3 block">
          Напрямки лікування
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
          Якісна стоматологія для всієї родини
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Ми пропонуємо повний спектр стоматологічних послуг з використанням сучасних технологій та матеріалів для всієї родини. Від профілактичної гігієни до складної імплантації — ми дбаємо про здоров'я та красу вашої усмішки.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, index) => (
          <div key={index} className="bg-background rounded-2xl border border-border p-8 flex flex-col hover:border-primary/50 transition-colors">
            <div className="mb-6 bg-muted w-16 h-16 rounded-xl flex items-center justify-center">
              {service.icon}
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">{service.title}</h3>
            <p className="text-muted-foreground mb-8 flex-grow leading-relaxed">
              {service.description}
            </p>
            <Link 
              href={`/services/${service.slug}`}
              className="inline-flex items-center text-primary font-medium hover:underline mt-auto w-fit"
            >
              Читати детальніше <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
