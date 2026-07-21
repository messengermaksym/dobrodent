import { Check } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import StaggerContainer, { StaggerItem } from "@/components/StaggerContainer";
import staticPrices from "@/content/prices.json";
import { PriceCategory } from "@/data/defaultPrices";

export default function PricesContent() {
  const categories: PriceCategory[] = staticPrices as PriceCategory[];

  return (
    <div className="pt-8 pb-16 sm:pt-12 sm:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ScrollReveal variant="fadeUp">
        <div className="max-w-3xl mx-auto text-center mb-16 pb-8 border-b border-border">
          <span className="text-primary font-semibold tracking-wider text-xs uppercase mb-3 block">
            Вартість послуг
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
            Прозорі ціни без прихованих платежів
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Ми пропонуємо прозору цінову політику та високу якість послуг. Точна вартість лікування визначається лікарем після ретельного огляду та складання індивідуального плану лікування.
          </p>
        </div>
      </ScrollReveal>

      <StaggerContainer className="space-y-12" staggerDelay={0.15}>
        {categories.map((category, index) => (
          <StaggerItem key={category.id || index}>
            <div className="bg-background rounded-2xl border border-border overflow-hidden shadow-sm">
              <div className="bg-muted px-6 py-4 border-b border-border flex justify-between items-center">
                <h2 className="text-xl font-bold text-foreground">{category.name}</h2>
                <span className="text-xl font-bold font-heading text-foreground whitespace-nowrap ml-4">Ціна</span>
              </div>
              <div className="divide-y divide-border">
                {category.items.map((item, itemIndex) => (
                  <div key={item.id || itemIndex} className="px-6 py-4 flex justify-between items-center hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary opacity-70 hidden sm:block" />
                      <span className="text-foreground font-medium">{item.name}</span>
                    </div>
                    <div className="text-primary font-bold whitespace-nowrap ml-4">
                      {item.price}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <ScrollReveal variant="fadeIn" delay={0.2}>
        <div className="mt-12 bg-primary/5 p-6 rounded-xl border border-primary/20 text-center">
          <p className="text-foreground font-medium mb-4">
            Запишіться на безкоштовну консультацію для отримання точного плану лікування
          </p>
          <a href="/contact" className="inline-flex justify-center items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 transition-colors">
            Записатись на прийом
          </a>
        </div>
      </ScrollReveal>
    </div>
  );
}
