import Link from "next/link";

interface DoeklerProfileProps {
  params: {
    id: string;
  };
}

export default function DoeklerProfilePage({ params }: DoeklerProfileProps) {
  const doekler = mockDoeklers.find(d => d.id === parseInt(params.id)) || mockDoeklers[0];
  
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
                <Link href="/diensten" className="text-gray-700 hover:text-[#ff6b35] font-medium">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/diensten" className="text-[#ff6b35] hover:underline text-sm mb-6 inline-block">
          ← Terug naar overzicht
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <div className="bg-white rounded-lg p-8 shadow-md">
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold text-3xl flex-shrink-0">
                  {doekler.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">{doekler.name}</h1>
                      <p className="text-gray-600 mb-3">{doekler.city}</p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-400 text-xl">★★★★★</span>
                          <span className="font-semibold">{doekler.rating}/5</span>
                          <span className="text-gray-600">({doekler.reviews} reviews)</span>
                        </div>
                        <div className="text-gray-600">
                          <strong>{doekler.completedJobs}</strong> klussen
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    {doekler.verified && (
                      <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                        ✓ Geverifieerd
                      </span>
                    )}
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                      {doekler.yearsExperience} jaar ervaring
                    </span>
                    {doekler.topDoekler && (
                      <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-3 py-1 rounded-full">
                        ⭐ Top Doekler
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-gray-700 leading-relaxed">{doekler.bio}</p>
              </div>
            </div>

            {/* Services & Skills */}
            <div className="bg-white rounded-lg p-8 shadow-md">
              <h2 className="text-2xl font-bold mb-4">Diensten & Vaardigheden</h2>
              <div className="flex flex-wrap gap-2">
                {doekler.services.map((service, idx) => (
                  <span 
                    key={idx}
                    className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-lg p-8 shadow-md">
              <h2 className="text-2xl font-bold mb-6">Reviews ({doekler.reviews})</h2>
              
              {/* Rating Summary */}
              <div className="mb-8 pb-8 border-b border-gray-200">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="text-5xl font-bold text-[#ff6b35] mb-2">{doekler.rating}</div>
                    <div className="text-yellow-400 text-2xl mb-2">★★★★★</div>
                    <div className="text-gray-600">{doekler.reviews} beoordelingen</div>
                  </div>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <div key={stars} className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 w-12">{stars} ster</span>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-yellow-400"
                            style={{ width: `${doekler.ratingDistribution[stars as keyof typeof doekler.ratingDistribution]}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 w-12 text-right">
                          {doekler.ratingDistribution[stars as keyof typeof doekler.ratingDistribution]}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Individual Reviews */}
              <div className="space-y-6">
                {doekler.reviewsList.map((review, idx) => (
                  <div key={idx} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-semibold">
                          {review.customerName.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold">{review.customerName}</div>
                          <div className="text-sm text-gray-500">{review.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-400">{'★'.repeat(review.rating)}</span>
                        <span className="text-gray-400">{'★'.repeat(5 - review.rating)}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-2">{review.comment}</p>
                    <div className="text-sm text-gray-500">
                      Klus: {review.service}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-lg p-6 shadow-md mb-6">
                <div className="text-3xl font-bold text-[#ff6b35] mb-2">
                  €{doekler.hourlyRate}/uur
                </div>
                <div className="text-sm text-gray-600 mb-6">Gemiddeld uurtarief</div>
                
                <Link 
                  href={`/klus-plaatsen?doekler=${doekler.id}`}
                  className="block w-full bg-[#ff6b35] hover:bg-[#e55a28] text-white text-center px-6 py-3 rounded-lg font-semibold mb-3 transition-colors"
                >
                  Boek {doekler.name.split(' ')[0]}
                </Link>
                
                <button className="block w-full border-2 border-[#ff6b35] text-[#ff6b35] hover:bg-[#ff6b35] hover:text-white text-center px-6 py-3 rounded-lg font-semibold transition-colors">
                  Stuur bericht
                </button>

                <div className="mt-6 pt-6 border-t border-gray-200 space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-700">
                    <span>⚡</span>
                    <span>Reageert binnen 2 uur</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <span>📍</span>
                    <span>Werkzaam in {doekler.workingArea}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <span>🛡️</span>
                    <span>Verzekerd via Doeklus</span>
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="font-semibold mb-4">Beschikbaarheid</h3>
                <div className="space-y-2 text-sm">
                  {doekler.availability.map((day, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span className="text-gray-600">{day.day}</span>
                      <span className={day.available ? 'text-green-600' : 'text-gray-400'}>
                        {day.available ? day.hours : 'Niet beschikbaar'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mockDoeklers = [
  {
    id: 1,
    name: "Pieter van der Berg",
    city: "Amsterdam",
    rating: 4.9,
    reviews: 127,
    completedJobs: 347,
    bio: "Met 15 jaar ervaring in meubelmontage en algemene klussen, help ik je graag met kwaliteit en precisie. Ik werk snel, netjes en betrouwbaar. Geen klus is te groot of te klein. Van een simpele IKEA kast tot een complete keuken - ik zorg dat het perfect wordt. Klanttevredenheid staat bij mij voorop.",
    hourlyRate: 28,
    verified: true,
    topDoekler: true,
    yearsExperience: 15,
    workingArea: "Amsterdam en omgeving (25km)",
    services: [
      "Meubelmontage",
      "IKEA specialist",
      "Keukeninstallatie",
      "Kasten op maat",
      "Ophangwerk",
      "Kleine reparaties"
    ],
    ratingDistribution: {
      5: 92,
      4: 6,
      3: 1,
      2: 1,
      1: 0
    },
    reviewsList: [
      {
        customerName: "Sandra de Vries",
        date: "2 weken geleden",
        rating: 5,
        service: "Meubelmontage",
        comment: "Pieter is super! Kwam precies op tijd, werkte snel en netjes. Mijn IKEA kast stond binnen no-time perfect in elkaar. Ook nog fijn advies gekregen over de plaatsing. Absolute aanrader!"
      },
      {
        customerName: "Mark Hendriks",
        date: "3 weken geleden",
        rating: 5,
        service: "Keukeninstallatie",
        comment: "Professioneel werk geleverd. De keuken ziet er prachtig uit en alles werkt perfect. Pieter denkt mee en lost problemen direct op. Top vakman!"
      },
      {
        customerName: "Linda Bakker",
        date: "1 maand geleden",
        rating: 5,
        service: "Kasten op maat",
        comment: "Erg tevreden! De maatwerk kasten zijn precies zoals we wilden. Pieter heeft goed geluisterd naar onze wensen en het resultaat is geweldig."
      }
    ],
    availability: [
      { day: "Maandag", available: true, hours: "9:00 - 17:00" },
      { day: "Dinsdag", available: true, hours: "9:00 - 17:00" },
      { day: "Woensdag", available: true, hours: "9:00 - 17:00" },
      { day: "Donderdag", available: true, hours: "9:00 - 17:00" },
      { day: "Vrijdag", available: true, hours: "9:00 - 15:00" },
      { day: "Zaterdag", available: false, hours: "" },
      { day: "Zondag", available: false, hours: "" }
    ]
  },
  {
    id: 2,
    name: "Lisa Jansen",
    city: "Utrecht",
    rating: 4.8,
    reviews: 89,
    completedJobs: 289,
    bio: "Vakvrouw met oog voor detail en perfectie. Gespecialiseerd in schilderwerk en interieurklussen. Ik zorg ervoor dat jouw huis er pico bello uitziet. Tevreden klanten zijn mijn visitekaartje.",
    hourlyRate: 26,
    verified: true,
    topDoekler: false,
    yearsExperience: 8,
    workingArea: "Utrecht en omstreken (20km)",
    services: [
      "Schilderen",
      "Behangen",
      "Stucwerk",
      "Decoratie",
      "Kleuradvies",
      "Finishing touches"
    ],
    ratingDistribution: {
      5: 85,
      4: 12,
      3: 2,
      2: 1,
      1: 0
    },
    reviewsList: [
      {
        customerName: "Thomas Vermeer",
        date: "1 week geleden",
        rating: 5,
        service: "Schilderen",
        comment: "Lisa heeft onze woonkamer geschilderd en het resultaat is waanzinnig mooi! Super netjes gewerkt, geen spatje verf waar het niet hoort. Echt een aanrader."
      },
      {
        customerName: "Emma Kramer",
        date: "3 weken geleden",
        rating: 5,
        service: "Behangen",
        comment: "Perfectionist in positieve zin. Het behang zit er strak en mooi op. Lisa geeft ook goede tips over kleuren en patronen."
      }
    ],
    availability: [
      { day: "Maandag", available: true, hours: "10:00 - 18:00" },
      { day: "Dinsdag", available: true, hours: "10:00 - 18:00" },
      { day: "Woensdag", available: false, hours: "" },
      { day: "Donderdag", available: true, hours: "10:00 - 18:00" },
      { day: "Vrijdag", available: true, hours: "10:00 - 18:00" },
      { day: "Zaterdag", available: true, hours: "10:00 - 16:00" },
      { day: "Zondag", available: false, hours: "" }
    ]
  }
];

// Generate static params
export function generateStaticParams() {
  return mockDoeklers.map(doekler => ({
    id: doekler.id.toString()
  }));
}

