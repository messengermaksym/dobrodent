import Link from "next/link";
import { CheckCircle2, HeartPulse, Clock, Sparkles, ArrowRight, ShieldCheck, Stethoscope, Baby, TestTube, Activity } from "lucide-react";
import FAQSection from "@/components/FAQSection";
import ImageWithPlaceholder from "@/components/ImageWithPlaceholder";

const prefix = process.env.NODE_ENV === 'production' ? '/dobrodent' : '';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-muted pt-10 pb-20 sm:pt-16 sm:pb-32 overflow-hidden border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
                Клініка нового покоління
              </h1>
              <p className="text-lg sm:text-xl text-foreground/80 mb-8 leading-relaxed">
                Сучасна техніка, кваліфікований персонал та індивідуальний підхід до кожного пацієнта. Довірте свою усмішку професіоналам.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 transition-colors shadow-sm"
                >
                  Записатися на прийом
                </Link>
                <Link
                  href="/services"
                  className="inline-flex justify-center items-center px-6 py-3 border border-border text-base font-medium rounded-md text-foreground bg-background hover:bg-muted transition-colors shadow-sm"
                >
                  Наші послуги
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-border">
              <ImageWithPlaceholder fetchPriority="high" src={`${prefix}/img_9885.jpg`} alt="Добродент клініка" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Info Blocks / Features */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">Чому обирають нас</h2>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              З нами Ви можете зекономити свій час та заощадити кошти, отримавши найвищий рівень обслуговування.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-muted p-8 rounded-xl border border-border">
              <Sparkles className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-bold mb-2">Сучасна техніка</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Ми використовуємо тільки новітнє обладнання для точної діагностики та безболісного лікування.
              </p>
            </div>

            <div className="bg-muted p-8 rounded-xl border border-border">
              <Clock className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-bold mb-2">Економія часу</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Наші спеціалісти готові в будь-який час провести обстеження та лікування без черг.
              </p>
            </div>

            <div className="bg-muted p-8 rounded-xl border border-border">
              <HeartPulse className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-bold mb-2">Кваліфіковані спеціалісти</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Лікарі з багаторічним досвідом постійно вдосконалюють свої навички та знання.
              </p>
            </div>

            <div className="bg-muted p-8 rounded-xl border border-border">
              <CheckCircle2 className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-bold mb-2">Якісне обслуговування</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Ви отримаєте не тільки лікування, а й резонні консультації щодо особистої гігієни.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 sm:py-24 bg-muted border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">Наші послуги</h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Повний спектр стоматологічних послуг для вас і вашої родини.
              </p>
            </div>
            <Link href="/services" className="hidden sm:flex items-center text-primary font-medium hover:underline">
              Всі послуги <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Професійна гігієна та профілактика",
                slug: "hygiene",
                desc: "Професійне чищення зубів (ультразвук + AirFlow), зняття каменю та профілактика захворювань ясен.",
                icon: <ShieldCheck className="w-6 h-6 text-primary" />
              },
              {
                title: "Лікування зубів",
                slug: "treatment",
                desc: "Безболісне лікування карієсу, художня реставрація зубів та лікування кореневих каналів.",
                icon: <Stethoscope className="w-6 h-6 text-primary" />
              },
              {
                title: "Дитяча та доросла ортодонтія",
                slug: "orthodontics",
                desc: "Вирівнювання зубного ряду та виправлення прикусу за допомогою сучасних брекет-систем.",
                icon: <Baby className="w-6 h-6 text-primary" />
              },
              {
                title: "Імплантація зубів",
                slug: "implants",
                desc: "Надійне та довговічне відновлення втрачених зубів за допомогою титанових імплантатів.",
                icon: <Activity className="w-6 h-6 text-primary" />
              },
              {
                title: "Протезування зубів",
                slug: "prosthetics",
                desc: "Встановлення коронок, вінірів, мостоподібних конструкцій та знімних протезів.",
                icon: <TestTube className="w-6 h-6 text-primary" />
              },
              {
                title: "Зубозберігаючі технології",
                slug: "surgery",
                desc: "Зубозберігаючі операції (резекція верхівки, гемісекція кореня) та безболісне видалення зубів.",
                icon: <ShieldCheck className="w-6 h-6 text-primary" />
              }
            ].map((service, i) => (
              <Link href={`/services/${service.slug}`} key={i} className="group bg-background p-8 rounded-2xl border border-border hover:border-primary/40 hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="mb-5 bg-muted w-12 h-12 rounded-xl flex items-center justify-center group-hover:bg-primary/5 transition-colors">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">{service.desc}</p>
                </div>
                <span className="inline-flex items-center text-sm text-primary font-semibold">
                  Читати більше <ArrowRight className="ml-1.5 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">Часті запитання (FAQ)</h2>
            <p className="text-lg text-muted-foreground">
              Відповіді на найпопулярніші запитання наших пацієнтів.
            </p>
          </div>

          <FAQSection />
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 sm:py-24 bg-muted border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Contact & Map Text */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Де ми знаходимось?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Наша клініка розташована у самому центрі міста Мукачево. До нас зручно дістатися як на власному автомобілі, так і громадським транспортом.
              </p>

              <div className="space-y-4 text-foreground/90">
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-background p-2 rounded-full border border-border text-primary">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <strong className="block text-foreground">Адреса:</strong>
                    <span>м. Мукачево, вул. Ярослава Мудрого, 55/5</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-background p-2 rounded-full border border-border text-primary">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <strong className="block text-foreground">Телефони:</strong>
                    <span className="block">(03131) 5-43-77</span>
                    <span className="block">099 369 32 77</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-background p-2 rounded-full border border-border text-primary">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <strong className="block text-foreground">Графік роботи:</strong>
                    <span>Понеділок - П'ятниця: 9:00 - 18:00</span>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <a
                  href="https://maps.app.goo.gl/KshX2U1ah3r2Qmsh7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 transition-colors shadow-sm"
                >
                  Відкрити на картах Google
                </a>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="lg:col-span-7 h-[450px] relative w-full">
              <iframe
                src="https://maps.google.com/maps?q=Мукачево,%20Ярослава%20Мудрого%2055&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                className="rounded-2xl border border-border shadow-md"
              ></iframe>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
