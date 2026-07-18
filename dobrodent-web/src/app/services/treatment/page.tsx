import Link from "next/link";
import { CheckCircle2, Info, ArrowLeft, HeartPulse, Stethoscope, Sparkles } from "lucide-react";

export default function TreatmentService() {
  return (
    <div className="pt-8 pb-16 sm:pt-12 sm:pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <Link href="/services" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Повернутися до послуг
      </Link>

      <div className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-6">
          Лікування зубів та ендодонтія
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Сучасна терапевтична стоматологія спрямована на збереження природних зубів, безболісне лікування карієсу та його ускладнень з використанням високоестетичних матеріалів.
        </p>
      </div>

      <div className="prose prose-lg max-w-none text-foreground/90 space-y-8">
        
        <div className="bg-muted p-8 rounded-2xl border border-border">
          <h2 className="text-2xl font-bold mb-4 flex items-center text-foreground">
            <HeartPulse className="w-6 h-6 mr-3 text-primary" /> 
            Чому виникає карієс?
          </h2>
          <p>
            Найбільш розповсюдженим стоматологічним захворюванням на сьогоднішній день є карієс. Мікрофлора порожнини рота (бактерії) відіграє важливу роль у його розвитку. Їжа, яку ми вживаємо, є поживним середовищем для бактерій. Вуглеводи є найкращим джерелом енергії для них і значною мірою сприяють розвитку карієсу.
          </p>
          <p className="mb-0">
            Каріозна порожнина є результатом хімічної реакції продуктів розпаду бактерій (в основному кислот) на тканині зуба. Кислотні речовини пошкоджують емаль та дентин, що призводить до виникнення порожнин.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-4">Як ми проводимо лікування карієсу зубів?</h3>
          <p>
            Першим кроком у лікуванні каріозних дефектів є ретельне видалення заражених та пошкоджених тканин зуба. Після цього порожнина заповнюється спеціальним матеріалом (найчастіше фотополімерним чи склоіономерним), який імітує зовнішній вигляд та біомеханічні властивості природних тканин зуба.
          </p>
          <p>
            У нашій клініці ми використовуємо пломбувальні матеріали та реставраційні системи провідних світових виробників, які в поєднанні з роботою кваліфікованих лікарів забезпечують довготривалі та естетичні результати.
          </p>
        </div>

        <div className="border-t border-border pt-8">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Лікування кореневих каналів (Ендодонтія)</h2>
          <p>
            Простір всередині зуба від центру (пульпової камери) по всій довжині кореня до його верхівки називається кореневим каналом. Зуби можуть мати різну кількість каналів залежно від анатомії: моляри мають від 2 до 4 каналів, премоляри та ікла від 1 до 2, а різці — зазвичай 1 канал. Анатомія каналів індивідуальна і може варіюватися.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 my-10">
          <div className="bg-background border border-border p-6 rounded-xl shadow-sm">
            <Stethoscope className="w-8 h-8 text-primary mb-4" />
            <h4 className="text-lg font-bold mb-2">Причини запалення</h4>
            <ul className="text-sm text-muted-foreground space-y-2 pl-4 list-disc">
              <li>Глибокий карієс, що досяг пульпи зуба.</li>
              <li>Інфікування кореня внаслідок розпаду пульпи.</li>
              <li>Травми зубів (сколи, злами), що призводять до подразнення або загибелі нерва.</li>
            </ul>
          </div>
          <div className="bg-background border border-border p-6 rounded-xl shadow-sm">
            <Sparkles className="w-8 h-8 text-primary mb-4" />
            <h4 className="text-lg font-bold mb-2">Як проходить терапія?</h4>
            <p className="text-sm text-muted-foreground">
              Лікування проводиться в один або кілька візитів. Завдяки сучасним знеболюючим препаратам процедура є абсолютно комфортною. Ми використовуємо інноваційні технології та інструменти для ретельного очищення та герметичного пломбування каналів, що зберігає зуби на роки.
            </p>
          </div>
        </div>

        <div className="bg-primary/5 p-8 rounded-2xl mt-12 border border-primary/20 flex flex-col items-center text-center">
          <Info className="w-10 h-10 text-primary mb-4" />
          <h3 className="text-2xl font-bold mb-2">Важливо знати</h3>
          <p className="mb-6 max-w-2xl">
            Якщо вчасно не пролікувати карієс, він поширюється вглиб і переходить у пульпіт (запалення нерва) або періодонтит. Ендодонтичне лікування дозволяє врятувати навіть сильно зруйновані зуби від видалення.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 transition-colors shadow-sm"
          >
            Записатися на консультацію
          </Link>
        </div>

      </div>
    </div>
  );
}
