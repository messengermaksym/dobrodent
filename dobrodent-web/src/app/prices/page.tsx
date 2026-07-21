import type { Metadata } from "next";
import PricesContent from "@/components/PricesContent";

export const metadata: Metadata = {
  title: "Ціни на послуги",
  description: "Ознайомтеся з прайс-листом на стоматологічні послуги в клініці Добродент. Доступні ціни на лікування зубів, чистку, імплантацію та встановлення брекетів у Мукачеві.",
};

export default function Prices() {
  return <PricesContent />;
}
