import type React from "react"
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { CursorGlow } from "@/components/cursor-glow"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StructuredData } from "./structured-data"
import "./globals.css"

// Configure fonts with proper options
const geist = Geist({
  subsets: ["latin"],
  variable: '--font-geist',
  display: 'swap',
})
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: '--font-geist-mono',
  display: 'swap',
})
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://48hub.vercel.app'),
  title: {
    default: "48hub - Alumni Identity Network",
    template: "%s | 48hub",
  },
  description:
    "Official alumni verification and identity platform. Connected to KFOKAM48, the first free intensive developer training school in Cameroon based on peer-to-peer learning.",
  keywords: [
    "48hub",
    "alumni verification",
    "alumni identity network",
    "KFOKAM48",
    "developer training Cameroon",
    "peer learning Africa",
    "student verification",
    "matricule verification",
    "tech alumni platform",
    "developer portfolio Africa"
  ],
  creator: "48hub",
  publisher: "48hub",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["fr_FR"],
    url: "https://48hub.vercel.app",
    title: "48hub - Alumni Identity Network",
    description: "Official alumni verification and identity platform. Connected to KFOKAM48, the first free developer training school in Cameroon.",
    siteName: "48hub",
    images: [
      {
        url: "https://48hub.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "48hub - Alumni Identity Network",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "48hub - Alumni Identity Network",
    description: "Official alumni verification platform. Connected to KFOKAM48 - Developer training excellence in Cameroon.",
    images: ["https://48hub.vercel.app/og-image.png"],
    creator: "@48hub",
    site: "@48hub",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "LBZPSvVcWOuzadl2yzjdnfKY0u7GlVgML03aCZfwL24",
  },
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
 
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
 
  return (
    <html lang={locale} suppressHydrationWarning className={`${geist.variable} ${geistMono.variable} ${spaceGrotesk.variable}`}>
      <head>
        <StructuredData />
      </head>
      <body className="font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true} storageKey="theme-mode">
            <div className="relative min-h-screen overflow-hidden scanlines">
              <CursorGlow />
              <div className="relative z-10">
                <Header />
                {children}
                <Footer />
              </div>
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
