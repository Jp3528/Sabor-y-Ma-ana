import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "SABOR & MAÑANA | Desayunos y almuerzos en Lima",
  description:
    "Desayunos frescos, brunch y almuerzos preparados al momento en un ambiente cálido y moderno.",
  openGraph: {
    title: "SABOR & MAÑANA | Empieza bien tu día",
    description: "Desayunos, brunch y almuerzos preparados al momento en Lima.",
    type: "website",
    locale: "es_PE",
    images: [{ url: "/og.png", width: 1733, height: 907, alt: "SABOR & MAÑANA — Desayunos, brunch y almuerzos" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SABOR & MAÑANA | Empieza bien tu día",
    description: "Desayunos, brunch y almuerzos preparados al momento en Lima.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
