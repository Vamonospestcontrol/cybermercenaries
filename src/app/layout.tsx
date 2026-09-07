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

// EDIT ME: swap in the real production domain once it's chosen/purchased.
const SITE_URL = "https://cybermercenaries.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "CyberMercenaries — Web, Full-Stack & Security, Agartala",
    template: "%s — CyberMercenaries",
  },
  description:
    "A two-person studio building websites, full-stack apps and infrastructure — and stress-testing them like attackers would. Based in Agartala, Tripura.",
  openGraph: {
    title: "CyberMercenaries",
    description:
      "Web design, full-stack development, cybersecurity consultancy and penetration testing from Agartala, Tripura.",
    url: SITE_URL,
    siteName: "CyberMercenaries",
    locale: "en_IN",
    type: "website",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased bg-void text-ink font-sans">
        {children}
      </body>
    </html>
  );
}
