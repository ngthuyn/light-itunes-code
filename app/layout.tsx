import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin", "vietnamese"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Vết Thương - lighT",
  description: "Support lighT's new song",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${nunito.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}