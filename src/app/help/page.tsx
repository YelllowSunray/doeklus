"use client";

import Link from "next/link";
import { useState } from "react";

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Floating Header */}
      <header className="fixed top-4 left-0 right-0 z-50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-lg px-6 py-3">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold text-gradient">
                Doeklus
              </Link>
              <nav className="hidden md:flex gap-8 items-center">
                <Link href="/diensten" className="text-sm font-medium hover:text-[#ff4d00] transition-colors">
                  Diensten
                </Link>
                <Link href="/prijzen" className="text-sm font-medium hover:text-[#ff4d00] transition-colors">
                  Prijzen
                </Link>
                <Link href="/hoe-werkt-het" className="text-sm font-medium hover:text-[#ff4d00] transition-colors">
                  Hoe werkt het
                </Link>
              </nav>
              <div className="flex items-center gap-3">
                <Link href="/inloggen" className="text-sm font-medium hover:text-[#ff4d00] transition-colors">
                  Inloggen
                </Link>
                <Link href="/aanmelden" className="bg-[#ff4d00] hover:bg-[#cc3d00] text-white px-5 py-2 rounded-full text-sm font-semibold transition-all">
                  Start nu
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-black mb-6">Hulp nodig?</h1>
          <p className="text-xl text-gray-600 mb-8">We helpen je graag. Snel antwoord op je vraag.</p>
          
          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Zoek in help artikelen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-5 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#ff4d00] text-lg"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#ff4d00] text-white px-6 py-2 rounded-xl font-semibold hover:bg-[#cc3d00] transition-colors">
                Zoek
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '📱', title: 'Klant support', desc: 'Hulp bij je klus', link: '/help/klant' },
              { icon: '🔨', title: 'Klusser support', desc: 'Vragen over werken', link: '/help/klusser' },
              { icon: '💬', title: 'Direct contact', desc: 'Chat met ons team', link: '/contact' }
            ].map((item, i) => (
              <Link 
                key={i}
                href={item.link}
                className="bg-white rounded-3xl p-8 card-hover border border-gray-200 text-center"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black mb-12 text-center">Populaire onderwerpen</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {helpTopics.map((topic, i) => (
              <div key={i} className="border-b border-gray-200 pb-8 last:border-0">
                <h3 className="text-2xl font-bold mb-6">{topic.category}</h3>
                <div className="space-y-4">
                  {topic.questions.map((q, qi) => (
                    <Link 
                      key={qi}
                      href={`/help/${topic.category.toLowerCase().replace(' ', '-')}/${qi}`}
                      className="block p-4 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{q}</span>
                        <span className="text-[#ff4d00]">→</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-black mb-12 text-center">Nog steeds vragen?</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-8">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-2xl font-bold mb-3">Live chat</h3>
              <p className="text-gray-600 mb-6">Chat direct met ons team. Gemiddelde reactietijd: 2 minuten.</p>
              <button className="bg-[#ff4d00] hover:bg-[#cc3d00] text-white px-6 py-3 rounded-full font-semibold transition-all">
                Start chat
              </button>
            </div>

            <div className="bg-white rounded-3xl p-8">
              <div className="text-4xl mb-4">✉️</div>
              <h3 className="text-2xl font-bold mb-3">Email ons</h3>
              <p className="text-gray-600 mb-6">Stuur een email. We reageren binnen 24 uur.</p>
              <Link href="mailto:help@doeklus.nl" className="inline-block border-2 border-black hover:bg-black hover:text-white px-6 py-3 rounded-full font-semibold transition-all">
                help@doeklus.nl
              </Link>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-br from-[#ff4d00] to-[#0066ff] rounded-3xl p-8 text-white text-center">
            <div className="text-4xl mb-4">📞</div>
            <h3 className="text-2xl font-bold mb-3">Telefonische support</h3>
            <p className="text-white/90 mb-4">Ma-vr 9:00-18:00 • Za 10:00-16:00</p>
            <div className="text-3xl font-black">020 123 4567</div>
          </div>
        </div>
      </section>
    </div>
  );
}

const helpTopics = [
  {
    category: 'Aan de slag',
    questions: [
      'Hoe plaats ik een klus?',
      'Hoe kies ik een klusser?',
      'Wat kost Doeklus?',
      'Hoe werkt de betaling?'
    ]
  },
  {
    category: 'Account & Beveiliging',
    questions: [
      'Hoe maak ik een account?',
      'Wachtwoord vergeten?',
      'Is mijn data veilig?',
      'Hoe verwijder ik mijn account?'
    ]
  },
  {
    category: 'Klussen & Prijzen',
    questions: [
      'Hoe bereken ik de prijs?',
      'Kan ik een klus annuleren?',
      'Wat als ik niet tevreden ben?',
      'Is er garantie op klussen?'
    ]
  },
  {
    category: 'Voor Klussers',
    questions: [
      'Hoe word ik klusser?',
      'Wanneer word ik uitbetaald?',
      'Hoe krijg ik meer klussen?',
      'Wat zijn de commissiekosten?'
    ]
  }
];

