import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Контакти та запис",
  description: "Контакти стоматологічної клініки Добродент у Мукачеві: адреса, телефони, графік роботи. Запишіться на прийом онлайн за допомогою форми зворотного зв'язку.",
};

export default function ContactPage() {
  return <ContactClient />;
}
