import Link from "next/link";
import Header from "@/components/Header";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-black mb-8">Over Doeklus</h1>
          
          <div className="bg-white rounded-3xl p-8 md:p-12 space-y-8">
            <section>
              <h2 className="text-3xl font-bold mb-4">Direct klussen regelen</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                Doeklus verbindt klanten met vakbekwame klussers in heel Nederland. Of je nu je IKEA kast wilt laten monteren, 
                je woonkamer wilt laten schilderen of hulp nodig hebt bij je verhuizing - wij regelen het. Simpel, snel en betrouwbaar.
              </p>
            </section>

            <section className="bg-gradient-to-br from-[#ff4d00]/10 to-[#0066ff]/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Onze missie</h2>
              <p className="text-gray-700 leading-relaxed">
                Klussen laten doen moet makkelijk zijn. Geen gedoe, geen onduidelijkheid, geen verrassingen. 
                Daarom hebben we Doeklus gemaakt: een platform waar je binnen een paar klikken de perfecte klusser vindt 
                voor jouw klus. Direct, eerlijk en betrouwbaar - zoals het hoort.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">Hoe het begon</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Doeklus werd geboren uit frustratie. Frustatie over het eindeloos zoeken naar een betrouwbare klusser, 
                  over onduidelijke prijzen en slechte communicatie. We dachten: dit moet beter kunnen.
                </p>
                <p>
                  In 2025 startten we met een simpel idee: een platform waar klanten en klussers elkaar makkelijk kunnen vinden. 
                  Transparante prijzen, duidelijke afspraken, en betrouwbare professionals. Nederlands, direct en zonder poespas.
                </p>
                <p>
                  Vandaag helpen we duizenden mensen elke maand om hun klussen geregeld te krijgen. Van kleine klusjes 
                  tot grote projecten. En we zijn nog maar net begonnen.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">Waar we voor staan</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                  <div className="text-4xl mb-3">🎯</div>
                  <h3 className="font-bold text-xl mb-2">Direct & Eerlijk</h3>
                  <p className="text-gray-600">
                    Geen marketing praatjes. We zeggen het zoals het is. Duidelijke prijzen, eerlijke communicatie.
                  </p>
                </div>
                <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                  <div className="text-4xl mb-3">✓</div>
                  <h3 className="font-bold text-xl mb-2">Kwaliteit</h3>
                  <p className="text-gray-600">
                    Alle klussers worden gescreend. Alleen de beste vakmannen en -vrouwen komen op ons platform.
                  </p>
                </div>
                <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                  <div className="text-4xl mb-3">🛡️</div>
                  <h3 className="font-bold text-xl mb-2">Veiligheid</h3>
                  <p className="text-gray-600">
                    Verzekerd, gescreend en beoordeeld. Je weet met wie je zaken doet.
                  </p>
                </div>
                <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                  <div className="text-4xl mb-3">⚡</div>
                  <h3 className="font-bold text-xl mb-2">Snel & Makkelijk</h3>
                  <p className="text-gray-600">
                    Binnen 24 uur een klusser. Vaak zelfs nog dezelfde dag. Klus geregeld.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">Het team</h2>
              <p className="text-gray-700 mb-6">
                We zijn een klein, gedreven team uit Amsterdam. Techies, marketeers en klus-enthousiastelingen 
                die allemaal hetzelfde doel hebben: klussen makkelijker maken voor iedereen.
              </p>
              <div className="bg-gray-50 rounded-2xl p-6">
                <p className="text-gray-600 italic">
                  "Ons team groeit hard. Zie onze{" "}
                  <Link href="/carriere" className="text-[#ff4d00] font-semibold hover:underline">
                    vacatures
                  </Link>
                  {" "}als je mee wilt bouwen aan de toekomst van klussen in Nederland."
                </p>
              </div>
            </section>

            <section className="bg-gradient-to-r from-[#ff4d00] to-[#0066ff] rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">Cijfers die spreken</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-4xl font-black mb-2">50K+</div>
                  <div className="text-white/90 text-sm">Klussen per jaar</div>
                </div>
                <div>
                  <div className="text-4xl font-black mb-2">10K+</div>
                  <div className="text-white/90 text-sm">Klussers</div>
                </div>
                <div>
                  <div className="text-4xl font-black mb-2">4.8★</div>
                  <div className="text-white/90 text-sm">Gemiddelde score</div>
                </div>
                <div>
                  <div className="text-4xl font-black mb-2">98%</div>
                  <div className="text-white/90 text-sm">Tevreden klanten</div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">Contact</h2>
              <div className="bg-gray-50 rounded-2xl p-6 space-y-3">
                <p className="text-gray-700"><strong>Doeklus B.V.</strong></p>
                <p className="text-gray-700">📧 info@doeklus.nl</p>
                <p className="text-gray-700">📞 020 123 4567</p>
                <p className="text-gray-700">📍 Amsterdam, Nederland</p>
                <p className="text-gray-700">🏢 KvK: 12345678</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

