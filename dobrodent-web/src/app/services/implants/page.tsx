import Link from "next/link";
import { CheckCircle2, Info, ArrowLeft, ShieldAlert, HeartPulse, Stethoscope } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import StaggerContainer, { StaggerItem } from "@/components/StaggerContainer";

export default function ImplantsService() {
  return (
    <div className="pt-8 pb-16 sm:pt-12 sm:pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <Link href="/services" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Повернутися до послуг
      </Link>

      <ScrollReveal variant="fadeUp">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-6">
            Імплантація зубів
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Сучасний та найбільш надійний метод відновлення втрачених зубів штучними аналогами, які повністю імітують корінь та естетику природного зуба.
          </p>
        </div>
      </ScrollReveal>

      <div className="prose prose-lg max-w-none text-foreground/90 space-y-8">
        
        <ScrollReveal variant="fadeUp" delay={0.1}>
          <div className="bg-muted p-8 rounded-2xl border border-border">
            <h2 className="text-2xl font-bold mb-4 flex items-center text-foreground">
              <HeartPulse className="w-6 h-6 mr-3 text-primary" /> 
              Що відбувається після втрати зуба?
            </h2>
            <p>
              Коли людина втрачає зуб, кістка щелепи, яка раніше утримувала корінь, більше не отримує природного жувального навантаження і поступово починає розсмоктуватися (атрофуватися). Це призводить до зміни пропорцій обличчя та зміщення сусідніх зубів.
            </p>
            <p className="mb-0 font-medium">
              Імплантати не лише естетично замінюють зуби, але й передають навантаження на кістку, запобігаючи її руйнуванню. Штучні коронки на імплантах надійно фіксуються в щелепі, не зміщуються і дарують впевненість під час їжі та спілкування.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fadeUp">
          <div>
            <h3 className="text-2xl font-bold mb-4">Показання до імплантації</h3>
            <ul className="space-y-4 list-none pl-0">
              <li className="flex gap-4">
                <div className="mt-1 flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <strong className="text-foreground text-lg block mb-1">Поодинокі дефекти</strong>
                  <span className="text-muted-foreground">
                    Можливість відновити один втрачений зуб без необхідності обпилювання чи препарування сусідніх здорових зубів.
                  </span>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="mt-1 flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <strong className="text-foreground text-lg block mb-1">Включені дефекти</strong>
                  <span className="text-muted-foreground">
                    Відновлення декількох зубів поспіль, використовуючи імпланти як надійні опори для мостоподібних протезів.
                  </span>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="mt-1 flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <strong className="text-foreground text-lg block mb-1">Кінцеві дефекти та повна адентія</strong>
                  <span className="text-muted-foreground">
                    Можливість повністю відмовитися від знімних протезів або забезпечити їх ідеальну та міцну фіксацію в порожнині рота.
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fadeUp">
          <div className="border-t border-border pt-8">
            <h3 className="text-3xl font-bold mb-6 text-foreground">Протипоказання до операції</h3>
            
            <StaggerContainer className="grid sm:grid-cols-2 gap-6">
              <StaggerItem>
                <div className="bg-background border border-border p-6 rounded-xl shadow-sm h-full">
                  <ShieldAlert className="w-8 h-8 text-primary mb-4" />
                  <h4 className="text-lg font-bold mb-2">Абсолютні</h4>
                  <ul className="text-xs text-muted-foreground space-y-2 pl-4 list-disc">
                    <li>Деякі хронічні хвороби (туберкульоз, важкий цукровий діабет).</li>
                    <li>Захворювання крові та кровотворних органів.</li>
                    <li>Захворювання кісткової системи з низькою регенерацією.</li>
                    <li>Хвороби центральної нервової системи.</li>
                    <li>Злоякісні пухлини в період лікування.</li>
                  </ul>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="bg-background border border-border p-6 rounded-xl shadow-sm h-full">
                  <Stethoscope className="w-8 h-8 text-primary mb-4" />
                  <h4 className="text-lg font-bold mb-2">Відносні та соціальні</h4>
                  <ul className="text-xs text-muted-foreground space-y-2 pl-4 list-disc">
                    <li>Гострі форми пародонтиту (потребують лікування).</li>
                    <li>Незадовільний рівень гігієни порожнини рота.</li>
                    <li>Анатомічні перешкоди (атрофія кістки, близькість пазух) — виправляються кістковою пластикою чи синус-ліфтингом.</li>
                    <li>Шкідливі звички (активне куріння, зловживання алкоголем).</li>
                    <li>Вагітність та період лактації (тимчасово).</li>
                  </ul>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="scaleIn">
          <div className="bg-primary/5 p-8 rounded-2xl mt-12 border border-primary/20 flex flex-col items-center text-center">
            <Info className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-2xl font-bold mb-2">Підготовка до імплантації</h3>
            <p className="mb-6 max-w-2xl text-base">
              Першим кроком є детальна діагностика. В нашій клініці проводиться рентгенологічне дослідження, вимірювання товщини слизової оболонки та ретельний збір анамнезу. Лікар-імплантолог підбере оптимальну систему імплантатів спеціально під ваші індивідуальні параметри кістки.
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
