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
  title: "Le feuch et-colo",
  description: "Le journal d'écologie qui n'est pas tout le temps ecologique.",
  icons: [
    "/favicon.svg",
  ]
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
        <main className="h-full w-screen">
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
