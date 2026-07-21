import type { Metadata } from "next";
import SpecialistsContent from "@/components/SpecialistsContent";

export const metadata: Metadata = {
  title: "Наші спеціалісти",
  description: "Познайомтеся з командою професійних лікарів-стоматологів клініки Добродент. Висока кваліфікація, багаторічний досвід та індивідуальний підхід до кожного пацієнта.",
};

export default function Specialists() {
  return <SpecialistsContent />;
}
