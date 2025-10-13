"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import { generateBreadcrumbSchema, generateServiceSchema } from "@/lib/seo";
import { services as allServices, getCategories, getServicesByCategory } from "@/lib/services";

function ServicesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q")?.toLowerCase() || "";
  const postcode = searchParams.get("postcode") || "";
  const categoryParam = searchParams.get("category") || "";

  const [filteredServices, setFilteredServices] = useState(allServices);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [showCustomService, setShowCustomService] = useState(false);

  useEffect(() => {
    let results = allServices;

    // Filter by category first
    if (selectedCategory) {
      results = getServicesByCategory(selectedCategory);
    }

    // Then apply search filter
    if (searchQuery) {
      results = results
        .map(service => {
          const name = service.name.toLowerCase();
          const description = service.description.toLowerCase();
          const keywords = service.keywords?.map(k => k.toLowerCase()) || [];
          const category = service.category?.toLowerCase() || "";
          
          let score = 0;
          
          // Exact match (highest priority)
          if (name === searchQuery) score = 100;
          // Starts with query
          else if (name.startsWith(searchQuery)) score = 80;
          // Contains query in name
          else if (name.includes(searchQuery)) score = 60;
          // Contains in description
          else if (description.includes(searchQuery)) score = 40;
          // Category match
          else if (category.includes(searchQuery)) score = 35;
          // Keyword match
          else if (keywords.some(k => k.includes(searchQuery))) score = 30;
          
          return { ...service, score };
        })
        .filter(s => s.score > 0)
        .sort((a, b) => b.score - a.score);

      // If no exact match, show custom service option
      if (results.length === 0 || results[0].score < 100) {
        setShowCustomService(true);
      }
    } else {
      setShowCustomService(false);
    }

    setFilteredServices(results);
  }, [searchQuery, selectedCategory]);

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
              {searchQuery ? `Zoekresultaten voor "${searchQuery}"` : selectedCategory || 'Alle diensten'}
            </h1>
            {postcode && (
              <p className="text-xl text-gray-600 mb-8">In postcode: {postcode}</p>
            )}

            {/* Category Filter */}
            {!searchQuery && (
              <div className="mb-8 flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedCategory("")}
                  className={`px-4 py-2 rounded-full font-semibold transition-all ${
                    !selectedCategory 
                      ? 'bg-black text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Alle ({allServices.length})
                </button>
                {getCategories().map(cat => {
                  const count = getServicesByCategory(cat).length;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-full font-semibold transition-all ${
                        selectedCategory === cat
                          ? 'bg-black text-white' 
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {cat} ({count})
                    </button>
                  );
                })}
              </div>
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

            {filteredServices.length === 0 && !showCustomService && (
              <div className="text-center py-20">
                <p className="text-2xl text-gray-500">Geen diensten gevonden</p>
                <button
                  onClick={() => setSelectedCategory("")}
                  className="mt-4 text-[#ff4d00] hover:underline"
                >
                  Toon alle diensten
                </button>
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

// Services imported from centralized lib/services.ts
