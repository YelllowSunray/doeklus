"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Header from "@/components/Header";

export default function PricingPage() {
  const [selectedService, setSelectedService] = useState("meubelmontage");
  const [hours, setHours] = useState(2);
  const [urgency, setUrgency] = useState("normal");
  
  // SEO metadata via document title
  useEffect(() => {
    document.title = 'Prijzen - Transparante tarieven per dienst | Doeklus';
  }, []);
  
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-black mb-4">Transparante Prijzen</h1>
          <p className="text-xl text-gray-600">
            Bereken wat je klus kost. Geen verborgen kosten, altijd duidelijk vooraf.
          </p>
        </div>
      </section>

      {/* Price Calculator */}
      <section className="pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-3xl font-bold mb-6">Bereken je prijs</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Type dienst
                  </label>
                  <select 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff4d00] focus:border-[#ff4d00] transition-all"
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Geschatte duur: {hours} {hours === 1 ? 'uur' : 'uren'}
                  </label>
                  <input 
                    type="range"
                    min="1"
                    max="12"
                    value={hours}
                    onChange={(e) => setHours(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#ff4d00]"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1 uur</span>
                    <span className="font-bold text-[#ff4d00] text-lg">{hours}</span>
                    <span>12 uur</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Spoed
                  </label>
                  <div className="space-y-2">
                    <label className={`flex items-center gap-3 p-3 border-2 rounded-xl cursor-pointer transition-all ${
                      urgency === "normal" ? "border-[#ff4d00] bg-[#ff4d00]/5" : "border-gray-200 hover:bg-gray-50"
                    }`}>
                      <input 
                        type="radio"
                        name="urgency"
                        value="normal"
                        checked={urgency === "normal"}
                        onChange={(e) => setUrgency(e.target.value)}
                        className="accent-[#ff4d00]"
                      />
                      <div className="flex-1">
                        <div className="font-semibold">Normaal (2-7 dagen)</div>
                        <div className="text-sm text-gray-600">Normale prijs</div>
                      </div>
                    </label>
                    <label className={`flex items-center gap-3 p-3 border-2 rounded-xl cursor-pointer transition-all ${
                      urgency === "same-day" ? "border-[#ff4d00] bg-[#ff4d00]/5" : "border-gray-200 hover:bg-gray-50"
                    }`}>
                      <input 
                        type="radio"
                        name="urgency"
                        value="same-day"
                        checked={urgency === "same-day"}
                        onChange={(e) => setUrgency(e.target.value)}
                        className="accent-[#ff4d00]"
                      />
                      <div className="flex-1">
                        <div className="font-semibold">Dezelfde dag</div>
                        <div className="text-sm text-gray-600">+30% toeslag</div>
                      </div>
                    </label>
                    <label className={`flex items-center gap-3 p-3 border-2 rounded-xl cursor-pointer transition-all ${
                      urgency === "urgent" ? "border-[#ff4d00] bg-[#ff4d00]/5" : "border-gray-200 hover:bg-gray-50"
                    }`}>
                      <input 
                        type="radio"
                        name="urgency"
                        value="urgent"
                        checked={urgency === "urgent"}
                        onChange={(e) => setUrgency(e.target.value)}
                        className="accent-[#ff4d00]"
                      />
                      <div className="flex-1">
                        <div className="font-semibold">Spoed (binnen 4 uur)</div>
                        <div className="text-sm text-gray-600">+50% toeslag</div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-gradient-to-br from-[#ff4d00] to-[#ff6b35] rounded-3xl shadow-xl p-8 text-white">
              <h3 className="text-3xl font-bold mb-6">Prijsoverzicht</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                  <span>Uurtarief klusser</span>
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

              <div className="bg-white/20 rounded-2xl p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">Totaal</span>
                  <span className="text-4xl font-black">€{totalWithFee}</span>
                </div>
              </div>

              <Link 
                href="/klus-plaatsen"
                className="block w-full bg-white text-[#ff4d00] hover:bg-gray-100 text-center px-6 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                Plaats je klus →
              </Link>

              <div className="mt-6 text-sm text-white/90 space-y-1">
                <p>✓ Vaste prijs, geen verrassingen</p>
                <p>✓ Veilig online betalen</p>
                <p>✓ Geld-terug-garantie</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Pricing Table */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black mb-8">Standaard uurtarieven</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingData.map((item, idx) => (
              <div key={idx} className="border-2 border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-[#ff4d00]/30 transition-all">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-lg mb-2">{item.service}</h3>
                <div className="text-3xl font-black text-[#ff4d00] mb-2">
                  €{item.price}/uur
                </div>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
            <h3 className="font-bold text-blue-900 mb-2">💡 Let op:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Dit zijn gemiddelde tarieven. Klussers bepalen hun eigen prijzen.</li>
              <li>• Materiaalkosten komen er vaak nog bij.</li>
              <li>• Voor grote projecten kan een vaste prijs afgesproken worden.</li>
              <li>• Doeklus rekent 15% servicekosten over het uurtarief.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* How Payment Works */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black mb-12 text-center">Hoe werkt betalen?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-[#ff4d00] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-bold text-xl mb-3">Prijs vooraf vast</h3>
              <p className="text-gray-600">
                Je ziet vooraf wat de klus kost. Geen verrassingen achteraf. De klusser geeft een vaste prijs of uurtarief.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-[#ff4d00] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-bold text-xl mb-3">Veilig in depot</h3>
              <p className="text-gray-600">
                Je betaalt online vooraf. Het geld staat in depot bij Doeklus tot de klus afgerond is.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-[#ff4d00] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-bold text-xl mb-3">Uitbetaling na goedkeuring</h3>
              <p className="text-gray-600">
                Klus klaar en tevreden? Dan krijgt de klusser het geld. Niet tevreden? We lossen het op.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-black mb-8">Veelgestelde vragen</h2>
          
          <div className="space-y-6">
            {pricingFAQ.map((item, idx) => (
              <div key={idx} className="border-b-2 border-gray-100 pb-6 last:border-0">
                <h3 className="font-bold text-lg mb-2">{item.question}</h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-[#ff4d00] to-[#ff6b35] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-4">
            Klaar om te beginnen?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Post je klus en ontvang binnen 24 uur aanbiedingen van professionals
          </p>
          <Link
            href="/klus-plaatsen"
            className="inline-block bg-white text-[#ff4d00] px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:scale-105"
          >
            Plaats je klus gratis →
          </Link>
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
    answer: "Doeklus rekent 15% servicekosten over het uurtarief van de klusser. Dit is voor het platform, verzekering, betalingsverwerking en klantenservice."
  },
  {
    question: "Kan ik een vaste prijs afspreken?",
    answer: "Ja, voor veel klussen kun je vooraf een vaste totaalprijs afspreken met de klusser. Dit voorkomt verrassingen en geeft duidelijkheid."
  },
  {
    question: "Wat als de klus langer duurt dan verwacht?",
    answer: "Bij een uurtarief betaal je voor de daadwerkelijke tijd. De klusser communiceert vooraf als het langer duurt. Bij een vaste prijs is de prijs definitief, ook als het langer duurt."
  },
  {
    question: "Zijn er extra kosten voor materiaal?",
    answer: "Materiaalkosten zijn meestal niet inbegrepen. Bespreek dit vooraf met de klusser. Sommige klussers rekenen materiaal tegen kostprijs door, anderen vragen een kleine opslag."
  },
  {
    question: "Kan ik annuleren?",
    answer: "Ja, tot 24 uur voor de afspraak kun je gratis annuleren. Bij annulering binnen 24 uur betaal je 50% van het afgesproken bedrag."
  },
  {
    question: "Hoe betaal ik?",
    answer: "Je betaalt veilig online via iDEAL, creditcard of PayPal. Het geld wordt pas aan de klusser uitbetaald na goedkeuring van de klus."
  },
  {
    question: "Wat als ik niet tevreden ben?",
    answer: "Als je niet tevreden bent, neem dan contact op met onze klantenservice. We zoeken samen met de klusser naar een oplossing. In uiterste gevallen krijg je je geld terug."
  }
];
