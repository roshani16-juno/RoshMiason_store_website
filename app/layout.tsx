import type { ReactNode } from "react";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "MAISON | Premium Clothing",
  description: "Timeless fashion, crafted for you.",
};

function GradientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.32),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.22),_transparent_30%)]"
    />
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-[#0f0c29] text-white antialiased">
        <StoreProvider>
          <GradientBackground />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}