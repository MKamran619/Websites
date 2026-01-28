// Local Business Schema Generator for Different Regions
// Use this to generate schema.org structured data for different US regions

export const localBusinessSchemas = {
  // Nationwide
  nationwide: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Software Solutions",
    image: "https://websiteservice619.netlify.app/assets/logo.png",
    description:
      "Digital transformation and custom software development solutions for American businesses",
    url: "https://websiteservice619.netlify.app",
    telephone: "+1-234-567-8900",
    email: "mksawan619@gmail.com",
    areaServed: {
      "@type": "Country",
      name: "US",
    },
    priceRange: "$$$$",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      telephone: "+1-234-567-8900",
      email: "mksawan619@gmail.com",
      areaServed: "US",
      availableLanguage: ["en"],
    },
    sameAs: [
      "https://www.linkedin.com/in/kamran619/",
      "https://github.com/MKamran619",
      "https://twitter.com/kamransawan",
      "https://www.facebook.com/your-profile",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.9,
      reviewCount: 50,
      bestRating: "5",
      worstRating: "1",
    },
  },

  // Tech hubs
  silicon_valley: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Software Solutions - Silicon Valley",
    address: {
      "@type": "PostalAddress",
      addressLocality: "San Francisco",
      addressRegion: "CA",
      postalCode: "94000",
      addressCountry: "US",
    },
    url: "https://websiteservice619.netlify.app",
    telephone: "+1-234-567-8900",
    areaServed: ["CA", "Bay Area"],
    description:
      "Custom software development and digital transformation for Silicon Valley tech companies",
  },

  new_york: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Software Solutions - New York",
    address: {
      "@type": "PostalAddress",
      addressLocality: "New York",
      addressRegion: "NY",
      postalCode: "10000",
      addressCountry: "US",
    },
    url: "https://websiteservice619.netlify.app",
    telephone: "+1-234-567-8900",
    areaServed: ["NY", "NYC Metro"],
    description:
      "Enterprise software development and consulting for NYC businesses",
  },

  texas: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Software Solutions - Texas",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Austin",
      addressRegion: "TX",
      postalCode: "78700",
      addressCountry: "US",
    },
    url: "https://websiteservice619.netlify.app",
    telephone: "+1-234-567-8900",
    areaServed: ["TX", "Austin", "Houston", "Dallas"],
    description:
      "Software solutions and digital transformation for Texas enterprises",
  },

  // Verticals
  healthcare: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Software Solutions - Healthcare Tech",
    description:
      "Specializing in HIPAA-compliant software solutions for healthcare providers and institutions",
    url: "https://websiteservice619.netlify.app",
    areaServed: "US",
    knowsAbout: [
      "HIPAA Compliance",
      "Healthcare Applications",
      "Electronic Health Records (EHR)",
      "Patient Data Security",
      "Medical Device Integration",
    ],
    serviceType: "Healthcare Software Development",
  },

  fintech: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Software Solutions - FinTech",
    description:
      "Custom fintech solutions and digital banking platform development",
    url: "https://websiteservice619.netlify.app",
    areaServed: "US",
    knowsAbout: [
      "Payment Processing",
      "Financial Compliance",
      "Blockchain",
      "API Integration",
      "Regulatory Compliance",
    ],
    serviceType: "Financial Technology Development",
  },

  ecommerce: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Software Solutions - E-Commerce",
    description:
      "E-commerce platform development and optimization for online retailers",
    url: "https://websiteservice619.netlify.app",
    areaServed: "US",
    knowsAbout: [
      "E-commerce Platforms",
      "Payment Gateway Integration",
      "Inventory Management",
      "Conversion Rate Optimization",
      "Scalable Infrastructure",
    ],
    serviceType: "E-Commerce Development",
  },

  manufacturing: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Software Solutions - Manufacturing",
    description:
      "Enterprise software solutions for manufacturing and industrial operations",
    url: "https://websiteservice619.netlify.app",
    areaServed: "US",
    knowsAbout: [
      "ERP Systems",
      "Supply Chain Optimization",
      "IoT Integration",
      "Production Management",
      "Quality Assurance Systems",
    ],
    serviceType: "Manufacturing Software Development",
  },
};

