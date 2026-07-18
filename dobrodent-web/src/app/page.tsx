import Link from "next/link";
import { CheckCircle2, HeartPulse, Clock, Sparkles, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-muted py-20 sm:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
              "Професійна гігієна та профілактика",
              "Лікування зубів",
              "Дитяча та доросла ортодонтія",
              "Імплантація зубів",
              "Протезування зубів",
              "Зубозберігаючі технології"
            ].map((service, i) => (
              <Link href="/services" key={i} className="group bg-background p-6 rounded-xl border border-border hover:shadow-md transition-all">
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{service}</h3>
                <span className="inline-flex items-center text-sm text-primary font-medium">
                  Детальніше <ArrowRight className="ml-1 w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
