import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import { generateMetadata, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = generateMetadata({
  title: 'Word Klusser - Verdien bij met Klussen',
  description: 'Meld je aan als klusser en verdien geld met je vaardigheden. Flexibel werken, zelf je prijzen bepalen en klussen in jouw buurt. Start vandaag nog!',
  keywords: ['klusser worden', 'bijverdienen', 'klussen verdienen', 'zelfstandig klusser', 'flexibel werk']
});

export default function WordKlusser() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.doeklus.nl' },
    { name: 'Word Klusser', url: 'https://www.doeklus.nl/word-klusser' }
  ]);

  return (
    <>
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-black text-white">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#ffd900]/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#ffd900]/20 rounded-full blur-3xl"></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block mb-6">
                <span className="bg-[#ffd900] text-black px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide">
                  💰 Verdien €2000+ per maand
                </span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black mb-8 leading-none">
                Word <span className="text-[#ffd900]">Klusser</span><br/>
                bij Doeklus
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
                Zelf je uren bepalen. Zelf je prijzen kiezen. Klussen in jouw buurt. Start vandaag en verdien morgen al.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link 
                  href="/word-klusser/aanmelden" 
                  className="bg-[#ffd900] text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-[#ffed4e] transition-all hover:scale-105 shadow-2xl"
                >
                  Start als Klusser →
                </Link>
                <Link 
                  href="#hoe-werkt-het" 
                  className="border-2 border-[#ffd900] text-[#ffd900] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#ffd900] hover:text-black transition-all"
                >
                  Hoe werkt het?
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black mb-16 text-center">
              Waarom <span className="text-[#ffd900]">Doeklus</span>?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: "⏰",
                  title: "Flexibel Werken",
                  description: "Kies zelf wanneer en hoeveel je werkt. Perfect als bijbaan of fulltime."
                },
                {
                  icon: "💶",
                  title: "Top Verdiensten",
                  description: "Verdien €25-€45 per uur. Bepaal zelf je prijzen per klus."
                },
                {
                  icon: "📍",
                  title: "Lokale Klussen",
                  description: "Alleen klussen in jouw buurt. Geen reistijd verspillen."
                },
                {
                  icon: "🚀",
                  title: "Direct Starten",
                  description: "Aanmelden duurt 5 minuten. Goedkeuring binnen 1 minuut."
                },
                {
                  icon: "🛡️",
                  title: "Veilig Betaald",
                  description: "Geld staat klaar voordat je begint. Direct uitbetaald na klus."
                },
                {
                  icon: "⭐",
                  title: "Bouw je Reputatie",
                  description: "Reviews en ratings helpen je meer klussen te krijgen."
                }
              ].map((benefit, i) => (
                <div key={i} className="bg-gray-800 rounded-2xl p-8 border border-[#ffd900]/20 hover:border-[#ffd900] transition-all">
                  <div className="text-5xl mb-4">{benefit.icon}</div>
                  <h3 className="text-2xl font-bold mb-3 text-[#ffd900]">{benefit.title}</h3>
                  <p className="text-gray-300">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section id="hoe-werkt-het" className="py-20 px-4 bg-black">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black mb-16 text-center">
              Zo werkt het
            </h2>
            
            <div className="space-y-8">
              {[
                {
                  step: "1",
                  title: "Meld je aan",
                  description: "Vul je gegevens in en vertel ons wat voor klussen je doet. Duurt maar 5 minuten."
                },
                {
                  step: "2",
                  title: "Ontvang klussen",
                  description: "Zie meteen beschikbare klussen in jouw buurt. Alleen relevant werk voor jou."
                },
                {
                  step: "3",
                  title: "Doe een bod",
                  description: "Interessante klus? Doe een bod met jouw prijs en wanneer je kunt."
                },
                {
                  step: "4",
                  title: "Aan de slag",
                  description: "Klant kiest jou? Ga aan de slag en verdien geld met je skills."
                }
              ].map((step, i) => (
                <div key={i} className="flex gap-6 items-start group">
                  <div className="flex-shrink-0 w-16 h-16 bg-[#ffd900] text-black rounded-full flex items-center justify-center text-2xl font-black group-hover:scale-110 transition-transform">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2 text-[#ffd900]">{step.title}</h3>
                    <p className="text-gray-300 text-lg">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Earnings Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black mb-16 text-center">
              Wat kun je <span className="text-[#ffd900]">verdienen</span>?
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { service: "Meubelmontage", price: "€25-30", per: "per uur" },
                { service: "Schilderen", price: "€30-40", per: "per uur" },
                { service: "Verhuizen", price: "€28-35", per: "per uur" },
                { service: "Elektra", price: "€35-50", per: "per uur" },
                { service: "Loodgieter", price: "€40-55", per: "per uur" },
                { service: "Tuinonderhoud", price: "€25-32", per: "per uur" },
                { service: "Schoonmaken", price: "€22-28", per: "per uur" },
                { service: "Algemene Klus", price: "€28-38", per: "per uur" }
              ].map((item, i) => (
                <div key={i} className="bg-gray-800 rounded-xl p-6 border border-[#ffd900]/20 text-center hover:border-[#ffd900] transition-all">
                  <h3 className="font-bold mb-2 text-gray-300">{item.service}</h3>
                  <div className="text-3xl font-black text-[#ffd900] mb-1">{item.price}</div>
                  <div className="text-sm text-gray-400">{item.per}</div>
                </div>
              ))}
            </div>
            
            <p className="text-center text-gray-400 mt-8">
              * Gemiddelde prijzen. Jij bepaalt je eigen tarief per klus.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-[#ffd900] to-[#ffed4e] text-black">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              Klaar om te starten?
            </h2>
            <p className="text-xl md:text-2xl mb-10 opacity-90">
              Schrijf je nu in en ontvang vandaag nog je eerste klussen.
            </p>
            <Link 
              href="/word-klusser/aanmelden"
              className="inline-block bg-black text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-gray-800 transition-all hover:scale-105 shadow-2xl"
            >
              Word Klusser →
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black border-t border-gray-800 py-12 px-4">
          <div className="max-w-7xl mx-auto text-center text-gray-400">
            <p>© 2025 Doeklus. Klussen geregeld.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
