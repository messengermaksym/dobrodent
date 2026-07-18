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

  ];

  return (
    <div className="pt-8 pb-16 sm:pt-12 sm:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <img src={img} alt={`Фото клініки ${index + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
          </div>
        ))}
      </div>
    </div>
  );
}
