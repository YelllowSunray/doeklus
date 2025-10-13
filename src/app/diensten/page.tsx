import Link from "next/link";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-2xl font-bold text-[#ff6b35]">
                Doeklus
              </Link>
              <nav className="hidden md:flex gap-6">
                <Link href="/diensten" className="text-[#ff6b35] font-medium border-b-2 border-[#ff6b35] pb-1">
                  Diensten
                </Link>
                <Link href="/prijzen" className="text-gray-700 hover:text-[#ff6b35] font-medium">
                  Prijzen
                </Link>
                <Link href="/hoe-werkt-het" className="text-gray-700 hover:text-[#ff6b35] font-medium">
                  Hoe werkt het
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/word-doekler" className="text-gray-700 hover:text-[#ff6b35] font-medium hidden sm:block">
                Word Doekler
              </Link>
              <Link href="/inloggen" className="text-gray-700 hover:text-[#ff6b35] font-medium">
                Inloggen
              </Link>
              <Link href="/aanmelden" className="bg-[#ff6b35] hover:bg-[#e55a28] text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Aanmelden
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-white py-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Alle diensten</h1>
          <p className="text-xl text-gray-600 mb-6">
            Van kleine klusjes tot grote projecten. Onze Doeklers staan voor je klaar.
          </p>
          
          {/* Search */}
          <div className="max-w-2xl">
            <input
              type="text"
              placeholder="Zoek een dienst..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
            />
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                    <div className="text-sm font-medium text-[#ff6b35]">
                      Vanaf €{service.priceFrom}/uur
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
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

