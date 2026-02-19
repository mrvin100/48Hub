export function StructuredData() {
  const educationalOrganization = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "KFOKAM48",
    "alternateName": "K48",
    "description": "Première école de développement informatique gratuite au Cameroun, basée sur le modèle peer-to-peer learning inspiré de l'École 42.",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://48hub.com",
    "logo": `${process.env.NEXT_PUBLIC_SITE_URL || "https://48hub.com"}/icon.svg`,
    "foundingDate": "2024",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Yaoundé",
      "addressCountry": "CM"
    },
    "parentOrganization": {
      "@type": "Organization",
      "name": "PKFokam Institute of Excellence",
      "url": "https://www.pkfokamonline.org"
    },
    "educationalCredentialAwarded": "Formation en Développement Informatique",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Formation KFOKAM48",
      "itemListElement": [
        {
          "@type": "Course",
          "name": "Formation Intensive en Développement Informatique",
          "description": "Programme de formation gratuit en développement informatique basé sur le peer-to-peer learning",
          "provider": {
            "@type": "EducationalOrganization",
            "name": "KFOKAM48"
          },
          "hasCourseInstance": {
            "@type": "CourseInstance",
            "courseMode": "onsite",
            "courseSchedule": {
              "@type": "Schedule",
              "repeatFrequency": "Daily",
              "byDay": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
            }
          },
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "XAF",
            "availability": "https://schema.org/InStock",
            "description": "Formation 100% gratuite"
          },
          "timeRequired": "P18M",
          "educationalLevel": "Sans prérequis académique"
        }
      ]
    }
  }

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "48hub - Plateforme Officielle des Alumni KFOKAM48",
    "alternateName": "48hub",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://48hub.com",
    "description": "Plateforme officielle de vérification et d'annuaire des diplômés de KFOKAM48, première école de développement informatique gratuite au Cameroun.",
    "publisher": {
      "@type": "EducationalOrganization",
      "name": "KFOKAM48"
    },
    "inLanguage": ["fr-FR", "en-US"],
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${process.env.NEXT_PUBLIC_SITE_URL || "https://48hub.com"}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalOrganization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  )
}
