import { Inter } from "next/font/google";
import type { Metadata } from "next";

import ContextsProvider from "@/contexts";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vidhi7 AI",
  description: "Your AI companion for instant legal insights and assistance.",
  icons: "/logo.svg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <ContextsProvider>{children}</ContextsProvider>
      </body>
    </html>
  );
}
