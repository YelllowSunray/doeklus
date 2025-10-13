import Link from "next/link";
import { useEffect } from "react";

export default function HowItWorksPage() {
  // SEO metadata via document title
  useEffect(() => {
    document.title = 'Hoe werkt het? - In 3 stappen je klus geregeld | Doeklus';
  }, []);
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
                <Link href="/hoe-werkt-het" className="text-[#ff6b35] font-medium border-b-2 border-[#ff6b35] pb-1">
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
          <h1 className="text-4xl font-bold mb-4">Hoe werkt Doeklus?</h1>
          <p className="text-xl text-gray-600">
            In 3 simpele stappen van klus naar klaar. Makkelijker wordt het niet.
          </p>
        </div>
      </section>

      {/* Main Steps */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {steps.map((step, idx) => (
              <div key={idx} className={`flex flex-col ${idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`}>
                <div className="flex-1">
                  <div className="w-16 h-16 bg-[#ff6b35] rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6">
                    {idx + 1}
                  </div>
                  <h2 className="text-3xl font-bold mb-4">{step.title}</h2>
                  <p className="text-lg text-gray-600 mb-6">{step.description}</p>
                  <ul className="space-y-3">
                    {step.points.map((point, pidx) => (
                      <li key={pidx} className="flex items-start gap-3">
                        <span className="text-[#ff6b35] mt-1">✓</span>
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1">
                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-12 text-center">
                    <div className="text-6xl mb-4">{step.icon}</div>
                    <div className="text-gray-600 font-medium">{step.visual}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Doeklers */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Voor Doeklers</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-3">1. Ontvang klusaanvragen</h3>
              <p className="text-gray-600">
                Zodra een klant in jouw regio een klus plaatst, krijg je een notificatie. Bekijk de details en besluit of je wilt reageren.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-semibold mb-3">2. Doe een aanbieding</h3>
              <p className="text-gray-600">
                Stuur je prijs en wanneer je beschikbaar bent. De klant kan je profiel bekijken en beoordelingen lezen.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8">
              <div className="text-4xl mb-4">🔨</div>
              <h3 className="text-xl font-semibold mb-3">3. Voer de klus uit</h3>
              <p className="text-gray-600">
                Wordt je gekozen? Dan voer je de klus uit. Na goedkeuring krijg je wekelijks uitbetaald.
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link href="/word-doekler" className="inline-block bg-[#ff6b35] hover:bg-[#e55a28] text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Word Doekler
            </Link>
          </div>
        </div>
      </section>

      {/* Trust & Safety */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Veiligheid & Zekerheid</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="font-semibold text-lg mb-2">Verzekering</h3>
              <p className="text-gray-600 text-sm">
                Alle klussen zijn verzekerd tegen schade. Je zit altijd goed.
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-4">✓</div>
              <h3 className="font-semibold text-lg mb-2">Screening</h3>
              <p className="text-gray-600 text-sm">
                Alle Doeklers worden gescreend en geverifieerd.
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="font-semibold text-lg mb-2">Reviews</h3>
              <p className="text-gray-600 text-sm">
                Lees beoordelingen van andere klanten voor je kiest.
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="font-semibold text-lg mb-2">Veilig betalen</h3>
              <p className="text-gray-600 text-sm">
                Geld staat in depot tot de klus goedgekeurd is.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Veelgestelde vragen</h2>
          
          <div className="space-y-6">
            {howItWorksFAQ.map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">{item.question}</h3>
                <p className="text-gray-600">{item.answer}</p>
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
            Plaats je eerste klus in minder dan 5 minuten
          </p>
          <Link href="/klus-plaatsen" className="inline-block bg-white text-[#ff6b35] hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
            Plaats je klus
          </Link>
        </div>
      </section>
    </div>
  );
}

const steps = [
  {
    title: "Beschrijf je klus",
    description: "Vertel ons wat er moet gebeuren. Hoe meer details, hoe beter.",
    icon: "📝",
    visual: "Klus omschrijving",
    points: [
      "Kies het type klus uit ons aanbod",
      "Geef een duidelijke beschrijving",
      "Upload eventueel foto's",
      "Geef aan wanneer het af moet",
      "Vermeld je budget (optioneel)"
    ]
  },
  {
    title: "Kies je Doekler",
    description: "Ontvang aanbiedingen en kies wie de klus mag doen.",
    icon: "👥",
    visual: "Doeklers vergelijken",
    points: [
      "Ontvang binnen 24 uur meerdere aanbiedingen",
      "Bekijk profielen en beoordelingen",
      "Vergelijk prijzen en beschikbaarheid",
      "Chat met Doeklers voor vragen",
      "Kies degene die het beste bij je past"
    ]
  },
  {
    title: "Klaar!",
    description: "Je Doekler komt langs en klaart de klus.",
    icon: "✓",
    visual: "Klus uitgevoerd",
    points: [
      "De Doekler komt op de afgesproken tijd",
      "De klus wordt professioneel uitgevoerd",
      "Betaal veilig online na afloop",
      "Laat een review achter",
      "Klaar voor de volgende klus!"
    ]
  }
];

const howItWorksFAQ = [
  {
    question: "Hoe snel kan ik een Doekler vinden?",
    answer: "In de meeste gevallen ontvang je binnen 24 uur aanbiedingen. Voor spoedreparaties kan dit nog sneller, soms binnen een paar uur."
  },
  {
    question: "Wat als ik niet tevreden ben met een Doekler?",
    answer: "Je betaalt pas na goedkeuring van de klus. Ben je niet tevreden, neem dan contact op met onze klantenservice. We zoeken samen naar een oplossing."
  },
  {
    question: "Zijn de Doeklers verzekerd?",
    answer: "Ja, alle klussen via Doeklus zijn verzekerd. Daarnaast moeten Doeklers zelf ook verzekerd zijn als ZZP'er."
  },
  {
    question: "Kan ik een specifieke Doekler aanvragen?",
    answer: "Ja, als je eerder tevreden was over een Doekler, kun je hem of haar direct benaderen voor een nieuwe klus."
  },
  {
    question: "Wat kost het om Doeklus te gebruiken?",
    answer: "Aanmelden is gratis. We rekenen 15% servicekosten over het uurtarief van de Doekler. Dit dek alle kosten voor het platform, verzekering en support."
  },
  {
    question: "Moet ik materiaal zelf regelen?",
    answer: "Dat verschilt per klus. Bespreek dit vooraf met je Doekler. Sommige Doeklers kunnen materiaal voor je regelen, anderen verwachten dat je het zelf aanschaft."
  },
  {
    question: "Hoe werkt de betaling?",
    answer: "Je betaalt online vooraf. Het geld staat in depot bij Doeklus tot je de klus goedkeurt. Dan wordt het aan de Doekler uitbetaald."
  },
  {
    question: "Kan ik een klus annuleren?",
    answer: "Ja, tot 24 uur voor de afspraak kun je gratis annuleren. Bij annulering binnen 24 uur betaal je 50% annuleringskosten."
  }
];

