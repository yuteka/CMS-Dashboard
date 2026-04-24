import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "../globals.css";
import { getContent } from "@/lib/content";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const content = await getContent();
  const lang = params.lang as keyof typeof content.home.hero.title;
  
  return {
    title: content.home.hero.title[lang] || "Modern Website",
    description: content.home.hero.subtitle[lang] || "Production ready Next.js app",
  };
}

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  return (
    <html lang={params.lang}>
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
