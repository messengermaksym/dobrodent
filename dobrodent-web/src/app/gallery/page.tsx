export default function Gallery() {
  // Placeholder images
  const images = [
    "/placeholder1.jpg",
    "/placeholder2.jpg",
    "/placeholder3.jpg",
    "/placeholder4.jpg",
    "/placeholder5.jpg",
    "/placeholder6.jpg",
  ];

  return (
    <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-foreground mb-6">Фотогалерея</h1>
        <p className="text-lg text-muted-foreground">
          Запрошуємо вас на віртуальну екскурсію нашою клінікою. Сучасне обладнання, 
          комфортні кабінети та привітна атмосфера чекають на вас.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {images.map((img, index) => (
          <div 
            key={index} 
            className="aspect-[4/3] bg-muted rounded-xl overflow-hidden relative group cursor-pointer border border-border"
          >
            {/* Using a solid color placeholder for now since we don't have actual images */}
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/40 font-medium">
              Фото клініки {index + 1}
            </div>
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
          </div>
        ))}
      </div>
    </div>
  );
}
