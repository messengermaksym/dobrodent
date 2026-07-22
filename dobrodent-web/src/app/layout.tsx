import type { Metadata } from "next";
import { Inter, Montserrat, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const prefix = process.env.NODE_ENV === 'production' ? '/dobrodent' : '';

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
        url: "logo-dobrodent.webp",
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
    images: ["logo-dobrodent.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: `${prefix}/logo_d_icon.png`,
    apple: `${prefix}/logo_d_icon.png`,
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
    <html lang="uk" className={`${inter.variable} ${montserrat.variable} ${cormorantGaramond.variable} h-full antialiased`}>
      <head>
        <link rel="preload" href={`${prefix}/dobrodent-main-banner-mobile.webp`} as="image" type="image/webp" media="(max-width: 640px)" fetchPriority="high" />
        <link rel="preload" href={`${prefix}/dobrodent-main-banner.webp`} as="image" type="image/webp" media="(min-width: 641px)" fetchPriority="high" />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <BookingModalProvider>
          <div className="flex flex-col min-h-screen w-full relative">
            <Header />
            <main className="flex-grow overflow-x-hidden relative w-full">{children}</main>
            <Footer />
          </div>
        </BookingModalProvider>
      </body>
    </html>
  );
}
