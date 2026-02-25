export function StructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://48hub.vercel.app";
  
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "48hub",
    "alternateName": ["48hub Alumni Network", "KFOKAM48 Alumni Platform"],
    "description": "Official alumni verification platform for KFOKAM48 graduates. Search and discover verified student profiles, check matricule authenticity, explore tech projects, and access the student portal. Connected to PKFokam Institute of Excellence.",
    "url": baseUrl,
    "logo": `${baseUrl}/icon.svg`,
    "foundingDate": "2024",
    "sameAs": [
      "https://kfokam48.org",
      "https://github.com/mrvin100/48Hub"
    ],
    "parentOrganization": {
      "@type": "Organization",
      "name": "PKFokam Institute of Excellence",
      "url": "https://pkfinstitute.com/"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Yaounde",
      "addressRegion": "Emana",
      "streetAddress": "Tradex Emana",
      "addressCountry": "CM"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Support",
      "email": "mailtoteam48@gmail.com",
      "areaServed": "CM",
      "availableLanguage": ["English", "French"]
    }
  }

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "48hub - Alumni Identity Network",
    "alternateName": "48hub",
    "url": baseUrl,
    "description": "Official alumni verification platform for KFOKAM48 graduates. Search and discover verified student profiles, check matricule authenticity, explore tech projects. Sign in to your 48hub student portal.",
    "publisher": {
      "@type": "Organization",
      "name": "48hub"
    },
    "inLanguage": ["en-US", "fr-FR"],
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  }
  
  const educationalOrganization = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "KFOKAM48",
    "alternateName": "K48",
    "description": "First free intensive developer training school in Cameroon based on peer-to-peer learning. Inspired by École 42.",
    "url": "https://kfokam48.org",
    "parentOrganization": {
      "@type": "Organization",
      "name": "PKFokam Institute of Excellence",
      "url": "https://pkfinstitute.com/"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Yaounde",
      "addressCountry": "CM"
    },
    "courseMode": "full-time",
    "educationalCredentialAwarded": "Developer Certificate"
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalOrganization) }}
      />
    </>
  )
}
