import Link from "next/link";
import { CheckCircle2, Info, ArrowLeft, Droplets, Smile, ShieldAlert } from "lucide-react";

export default function HygieneService() {
  return (
    <div className="pt-8 pb-16 sm:pt-12 sm:pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <Link href="/services" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Повернутися до послуг
      </Link>

      <div className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-6">
          Професійна гігієна та профілактика
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Професійна гігієна в даний час є найважливішим елементом комплексного лікування захворювань тканин пародонту, а також невід'ємною складовою терапії всіх стоматологічних захворювань.
        </p>
      </div>

      <div className="prose prose-lg max-w-none text-foreground/90">
        
        <div className="bg-muted p-8 rounded-2xl mb-12 border border-border">
          <h2 className="text-2xl font-bold mb-4 flex items-center text-foreground">
            <ShieldAlert className="w-6 h-6 mr-3 text-primary" /> 
            Що таке професійна гігієна?
          </h2>
          <p className="mb-0">
            Гігієна ротової порожнини – це професійне чищення зубів шляхом зняття зубного каменю, над- і під'ясенних зубних відкладень та згладжування поверхні кореня. Давно відомо, що профілактика — завжди краще ніж лікування.
          </p>
        </div>

        <h3 className="text-2xl font-bold mt-12 mb-6">Основи догляду за ротовою порожниною</h3>
        <p>
          Безпосередній догляд за порожниною рота і зубами є основною складовою профілактики захворювань зубів. Головне завдання полягає в очищенні порожнини рота від залишків їжі для підтримки органів у здоровому стані. Профілактика доповнює природні процеси самоочищення: пережовування їжі та слиновиділення.
        </p>
        
        <div className="grid sm:grid-cols-2 gap-6 my-10">
          <div className="bg-background border border-border p-6 rounded-xl shadow-sm">
            <Smile className="w-8 h-8 text-primary mb-4" />
            <h4 className="text-lg font-bold mb-2">Навчання змалечку</h4>
            <p className="text-sm text-muted-foreground">
              Навчання догляду за зубами потрібно починати з 2,5–3-річного віку, показуючи дитині, як правильно користуватися засобами догляду: полоскання після їжі, чищення зубів щіткою, зубочистки та зубні нитки.
            </p>
          </div>
          <div className="bg-background border border-border p-6 rounded-xl shadow-sm">
            <Droplets className="w-8 h-8 text-primary mb-4" />
            <h4 className="text-lg font-bold mb-2">Щоденне очищення</h4>
            <p className="text-sm text-muted-foreground">
              Чищення щіткою середньої жорсткості має тривати 2,5–4 хвилини двічі на день. Натуральні щітки міняють через 3-4 місяці, штучні — через 1-2 місяці.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold mt-12 mb-6">Додаткові засоби гігієни</h3>
        
        <ul className="space-y-6 mb-12 list-none pl-0">
          <li className="flex gap-4">
            <div className="mt-1 flex-shrink-0">
              <CheckCircle2 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <strong className="text-foreground text-lg block mb-1">Зубні нитки (флоси)</strong>
              <span className="text-muted-foreground">
                Служать для очищення контактних поверхонь і міжзубних проміжків. Їх застосування дає непоганий ефект при профілактиці карієсу. Бажано, щоб медичний працівник показав, як правильно ними користуватися, щоб виключити травмування ясен.
              </span>
            </div>
          </li>
          <li className="flex gap-4">
            <div className="mt-1 flex-shrink-0">
              <CheckCircle2 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <strong className="text-foreground text-lg block mb-1">Жувальна гумка</strong>
              <span className="text-muted-foreground">
                Застосовується після їжі для механічного очищення від нальоту та стимуляції слиновиділення. Жувати слід 3–5 хвилин, поки відчувається солодкий присмак. Тривале жування може порушити функцію слинних залоз.
              </span>
            </div>
          </li>
          <li className="flex gap-4">
            <div className="mt-1 flex-shrink-0">
              <CheckCircle2 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <strong className="text-foreground text-lg block mb-1">Полоскання порожнини рота</strong>
              <span className="text-muted-foreground">
                Дієвий метод звільнення порожнини рота від залишків їжі. Можна використовувати воду з содою (1/4 ч. л. на склянку) або настойки шавлії та ромашки.
              </span>
            </div>
          </li>
        </ul>

        <div className="bg-primary/5 p-8 rounded-2xl mt-12 border border-primary/20 flex flex-col items-center text-center">
          <Info className="w-10 h-10 text-primary mb-4" />
          <h3 className="text-2xl font-bold mb-4">Професійна гігієна в клініці</h3>
          <p className="mb-8">
            Невід'ємний етап догляду передбачає зняття зубних відкладень за допомогою ультразвукових скелерів, системи Air-flow, використання фторовмісних та антибактеріальних засобів. Ми складаємо індивідуальний графік профілактики для кожного пацієнта.
          </p>
          <Link 
            href="/contact" 
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-md font-medium transition-colors"
          >
            Записатися на професійну чистку
          </Link>
        </div>

      </div>
    </div>
  );
}
