import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Le Feuch et-Colo",
  description: "Découvrez Le Feuch et-Colo, votre source d'actualités écologiques à Feucherolles, innovations vertes et débats sur l'environnement.",
  keywords: ["écologie", "environnement", "actualités écologiques", "énergie verte", "climat", "développement durable", "Feucherolles", "Yvelines", "Le Feuch et-Colo"],
  authors: [{ name: "Le Feuch et-Colo", url: "https://feuch-et-colo.lmcgroup.xyz" }],
  icons: ["/favicon.ico"],
  openGraph: {
    title: "Le Feuch et-Colo",
    description: "Le Feuch et-Colo propose des analyses, débats et informations sur l'écologie et le développement durable à Feucherolles.",
    url: "https://feuch-et-colo.lmcgroup.xyz",
    type: "website",
    images: [{ url: "/favicon.ico", width: 1200, height: 630, alt: "Le Feuch et-Colo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Le Feuch et-Colo",
    description: "Explorez les enjeux écologiques actuels avec Le Feuch et-Colo, votre journal dédié à l'environnement à Feucherolles.",
    images: ["https://feuch-et-colo.lmcgroup.xyz/favicon.ico"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="h-full w-full">
          <Navbar />
          <div className="z-10 h-full w-full pt-10 mb-auto overflow-hidden">
            {children}
          </div>

          <Footer />
        </main>
      </body>
    </html>
  );
}
