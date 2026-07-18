import { Check } from "lucide-react";

export default function Prices() {
  const categories = [
    {
      name: "Терапевтична стоматологія",
      items: [
        { name: "Консультація лікаря-стоматолога", price: "Безкоштовно" },
        { name: "Рентген-діагностика (1 знімок)", price: "від 150 грн" },
        { name: "Лікування карієсу (фотополімерна пломба)", price: "від 800 грн" },
        { name: "Ендодонтичне лікування (1 канал)", price: "від 1200 грн" },
      ]
    },
    {
      name: "Професійна гігієна та профілактика",
      items: [
        { name: "Професійна гігієна порожнини рота (ультразвук + AirFlow)", price: "від 1500 грн" },
        { name: "Фторування всіх зубів", price: "від 600 грн" },
        { name: "Зняття зубного каменю (1 щелепа)", price: "від 800 грн" },
      ]
    },
    {
      name: "Ортодонтія",
      items: [
        { name: "Консультація лікаря-ортодонта", price: "від 300 грн" },
        { name: "Встановлення металевої брекет-системи (1 щелепа)", price: "від 12 000 грн" },
        { name: "Встановлення керамічної брекет-системи (1 щелепа)", price: "від 18 000 грн" },
        { name: "Зняття відбитків та виготовлення діагностичних моделей", price: "від 800 грн" },
      ]
    },
    {
      name: "Ортопедія та Імплантація",
      items: [
        { name: "Металокерамічна коронка", price: "від 3500 грн" },
        { name: "Безметалева кераміка (цирконій)", price: "від 7000 грн" },
        { name: "Встановлення імплантату (хірургічний етап)", price: "від 15 000 грн" },
        { name: "Коронка на імплантат", price: "від 8000 грн" },
      ]
    }
  ];

  return (
    <div className="pt-8 pb-16 sm:pt-12 sm:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-foreground mb-6">Ціни на послуги</h1>
        <p className="text-lg text-muted-foreground">
          Ми пропонуємо прозору цінову політику та високу якість послуг. Точна вартість лікування 
          визначається лікарем після огляду та складання індивідуального плану.
        </p>
      </div>

      <div className="space-y-12">
        {categories.map((category, index) => (
          <div key={index} className="bg-background rounded-2xl border border-border overflow-hidden shadow-sm">
            <div className="bg-muted px-6 py-4 border-b border-border">
              <h2 className="text-xl font-bold text-foreground">{category.name}</h2>
            </div>
            <div className="divide-y divide-border">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="px-6 py-4 flex justify-between items-center hover:bg-muted/30 transition-colors">
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
        ))}
      </div>

      <div className="mt-12 bg-primary/5 p-6 rounded-xl border border-primary/20 text-center">
        <p className="text-foreground font-medium mb-4">
          Запишіться на безкоштовну консультацію для отримання точного плану лікування
        </p>
        <a href="/contact" className="inline-flex justify-center items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 transition-colors">
          Записатись на прийом
        </a>
      </div>
    </div>
  );
}
