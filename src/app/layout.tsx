import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Dev Blog - Portfolio & Tech Insights",
  description: "개발자의 포트폴리오와 기술 블로그. 프로젝트 경험과 개발 인사이트를 공유합니다.",
  keywords: ["개발자", "포트폴리오", "블로그", "웹개발", "프론트엔드", "백엔드"],
  authors: [{ name: "Dev Blog" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#0284c7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased min-h-screen bg-neutral-50">
        <Header />
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
