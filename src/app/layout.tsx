import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext"; // <-- Import

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Phần mềm Kapsersky Chính hãng siêu khuyến mãi",
  description: "Mua phần mềm Kaspersky chính hãng giá rẻ, khuyến mãi hấp dẫn, bảo vệ an ninh mạng tối ưu cho cá nhân và doanh nghiệp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <CartProvider> {/* <-- Wrap children */}
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
