import Image from "next/image";

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
      education: "В 2009 р. закінчила Вищий державний навчальний заклад України “Українська медична стоматологічна академія”.",
      category: "",
      image: "/d4_hiog.png",
    },
  ];

  return (
    <div className="pt-8 pb-16 sm:pt-12 sm:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-foreground mb-6">Наші Спеціалісти</h1>
        <p className="text-lg text-muted-foreground">
          Команда професіоналів з багаторічним досвідом роботи, які постійно вдосновалюють свої навички, 
          щоб надавати вам найкраще лікування.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {specialists.map((person, index) => (
          <div key={index} className="bg-background rounded-2xl border border-border overflow-hidden flex flex-col">
            <div className="bg-muted aspect-square flex items-center justify-center border-b border-border relative overflow-hidden">
              <Image src={person.image} alt={person.name} fill className="object-cover" />
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
        ))}
      </div>
    </div>
  );
}
