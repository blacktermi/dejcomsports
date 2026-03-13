import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const SITE_URL = "https://djecomsport.ca";
const SITE_NAME = "Djecom Sports";
const SITE_DESCRIPTION =
  "Agence de marketing sportif à Québec, Canada. Création de contenus narratifs, gestion des réseaux sociaux et stratégie digitale pour clubs, organisations sportives et athlètes au Québec.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Djecom Sports | Agence de Marketing Sportif à Québec, Canada",
    template: "%s | Djecom Sports",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "marketing sportif",
    "agence marketing sport Québec",
    "gestion réseaux sociaux sport",
    "contenu sportif",
    "clubs sportifs Québec",
    "création contenu narratif sport",
    "vidéo sport",
    "storytelling sportif",
    "agence digitale sport Canada",
    "réseaux sociaux athlètes",
    "communication sport",
    "stratégie digitale sport",
    "Instagram sport",
    "TikTok sport",
    "Facebook sport",
    "marketing digital Québec",
    "photographe sport Québec",
    "vidéaste sport Québec",
    "RSEQ",
    "sport étudiant",
  ],
  authors: [{ name: "Djecom Sports", url: SITE_URL }],
  creator: "Djecom Sports",
  publisher: "Djecom Sports",
  formatDetection: {
    email: false,
    telephone: false,
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Djecom Sports | Agence de Marketing Sportif à Québec",
    description:
      "Du sport. Des histoires. De l'impact. Création de contenus narratifs, gestion des réseaux sociaux et stratégie digitale pour clubs et organisations sportives au Québec.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "fr_CA",
    type: "website",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Djecom Sports — Agence de Marketing Sportif à Québec, Canada",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Djecom Sports | Agence de Marketing Sportif à Québec",
    description:
      "Du sport. Des histoires. De l'impact. Création de contenus, gestion des réseaux sociaux et stratégie digitale pour clubs sportifs au Québec.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: "YOUR_GOOGLE_VERIFICATION_CODE",
  },
  category: "marketing",
};

export const viewport: Viewport = {
  themeColor: "#E8590C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Djecom Sports",
        legalName: "Djecom Sports Inc.",
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/images/logo.png`,
        },
        description: SITE_DESCRIPTION,
        foundingDate: "2023",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Québec",
          addressRegion: "QC",
          addressCountry: "CA",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+1-418-490-1053",
          email: "djecom97@gmail.com",
          contactType: "customer service",
          areaServed: "CA",
          availableLanguage: "French",
        },
        sameAs: [
          "https://www.facebook.com/profile.php?id=61559298282940",
          "https://www.instagram.com/djecomsports/",
        ],
        knowsAbout: [
          "Marketing sportif",
          "Gestion des réseaux sociaux",
          "Création de contenus narratifs",
          "Stratégie digitale",
          "Vidéo sportive",
          "Photographie sportive",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "fr-CA",
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: "Djecom Sports | Agence de Marketing Sportif à Québec, Canada",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        description: SITE_DESCRIPTION,
        inLanguage: "fr-CA",
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#service`,
        name: "Djecom Sports",
        image: `${SITE_URL}/images/logo.png`,
        url: SITE_URL,
        telephone: "+1-418-490-1053",
        email: "djecom97@gmail.com",
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Québec",
          addressRegion: "QC",
          addressCountry: "CA",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 46.8139,
          longitude: -71.2082,
        },
        areaServed: [
          {
            "@type": "Province",
            name: "Québec",
          },
          {
            "@type": "Country",
            name: "Canada",
          },
        ],
        serviceType: [
          "Marketing sportif",
          "Gestion des réseaux sociaux",
          "Création de contenus narratifs",
          "Stratégie de communication digitale",
          "Production vidéo sportive",
          "Photographie sportive",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Services de Marketing Sportif",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Création de Contenus Narratifs",
                description:
                  "Vidéos personnalisées, récits écrits, portraits d'athlètes et coulisses du quotidien des équipes sportives.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Stratégie de Communication Digitale",
                description:
                  "Analyse du secteur, audience cible et objectifs pour des stratégies digitales sur-mesure.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Gestion des Réseaux Sociaux",
                description:
                  "Gestion professionnelle des plateformes avec suivi constant et optimisation de la visibilité.",
              },
            },
          ],
        },
      },
    ],
  };

  return (
    <html lang="fr-CA" className={`${inter.variable} ${montserrat.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
