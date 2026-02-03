import Navigation from "@/components/Navigation";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Md. Riyad Khan - Web Developer",
  description:
    "Creating intuitive, user-focused digital experiences. Web developer with a background in computer science.",
  keywords: [
    "web developer",
    "UX designer",
    "UI designer",
    "portfolio",
    "design",
  ],
  authors: [{ name: "Md. Riyad Khan" }],
  openGraph: {
    title: "Md. Riyad Khan - Web Developer",
    description: "Creating intuitive, user-focused digital experiences",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Md. Riyad Khan - Web Developer",
    description: "Creating intuitive, user-focused digital experiences",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <Navigation />
        {children}
      </body>
    </html>
  );
}
