"use client";

import Link from "next/link";
import Header from "@/components/Header";

export default function BecomeKlusserPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Bold Hero */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden bg-black text-white">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#ff4d00] rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#ffd900] rounded-full blur-3xl animate-float" style={{animationDelay: '3s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block mb-6">
              <span className="bg-[#ffd900] text-black px-4 py-2 rounded-full text-sm font-bold">
                💰 VERDIEN TOT €50/UUR
              </span>
            </div>
            <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
              Word klusser.<br/>
              Bepaal je eigen succes.
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Kies je eigen klussen, werk wanneer je wilt, verdien goed. Start vandaag nog.
            </p>
             <div className="flex gap-4">
               <Link href="/word-klusser/aanmelden" className="bg-[#ff4d00] hover:bg-[#cc3d00] text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105">
                 Aanmelden →
               </Link>
               <a href="#hoe-werkt-het" className="bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-full font-bold text-lg transition-all">
                 Hoe werkt het
               </a>
             </div>
          </div>
        </div>
      </section>

      {/* Benefits - Black & Yellow Cards */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4">Waarom klusser worden?</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '💰', title: 'Goed verdienen', desc: 'Verdien €25-€50 per uur. Jij bepaalt je tarieven.' },
              { icon: '🕐', title: 'Flexibel werken', desc: 'Werk wanneer je wilt. Kies je eigen tijden.' },
              { icon: '✓', title: 'Kies je klussen', desc: 'Alleen klussen die bij je passen.' },
              { icon: '📅', title: 'Wekelijks betaald', desc: 'Direct resultaat van je werk zien.' }
            ].map((benefit, i) => (
              <div key={i} className="bg-black text-white rounded-3xl p-8 card-hover border-2 border-[#ffd900] hover:bg-[#ffd900] hover:text-black transition-all">
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="font-black text-xl mb-2">{benefit.title}</h3>
                <p className="text-gray-300">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="hoe-werkt-het" className="py-20 px-4 section-pattern bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4">In 4 stappen klusser</h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Meld je aan', desc: 'Vul het formulier in met je vaardigheden' },
              { step: '2', title: 'Screening', desc: 'We controleren je gegevens (max 48u)' },
              { step: '3', title: 'Profiel maken', desc: 'Voeg foto\'s en tarieven toe' },
              { step: '4', title: 'Start!', desc: 'Ontvang klusaanvragen en begin' }
            ].map((item, i) => (
              <div key={i} className="relative bg-white rounded-3xl p-8 text-center">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#ff4d00] text-white rounded-full flex items-center justify-center text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3 mt-4">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Earnings - Black & Yellow */}
      <section className="py-20 px-4 bg-black text-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-black mb-4">Hoeveel kan ik verdienen?</h2>
          </div>
          
          <div className="bg-gradient-to-r from-black to-gray-900 border-2 border-[#ffd900] rounded-3xl p-12">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { amount: '€1.200', hours: '10u/week', type: 'Bijverdienen' },
                { amount: '€2.400', hours: '20u/week', type: 'Part-time' },
                { amount: '€4.800', hours: '40u/week', type: 'Fulltime' }
              ].map((earning, i) => (
                <div key={i} className="text-center">
                  <div className="text-6xl font-black mb-2 text-[#ffd900]">{earning.amount}</div>
                  <div className="text-xl mb-1">{earning.hours}</div>
                  <div className="text-gray-300">{earning.type}</div>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-400 text-sm mt-8">
              * Gebaseerd op €30/uur gemiddeld. Tarieven variëren per dienst.
            </p>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4">Wat heb je nodig?</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-10">
              <h3 className="text-2xl font-bold mb-6 text-[#ff4d00]">✓ Verplicht</h3>
              <ul className="space-y-4">
                {['18 jaar of ouder', 'Geldig ID', 'Eigen gereedschap', 'KvK/ZZP nummer', 'Bankrekening'].map((req, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-[#ff4d00] text-white rounded-full flex items-center justify-center text-sm font-bold">✓</span>
                    <span className="text-lg">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-10">
              <h3 className="text-2xl font-bold mb-6 text-[#0066ff]">+ Gewenst</h3>
              <ul className="space-y-4">
                {['Ervaring/opleiding', 'Eigen vervoer', 'Goed communiceren', 'Betrouwbaar & netjes', 'Certificering*'].map((req, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-[#0066ff] text-white rounded-full flex items-center justify-center text-sm font-bold">+</span>
                    <span className="text-lg">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4">Verhalen van klussers</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Mark', job: 'Meubelmonteur', quote: 'Meer verdienen en werk wanneer ik wil. Perfect!', earnings: '€3.200/m' },
              { name: 'Sophie', job: 'Schilder', quote: 'Flexibiliteit is goud waard als moeder.', earnings: '€2.100/m' },
              { name: 'Ahmed', job: 'Klusser', quote: 'Eigen klantenkring opgebouwd. Top platform!', earnings: '€4.500/m' }
            ].map((story, i) => (
              <div key={i} className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border-2 border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ff4d00] to-[#0066ff] rounded-2xl flex items-center justify-center text-white font-black text-2xl mb-6">
                  {story.name.charAt(0)}
                </div>
                <p className="text-lg font-medium mb-4">"{story.quote}"</p>
                <div className="font-bold text-xl mb-1">{story.name}</div>
                <div className="text-gray-600 mb-3">{story.job}</div>
                <div className="text-2xl font-black text-[#ff4d00]">{story.earnings}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black mb-6">Klaar om te starten?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Sluit je aan bij 10.000+ klussers en start vandaag
          </p>
           <Link href="/word-klusser/aanmelden" className="inline-block bg-[#ff4d00] hover:bg-[#cc3d00] text-white px-10 py-5 rounded-full font-bold text-lg transition-all hover:scale-105">
             Aanmelden als klusser →
           </Link>
          <p className="mt-6 text-gray-400">
            ✓ Aanmelden duurt 5 minuten • ✓ Binnen 48 uur goedgekeurd
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-4">Veelgestelde vragen</h2>
          </div>
          
          <div className="space-y-4">
            {[
              { q: 'Moet ik ZZP\'er zijn?', a: 'Ja, dit is wettelijk verplicht. We helpen je graag op weg.' },
              { q: 'Hoelang duurt goedkeuring?', a: 'Meestal binnen 48 uur. Je krijgt per email bericht.' },
              { q: 'Wat kost het?', a: 'Aanmelden is gratis. We rekenen 15% commissie over je verdiensten.' },
              { q: 'Wanneer word ik uitbetaald?', a: 'Wekelijks op vrijdag. Geld van afgeronde klussen.' }
            ].map((faq, i) => (
              <details key={i} className="bg-white rounded-2xl p-6 cursor-pointer group">
                <summary className="font-bold text-lg flex justify-between items-center">
                  {faq.q}
                  <span className="text-[#ff4d00] group-open:rotate-180 transition-transform">↓</span>
                </summary>
                <p className="mt-4 text-gray-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
