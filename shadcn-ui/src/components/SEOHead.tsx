import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: object;
}

export default function SEOHead({
  title = "FiNNGUARD Capital - Your Trusted Finance Partner | Best Loan Services in Thrissur, Kerala",
  description = "FiNNGUARD Capital offers competitive home loans, car loans, personal loans, and business loans in Thrissur, Kerala. Quick approval, low interest rates starting from 8.5%. Apply now!",
  keywords = "loans Thrissur, home loan Kerala, car loan Thrissur, personal loan, business loan, loan against property, FiNNGUARD Capital, finance company Kerala, loan services Thrissur, EMI calculator",
  canonical = "https://www.finnguardcapital.com",
  ogImage = "/assets/herobanner.png",
  ogType = "website",
  structuredData
}: SEOHeadProps) {
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "FiNNGUARD Capital",
    "description": "Leading financial services company offering home loans, car loans, personal loans, and business loans in Thrissur, Kerala",
    "url": "https://www.finnguardcapital.com",
    "logo": "https://www.finnguardcapital.com/assets/logo.png",
    "image": "https://www.finnguardcapital.com/assets/herobanner.png",
    "telephone": "+91-94975-44143",
    "email": "support@finnguardcapital.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "17/557E, 2nd Floor, Jayamohan Building, Palappilly Road",
      "addressLocality": "Amballur",
      "addressRegion": "Kerala",
      "postalCode": "680302",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "10.5276",
      "longitude": "76.2144"
    },
    "openingHours": "Mo-Sa 09:00-19:00",
    "priceRange": "$$",
    "serviceArea": {
      "@type": "State",
      "name": "Kerala"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Loan Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Home Loan",
            "description": "Competitive home loans starting from 8.5% interest rate"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Car Loan",
            "description": "Quick car loan approval starting from 9.0% interest rate"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Personal Loan",
            "description": "Personal loans for all your needs starting from 11.5%"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Business Loan",
            "description": "Business loans to fuel your growth starting from 10.5%"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150"
    },
    "sameAs": [
      "https://www.facebook.com/finnguardcapital",
      "https://www.linkedin.com/company/finnguardcapital",
      "https://www.instagram.com/finnguardcapital"
    ]
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="author" content="FiNNGUARD Capital" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="FiNNGUARD Capital" />
      <meta property="og:locale" content="en_IN" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@finnguardcapital" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#1e293b" />
      <meta name="msapplication-TileColor" content="#1e293b" />
      <meta name="application-name" content="FiNNGUARD Capital" />
      
      {/* Local Business Meta Tags */}
      <meta name="geo.region" content="IN-KL" />
      <meta name="geo.placename" content="Thrissur" />
      <meta name="geo.position" content="10.5276;76.2144" />
      <meta name="ICBM" content="10.5276, 76.2144" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData || defaultStructuredData)}
      </script>
    </Helmet>
  );
}