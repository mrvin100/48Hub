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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://48hub.com'),
  title: {
    default: "48hub - Plateforme Officielle des Alumni KFOKAM48",
    template: "%s | 48hub - Alumni KFOKAM48",
  },
  description:
    "Plateforme officielle de vérification et d'annuaire des diplômés de KFOKAM48, première école de développement informatique gratuite au Cameroun. Vérifiez l'authenticité des formations et explorez les projets des alumni.",
  keywords: [
    "KFOKAM48",
    "alumni KFOKAM48",
    "école développeur Cameroun",
    "formation développeur gratuite Afrique",
    "vérification matricule KFOKAM48",
    "PKFokam Institute of Excellence",
    "école 42 Cameroun",
    "peer learning Afrique",
    "formation informatique Yaoundé",
    "développeurs Cameroun",
    "alumni verification",
    "student registry KFOKAM48"
  ],
  creator: "KFOKAM48 - PKFokam Institute of Excellence",
  publisher: "KFOKAM48",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: ["en_US"],
    url: "/",
    title: "48hub - Plateforme Officielle des Alumni KFOKAM48",
    description: "Vérifiez l'authenticité des formations KFOKAM48 et découvrez le parcours des diplômés de la première école de développement gratuite au Cameroun.",
    siteName: "48hub - Alumni KFOKAM48",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "48hub - Plateforme Officielle des Alumni KFOKAM48",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "48hub - Plateforme Officielle des Alumni KFOKAM48",
    description: "Vérification officielle et annuaire des diplômés KFOKAM48 - Première école de développement gratuite au Cameroun.",
    images: ["/og-image.png"],
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
