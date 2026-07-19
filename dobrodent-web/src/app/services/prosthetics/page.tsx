import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Info, ArrowLeft, HeartPulse, Sparkles, Smile } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Протезування зубів",
  description: "Ортопедична стоматологія (протезування) в клініці Добродент у Мукачеві. Встановлення коронок, вінірів, мостоподібних та знімних протезів для відновлення естетики та функцій зубів.",
};

export default function ProstheticsService() {
  return (
    <div className="pt-8 pb-16 sm:pt-12 sm:pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <Link href="/services" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Повернутися до послуг
      </Link>

      <ScrollReveal variant="fadeUp">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-6">
            Протезування зубів (Ортопедія)
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Сучасне ортопедичне лікування дозволяє повністю відновити жувальну функцію, анатомічну форму та бездоганний зовнішній вигляд зруйнованих або втрачених зубів.
          </p>
        </div>
      </ScrollReveal>

      <div className="prose prose-lg max-w-none text-foreground/90 space-y-8">
        
        <ScrollReveal variant="fadeUp" delay={0.1}>
          <div className="bg-muted p-8 rounded-2xl border border-border">
            <h2 className="text-2xl font-bold mb-4 flex items-center text-foreground">
              <HeartPulse className="w-6 h-6 mr-3 text-primary" /> 
              Чому важливо вчасно відновлювати зуби?
            </h2>
            <p className="mb-0">
              Втрата навіть одного зуба призводить до нерівномірного розподілу жувального навантаження. Сусідні зуби починають нахилятися в бік дефекту, а протилежний зуб — висуватися в його напрямку (феномен Попова-Годона). Це порушує прикус, викликає проблеми в скронево-нижньощелепному суглобі та ускладнює пережовування їжі. Протезування повертає баланс усій зубощелепній системі.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fadeUp">
          <div>
            <h3 className="text-2xl font-bold mb-4">Основні види протезування</h3>
            <ul className="space-y-6 list-none pl-0">
              <li className="flex gap-4">
                <div className="mt-1 flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <strong className="text-foreground text-lg block mb-1">Незнімне протезування</strong>
                  <span className="text-muted-foreground">
                    Одиночні коронки та мостоподібні протези. Вони виготовляються з високоміцних та естетичних матеріалів (металокераміка, безметалева кераміка на основі діоксиду цирконію) та повністю імітують власні зуби.
                  </span>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="mt-1 flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <strong className="text-foreground text-lg block mb-1">Мікропротезування (вініри та вкладки)</strong>
                  <span className="text-muted-foreground">
                    Тонкі керамічні накладки (вініри) дозволяють скоригувати колір та форму передніх зубів, створюючи ідеальну «голлівудську» усмішку, а керамічні вкладки відновлюють жувальні зуби при значних руйнуваннях значно надійніше за пломби.
                  </span>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="mt-1 flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <strong className="text-foreground text-lg block mb-1">Знімне протезування</strong>
                  <span className="text-muted-foreground">
                    Бюгельні, акрилові та нейлонові протези. Вони застосовуються при значній або повній втраті зубів, коли незнімне протезування неможливе, повертаючи комфорт та здатність повноцінно харчуватися.
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
              Сучасні матеріали та естетика
            </h3>
            <p>
              Ми використовуємо біосумісні матеріали останнього покоління. Особливу увагу ми приділяємо **цирконієвим коронкам** та **цільнокерамічним реставраціям**. Вони мають таку ж світлопроникність, як і природна емаль зуба, тому їх неможливо відрізнити від власних зубів пацієнта. Крім того, вони не викликають алергічних реакцій чи потемніння ясен.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="scaleIn">
          <div className="bg-primary/5 p-8 rounded-2xl mt-12 border border-primary/20 flex flex-col items-center text-center">
            <Info className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-2xl font-bold mb-2">Індивідуальний підхід</h3>
            <p className="mb-6 max-w-2xl text-base">
              Лікування починається з ретельного планування та цифрового моделювання майбутньої посмішки. Наші лікарі-ортопеди підберуть оптимальну конструкцію протеза на основі стану ваших зубів, ясен та побажань щодо естетики.
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
