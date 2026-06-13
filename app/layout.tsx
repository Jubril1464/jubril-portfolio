import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono, Monsieur_La_Doulaise } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-code",
  display: "swap",
});

const monsieurLaDoulaise = Monsieur_La_Doulaise({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mld",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jubril Lukman — Creative Frontend Engineer",
  description:
    "Creative Frontend Engineer crafting immersive, high-performance interfaces where motion, depth and detail make products feel alive.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} ${monsieurLaDoulaise.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
