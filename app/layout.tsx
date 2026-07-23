import type { Metadata, Viewport } from "next";
import { Rajdhani, Space_Mono } from "next/font/google";
import "./globals.css";

const display = Rajdhani({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const mono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "ARISE//FEST 2026 — Play. Build. Become.",
  description:
    "Bengaluru’s three-day convergence of esports, indie games, code, and digital culture. September 12–14, 2026.",
  keywords: ["esports", "gaming festival", "indie games", "Bengaluru", "ARISE FEST"],
  openGraph: {
    title: "ARISE//FEST 2026",
    description: "Four arenas. Three days. Enter the future.",
    type: "website",
    images: [{ url: "/og.png", width: 1733, height: 909, alt: "ARISE//FEST 2026 — Play. Build. Become." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ARISE//FEST 2026",
    description: "Four arenas. Three days. Enter the future.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#070812",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
