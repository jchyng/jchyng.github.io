import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  title: "정찬영 | 백엔드 개발자 포트폴리오",
  description:
    "사용자 경험을 고민하며 성장하는 백엔드 개발자 정찬영의 프로젝트 포트폴리오입니다.",
  openGraph: {
    title: "정찬영 | 백엔드 개발자 포트폴리오",
    description:
      "사용자 경험을 고민하며 성장하는 백엔드 개발자 정찬영의 프로젝트 포트폴리오입니다.",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark bg-black">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
