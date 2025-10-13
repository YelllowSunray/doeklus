"use client";

import Link from "next/link";
import Header from "@/components/Header";
import { useState } from "react";

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openQuestions, setOpenQuestions] = useState<Set<string>>(new Set());
  const [filteredTopics, setFilteredTopics] = useState(helpTopics);

  const toggleQuestion = (id: string) => {
    const newOpen = new Set(openQuestions);
    if (newOpen.has(id)) {
      newOpen.delete(id);
    } else {
      newOpen.add(id);
    }
    setOpenQuestions(newOpen);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const filtered = helpTopics.map(topic => ({
        ...topic,
        questions: topic.questions.filter(q => 
          q.question.toLowerCase().includes(query.toLowerCase()) ||
          q.answer.toLowerCase().includes(query.toLowerCase())
        )
      })).filter(topic => topic.questions.length > 0);
      setFilteredTopics(filtered);
    } else {
      setFilteredTopics(helpTopics);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

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

      {/* Popular Topics - Accordion Style */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black mb-12 text-center">Veelgestelde Vragen</h2>
          
          <div className="space-y-8">
            {filteredTopics.map((topic, i) => (
              <div key={i}>
                <h3 className="text-2xl font-bold mb-4">{topic.category}</h3>
                <div className="space-y-3">
                  {topic.questions.map((item, qi) => {
                    const questionId = `${i}-${qi}`;
                    const isOpen = openQuestions.has(questionId);
                    
                    return (
                      <div 
                        key={qi}
                        className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200"
                      >
                        <button
                          onClick={() => toggleQuestion(questionId)}
                          className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
                        >
                          <span className="font-medium pr-4">{item.question}</span>
                          <span className={`text-primary text-xl transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                            ↓
                          </span>
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-4">
                            <p className="text-gray-600">{item.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
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
      {
        question: 'Hoe plaats ik een klus?',
        answer: 'Ga naar "Klus plaatsen", beschrijf wat er moet gebeuren, kies een datum en locatie. Binnen 24 uur ontvang je biedingen van klussers.'
      },
      {
        question: 'Hoe kies ik een klusser?',
        answer: 'Bekijk de biedingen die je ontvangt. Vergelijk prijzen, beoordelingen en ervaring. Kies de klusser die het beste bij je past en accepteer het bod.'
      },
      {
        question: 'Wat kost Doeklus?',
        answer: 'Het plaatsen van een klus is gratis. Je betaalt alleen de afgesproken prijs aan de klusser. Wij rekenen een kleine servicekosten van 10% over de totaalprijs.'
      },
      {
        question: 'Hoe werkt de betaling?',
        answer: 'Betaal veilig online via de app na voltooiing van de klus. Je kunt betalen met iDEAL, creditcard of PayPal. Het geld wordt pas vrijgegeven als je tevreden bent.'
      }
    ]
  },
  {
    category: 'Account & Beveiliging',
    questions: [
      {
        question: 'Hoe maak ik een account?',
        answer: 'Klik op "Aanmelden" en kies tussen email/wachtwoord of Google Sign-In. Vul je gegevens in en je bent direct klaar om te starten.'
      },
      {
        question: 'Wachtwoord vergeten?',
        answer: 'Klik op "Wachtwoord vergeten" op de inlogpagina. Je ontvangt een email met een link om je wachtwoord te resetten.'
      },
      {
        question: 'Is mijn data veilig?',
        answer: 'Ja, al je gegevens worden versleuteld opgeslagen. We delen nooit je persoonlijke informatie met derden zonder jouw toestemming.'
      },
      {
        question: 'Hoe verwijder ik mijn account?',
        answer: 'Ga naar Profiel → Veiligheid → Account Verwijderen. Let op: dit is permanent en kan niet ongedaan gemaakt worden.'
      }
    ]
  },
  {
    category: 'Klussen & Prijzen',
    questions: [
      {
        question: 'Hoe bereken ik de prijs?',
        answer: 'Klussers stellen zelf hun uurtarief in (gemiddeld €25-50/uur). Je ontvangt biedingen met een totaalprijs voor de hele klus. Vergelijk en kies.'
      },
      {
        question: 'Kan ik een klus annuleren?',
        answer: 'Ja, tot 2 uur voor de afspraak kun je gratis annuleren. Annuleren binnen 2 uur kan kosten met zich meebrengen.'
      },
      {
        question: 'Wat als ik niet tevreden ben?',
        answer: 'Neem direct contact op met onze support. We zorgen voor een oplossing of volledige terugbetaling. Jouw tevredenheid is onze prioriteit.'
      },
      {
        question: 'Is er garantie op klussen?',
        answer: 'Ja, alle klussen hebben een 30-dagen garantie. Als er iets mis is, komt de klusser het gratis oplossen of krijg je je geld terug.'
      }
    ]
  },
  {
    category: 'Voor Klussers',
    questions: [
      {
        question: 'Hoe word ik klusser?',
        answer: 'Klik op "Word Klusser", maak een account, vul je vaardigheden in en je kunt direct aan de slag. Er is geen wachttijd.'
      },
      {
        question: 'Wanneer word ik uitbetaald?',
        answer: 'Je ontvangt betaling binnen 24 uur na voltooiing van de klus, zodra de klant de klus heeft goedgekeurd.'
      },
      {
        question: 'Hoe krijg ik meer klussen?',
        answer: 'Vul je profiel compleet in, voeg een foto toe, reageer snel op klussen, en bouw goede reviews op. Hoe beter je profiel, hoe meer klussen!'
      },
      {
        question: 'Wat zijn de commissiekosten?',
        answer: 'Wij rekenen 15% commissie op elke voltooide klus. Dit dekt platformkosten, betalingsverwerking, verzekering en klantenservice.'
      }
    ]
  }
];

