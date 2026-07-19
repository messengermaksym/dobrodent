import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Info, ArrowLeft, ShieldAlert, HeartPulse, Sparkles } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Хірургічна стоматологія",
  description: "Хірургічне лікування зубів у клініці Добродент у Мукачеві. Безболісне видалення зубів будь-якої складності (включаючи зуби мудрості), пластика вуздечки та підготовка до імплантації.",
};

export default function SurgeryService() {
  return (
    <div className="pt-8 pb-16 sm:pt-12 sm:pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <Link href="/services" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Повернутися до послуг
      </Link>

      <ScrollReveal variant="fadeUp">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-6">
            Зубозберігаючі технології та хірургія
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Сучасна хірургічна стоматологія націлена перш за все на порятунок зубів. Ми проводимо мікрохірургічні втручання, які дають можливість уникнути видалення навіть у складних випадках.
          </p>
        </div>
      </ScrollReveal>

      <div className="prose prose-lg max-w-none text-foreground/90 space-y-8">
        
        <ScrollReveal variant="fadeUp" delay={0.1}>
          <div className="bg-muted p-8 rounded-2xl border border-border">
            <h2 className="text-2xl font-bold mb-4 flex items-center text-foreground">
              <HeartPulse className="w-6 h-6 mr-3 text-primary" /> 
              Не поспішайте видаляти зуб!
            </h2>
            <p className="mb-0">
              Сучасна стоматологія має великий арсенал методик, які дозволяють врятувати зуби, які раніше вважалися безнадійними. Завдяки хірургічному лікуванню та застосуванню матеріалів, що стимулюють регенерацію кістки, ми зберігаємо власні зуби пацієнта на багато років.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fadeUp">
          <div>
            <h3 className="text-2xl font-bold mb-4">Види зубозберігаючих операцій</h3>
            <ul className="space-y-6 list-none pl-0">
              <li className="flex gap-4">
                <div className="mt-1 flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <strong className="text-foreground text-lg block mb-1">Резекція верхівки кореня</strong>
                  <span className="text-muted-foreground">
                    Видалення верхівки кореня зуба разом з осередком хронічної інфекції (кістою або гранульомою). Ця операція зупиняє руйнування кістки та дозволяє зберегти зуб без його видалення.
                  </span>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="mt-1 flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <strong className="text-foreground text-lg block mb-1">Гемісекція кореня</strong>
                  <span className="text-muted-foreground">
                    Відсікання одного ураженого кореня у багатокореневому зубі. При цьому здорова частина зуба та інші корені зберігаються та служать надійною природною опорою для майбутнього протезування (часто надійнішою за імплант).
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fadeUp">
          <div className="border-t border-border pt-8">
            <h3 className="text-2xl font-bold mb-4 flex items-center text-foreground">
              <Sparkles className="w-6 h-6 mr-3 text-primary" />
              Безболісне видалення зубів
            </h3>
            <p>
              Якщо зуб все ж таки зруйнований настільки, що його неможливо врятувати, ми пропонуємо зробити процедуру видалення максимально безболісною та комфортною.
            </p>
            <p>
              Ми використовуємо сучасні високоефективні анестетики, які повністю блокують больові відчуття. Видалення проводиться з мінімальною травмою навколишніх тканин, а лунка заповнюється спеціальними протимікробними та костеутворюючими препаратами для швидкої реабілітації та профілактики ускладнень.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="scaleIn">
          <div className="bg-primary/5 p-8 rounded-2xl mt-12 border border-primary/20 flex flex-col items-center text-center">
            <Info className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-2xl font-bold mb-2">Наше обладнання</h3>
            <p className="mb-6 max-w-2xl text-base">
              Усі хірургічні втручання виконуються на сучасному стерильному обладнанні з використанням біосумісних матеріалів, які в рази скорочують час відновлення та забезпечують прогнозований успішний результат лікування.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 transition-colors shadow-sm"
            >
              Записатися на консультацію
            </Link>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
}
