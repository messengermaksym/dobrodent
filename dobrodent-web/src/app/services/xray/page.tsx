import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Info, ArrowLeft, HeartPulse, ShieldCheck } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Рентгенологія та комп'ютерна діагностика",
  description: "Рентген-діагностика зубів у Мукачеві в стоматологічному центрі Добродент. Високоточні цифрові прицільні знімки з мінімальним променевим навантаженням.",
};

export default function XrayService() {
  return (
    <div className="pt-8 pb-16 sm:pt-12 sm:pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <Link href="/services" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Повернутися до послуг
      </Link>

      <ScrollReveal variant="fadeUp">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-6">
            Рентгенологія
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Точна та безпечна діагностика стану зубів та кісткової тканини за допомогою найсучаснішого цифрового рентген-обладнання з мінімальною дозою випромінювання.
          </p>
        </div>
      </ScrollReveal>

      <div className="prose prose-lg max-w-none text-foreground/90 space-y-8">
        
        <ScrollReveal variant="fadeUp" delay={0.1}>
          <div className="bg-muted p-8 rounded-2xl border border-border">
            <h2 className="text-2xl font-bold mb-4 flex items-center text-foreground">
              <ShieldCheck className="w-6 h-6 mr-3 text-primary" /> 
              Стандарти світової діагностики
            </h2>
            <p className="mb-0">
              Медичний стоматологічний центр «Добродент» працює у відповідності до світових стандартів. Якісне лікування неможливе «наосліп», тому рентгендіагностика є невід&apos;ємною частиною нашої повсякденної практики на етапах планування, лікування та контролю результатів.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fadeUp">
          <div>
            <h3 className="text-2xl font-bold mb-4">Навіщо потрібен рентген?</h3>
            <p>
              Рентгенологічні знімки дозволяють лікарю побачити приховані процеси, які неможливо виявити під час звичайного візуального огляду:
            </p>
            <ul className="space-y-4 list-none pl-0">
              <li className="flex gap-4">
                <div className="mt-1 flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <strong className="text-foreground text-lg block mb-1">Прихований карієс</strong>
                  <span className="text-muted-foreground">
                    Діагностика каріозних дефектів на міжзубних та під&apos;ясенних поверхнях, а також вторинного карієсу під старими пломбами та коронками.
                  </span>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="mt-1 flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <strong className="text-foreground text-lg block mb-1">Оцінка кореневих каналів та кістки</strong>
                  <span className="text-muted-foreground">
                    Визначення довжини та форми каналів, контроль якості їх пломбування, оцінка стану кісткової тканини навколо кореня при періодонтиті чи кістах.
                  </span>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="mt-1 flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <strong className="text-foreground text-lg block mb-1">Хірургія та імплантація</strong>
                  <span className="text-muted-foreground">
                    Планування видалення складних ретенованих зубів, визначення об&apos;єму кістки перед імплантацією та точний контроль встановлення імплантатів.
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fadeUp">
          <div className="border-t border-border pt-8">
            <h3 className="text-2xl font-bold mb-4 flex items-center text-foreground">
              <HeartPulse className="w-6 h-6 mr-3 text-primary" />
              Повна безпека для пацієнта
            </h3>
            <p>
              На відміну від загальної медицини, рентген-апарати в стоматології є одними з найбезпечніших у світі. Вони генерують надзвичайно вузькоспрямований пучок променів, а час дії обчислюється долями секунди.
            </p>
            <p>
              Дози випромінювання, які отримують наші пацієнти, є мізерно малими. Для порівняння:
            </p>
            <div className="bg-background border border-border p-6 rounded-xl my-6 flex flex-col md:flex-row justify-around gap-6 text-center">
              <div>
                <span className="text-3xl font-extrabold text-primary block mb-1">0.001 мЗв</span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Доза за один стоматологічний знімок</span>
              </div>
              <div className="border-r border-border hidden md:block"></div>
              <div>
                <span className="text-3xl font-extrabold text-foreground block mb-1">3.0 мЗв</span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Природна річна норма випромінювання з довкілля</span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              Це означає, що один прицільний цифровий знімок дає навантаження, яке дорівнює всього декільком годинам звичайного життя під природним сонячним випромінюванням.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="scaleIn">
          <div className="bg-primary/5 p-8 rounded-2xl mt-12 border border-primary/20 flex flex-col items-center text-center">
            <Info className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-2xl font-bold mb-2">Швидко та зручно</h3>
            <p className="mb-6 max-w-2xl text-base">
              Знімки робляться безпосередньо у клініці за кілька секунд. Результат миттєво з&apos;являється на екрані комп&apos;ютера лікаря, що дозволяє відразу поставити діагноз і скоригувати лікування.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 transition-colors shadow-sm"
            >
              Записатися на прийом
            </Link>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
}
