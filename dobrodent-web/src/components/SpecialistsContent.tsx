"use client";

import { useState, useEffect } from "react";
import ImageWithPlaceholder from "@/components/ImageWithPlaceholder";
import ScrollReveal from "@/components/ScrollReveal";
import StaggerContainer, { StaggerItem } from "@/components/StaggerContainer";
import { fetchSpecialists } from "@/lib/contentService";
import { defaultSpecialists, Specialist } from "@/data/defaultSpecialists";

const prefix = process.env.NODE_ENV === 'production' ? '/dobrodent' : '';

export default function SpecialistsContent() {
  const [specialists, setSpecialists] = useState<Specialist[]>(defaultSpecialists);

  useEffect(() => {
    async function loadSpecialists() {
      const data = await fetchSpecialists();
      if (data && data.length > 0) {
        setSpecialists(data);
      }
    }
    loadSpecialists();
  }, []);

  const getImageUrl = (img?: string) => {
    if (!img) return `${prefix}/doctor-placeholder.svg?v=2`;
    if (img.startsWith("http") || img.startsWith("data:")) return img;
    const url = `${prefix}${img}`;
    if (url.includes("doctor-placeholder.svg") && !url.includes("?v=")) {
      return `${url}?v=2`;
    }
    return url;
  };

  return (
    <div className="pt-8 pb-16 sm:pt-12 sm:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        </div>
      </ScrollReveal>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {specialists.map((person, index) => (
          <StaggerItem key={person.id || index}>
            <div className="bg-background rounded-2xl border border-border overflow-hidden flex flex-col h-full">
              <div className="bg-muted aspect-square flex items-center justify-center border-b border-border relative overflow-hidden">
                <ImageWithPlaceholder
                  src={getImageUrl(person.image)}
                  alt={person.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-foreground mb-1">{person.name}</h3>
                <p className="text-primary font-medium mb-4">{person.role}</p>
                
                <div className="space-y-4 text-sm text-muted-foreground flex-grow">
                  {person.specialties && person.specialties.length > 0 && (
                    <div>
                      <strong className="text-foreground block mb-1">Спеціалізація:</strong>
                      <ul className="list-disc list-inside">
                        {person.specialties.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {person.category && (
                    <div>
                      <strong className="text-foreground block mb-1">Категорія:</strong>
                      {person.category}
                    </div>
                  )}

                  {person.education && (
                    <div>
                      <strong className="text-foreground block mb-1">Освіта:</strong>
                      {person.education}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
