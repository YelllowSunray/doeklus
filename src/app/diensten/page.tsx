"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import { generateBreadcrumbSchema, generateServiceSchema } from "@/lib/seo";

function ServicesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q")?.toLowerCase() || "";
  const postcode = searchParams.get("postcode") || "";

  const [filteredServices, setFilteredServices] = useState(services);
  const [showCustomService, setShowCustomService] = useState(false);

  useEffect(() => {
    if (searchQuery) {
      // Smart search ranking
      const results = services
        .map(service => {
          const name = service.name.toLowerCase();
          const description = service.description.toLowerCase();
          const keywords = service.keywords?.map(k => k.toLowerCase()) || [];
          
          let score = 0;
          
          // Exact match (highest priority)
          if (name === searchQuery) score = 100;
          // Starts with query
          else if (name.startsWith(searchQuery)) score = 80;
          // Contains query in name
          else if (name.includes(searchQuery)) score = 60;
          // Contains in description
          else if (description.includes(searchQuery)) score = 40;
          // Keyword match
          else if (keywords.some(k => k.includes(searchQuery))) score = 30;
          
          return { ...service, score };
        })
        .filter(s => s.score > 0)
        .sort((a, b) => b.score - a.score);

      setFilteredServices(results);
      
      // If no exact match, show custom service option
      if (results.length === 0 || results[0].score < 100) {
        setShowCustomService(true);
      }
    } else {
      setFilteredServices(services);
      setShowCustomService(false);
    }
  }, [searchQuery]);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://doeklus.nl' },
    { name: 'Diensten', url: 'https://doeklus.nl/diensten' }
  ]);

  const servicesSchema = filteredServices.slice(0, 8).map(service => 
    generateServiceSchema({
      name: service.name,
      description: service.description,
      price: `€${service.priceFrom}`
    })
  );

  return (
    <>
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Header />
        
        <main className="pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl font-black mb-4">
              {searchQuery ? `Zoekresultaten voor "${searchQuery}"` : 'Alle diensten'}
            </h1>
            {postcode && (
              <p className="text-xl text-gray-600 mb-8">In postcode: {postcode}</p>
            )}

            {showCustomService && (
              <div className="bg-yellow-50 border-2 border-yellow-400 rounded-2xl p-6 mb-8">
                <h3 className="text-xl font-bold mb-2">Geen exacte match gevonden?</h3>
                <p className="text-gray-600 mb-4">Geen probleem! Plaats je aangepaste klus en ontvang aanbiedingen van klussers.</p>
                <Link
                  href={`/klus-plaatsen?dienst=${encodeURIComponent(searchQuery)}`}
                  className="inline-block bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors"
                >
                  Plaats aangepaste klus
                </Link>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/klus-plaatsen?dienst=${service.slug}`}
                  className="group bg-white rounded-2xl p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[#ff4d00] transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">€{service.priceFrom}</span>
                    <span className="text-sm text-gray-500">vanaf p/u</span>
                  </div>
                </Link>
              ))}
            </div>

            {filteredServices.length === 0 && (
              <div className="text-center py-20">
                <p className="text-2xl text-gray-500">Geen diensten gevonden</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Header />
        <main className="pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-20">
              <p className="text-2xl text-gray-500">Laden...</p>
            </div>
          </div>
        </main>
      </div>
    }>
      <ServicesContent />
    </Suspense>
  );
}

const services = [
  {
    slug: "meubelmontage",
    name: "Meubelmontage",
    icon: "🪛",
    description: "IKEA, kasten, bedden en meer",
    priceFrom: 25,
    keywords: ["ikea", "meubel", "monteren", "opbouwen", "kast", "bed"]
  },
  {
    slug: "schilderen",
    name: "Schilderen",
    icon: "🎨",
    description: "Binnen & buiten schilderwerk",
    priceFrom: 30,
    keywords: ["verf", "muur", "plafond", "schilder", "binnen", "buiten"]
  },
  {
    slug: "verhuizen",
    name: "Verhuizen",
    icon: "📦",
    description: "Sjouwen & transporteren",
    priceFrom: 28,
    keywords: ["verhuizing", "sjouwen", "tillen", "transport", "dozen"]
  },
  {
    slug: "tuinonderhoud",
    name: "Tuinonderhoud",
    icon: "🌱",
    description: "Maaien, snoeien en onderhoud",
    priceFrom: 25,
    keywords: ["tuin", "gras", "maaien", "snoeien", "heg", "gazon"]
  },
  {
    slug: "schoonmaken",
    name: "Schoonmaken",
    icon: "🧹",
    description: "Huis, kantoor en na verbouwing",
    priceFrom: 22,
    keywords: ["schoon", "poetsen", "opruimen", "kantoor", "huis", "verbouwing"]
  },
  {
    slug: "klusjesman",
    name: "Algemene Klussen",
    icon: "🔧",
    description: "Alles wat kapot is repareren",
    priceFrom: 28,
    keywords: ["repareren", "maken", "fixen", "handyman", "allround"]
  },
  {
    slug: "elektrisch",
    name: "Elektricien",
    icon: "💡",
    description: "Lampen, stopcontacten en meer",
    priceFrom: 35,
    keywords: ["elektra", "lamp", "stopcontact", "schakelaar", "verlichting"]
  },
  {
    slug: "loodgieter",
    name: "Loodgieter",
    icon: "🚰",
    description: "Lekken, kranen en sanitair",
    priceFrom: 40,
    keywords: ["lek", "kraan", "toilet", "douche", "cv", "sanitair"]
  },
  {
    slug: "tuinieren",
    name: "Tuinieren",
    icon: "🌻",
    description: "Aanleg en onderhoud",
    priceFrom: 26,
    keywords: ["aanleg", "beplanting", "borders", "planten"]
  },
  {
    slug: "behangen",
    name: "Behangen",
    icon: "📐",
    description: "Behang plakken en verwijderen",
    priceFrom: 28,
    keywords: ["behang", "plakken", "stomen", "verwijderen", "muur"]
  },
  {
    slug: "kozijnen",
    name: "Kozijnen",
    icon: "🪟",
    description: "Reparatie en schilderen",
    priceFrom: 35,
    keywords: ["raam", "deur", "kozijn", "schilderen", "repareren"]
  },
  {
    slug: "slotenmaker",
    name: "Slotenmaker",
    icon: "🔐",
    description: "Slot vervangen of repareren",
    priceFrom: 45,
    keywords: ["slot", "deur", "cilinder", "sleutel", "inbraak"]
  }
];
