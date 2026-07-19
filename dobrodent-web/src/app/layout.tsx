import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://messengermaksym.github.io/dobrodent"),
  title: {
    default: "Добродент | Стоматологічна клініка в Мукачеві",
    template: "%s | Добродент"
  },
  description: "Добродент — сучасна стоматологічна клініка в Мукачеві. Кваліфіковані стоматологи, новітнє обладнання, безболісне лікування зубів, імплантація, ортодонтія та естетична стоматологія.",
  keywords: ["стоматологія Мукачево", "стоматолог Мукачево", "лікування зубів", "імплантація зубів Мукачево", "брекети Мукачево", "Добродент Мукачево", "чистка зубів Мукачево", "дитяча стоматологія"],
  authors: [{ name: "Добродент" }],
  openGraph: {
    title: "Добродент | Стоматологічна клініка в Мукачеві",
    description: "Сучасна стоматологічна клініка з новітнім обладнанням та кваліфікованим персоналом. Безболісне лікування, імплантація та ортодонтія.",
    url: "https://messengermaksym.github.io/dobrodent",
    siteName: "Добродент",
    images: [
      {
        url: "logo_transparent.png",
        width: 1200,
        height: 630,
        alt: "Стоматологічна клініка Добродент",
      },
    ],
    locale: "uk_UA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Добродент | Стоматологічна клініка в Мукачеві",
    description: "Сучасна стоматологічна клініка з новітнім обладнанням та кваліфікованим персоналом.",
    images: ["logo_transparent.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BookingModalProvider } from "@/context/BookingModalContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={`${inter.variable} ${montserrat.variable} h-full antialiased overflow-x-hidden`}>
      <body className="min-h-full flex flex-col font-sans overflow-x-hidden">
        <BookingModalProvider>
          <div className="flex flex-col min-h-screen w-full overflow-x-hidden relative">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </BookingModalProvider>
      </body>
    </html>
  );
}
