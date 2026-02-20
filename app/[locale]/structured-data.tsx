export function StructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://48hub.vercel.app";
  
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "48hub",
    "alternateName": "48hub Alumni Network",
    "description": "Official alumni verification and identity platform. Connected to KFOKAM48, the first free intensive developer training school in Cameroon.",
    "url": baseUrl,
    "logo": `${baseUrl}/icon.svg`,
    "foundingDate": "2024",
    "sameAs": [
      "https://kfokam48.org"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Support",
      "email": "team48@gmail.com"
    }
  }

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "48hub - Alumni Identity Network",
    "alternateName": "48hub",
    "url": baseUrl,
    "description": "Official alumni verification and identity platform. Connected to KFOKAM48, the first free intensive developer training school in Cameroon.",
    "publisher": {
      "@type": "Organization",
      "name": "48hub"
    },
    "inLanguage": ["en-US", "fr-FR"]
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
    </>
  )
}
