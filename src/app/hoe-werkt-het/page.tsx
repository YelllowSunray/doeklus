"use client";

import Link from "next/link";
import { useEffect } from "react";
import Header from "@/components/Header";

export default function HowItWorksPage() {
  // SEO metadata via document title
  useEffect(() => {
    document.title = 'Hoe werkt het? - In 3 stappen je klus geregeld | Doeklus';
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6">Hoe werkt Doeklus?</h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            In 3 simpele stappen van klus naar klaar. Makkelijker wordt het niet.
          </p>
        </div>
      </section>

      {/* Main Steps */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-12">
            {steps.map((step, idx) => (
              <div key={idx} className={`flex flex-col ${idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center`}>
                <div className="flex-1">
                  <div className="w-20 h-20 bg-[#ff4d00] rounded-full flex items-center justify-center text-white text-3xl font-black mb-6 shadow-lg">
                    {idx + 1}
                  </div>
                  <h2 className="text-4xl font-black mb-4">{step.title}</h2>
                  <p className="text-xl text-gray-600 mb-6">{step.description}</p>
                  <ul className="space-y-3">
                    {step.points.map((point, pidx) => (
                      <li key={pidx} className="flex items-start gap-3">
                        <span className="text-[#ff4d00] text-xl font-bold mt-1">✓</span>
                        <span className="text-gray-700 text-lg">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1">
                  <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
                    <div className="text-8xl mb-4">{step.icon}</div>
                    <div className="text-gray-600 font-semibold text-lg">{step.visual}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Klussers */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-12">Voor Klussers</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl shadow-xl p-8">
              <div className="text-5xl mb-4">📝</div>
              <h3 className="text-2xl font-bold mb-3">1. Ontvang klusaanvragen</h3>
              <p className="text-gray-600">
                Zodra een klant in jouw regio een klus plaatst, krijg je een notificatie. Bekijk de details en besluit of je wilt reageren.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl shadow-xl p-8">
              <div className="text-5xl mb-4">💬</div>
              <h3 className="text-2xl font-bold mb-3">2. Doe een aanbieding</h3>
              <p className="text-gray-600">
                Stuur je prijs en wanneer je beschikbaar bent. De klant kan je profiel bekijken en beoordelingen lezen.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl shadow-xl p-8">
              <div className="text-5xl mb-4">🔨</div>
              <h3 className="text-2xl font-bold mb-3">3. Voer de klus uit</h3>
              <p className="text-gray-600">
                Wordt je gekozen? Dan voer je de klus uit. Na goedkeuring krijg je wekelijks uitbetaald.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/word-klusser" className="inline-block bg-[#ff4d00] hover:bg-[#e04400] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-105">
              Word Klusser →
            </Link>
          </div>
        </div>
      </section>

      {/* Trust & Safety */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-12">Veiligheid & Zekerheid</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center bg-white rounded-3xl shadow-xl p-8">
              <div className="text-5xl mb-4">🛡️</div>
              <h3 className="font-bold text-xl mb-2">Verzekering</h3>
              <p className="text-gray-600">
                Alle klussen zijn verzekerd tegen schade. Je zit altijd goed.
              </p>
            </div>

            <div className="text-center bg-white rounded-3xl shadow-xl p-8">
              <div className="text-5xl mb-4">✓</div>
              <h3 className="font-bold text-xl mb-2">Screening</h3>
              <p className="text-gray-600">
                Alle klussers worden gescreend en geverifieerd.
              </p>
            </div>

            <div className="text-center bg-white rounded-3xl shadow-xl p-8">
              <div className="text-5xl mb-4">⭐</div>
              <h3 className="font-bold text-xl mb-2">Reviews</h3>
              <p className="text-gray-600">
                Lees beoordelingen van andere klanten voor je kiest.
              </p>
            </div>

            <div className="text-center bg-white rounded-3xl shadow-xl p-8">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="font-bold text-xl mb-2">Veilig betalen</h3>
              <p className="text-gray-600">
                Geld staat in depot tot de klus goedgekeurd is.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-black mb-8 text-center">Veelgestelde vragen</h2>
          
          <div className="space-y-6">
            {howItWorksFAQ.map((item, idx) => (
              <div key={idx} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 shadow-lg">
                <h3 className="font-bold text-lg mb-2">{item.question}</h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#ff4d00] to-[#ff6b35]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-4">Klaar om te beginnen?</h2>
          <p className="text-xl mb-8 text-white/90">
            Plaats je eerste klus in minder dan 5 minuten
          </p>
          <Link href="/klus-plaatsen" className="inline-block bg-white text-[#ff4d00] hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-105">
            Plaats je klus →
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
    title: "Kies je klusser",
    description: "Ontvang aanbiedingen en kies wie de klus mag doen.",
    icon: "👥",
    visual: "Klussers vergelijken",
    points: [
      "Ontvang binnen 24 uur meerdere aanbiedingen",
      "Bekijk profielen en beoordelingen",
      "Vergelijk prijzen en beschikbaarheid",
      "Chat met klussers voor vragen",
      "Kies degene die het beste bij je past"
    ]
  },
  {
    title: "Klaar!",
    description: "Je klusser komt langs en klaart de klus.",
    icon: "✓",
    visual: "Klus uitgevoerd",
    points: [
      "De klusser komt op de afgesproken tijd",
      "De klus wordt professioneel uitgevoerd",
      "Betaal veilig online na afloop",
      "Laat een review achter",
      "Klaar voor de volgende klus!"
    ]
  }
];

const howItWorksFAQ = [
  {
    question: "Hoe snel kan ik een klusser vinden?",
    answer: "In de meeste gevallen ontvang je binnen 24 uur aanbiedingen. Voor spoedreparaties kan dit nog sneller, soms binnen een paar uur."
  },
  {
    question: "Wat als ik niet tevreden ben met een klusser?",
    answer: "Je betaalt pas na goedkeuring van de klus. Ben je niet tevreden, neem dan contact op met onze klantenservice. We zoeken samen naar een oplossing."
  },
  {
    question: "Zijn de klussers verzekerd?",
    answer: "Klussers moeten zelf verzekerd zijn als ZZP'er."
  },
  {
    question: "Kan ik een specifieke klusser aanvragen?",
    answer: "Ja, als je eerder tevreden was over een klusser, kun je hem of haar direct benaderen voor een nieuwe klus."
  },
  {
    question: "Wat kost het om Doeklus te gebruiken?",
    answer: "Aanmelden is gratis. We rekenen 15% servicekosten over het uurtarief van de klusser. Dit dekt alle kosten voor het platform, verzekering en support."
  },
  {
    question: "Moet ik materiaal zelf regelen?",
    answer: "Dat verschilt per klus. Bespreek dit vooraf met je klusser. Sommige klussers kunnen materiaal voor je regelen, anderen verwachten dat je het zelf aanschaft."
  },
  {
    question: "Hoe werkt de betaling?",
    answer: "Je betaalt online vooraf. Het geld staat in depot bij Doeklus tot je de klus goedkeurt. Dan wordt het aan de klusser uitbetaald."
  },
  {
    question: "Kan ik een klus annuleren?",
    answer: "Ja, tot 24 uur voor de afspraak kun je gratis annuleren. Bij annulering binnen 24 uur betaal je 50% annuleringskosten."
  }
];
