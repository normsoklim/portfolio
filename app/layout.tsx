import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://normsoklim.dev"),
  title: {
    default: "Norm Soklim | Full-Stack Developer",
    template: "%s | Norm Soklim",
  },
  description:
    "Full-Stack Developer building modern web applications and scalable backend systems with clean, maintainable code. MIS student at SETEC Institute.",
  authors: [{ name: "Norm Soklim" }],
  creator: "Norm Soklim",
  publisher: "Norm Soklim",
  robots: "index, follow",
  openGraph: {
    title: "Norm Soklim | Full-Stack Developer",
    description:
      "Full-Stack Developer building modern web applications and scalable backend systems.",
    type: "website",
    locale: "en_US",
    siteName: "Norm Soklim Portfolio",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Norm Soklim Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Norm Soklim | Full-Stack Developer",
    description:
      "Full-Stack Developer building modern web applications and scalable backend systems.",
    creator: "@normsoklim",
    images: ["/images/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
