import type { Metadata } from "next";
import Header from "@/components/Header";
import { generateMetadata } from "@/lib/seo";

export const metadata: Metadata = generateMetadata({
  title: 'Over Ons - Onze Missie en Visie',
  description: 'Doeklus verbindt klanten met betrouwbare lokale klussers. Ontdek onze missie om klussen voor iedereen toegankelijk, veilig en betaalbaar te maken.',
  keywords: ['over doeklus', 'missie', 'visie', 'klusplatform', 'wie zijn wij']
});

export default function OverOns() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-black mb-6">Over Doeklus</h1>
          <p className="text-2xl text-gray-600 mb-12">
            Klussen voor iedereen toegankelijk maken
          </p>

          <div className="prose prose-lg max-w-none">
            <section className="bg-white rounded-2xl p-8 mb-8">
              <h2 className="text-3xl font-bold mb-4">Onze Missie</h2>
              <p className="text-gray-700 leading-relaxed">
                Bij Doeklus geloven we dat iedereen toegang moet hebben tot betrouwbare en betaalbare klussers. 
                We verbinden mensen die hulp nodig hebben met vakmensen in hun buurt, zonder gedoe en met volledige transparantie. 
                Ons platform maakt het makkelijk om de juiste klusser te vinden voor elke klus, groot of klein.
              </p>
            </section>

            <section className="bg-white rounded-2xl p-8 mb-8">
              <h2 className="text-3xl font-bold mb-4">Onze Waarden</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold mb-2 text-[#ff4d00]">🤝 Betrouwbaarheid</h3>
                  <p className="text-gray-700">
                    Alle klussers worden gescreend en beoordeeld. Veiligheid en kwaliteit staan voorop.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-[#ff4d00]">💡 Transparantie</h3>
                  <p className="text-gray-700">
                    Heldere prijzen, eerlijke reviews en geen verborgen kosten. Wat je ziet is wat je krijgt.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-[#ff4d00]">🚀 Gemak</h3>
                  <p className="text-gray-700">
                    Post je klus in 2 minuten, ontvang biedingen en kies de beste klusser. Simpel en snel.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-[#ff4d00]">🌱 Lokaal</h3>
                  <p className="text-gray-700">
                    We ondersteunen lokale professionals en zorgen voor korte lijnen in je eigen buurt.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-2xl p-8 mb-8">
              <h2 className="text-3xl font-bold mb-4">Ons Verhaal</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Doeklus is opgericht in 2024 met een simpele gedachte: klussen moet makkelijker. 
                We zagen hoe moeilijk het was om een goede klusser te vinden, vooral voor kleine klussen. 
                Tegelijkertijd zagen we vakmensen worstelen om aan klussen te komen.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Vandaag de dag verbinden we duizenden klanten met lokale klussers. Van meubelmontage tot 
                complete verbouwingen - op Doeklus vind je de juiste persoon voor elke klus.
              </p>
            </section>

            <section className="bg-gradient-to-r from-[#ff4d00] to-[#ff6b35] rounded-2xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">Cijfers die Spreken</h2>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-5xl font-black mb-2">10.000+</div>
                  <div className="text-lg opacity-90">Actieve Klussers</div>
                </div>
                <div>
                  <div className="text-5xl font-black mb-2">50.000+</div>
                  <div className="text-lg opacity-90">Voltooide Klussen</div>
                </div>
                <div>
                  <div className="text-5xl font-black mb-2">4.8/5</div>
                  <div className="text-lg opacity-90">Gemiddelde Review</div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
