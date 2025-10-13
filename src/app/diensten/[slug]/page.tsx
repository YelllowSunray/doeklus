import Link from "next/link";

interface ServiceDetailProps {
  params: {
    slug: string;
  };
}

export default function ServiceDetailPage({ params }: ServiceDetailProps) {
  const service = services.find(s => s.slug === params.slug) || services[0];
  
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

      {/* Hero with Service Info */}
      <section className="bg-white py-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-8">
            <div className="flex-1">
              <Link href="/diensten" className="text-[#ff6b35] hover:underline text-sm mb-4 inline-block">
                ← Terug naar diensten
              </Link>
              <div className="flex items-center gap-4 mb-4">
                <div className="text-5xl">{service.icon}</div>
                <div>
                  <h1 className="text-4xl font-bold">{service.name}</h1>
                  <div className="text-xl text-gray-600 mt-2">{service.description}</div>
                </div>
              </div>
              <div className="flex items-center gap-6 mt-6">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 text-xl">★★★★★</span>
                  <span className="text-gray-600">4.8/5 (2.453 reviews)</span>
                </div>
                <div className="text-gray-600">
                  <strong>1.247</strong> Doeklers beschikbaar
                </div>
              </div>
            </div>
            <div className="flex-shrink-0 bg-gray-50 rounded-lg p-6 border border-gray-200 w-80">
              <div className="text-3xl font-bold mb-2">€{service.priceFrom}/uur</div>
              <div className="text-sm text-gray-600 mb-4">Gemiddelde prijs</div>
              <Link 
                href={`/klus-plaatsen?dienst=${service.slug}`}
                className="block w-full bg-[#ff6b35] hover:bg-[#e55a28] text-white text-center px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Boek een Doekler
              </Link>
              <div className="mt-4 text-sm text-gray-600">
                ✓ Binnen 24 uur een Doekler<br />
                ✓ Vaste prijsafspraak<br />
                ✓ Veilig online betalen
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6">Wat is inbegrepen</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {service.included.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="text-[#ff6b35] mt-1">✓</div>
                <div className="text-gray-700">{item}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works for This Service */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">Zo werkt {service.name.toLowerCase()}</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <div className="w-12 h-12 bg-[#ff6b35] rounded-full flex items-center justify-center text-white text-xl font-bold mb-4">
                1
              </div>
              <h3 className="font-semibold mb-2">Beschrijf de klus</h3>
              <p className="text-sm text-gray-600">
                Vertel wat er moet gebeuren en upload eventueel foto's
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-[#ff6b35] rounded-full flex items-center justify-center text-white text-xl font-bold mb-4">
                2
              </div>
              <h3 className="font-semibold mb-2">Ontvang aanbiedingen</h3>
              <p className="text-sm text-gray-600">
                Doeklers sturen je binnen 24 uur hun prijs en planning
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-[#ff6b35] rounded-full flex items-center justify-center text-white text-xl font-bold mb-4">
                3
              </div>
              <h3 className="font-semibold mb-3">Kies je Doekler</h3>
              <p className="text-sm text-gray-600">
                Vergelijk profielen en kies wie de klus doet
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-[#ff6b35] rounded-full flex items-center justify-center text-white text-xl font-bold mb-4">
                4
              </div>
              <h3 className="font-semibold mb-2">Klaar!</h3>
              <p className="text-sm text-gray-600">
                Je Doekler komt langs. Betaal veilig en laat een review achter
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Doeklers */}
      <section className="py-12 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">Top Doeklers voor {service.name.toLowerCase()}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {mockDoeklers.map((doekler) => (
              <Link
                key={doekler.id}
                href={`/doeklers/${doekler.id}`}
                className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow border border-gray-200"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold text-xl flex-shrink-0">
                    {doekler.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-lg">{doekler.name}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-yellow-400">★★★★★</span>
                      <span className="text-sm text-gray-600">{doekler.rating}/5</span>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {doekler.completedJobs} klussen voltooid
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3">{doekler.bio}</p>
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-[#ff6b35]">
                    €{doekler.hourlyRate}/uur
                  </div>
                  <div className="text-sm text-gray-600">
                    {doekler.city}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">Veelgestelde vragen</h2>
          <div className="space-y-6">
            {service.faq.map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="font-semibold mb-2">{item.question}</h3>
                <p className="text-gray-600 text-sm">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#ff6b35] to-[#f7b801] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Klaar om te beginnen?</h2>
          <p className="text-xl mb-8 text-white/90">
            Vind binnen 24 uur de perfecte Doekler voor jouw {service.name.toLowerCase()}
          </p>
          <Link 
            href={`/klus-plaatsen?dienst=${service.slug}`}
            className="inline-block bg-white text-[#ff6b35] hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
          >
            Plaats je klus nu
          </Link>
        </div>
      </section>
    </div>
  );
}

const services = [
  {
    slug: "meubelmontage",
    name: "Meubelmontage",
    icon: "🪛",
    description: "IKEA of andere meubels professioneel in elkaar zetten",
    priceFrom: 25,
    included: [
      "Meubels monteren volgens instructies",
      "Eigen gereedschap meegebracht",
      "Verpakking opruimen",
      "Meubel op gewenste plek zetten",
      "Klein reparatiewerk indien nodig",
      "Advies over plaatsing en gebruik"
    ],
    faq: [
      {
        question: "Hoelang duurt een gemiddelde meubelmontage?",
        answer: "Dit hangt af van het meubel. Een eenvoudige kast duurt 1-2 uur, een complexe keuken kan 1-2 dagen duren. De Doekler geeft je vooraf een inschatting."
      },
      {
        question: "Moet ik zelf gereedschap aanschaffen?",
        answer: "Nee, onze Doeklers hebben professioneel gereedschap bij zich. Alleen zeer specifieke gereedschappen voor speciale meubels moet je eventueel zelf aanschaffen."
      },
      {
        question: "Wat als er onderdelen ontbreken?",
        answer: "De Doekler controleert eerst of alle onderdelen aanwezig zijn. Bij ontbrekende onderdelen kunnen we samen bekijken hoe het op te lossen valt."
      }
    ]
  },
  {
    slug: "schilderen",
    name: "Schilderen",
    icon: "🎨",
    description: "Professioneel binnen- of buitenschilderwerk",
    priceFrom: 30,
    included: [
      "Voorbehandeling van muren/hout",
      "Professioneel afplakken",
      "Schilderen met kwalitatieve verf",
      "Opruimen en schoonmaken",
      "Advies over verfsoorten",
      "Meerdere lagen indien nodig"
    ],
    faq: [
      {
        question: "Is de verf inbegrepen in de prijs?",
        answer: "Nee, verf wordt apart berekend. De Doekler kan advies geven over hoeveel en welke verf je nodig hebt, of dit voor je regelen."
      },
      {
        question: "Kunnen jullie ook behangen?",
        answer: "Ja, veel van onze schilders kunnen ook behangen. Geef dit aan bij je klus en je krijgt aanbiedingen van geschikte Doeklers."
      },
      {
        question: "Moet ik de kamer leeg hebben?",
        answer: "Het is handig als grote meubels verplaatst zijn, maar de Doekler kan ook helpen met afplakken en afdekken van meubels die niet verplaatst kunnen worden."
      }
    ]
  },
  {
    slug: "verhuizen",
    name: "Verhuizen",
    icon: "📦",
    description: "Hulp bij sjouwen, inpakken en transporteren",
    priceFrom: 28,
    included: [
      "Sjouwen van meubels en dozen",
      "In- en uitladen van verhuiswagen",
      "Zorgvuldig omgaan met spullen",
      "Bescherming van gevoelige items",
      "Trap op/af dragen",
      "Meubels op gewenste plek zetten"
    ],
    faq: [
      {
        question: "Regelen jullie ook de verhuiswagen?",
        answer: "De Doekler kan helpen bij het vinden van een geschikte verhuiswagen, maar meestal regel je deze zelf. Wel kunnen ze adviseren welke maat je nodig hebt."
      },
      {
        question: "Is er verzekering bij schade?",
        answer: "Alle klussen via Doeklus zijn verzekerd. Bij schade kun je dit melden en wordt dit afgehandeld via onze verzekering."
      },
      {
        question: "Hoeveel Doeklers heb ik nodig?",
        answer: "Dit hangt af van de grootte van je verhuizing. Voor een studio is 1-2 personen genoeg, voor een gezinswoning 2-4 personen. De Doekler kan je adviseren."
      }
    ]
  },
  {
    slug: "tuinonderhoud",
    name: "Tuinonderhoud",
    icon: "🌱",
    description: "Maaien, snoeien en je tuin onderhouden",
    priceFrom: 25,
    included: [
      "Gras maaien",
      "Onkruid wieden",
      "Planten snoeien",
      "Bladeren opruimen",
      "Advies over tuinverzorging",
      "Afvoer van tuinafval"
    ],
    faq: [
      {
        question: "Moet ik zelf een grasmaaier hebben?",
        answer: "Veel Doeklers hebben eigen gereedschap. Bij het plaatsen van je klus kun je aangeven wat je hebt en wat de Doekler moet meebrengen."
      },
      {
        question: "Kunnen jullie ook tuinafval afvoeren?",
        answer: "Ja, de Doekler kan tuinafval afvoeren. Dit kan wel extra kosten met zich meebrengen voor stort- of milieustraat kosten."
      },
      {
        question: "Hoe vaak moet mijn tuin onderhouden worden?",
        answer: "Dit verschilt per seizoen. In de zomer vaak wekelijks maaien, in de herfst regelmatig bladeren ruimen. De Doekler kan een onderhoudsschema adviseren."
      }
    ]
  },
  {
    slug: "klusjesman",
    name: "Algemene klussen",
    icon: "🔧",
    description: "Voor alle kleine reparaties en klusjes in huis",
    priceFrom: 28,
    included: [
      "Kleine reparaties",
      "Ophangwerk (planken, schilderijen)",
      "Deurknoppen/sloten vervangen",
      "Kleine schilderwerkzaamheden",
      "Kitwerk vernieuwen",
      "Advies en preventief onderhoud"
    ],
    faq: [
      {
        question: "Wat valt onder 'algemene klussen'?",
        answer: "Denk aan kleine reparaties, ophangwerk, vervangen van deurknoppen, kitwerk, kleine schilderwerkzaamheden en vergelijkbare huishoudelijke klusjes."
      },
      {
        question: "Kunnen jullie ook grotere klussen doen?",
        answer: "Voor grotere klussen kun je beter een specialist kiezen (elektriciën, loodgieter, etc.). De klusjesman kan je adviseren wanneer een specialist nodig is."
      },
      {
        question: "Is materiaal inbegrepen?",
        answer: "Klein materiaal zoals schroeven en pluggen is vaak inbegrepen. Voor groter materiaal kun je vooraf afspraken maken met de Doekler."
      }
    ]
  },
  {
    slug: "elektrische-klussen",
    name: "Elektrische klussen",
    icon: "💡",
    description: "Lampen, stopcontacten en lichtschakelaars installeren",
    priceFrom: 35,
    included: [
      "Lampen ophangen en aansluiten",
      "Stopcontacten vervangen",
      "Schakelaars installeren",
      "Dimmer installeren",
      "Klein elektrisch reparatiewerk",
      "Veiligheidscontrole"
    ],
    faq: [
      {
        question: "Zijn jullie Doeklers gecertificeerd?",
        answer: "Voor basale elektrische klussen is geen certificaat vereist. Voor meterkast-werkzaamheden zoeken we alleen gecertificeerde elektriciens."
      },
      {
        question: "Wat mag wel en niet zonder certificaat?",
        answer: "Lampen ophangen, stopcontacten en schakelaars vervangen mag. Werk aan de meterkast, nieuwe groepen aanleggen en 3-fase werk vereist een gecertificeerde elektricien."
      },
      {
        question: "Is het veilig?",
        answer: "Ja, onze Doeklers werken volgens veiligheidsnormen en schakelen altijd de stroom uit. Voor twijfelgevallen adviseren ze een gecertificeerd elektricien."
      }
    ]
  },
  {
    slug: "loodgieter",
    name: "Loodgieterswerk",
    icon: "🚰",
    description: "Lekken verhelpen, kranen vervangen en meer",
    priceFrom: 40,
    included: [
      "Lekken opsporen en repareren",
      "Kranen vervangen of repareren",
      "Toilet reparatie",
      "Afvoer ontstoppen",
      "Radiatoren ontluchten",
      "Advies over leidingwerk"
    ],
    faq: [
      {
        question: "Komen jullie ook voor spoedklussen?",
        answer: "Voor acute lekken of waterschade kun je aangeven dat het spoed is. Veel Doeklers zijn binnen enkele uren beschikbaar voor noodgevallen."
      },
      {
        question: "Wat als het probleem groter is dan gedacht?",
        answer: "De Doekler inspecteert eerst het probleem en geeft een inschatting. Als het groter is, krijg je een nieuwe prijsindicatie voordat er verder gewerkt wordt."
      },
      {
        question: "Is materiaal inbegrepen?",
        answer: "Klein materiaal zoals pakkingen is vaak inbegrepen. Voor nieuwe kranen, leidingen etc. worden de kosten vooraf besproken."
      }
    ]
  },
  {
    slug: "schoonmaken",
    name: "Schoonmaken",
    icon: "🧹",
    description: "Professioneel je huis of kantoor schoonmaken",
    priceFrom: 22,
    included: [
      "Stofzuigen en dweilen",
      "Badkamer schoonmaken",
      "Keuken schoonmaken",
      "Ramen lappen (binnen)",
      "Stoffen/afstoffen",
      "Eigen schoonmaakmiddelen"
    ],
    faq: [
      {
        question: "Moet ik schoonmaakmiddelen in huis hebben?",
        answer: "Nee, de Doekler neemt professionele schoonmaakmiddelen mee. Heb je een voorkeur voor bepaalde middelen? Geef dit dan aan."
      },
      {
        question: "Kunnen jullie ook ramen lappen?",
        answer: "Ja, ramen binnen zit bij standaard schoonmaak. Voor ramen buiten (vooral op hoogte) hebben we gespecialiseerde glazenwassers."
      },
      {
        question: "Hoe vaak is schoonmaken nodig?",
        answer: "Dit verschilt per situatie. Wekelijks voor drukke gezinnen, tweewekelijks voor kleine huishoudens. De Doekler kan een schema adviseren."
      }
    ]
  }
];

const mockDoeklers = [
  {
    id: 1,
    name: "Pieter van der Berg",
    rating: 4.9,
    completedJobs: 347,
    bio: "15 jaar ervaring in meubelmont montage. Snel, netjes en betrouwbaar.",
    hourlyRate: 28,
    city: "Amsterdam"
  },
  {
    id: 2,
    name: "Lisa Jansen",
    rating: 4.8,
    completedJobs: 289,
    bio: "Oog voor detail en perfectie. Tevreden klanten zijn mijn doel.",
    hourlyRate: 26,
    city: "Utrecht"
  },
  {
    id: 3,
    name: "Mohammed El Amrani",
    rating: 5.0,
    completedJobs: 421,
    bio: "Vakman met passie voor goed werk. Geen klus is te groot of klein.",
    hourlyRate: 30,
    city: "Rotterdam"
  }
];

// Generate static params for common services
export function generateStaticParams() {
  return [
    { slug: 'meubelmontage' },
    { slug: 'schilderen' },
    { slug: 'verhuizen' },
    { slug: 'tuinonderhoud' },
    { slug: 'klusjesman' },
    { slug: 'elektrische-klussen' },
    { slug: 'loodgieter' },
    { slug: 'schoonmaken' }
  ];
}

