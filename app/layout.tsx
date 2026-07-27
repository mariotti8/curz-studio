import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TRIADE_PRICE } from "./lib/product";
import { LanguageProvider } from "./components/LanguageProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Triade — Lampada da parete | Curz Studio",
    template: "%s | Curz Studio",
  },
  description: "Triade è la lampada da parete scultorea in acciaio firmata Curz Studio. Tre corpi luminosi, un unico gesto verticale.",
  openGraph: {
    title: "Triade — La luce diventa materia.",
    description: "Scopri la lampada da parete scultorea in acciaio firmata Curz Studio.",
    images: ["/images/triade-hero-cinematic.png"],
    type: "website",
  },
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: "Triade",
              brand: { "@type": "Brand", name: "Curz Studio" },
              description: "Lampada da parete scultorea composta da tre riflettori concavi in acciaio e cavo tessile personalizzabile.",
              material: "Acciaio",
              image: ["/images/triade-hero-cinematic.png", "/images/triade-catalog-off-v3.png"],
              offers: {
                "@type": "Offer",
                priceCurrency: "EUR",
                price: String(TRIADE_PRICE),
                availability: "https://schema.org/PreOrder",
                url: "/product",
              },
            }).replace(/</g, "\\u003c"),
          }}
        />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
