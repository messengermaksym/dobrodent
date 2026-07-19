import ImageWithPlaceholder from "@/components/ImageWithPlaceholder";
import ScrollReveal from "@/components/ScrollReveal";
import StaggerContainer, { StaggerItem } from "@/components/StaggerContainer";

const prefix = process.env.NODE_ENV === 'production' ? '/dobrodent' : '';

export default function Gallery() {
  const images = [
    "/img_9814.jpg",
    "/img_9824.jpg",
    "/img_9885.jpg",
    "/img_1439_1.jpg",
    "/img_1444_2.jpg",
    "/img_9854.jpg",
    "/img_9847.jpg",
    "/img_9917.jpg",
    "/img_1437_1.jpg",
    "/non-existent-image.jpg",
  ];

  return (
    <div className="pt-8 pb-16 sm:pt-12 sm:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header (Option A: Centered typographic) */}
      <ScrollReveal variant="fadeUp">
        <div className="max-w-3xl mx-auto text-center mb-16 pb-8 border-b border-border">
          <span className="text-primary font-semibold tracking-wider text-xs uppercase mb-3 block">
            Простір клініки
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
            Атмосфера комфорту та турботи
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Запрошуємо вас на віртуальну екскурсію нашою клінікою. Ми створили сучасний, безпечний та затишний простір, де кожен пацієнт почувається спокійно, а лікування проходить без зайвого стресу.
          </p>
        </div>
      </ScrollReveal>

      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6" staggerDelay={0.08}>
        {images.map((img, index) => (
          <StaggerItem key={index}>
            <div
              className="aspect-[4/3] bg-muted rounded-xl overflow-hidden relative group cursor-pointer border border-border"
            >
              <ImageWithPlaceholder
                src={`${prefix}${img}`}
                alt={`Фото клініки ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                fetchPriority={index < 3 ? "high" : "auto"}
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
