"use client";

import Link from "next/link";
import { useState } from "react";

export default function BecomeKlusserPage() {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-[#ff6b35]">
              Doeklus
            </Link>
            <div className="flex items-center gap-4">
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
      <section className="bg-gradient-to-br from-[#004e89] to-[#003861] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              Word Doekler en bepaal je eigen succes
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Verdien tot €50 per uur met je vaardigheden. Kies je eigen klussen, bepaal je eigen uren. Start vandaag nog.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => setStep(2)}
                className="bg-[#ff6b35] hover:bg-[#e55a28] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Aanmelden als Doekler
              </button>
              <a 
                href="#hoe-werkt-het"
                className="bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Hoe werkt het
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Waarom Doekler worden?</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#ff6b35] rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                💰
              </div>
              <h3 className="font-semibold text-lg mb-2">Goed verdienen</h3>
              <p className="text-gray-600 text-sm">
                Verdien €25-€50 per uur. Jij bepaalt je eigen tarieven.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#ff6b35] rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                🕐
              </div>
              <h3 className="font-semibold text-lg mb-2">Flexibel werken</h3>
              <p className="text-gray-600 text-sm">
                Werk wanneer je wilt. Kies je eigen werkdagen en tijden.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#ff6b35] rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                ✓
              </div>
              <h3 className="font-semibold text-lg mb-2">Kies je klussen</h3>
              <p className="text-gray-600 text-sm">
                Accepteer alleen klussen die bij je passen en waar je goed in bent.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#ff6b35] rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                📅
              </div>
              <h3 className="font-semibold text-lg mb-2">Wekelijks betaald</h3>
              <p className="text-gray-600 text-sm">
                Geld wordt wekelijks uitbetaald. Direct resultaat van je werk.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="hoe-werkt-het" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Zo word je Doekler</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#ff6b35] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold text-lg mb-3">Meld je aan</h3>
              <p className="text-gray-600 text-sm">
                Vul het aanmeldformulier in. Vertel over je vaardigheden en ervaring.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#ff6b35] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold text-lg mb-3">Screening</h3>
              <p className="text-gray-600 text-sm">
                We controleren je gegevens en ervaring. Dit duurt max 48 uur.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#ff6b35] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold text-lg mb-3">Profiel aanmaken</h3>
              <p className="text-gray-600 text-sm">
                Maak je profiel aan met foto's van je werk en je tarieven.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#ff6b35] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="font-semibold text-lg mb-3">Start met klussen</h3>
              <p className="text-gray-600 text-sm">
                Ontvang klusaanvragen en start met geld verdienen!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Earnings Calculator */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Hoeveel kan ik verdienen?</h2>
          
          <div className="bg-gradient-to-br from-[#ff6b35] to-[#f7b801] rounded-lg p-8 text-white">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">€1.200</div>
                <div className="text-white/90">10 uur/week</div>
                <div className="text-sm text-white/80 mt-1">Bijverdienen</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">€2.400</div>
                <div className="text-white/90">20 uur/week</div>
                <div className="text-sm text-white/80 mt-1">Part-time</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">€4.800</div>
                <div className="text-white/90">40 uur/week</div>
                <div className="text-sm text-white/80 mt-1">Fulltime</div>
              </div>
            </div>
            <p className="text-center text-white/90 text-sm">
              * Gebaseerd op €30/uur gemiddeld tarief. Tarieven variëren per dienst en ervaring.
            </p>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Wat heb je nodig?</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-6 text-[#ff6b35]">Basisvereisten</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-[#ff6b35] mt-1">✓</span>
                  <span>18 jaar of ouder</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ff6b35] mt-1">✓</span>
                  <span>Geldig identiteitsbewijs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ff6b35] mt-1">✓</span>
                  <span>Eigen gereedschap (afhankelijk van dienst)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ff6b35] mt-1">✓</span>
                  <span>KvK nummer of ZZP inschrijving</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ff6b35] mt-1">✓</span>
                  <span>Bankrekening voor uitbetaling</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-6 text-[#ff6b35]">Gewenst</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-[#ff6b35] mt-1">✓</span>
                  <span>Relevante ervaring of opleiding</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ff6b35] mt-1">✓</span>
                  <span>Eigen vervoer (auto/busje)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ff6b35] mt-1">✓</span>
                  <span>Goede communicatieve vaardigheden</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ff6b35] mt-1">✓</span>
                  <span>Betrouwbaar en netjes</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ff6b35] mt-1">✓</span>
                  <span>Voor sommige diensten: certificering</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Verhalen van Doeklers</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold text-xl">
                    {story.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold">{story.name}</div>
                    <div className="text-sm text-gray-600">{story.profession}</div>
                  </div>
                </div>
                <p className="text-gray-700 text-sm italic mb-4">"{story.quote}"</p>
                <div className="text-sm text-gray-600">
                  <strong>{story.earnings}</strong> per maand • {story.hours} uur/week
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#ff6b35] to-[#f7b801] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Klaar om te starten?</h2>
          <p className="text-xl mb-8 text-white/90">
            Sluit je aan bij 10.000+ Doeklers en start vandaag nog met geld verdienen
          </p>
          <button 
            onClick={() => setStep(2)}
            className="inline-block bg-white text-[#ff6b35] hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
          >
            Aanmelden als Doekler
          </button>
          <p className="mt-4 text-white/80 text-sm">
            Aanmelden duurt 5 minuten. Binnen 48 uur goedgekeurd.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Veelgestelde vragen</h2>
          
          <div className="space-y-6">
            {doeklerFAQ.map((item, idx) => (
              <div key={idx} className="border-b border-gray-200 pb-6 last:border-0">
                <h3 className="font-semibold text-lg mb-2">{item.question}</h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const successStories = [
  {
    name: "Mark de Vries",
    profession: "Meubelmonteur",
    quote: "Ik verdien nu meer dan in mijn oude baan en werk alleen wanneer ik wil. Perfect!",
    earnings: "€3.200",
    hours: "25"
  },
  {
    name: "Sophie Jansen",
    profession: "Schilder",
    quote: "Als alleenstaande moeder is de flexibiliteit goud waard. Ik kan werken rond de school.",
    earnings: "€2.100",
    hours: "18"
  },
  {
    name: "Ahmed El Hamidi",
    profession: "Algemene klussen",
    quote: "Via Doeklus heb ik mijn eigen klantenkring opgebouwd. Fantastisch platform!",
    earnings: "€4.500",
    hours: "40"
  }
];

const doeklerFAQ = [
  {
    question: "Moet ik een ZZP'er zijn?",
    answer: "Ja, je moet een ZZP'er zijn of bij de KvK ingeschreven staan. Dit is wettelijk verplicht. We helpen je graag op weg als je nog geen ZZP'er bent."
  },
  {
    question: "Hoelang duurt de goedkeuring?",
    answer: "Meestal binnen 48 uur. We controleren je gegevens, ervaring en eventuele certificaten. Je krijgt per email bericht zodra je goedgekeurd bent."
  },
  {
    question: "Wat kost het om Doekler te worden?",
    answer: "Aanmelden is gratis. We rekenen 15% commissie over je verdiensten. Geen verdiensten = geen kosten."
  },
  {
    question: "Heb ik eigen verzekering nodig?",
    answer: "Ja, als ZZP'er moet je zelf verzekerd zijn. Alle klussen via Doeklus zijn aanvullend verzekerd voor schade tijdens de klus."
  },
  {
    question: "Kan ik ook parttime Doekler zijn?",
    answer: "Absoluut! Veel Doeklers gebruiken het als bijverdienste. Je bepaalt zelf hoeveel klussen je accepteert."
  },
  {
    question: "Hoe krijg ik mijn eerste klus?",
    answer: "Zodra je profiel compleet is, kun je reageren op klusaanvragen in jouw regio. Ook kunnen klanten jou direct benaderen."
  },
  {
    question: "Wanneer word ik uitbetaald?",
    answer: "Wekelijks op vrijdag. Het geld van afgeronde klussen uit de vorige week wordt dan overgemaakt naar je bankrekening."
  },
  {
    question: "Wat als een klant niet tevreden is?",
    answer: "We bemiddelen altijd bij onenigheid. In de meeste gevallen kom je er samen uit. Anders kijken we naar een eerlijke oplossing."
  }
];

