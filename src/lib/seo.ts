import { Metadata } from 'next';

export const siteConfig = {
  name: 'Doeklus',
  description: 'Vind lokale klussers voor al je klussen. Snel, betrouwbaar en betaalbaar. Post je klus en ontvang aanbiedingen van professionals in jouw buurt.',
  url: 'https://doeklus.nl',
  ogImage: 'https://doeklus.nl/og-image.jpg',
  keywords: [
    'klusser',
    'klussen',
    'klusjesman',
    'vakman',
    'handyman',
    'klusjes',
    'klusbedrijf',
    'schilderen',
    'loodgieter',
    'elektricien',
    'timmerman',
    'tuinman',
    'verhuizen',
    'monteren',
    'Nederland',
    'lokale klusser',
    'betaalbare klusser'
  ]
};

export function generateMetadata({
  title,
  description,
  image,
  keywords = [],
  noIndex = false,
  canonical,
}: {
  title?: string;
  description?: string;
  image?: string;
  keywords?: string[];
  noIndex?: boolean;
  canonical?: string;
}): Metadata {
  const metaTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const metaDescription = description || siteConfig.description;
  const metaImage = image || siteConfig.ogImage;
  const metaUrl = canonical || siteConfig.url;

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: [...siteConfig.keywords, ...keywords].join(', '),
    authors: [{ name: 'Doeklus' }],
    creator: 'Doeklus',
    publisher: 'Doeklus',
    robots: noIndex ? 'noindex,nofollow' : 'index,follow',
    alternates: {
      canonical: metaUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'nl_NL',
      url: metaUrl,
      title: metaTitle,
      description: metaDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [metaImage],
      creator: '@doeklus',
    },
    other: {
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'black-translucent',
    },
  };
}

// Structured Data helpers
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Doeklus',
    url: 'https://doeklus.nl',
    logo: 'https://doeklus.nl/logo.png',
    description: siteConfig.description,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'NL',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'info@doeklus.nl',
    },
    sameAs: [
      'https://www.facebook.com/doeklus',
      'https://www.instagram.com/doeklus',
      'https://www.linkedin.com/company/doeklus',
    ],
  };
}

export function generateServiceSchema(service: {
  name: string;
  description: string;
  price?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: 'Doeklus',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Netherlands',
    },
    ...(service.price && {
      offers: {
        '@type': 'Offer',
        price: service.price,
        priceCurrency: 'EUR',
      },
    }),
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

