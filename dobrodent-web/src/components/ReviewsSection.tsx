"use client";

import React, { useState } from "react";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import StaggerContainer, { StaggerItem } from "./StaggerContainer";

interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  date: string;
  avatarBg: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Natasha Tarchynets",
    rating: 5,
    text: "Дуже хороші лікарі👍 професійно підходять до кожного клієнта 👍",
    date: "",
    avatarBg: "bg-purple-100 text-purple-800",
  },
  {
    id: 2,
    name: "Сергій Лісничук",
    rating: 5,
    text: "Дуже дякую всьому колективу клініки за професійну роботу та ставлення до пацієнтів! Успіхів Вам та вдячних пацієнтів!!!",
    date: "",
    avatarBg: "bg-amber-100 text-amber-800",
  },
  {
    id: 3,
    name: "Микола Далекорей",
    rating: 5,
    text: "Рекомендую Добродент, тут відповідальні і хороші лікарі, привітний персонал, вони чітко і дуже добре виконують свою роботу. Спасибі",
    date: "",
    avatarBg: "bg-green-100 text-green-800",
  },
];

export default function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? reviews.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === reviews.length - 1 ? 0 : prevIndex + 1));
  };

  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <section className="py-16 sm:py-24 bg-muted border-t border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal variant="fadeUp">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-primary font-semibold tracking-wider text-xs uppercase mb-3 block">
              Відгуки пацієнтів
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
              Що про нас говорять
            </h2>
            <p className="text-muted-foreground text-sm">
              на основі відгуків у Google Maps
            </p>
          </div>
        </ScrollReveal>

        {/* Desktop View: Grid of Cards */}
        <div className="hidden lg:block">
          <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {reviews.slice(0, 3).map((review) => (
              <StaggerItem key={review.id}>
                <div className="bg-background p-8 rounded-2xl border border-border h-full flex flex-col justify-between hover:shadow-md hover:border-primary/20 transition-all duration-300">
                  <div>
                    <div className="flex text-amber-400 mb-4">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-foreground/90 text-sm sm:text-base leading-relaxed mb-6 italic">
                      &ldquo;{review.text}&rdquo;
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3 pt-4 border-t border-border/60">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${review.avatarBg}`}>
                      {getInitials(review.name)}
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground text-sm">{review.name}</h3>
                      <span className="text-xs text-muted-foreground">Пацієнт клініки</span>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          
          {/* More reviews button below grid */}
          <div className="mt-12 flex justify-center">
            <a
              href="https://maps.app.goo.gl/KshX2U1ah3r2Qmsh7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center items-center px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-primary-foreground text-base font-medium rounded-md transition-colors shadow-sm cursor-pointer"
            >
              Читати всі відгуки на Google Maps
            </a>
          </div>
        </div>

        {/* Mobile & Tablet View: Carousel Slider */}
        <div className="block lg:hidden">
          <ScrollReveal variant="fadeIn">
            {/* The carousel container wraps the grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[300px]">
              
              {/* Card 1 (Always visible) */}
              <div className="bg-background p-6 rounded-2xl border border-border shadow-sm flex flex-col justify-between overflow-hidden relative min-h-[300px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="flex flex-col justify-between flex-grow"
                  >
                    <div>
                      <div className="flex text-amber-400 mb-4">
                        {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <p className="text-foreground/90 text-sm sm:text-base leading-relaxed mb-6 italic">
                        &ldquo;{reviews[currentIndex].text}&rdquo;
                      </p>
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t border-border/60">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${reviews[currentIndex].avatarBg}`}>
                        {getInitials(reviews[currentIndex].name)}
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground text-sm">{reviews[currentIndex].name}</h3>
                        <span className="text-xs text-muted-foreground">Пацієнт клініки</span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Card 2 (Visible only on md screens i.e. tablets/iPads) */}
              <div className="hidden md:flex bg-background p-6 rounded-2xl border border-border shadow-sm flex-col justify-between overflow-hidden relative min-h-[300px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={(currentIndex + 1) % reviews.length}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="flex flex-col justify-between flex-grow"
                  >
                    <div>
                      <div className="flex text-amber-400 mb-4">
                        {[...Array(reviews[(currentIndex + 1) % reviews.length].rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <p className="text-foreground/90 text-sm sm:text-base leading-relaxed mb-6 italic">
                        &ldquo;{reviews[(currentIndex + 1) % reviews.length].text}&rdquo;
                      </p>
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t border-border/60">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${reviews[(currentIndex + 1) % reviews.length].avatarBg}`}>
                        {getInitials(reviews[(currentIndex + 1) % reviews.length].name)}
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground text-sm">{reviews[(currentIndex + 1) % reviews.length].name}</h3>
                        <span className="text-xs text-muted-foreground">Пацієнт клініки</span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>

            {/* Navigation controls - centered below the cards for clean tablet layout */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={handlePrev}
                className="p-3 rounded-full border border-border bg-background hover:bg-muted active:scale-95 transition-all cursor-pointer shadow-sm"
                aria-label="Попередній відгук"
              >
                <ArrowLeft className="w-5 h-5 text-foreground" />
              </button>
              <button
                onClick={handleNext}
                className="p-3 rounded-full border border-border bg-background hover:bg-muted active:scale-95 transition-all cursor-pointer shadow-sm"
                aria-label="Наступний відгук"
              >
                <ArrowRight className="w-5 h-5 text-foreground" />
              </button>
            </div>

            <div className="mt-8 text-center">
              <a
                href="https://maps.app.goo.gl/KshX2U1ah3r2Qmsh7"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-primary-foreground text-base font-medium rounded-md transition-colors"
              >
                Читати відгуки на Google Maps
              </a>
            </div>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
}
