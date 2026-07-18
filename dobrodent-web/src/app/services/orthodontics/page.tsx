import Link from "next/link";
import { CheckCircle2, Info, ArrowLeft, ShieldAlert, Sparkles, Smile } from "lucide-react";

export default function OrthodonticsService() {
  return (
    <div className="pt-8 pb-16 sm:pt-12 sm:pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <Link href="/services" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Повернутися до послуг
      </Link>

      <div className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-6">
          Дитяча та доросла ортодонтія
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Ортодонтія займається вирівнюванням неправильно розташованих зубів та виправленням прикусу, повертаючи впевненість у собі та створюючи здорові, гарні усмішки.
        </p>
      </div>

      <div className="prose prose-lg max-w-none text-foreground/90 space-y-8">
        
        <div className="bg-muted p-8 rounded-2xl border border-border">
          <h2 className="text-2xl font-bold mb-4 flex items-center text-foreground">
            <ShieldAlert className="w-6 h-6 mr-3 text-primary" /> 
            Чому прикус порушується?
          </h2>
          <p>
            Більше ніж 90% людей мають неправильно розташовані зуби або порушення прикусу. Частота цієї патології постійно зростає, що пов'язано з характером їжі сучасної людини: м'яка їжа не дає жувальному апарату потрібного навантаження. В результаті щелепні кістки розвиваються недостатньо, а зуби залишаються того ж розміру, тому їм стає тісно.
          </p>
          <p className="mb-0 font-medium">
            Починати займатися прикусом необхідно з раннього віку. Набагато простіше «виростити» правильний прикус, ніж виправляти сформовану патологію у дорослому віці.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-4">Фактори ризику в дитячому віці</h3>
          <ul className="space-y-4 list-none pl-0">
            <li className="flex gap-4">
              <div className="mt-1 flex-shrink-0">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <strong className="text-foreground text-lg block mb-1">Шкідливі звички</strong>
                <span className="text-muted-foreground">
                  Тривале смоктання соски, пальця, кутика ковдри чи іграшок, закушування губи та гризіння олівців порушує правильний ріст щелеп. Також важливу роль відіграє постава дитини: порушення постави тягне за собою зміщення щелепно-лицевої ділянки.
                </span>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="mt-1 flex-shrink-0">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <strong className="text-foreground text-lg block mb-1">Ротове дихання</strong>
                <span className="text-muted-foreground">
                  Часті застуди, аденоїди чи поліпи змушують дитину дихати ротом. Це призводить до деформації зубних рядів всього за рік. Ми працюємо у співпраці з ЛОР-лікарями для повного усунення цієї проблеми.
                </span>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="mt-1 flex-shrink-0">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <strong className="text-foreground text-lg block mb-1">Вроджена адентія (відсутність зачатків)</strong>
                <span className="text-muted-foreground">
                  Внаслідок еволюції у багатьох дітей відсутні зачатки постійних зубів (найчастіше бокових різців або премолярів). Панорамний знімок допомагає виявити це вчасно та підготувати план протезування чи імплантації в майбутньому.
                </span>
              </div>
            </li>
          </ul>
        </div>

        <div className="border-t border-border pt-8">
          <h3 className="text-3xl font-bold mb-6 text-foreground">Сучасні технології ортодонтії</h3>
          
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-background border border-border p-6 rounded-xl shadow-sm">
              <Smile className="w-8 h-8 text-primary mb-4" />
              <h4 className="text-lg font-bold mb-2">Класичні та естетичні брекети</h4>
              <p className="text-sm text-muted-foreground">
                Металеві брекети провідних світових брендів забезпечують міцність та високу швидкість лікування. Для тих, кому важливий зовнішній вигляд, ми пропонуємо естетичні керамічні брекети, майже невидимі на зубах.
              </p>
            </div>
            <div className="bg-background border border-border p-6 rounded-xl shadow-sm">
              <Sparkles className="w-8 h-8 text-primary mb-4" />
              <h4 className="text-lg font-bold mb-2">Самолігуючі системи</h4>
              <p className="text-sm text-muted-foreground">
                Безлігатурні брекети (Damon, SmartClip, Clarity) використовують мінімальну силу тертя, полегшують переміщення зубів та скорочують кількість візитів до лікаря, збільшуючи інтервали між прийомами до 6-12 тижнів.
              </p>
            </div>
          </div>

          <div className="mt-6 bg-background border border-border p-6 rounded-xl shadow-sm">
            <h4 className="text-lg font-bold mb-3">Ортодонтичні мікроімпланти та коректори</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Використання тимчасових титанових мікроімплантів створює надійну опору, дозволяючи переміщувати цілі групи зубів одночасно. Коректори дистального прикусу виправляють складні патології щелеп за 7-12 місяців без потреби у постійній співпраці з боку пацієнта.
            </p>
          </div>
        </div>

        <div className="bg-primary/5 p-8 rounded-2xl mt-12 border border-primary/20 flex flex-col items-center text-center">
          <Info className="w-10 h-10 text-primary mb-4" />
          <h3 className="text-2xl font-bold mb-2">Профілактика та гігієна</h3>
          <p className="mb-6 max-w-2xl text-base">
            Брекети вимагають ретельного домашнього догляду. Наші спеціалісти детально навчать вас або вашу дитину правильній техніці чищення зубів, підберуть спеціальні щітки, йоржики та флоси для запобігання демінералізації емалі.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 transition-colors shadow-sm"
          >
            Записатися до ортодонта
          </Link>
        </div>

      </div>
    </div>
  );
}