// Function to generate schema for specific region/vertical
export function getLocalBusinessSchema(region?: string, vertical?: string) {
  let schema = localBusinessSchemas.nationwide;

  if (vertical && localBusinessSchemas[vertical]) {
    schema = { ...schema, ...localBusinessSchemas[vertical] };
  }

  if (region && localBusinessSchemas[region]) {
    schema = { ...schema, ...localBusinessSchemas[region] };
  }

  return schema;
}

// Service provider schemas for different service types
export const serviceProviderSchemas = {
  digital_transformation: {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Digital Transformation Services",
    serviceType: "Digital Transformation",
    provider: {
      "@type": "Person",
      name: "Kamran Sohail",
    },
    areaServed: "US",
    description:
      "Helping American businesses modernize legacy systems and adopt cloud-native architectures",
    url: "https://websiteservice619.netlify.app/services",
    priceRange: "$$$$",
    knowsAbout: [
      "System Architecture",
      "Legacy Modernization",
      "Cloud Migration",
      "Microservices",
      "DevOps",
    ],
  },

  custom_development: {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Custom Software Development",
    serviceType: "Software Development",
    provider: {
      "@type": "Person",
      name: "Kamran Sohail",
    },
    areaServed: "US",
    description:
      "Full-stack enterprise application development tailored to your business needs",
    url: "https://websiteservice619.netlify.app/services",
    priceRange: "$$$$",
    knowsAbout: [
      "Full-Stack Development",
      "Backend Architecture",
      "Frontend Development",
      "Database Design",
      "API Development",
    ],
  },

  cloud_migration: {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Cloud Migration Services",
    serviceType: "Cloud Migration",
    provider: {
      "@type": "Person",
      name: "Kamran Sohail",
    },
    areaServed: "US",
    description:
      "Strategic cloud migration planning and execution for maximum efficiency",
    url: "https://websiteservice619.netlify.app/services",
    priceRange: "$$$$",
    knowsAbout: [
      "AWS Migration",
      "Azure Migration",
      "Google Cloud",
      "Infrastructure Planning",
      "Cost Optimization",
    ],
  },

  technical_consulting: {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Technical Consulting",
    serviceType: "Technical Consulting",
    provider: {
      "@type": "Person",
      name: "Kamran Sohail",
      jobTitle: "Senior Software Engineer & Technical Consultant",
    },
    areaServed: "US",
    description:
      "Expert technical guidance for software architecture and technology strategy",
    url: "https://websiteservice619.netlify.app/services",
    priceRange: "$$$$",
  },
};

// Breadcrumb schema for navigation hierarchy
export function getBreadcrumbSchema(
  breadcrumbs: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// Event schema for webinars, workshops, consultations
export function getEventSchema(event: {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  eventType: string;
  location?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate,
    eventType: event.eventType,
    eventAttendanceMode: "OnlineEventAttendanceMode",
    image:
      event.image ||
      "https://websiteservice619.netlify.app/assets/og-image.jpg",
    location: event.location || "Online",
    organizer: {
      "@type": "Organization",
      name: "Software Solutions",
      url: "https://websiteservice619.netlify.app",
    },
    offers: {
      "@type": "Offer",
      url: "https://websiteservice619.netlify.app/contact",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };
}

// Review/testimonial schema
export function getReviewSchema(review: {
  author: string;
  rating: number;
  description: string;
  date: string;
  reviewedService: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.rating,
      bestRating: "5",
      worstRating: "1",
    },
    reviewBody: review.description,
    author: {
      "@type": "Person",
      name: review.author,
    },
    datePublished: review.date,
    itemReviewed: {
      "@type": "LocalBusiness",
      name: review.reviewedService || "Software Solutions",
    },
  };
}
