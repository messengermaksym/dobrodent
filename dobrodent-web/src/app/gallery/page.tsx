import type { Metadata } from "next";
import GalleryContent from "@/components/GalleryContent";

export const metadata: Metadata = {
  title: "Фотогалерея",
  description: "Фотогалерея стоматологічного центру Добродент у Мукачеві. Фотографії нашої клініки, сучасного стоматологічного обладнання та кабінетів лікування.",
};

export default function Gallery() {
  return <GalleryContent />;
}
