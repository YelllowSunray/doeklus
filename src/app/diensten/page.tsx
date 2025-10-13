"use client";

import Link from "next/link";
import Header from "@/components/Header";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ServicesPage() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [postcode, setPostcode] = useState(searchParams.get('postcode') || '');
  const [filteredServices, setFilteredServices] = useState<any[]>([]);

  // Update search when params change
  useEffect(() => {
    setSearchQuery(searchParams.get('q') || '');
    setPostcode(searchParams.get('postcode') || '');
  }, [searchParams]);

  // Smart filter services based on search with relevance ranking
  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const allServices = serviceCategories.flatMap(cat => cat.services);
      
      // Score each service based on relevance
      const scoredServices = allServices.map(service => {
        let score = 0;
        const name = service.name.toLowerCase();
        const desc = service.description.toLowerCase();
        
        // Exact match in name (highest priority)
        if (name === query) score += 100;
        // Name starts with query
        else if (name.startsWith(query)) score += 50;
        // Name contains query
        else if (name.includes(query)) score += 25;
        
        // Description contains query
        if (desc.includes(query)) score += 10;
        
        // Keyword matching (split query into words)
        const queryWords = query.split(' ').filter(w => w.length > 2);
        queryWords.forEach(word => {
          if (name.includes(word)) score += 5;
          if (desc.includes(word)) score += 2;
        });
        
        return { ...service, score };
      });
      
      // Filter and sort by relevance
      const filtered = scoredServices
        .filter(s => s.score > 0)
        .sort((a, b) => b.score - a.score);
      
      setFilteredServices(filtered);
    } else {
      setFilteredServices([]);
    }
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Hero */}
      <section className="bg-white py-16 pt-24 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            {searchQuery ? `Resultaten voor "${searchQuery}"` : 'Alle diensten'}
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            {postcode ? `In de buurt van ${postcode}` : 'Van kleine klusjes tot grote projecten. Onze klussers staan voor je klaar.'}
          </p>
          
          {/* Search */}
          <div className="max-w-2xl">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Zoek een dienst..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4d00] focus:border-transparent"
            />
          </div>
        </div>
      </section>

      {/* Search Results or All Categories */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {searchQuery && filteredServices.length > 0 ? (
            <>
              <h2 className="text-2xl font-bold mb-6">{filteredServices.length} resultaten gevonden</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                {filteredServices.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/diensten/${service.slug}`}
                    className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-200"
                  >
                    <div className="text-4xl mb-3">{service.icon}</div>
                    <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                    <div className="text-sm font-medium text-primary">
                      Vanaf €{service.priceFrom}/uur
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : searchQuery && filteredServices.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">🔍</div>
              <h2 className="text-3xl font-bold mb-4">Geen exacte match gevonden</h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                We hebben geen dienst die precies overeenkomt met "{searchQuery}". 
                Maar je kunt altijd een aangepaste klus plaatsen!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href={`/klus-plaatsen?dienst=${encodeURIComponent(searchQuery)}`}
                  className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-dark transition-colors"
                >
                  Plaats aangepaste klus: "{searchQuery}"
                </Link>
                <button
                  onClick={() => setSearchQuery('')}
                  className="border-2 border-gray-300 text-gray-700 hover:border-primary hover:text-primary px-8 py-4 rounded-xl font-bold transition-colors"
                >
                  Bekijk alle diensten
                </button>
              </div>
            </div>
          ) : (
            <>
              {serviceCategories.map((category) => (
                <div key={category.name} className="mb-12">
                  <h2 className="text-2xl font-bold mb-6">{category.name}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {category.services.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/diensten/${service.slug}`}
                        className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-200"
                      >
                        <div className="text-4xl mb-3">{service.icon}</div>
                        <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                        <div className="text-sm font-medium text-primary">
                          Vanaf €{service.priceFrom}/uur
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </section>
    </div>
  );
}

const serviceCategories = [
  {
    name: "Huis & Interieur",
    services: [
      {
        slug: "meubelmontage",
        name: "Meubelmontage",
        icon: "🪛",
        description: "IKEA, Leen Bakker of andere meubels monteren",
        priceFrom: 25
      },
      {
        slug: "schilderen",
        name: "Schilderen",
        icon: "🎨",
        description: "Binnen- of buitenschilderwerk, behangen",
        priceFrom: 30
      },
      {
        slug: "schoonmaken",
        name: "Schoonmaken",
        icon: "🧹",
        description: "Huis of kantoor schoonmaken",
        priceFrom: 22
      },
      {
        slug: "opruimen",
        name: "Opruimen & Organiseren",
        icon: "📋",
        description: "Kasten, zolder of garage opruimen",
        priceFrom: 20
      },
      {
        slug: "gordijnen-ophangen",
        name: "Gordijnen ophangen",
        icon: "🪟",
        description: "Gordijnrails monteren en gordijnen ophangen",
        priceFrom: 25
      },
      {
        slug: "kunst-ophangen",
        name: "Kunst ophangen",
        icon: "🖼️",
        description: "Schilderijen, foto's en spiegels ophangen",
        priceFrom: 20
      }
    ]
  },
  {
    name: "Klussen & Reparaties",
    services: [
      {
        slug: "klusjesman",
        name: "Algemene klussen",
        icon: "🔧",
        description: "Kleine reparaties en onderhoud",
        priceFrom: 28
      },
      {
        slug: "elektrische-klussen",
        name: "Elektrische klussen",
        icon: "💡",
        description: "Lampen, stopcontacten, schakelaars",
        priceFrom: 35
      },
      {
        slug: "loodgieter",
        name: "Loodgieterswerk",
        icon: "🚰",
        description: "Lekken, kranen, wc's en afvoeren",
        priceFrom: 40
      },
      {
        slug: "tegelen",
        name: "Tegelen",
        icon: "⬜",
        description: "Badkamer, keuken of vloer betegelen",
        priceFrom: 35
      },
      {
        slug: "houtbewerking",
        name: "Houtbewerking",
        icon: "🪵",
        description: "Kasten, planken of meubels op maat",
        priceFrom: 30
      },
      {
        slug: "deur-raam-reparatie",
        name: "Deur & Raam reparatie",
        icon: "🚪",
        description: "Hang- en sluitwerk repareren",
        priceFrom: 32
      }
    ]
  },
  {
    name: "Tuin & Buitenruimte",
    services: [
      {
        slug: "tuinonderhoud",
        name: "Tuinonderhoud",
        icon: "🌱",
        description: "Maaien, snoeien en onkruid wieden",
        priceFrom: 25
      },
      {
        slug: "tuinaanleg",
        name: "Tuinaanleg",
        icon: "🌳",
        description: "Nieuwe tuin aanleggen of renoveren",
        priceFrom: 30
      },
      {
        slug: "bestrating",
        name: "Bestrating",
        icon: "🧱",
        description: "Oprit, terras of pad aanleggen",
        priceFrom: 35
      },
      {
        slug: "schutting-plaatsen",
        name: "Schutting plaatsen",
        icon: "🏗️",
        description: "Schutting of hekwerk plaatsen",
        priceFrom: 32
      },
      {
        slug: "gras-zaaien",
        name: "Gras zaaien",
        icon: "🌾",
        description: "Nieuw gazon aanleggen of herstellen",
        priceFrom: 28
      },
      {
        slug: "boom-snoeien",
        name: "Boom snoeien",
        icon: "✂️",
        description: "Bomen snoeien of verwijderen",
        priceFrom: 35
      }
    ]
  },
  {
    name: "Verhuizen & Transport",
    services: [
      {
        slug: "verhuizen",
        name: "Verhuizen",
        icon: "📦",
        description: "Sjouwen, inpakken en transporteren",
        priceFrom: 28
      },
      {
        slug: "meubel-transport",
        name: "Meubeltransport",
        icon: "🚚",
        description: "Grote of zware meubels verplaatsen",
        priceFrom: 30
      },
      {
        slug: "inpakken",
        name: "Inpakken",
        icon: "📦",
        description: "Spullen professioneel inpakken",
        priceFrom: 22
      },
      {
        slug: "uitpakken",
        name: "Uitpakken",
        icon: "📂",
        description: "Dozen uitpakken en inrichten",
        priceFrom: 22
      },
      {
        slug: "zolder-opruimen",
        name: "Zolder/Kelder legen",
        icon: "🗑️",
        description: "Spullen wegbrengen of opslaan",
        priceFrom: 25
      }
    ]
  },
  {
    name: "Events & Speciale gelegenheden",
    services: [
      {
        slug: "evenementen-hulp",
        name: "Evenementen hulp",
        icon: "🎉",
        description: "Helpen bij opbouw en afbouw",
        priceFrom: 25
      },
      {
        slug: "feest-catering",
        name: "Feest catering hulp",
        icon: "🍽️",
        description: "Serveren en keuken helpen",
        priceFrom: 22
      },
      {
        slug: "fotografie",
        name: "Fotografie",
        icon: "📸",
        description: "Events of producten fotograferen",
        priceFrom: 40
      },
      {
        slug: "styling",
        name: "Styling & Decoratie",
        icon: "✨",
        description: "Ruimtes stylen voor events",
        priceFrom: 35
      }
    ]
  },
  {
    name: "Persoonlijke diensten",
    services: [
      {
        slug: "boodschappen",
        name: "Boodschappen doen",
        icon: "🛒",
        description: "Boodschappen halen en bezorgen",
        priceFrom: 20
      },
      {
        slug: "hond-uitlaten",
        name: "Hond uitlaten",
        icon: "🐕",
        description: "Dagelijkse wandelingen met je hond",
        priceFrom: 18
      },
      {
        slug: "oppas",
        name: "Oppas",
        icon: "👶",
        description: "Kinderopvang aan huis",
        priceFrom: 15
      },
      {
        slug: "huisdieroppas",
        name: "Huisdierenoppas",
        icon: "🐾",
        description: "Oppassen op katten, honden of andere dieren",
        priceFrom: 18
      },
      {
        slug: "tutor",
        name: "Bijles & Tutoring",
        icon: "📚",
        description: "Huiswerk begeleiding en bijles",
        priceFrom: 25
      },
      {
        slug: "personal-assistant",
        name: "Persoonlijke assistent",
        icon: "💼",
        description: "Administratieve taken en planning",
        priceFrom: 30
      }
    ]
  }
];

