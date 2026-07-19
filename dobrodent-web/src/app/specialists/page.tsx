import ImageWithPlaceholder from "@/components/ImageWithPlaceholder";
import ScrollReveal from "@/components/ScrollReveal";
import StaggerContainer, { StaggerItem } from "@/components/StaggerContainer";

const prefix = process.env.NODE_ENV === 'production' ? '/dobrodent' : '';

export default function Specialists() {
  const specialists = [
    {
      name: "Кудря Ростислав Улянович",
      role: "Директор",
      specialties: ["Хірург-стоматолог", "Ортопед-стоматолог", "Імплантолог"],
      education: "В 1990 р. закінчив Полтавський державний медичний стоматологічний інститут.",
      category: "Вища категорія",
      image: "/d5_hiog.png",
    },
    {
      name: "Кудря Ірина Йосипівна",
      role: "Лікар-стоматолог",
      specialties: ["Стоматологія"],
      education: "В 1988 р. закінчила Полтавський державний медичний стоматологічний інститут.",
      category: "Вища категорія",
      image: "/d6_hiog.png",
    },
    {
      name: "Лісничук Олена Ростиславівна",
      role: "Лікар-стоматолог, ортодонт",
      specialties: ["Ортодонтія"],
      education: "В 2009 р. закінчила Вищий державний навчальний заклад України \"Українська медична стоматологічна академія\".",
      category: "",
      image: "/d4_hiog.png",
    },
  ];

  return (
    <div className="pt-8 pb-16 sm:pt-12 sm:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header (Option A: Centered typographic) */}
      <ScrollReveal variant="fadeUp">
        <div className="max-w-3xl mx-auto text-center mb-16 pb-8 border-b border-border">
          <span className="text-primary font-semibold tracking-wider text-xs uppercase mb-3 block">
            Команда Добродент
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
            Лікарі, яким довіряють
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Ми зібрали професіоналів з багаторічним досвідом роботи, які не лише лікують, але й постійно вдосконалюються, щоб зробити ваше перебування в клініці максимально комфортним, а лікування — ефективним.
          </p>
          {/* 
          <div className="text-base sm:text-lg text-muted-foreground leading-relaxed space-y-4 max-w-2xl mx-auto mt-4">
            <p>
              Прийом ведуть висококваліфіковані спеціалісти лікарі-стоматологи: ортодонти, хірурги-імплантологи, терапевти, ортопеди та гігієністи.
            </p>
            <p>
              Наші фахівці підходять до вирішення стоматологічних проблем комплексно: від першої консультації, розробки детального плану лікування до його повного здійснення у тісній співпраці лікарів різних профілів. Інноваційні технології та сучасні матеріали дозволяють нам проводити найбільш ефективне лікування у зручний для Вас час із прогнозованим результатом.
            </p>
          </div>
          */}
        </div>
      </ScrollReveal>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {specialists.map((person, index) => (
          <StaggerItem key={index}>
            <div className="bg-background rounded-2xl border border-border overflow-hidden flex flex-col h-full">
              <div className="bg-muted aspect-square flex items-center justify-center border-b border-border relative overflow-hidden">
                <ImageWithPlaceholder src={`${prefix}${person.image}`} alt={person.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-foreground mb-1">{person.name}</h3>
                <p className="text-primary font-medium mb-4">{person.role}</p>
                
                <div className="space-y-4 text-sm text-muted-foreground flex-grow">
                  <div>
                    <strong className="text-foreground block mb-1">Спеціалізація:</strong>
                    <ul className="list-disc list-inside">
                      {person.specialties.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                  
                  {person.category && (
                    <div>
                      <strong className="text-foreground block mb-1">Категорія:</strong>
                      {person.category}
                    </div>
                  )}

                  <div>
                    <strong className="text-foreground block mb-1">Освіта:</strong>
                    {person.education}
                  </div>
                </div>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
