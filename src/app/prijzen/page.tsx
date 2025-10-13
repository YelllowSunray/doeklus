"use client";

import Link from "next/link";
import { useState } from "react";

export default function PricingPage() {
  const [selectedService, setSelectedService] = useState("meubelmontage");
  const [hours, setHours] = useState(2);
  const [urgency, setUrgency] = useState("normal");
  
  const serviceRates: Record<string, number> = {
    "meubelmontage": 25,
    "schilderen": 30,
    "verhuizen": 28,
    "tuinonderhoud": 25,
    "schoonmaken": 22,
    "klusjesman": 28,
    "elektrische-klussen": 35,
    "loodgieter": 40
  };
  
  const urgencyMultiplier: Record<string, number> = {
    "normal": 1,
    "same-day": 1.3,
    "urgent": 1.5
  };
  
  const baseRate = serviceRates[selectedService] || 25;
  const multiplier = urgencyMultiplier[urgency];
  const totalCost = Math.round(baseRate * hours * multiplier);
  const doeklussFee = Math.round(totalCost * 0.15);
  const totalWithFee = totalCost + doeklussFee;

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
                <Link href="/prijzen" className="text-[#ff6b35] font-medium border-b-2 border-[#ff6b35] pb-1">
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
          <h1 className="text-4xl font-bold mb-4">Prijzen</h1>
          <p className="text-xl text-gray-600">
            Transparante prijzen. Geen verrassingen. Je weet vooraf wat het kost.
          </p>
        </div>
      </section>

      {/* Price Calculator */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-md">
              <h2 className="text-2xl font-bold mb-6">Bereken je prijs</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type dienst
                  </label>
                  <select 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                  >
                    <option value="meubelmontage">Meubelmontage - €25/uur</option>
                    <option value="schilderen">Schilderen - €30/uur</option>
                    <option value="verhuizen">Verhuizen - €28/uur</option>
                    <option value="tuinonderhoud">Tuinonderhoud - €25/uur</option>
                    <option value="schoonmaken">Schoonmaken - €22/uur</option>
                    <option value="klusjesman">Algemene klussen - €28/uur</option>
                    <option value="elektrische-klussen">Elektrische klussen - €35/uur</option>
                    <option value="loodgieter">Loodgieterswerk - €40/uur</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Geschatte duur: {hours} {hours === 1 ? 'uur' : 'uren'}
                  </label>
                  <input 
                    type="range"
                    min="1"
                    max="12"
                    value={hours}
                    onChange={(e) => setHours(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#ff6b35]"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1 uur</span>
                    <span>12 uur</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Spoed
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input 
                        type="radio"
                        name="urgency"
                        value="normal"
                        checked={urgency === "normal"}
                        onChange={(e) => setUrgency(e.target.value)}
                        className="accent-[#ff6b35]"
                      />
                      <div className="flex-1">
                        <div className="font-medium">Normaal (2-7 dagen)</div>
                        <div className="text-sm text-gray-600">Normale prijs</div>
                      </div>
                    </label>
                    <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input 
                        type="radio"
                        name="urgency"
                        value="same-day"
                        checked={urgency === "same-day"}
                        onChange={(e) => setUrgency(e.target.value)}
                        className="accent-[#ff6b35]"
                      />
                      <div className="flex-1">
                        <div className="font-medium">Dezelfde dag</div>
                        <div className="text-sm text-gray-600">+30% toeslag</div>
                      </div>
                    </label>
                    <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input 
                        type="radio"
                        name="urgency"
                        value="urgent"
                        checked={urgency === "urgent"}
                        onChange={(e) => setUrgency(e.target.value)}
                        className="accent-[#ff6b35]"
                      />
                      <div className="flex-1">
                        <div className="font-medium">Spoed (binnen 4 uur)</div>
                        <div className="text-sm text-gray-600">+50% toeslag</div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-gradient-to-br from-[#ff6b35] to-[#f7b801] rounded-lg p-8 shadow-md text-white">
              <h3 className="text-2xl font-bold mb-6">Prijsoverzicht</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                  <span>Uurtarief Doekler</span>
                  <span className="font-semibold">€{baseRate}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                  <span>Aantal uren</span>
                  <span className="font-semibold">{hours}</span>
                </div>
                {urgency !== "normal" && (
                  <div className="flex justify-between items-center pb-3 border-b border-white/20">
                    <span>Spoedtoeslag ({urgency === "same-day" ? "30%" : "50%"})</span>
                    <span className="font-semibold">€{Math.round(baseRate * hours * (multiplier - 1))}</span>
                  </div>
                )}
                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                  <span>Subtotaal</span>
                  <span className="font-semibold">€{totalCost}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                  <span>Doeklus servicekosten (15%)</span>
                  <span className="font-semibold">€{doeklussFee}</span>
                </div>
              </div>

              <div className="bg-white/20 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">Totaal</span>
                  <span className="text-3xl font-bold">€{totalWithFee}</span>
                </div>
              </div>

              <Link 
                href="/klus-plaatsen"
                className="block w-full bg-white text-[#ff6b35] hover:bg-gray-100 text-center px-6 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Plaats je klus
              </Link>

              <div className="mt-6 text-sm text-white/80">
                <p>✓ Vaste prijs, geen verrassingen</p>
                <p>✓ Veilig online betalen</p>
                <p>✓ Geld-terug-garantie</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Pricing Table */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Standaard uurtarieven</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingData.map((item, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{item.service}</h3>
                <div className="text-2xl font-bold text-[#ff6b35] mb-2">
                  €{item.price}/uur
                </div>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-2">Let op:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Dit zijn gemiddelde tarieven. Doeklers bepalen hun eigen prijzen.</li>
              <li>• Materiaalkosten komen er vaak nog bij.</li>
              <li>• Voor grote projecten kan een vaste prijs afgesproken worden.</li>
              <li>• Doeklus rekent 15% servicekosten over het uurtarief.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* How Payment Works */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Hoe werkt betalen?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-[#ff6b35] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold text-lg mb-3">Prijs vooraf vast</h3>
              <p className="text-gray-600 text-sm">
                Je ziet vooraf wat de klus kost. Geen verrassingen achteraf. De Doekler geeft een vaste prijs of uurtarief.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-[#ff6b35] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold text-lg mb-3">Veilig in depot</h3>
              <p className="text-gray-600 text-sm">
                Je betaalt online vooraf. Het geld staat in depot bij Doeklus tot de klus afgerond is.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-[#ff6b35] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold text-lg mb-3">Uitbetaling na goedkeuring</h3>
              <p className="text-gray-600 text-sm">
                Klus klaar en tevreden? Dan krijgt de Doekler het geld. Niet tevreden? We lossen het op.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Veelgestelde vragen over prijzen</h2>
          
          <div className="space-y-6">
            {pricingFAQ.map((item, idx) => (
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

const pricingData = [
  {
    icon: "🪛",
    service: "Meubelmontage",
    price: 25,
    description: "IKEA of andere meubels monteren"
  },
  {
    icon: "🎨",
    service: "Schilderen",
    price: 30,
    description: "Binnen- of buitenschilderwerk"
  },
  {
    icon: "📦",
    service: "Verhuizen",
    price: 28,
    description: "Sjouwen en transporteren"
  },
  {
    icon: "🌱",
    service: "Tuinonderhoud",
    price: 25,
    description: "Maaien, snoeien, wieden"
  },
  {
    icon: "🧹",
    service: "Schoonmaken",
    price: 22,
    description: "Huis of kantoor schoonmaken"
  },
  {
    icon: "🔧",
    service: "Algemene klussen",
    price: 28,
    description: "Klusjeswerk en reparaties"
  },
  {
    icon: "💡",
    service: "Elektrische klussen",
    price: 35,
    description: "Lampen, stopcontacten"
  },
  {
    icon: "🚰",
    service: "Loodgieterswerk",
    price: 40,
    description: "Lekken, kranen, sanitair"
  }
];

const pricingFAQ = [
  {
    question: "Zijn de prijzen inclusief btw?",
    answer: "Ja, alle getoonde prijzen zijn inclusief btw. Je betaalt wat je ziet, geen extra kosten."
  },
  {
    question: "Wat zijn de Doeklus servicekosten?",
    answer: "Doeklus rekent 15% servicekosten over het uurtarief van de Doekler. Dit is voor het platform, verzekering, betalingsverwerking en klantenservice."
  },
  {
    question: "Kan ik een vaste prijs afspreken?",
    answer: "Ja, voor veel klussen kun je vooraf een vaste totaalprijs afspreken met de Doekler. Dit voorkomt verrassingen en geeft duidelijkheid."
  },
  {
    question: "Wat als de klus langer duurt dan verwacht?",
    answer: "Bij een uurtarief betaal je voor de daadwerkelijke tijd. De Doekler communiceert vooraf als het langer duurt. Bij een vaste prijs is de prijs definitief, ook als het langer duurt."
  },
  {
    question: "Zijn er extra kosten voor materiaal?",
    answer: "Materiaalkosten zijn meestal niet inbegrepen. Bespreek dit vooraf met de Doekler. Sommige Doeklers rekenen materiaal tegen kostprijs door, anderen vragen een kleine opslag."
  },
  {
    question: "Kan ik annuleren?",
    answer: "Ja, tot 24 uur voor de afspraak kun je gratis annuleren. Bij annulering binnen 24 uur betaal je 50% van het afgesproken bedrag."
  },
  {
    question: "Hoe betaal ik?",
    answer: "Je betaalt veilig online via iDEAL, creditcard of PayPal. Het geld wordt pas aan de Doekler uitbetaald na goedkeuring van de klus."
  },
  {
    question: "Wat als ik niet tevreden ben?",
    answer: "Als je niet tevreden bent, neem dan contact op met onze klantenservice. We zoeken samen met de Doekler naar een oplossing. In uiterste gevallen krijg je je geld terug."
  }
];

