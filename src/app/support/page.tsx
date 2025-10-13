"use client";

import Header from "@/components/Header";
import { useState, useEffect } from "react";

export default function SupportPage() {
  // SEO metadata via document title
  useEffect(() => {
    document.title = 'Support & Hulp - Veelgestelde vragen | Doeklus';
  }, []);
  const [activeTab, setActiveTab] = useState('faq');

  const faqs = [
    {
      question: "Hoe boek ik een klusser?",
      answer: "Selecteer een dienst, kies een datum en tijd, en boek direct. De klusser neemt contact met u op."
    },
    {
      question: "Wat zijn de kosten?",
      answer: "Kosten variëren per dienst. U ziet altijd de exacte prijs voordat u boekt. Geen verborgen kosten."
    },
    {
      question: "Kan ik een boeking annuleren?",
      answer: "Ja, u kunt tot 2 uur voor de afspraak gratis annuleren. Later annuleren kan extra kosten met zich meebrengen."
    },
    {
      question: "Hoe werkt de betaling?",
      answer: "U betaalt veilig via onze app. De klusser ontvangt het geld na voltooiing van de klus."
    },
    {
      question: "Wat als ik niet tevreden ben?",
      answer: "Neem contact op met ons support team. Wij zorgen voor een oplossing of volledige terugbetaling."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-black mb-6">Support Center</h1>
          <p className="text-xl text-gray-600">
            Vind antwoorden op uw vragen of neem contact op
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center">
            <div className="flex bg-gray-100 rounded-lg p-1">
              {[
                { id: 'faq', label: 'FAQ' },
                { id: 'contact', label: 'Contact' },
                { id: 'troubleshooting', label: 'Probleem Oplossen' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-md font-medium transition-colors ${
                    activeTab === tab.id 
                      ? 'bg-white text-primary shadow-sm' 
                      : 'text-gray-600 hover:text-primary'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Tab */}
      {activeTab === 'faq' && (
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Veelgestelde Vragen</h2>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="text-xl font-bold mb-4">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Tab */}
      {activeTab === 'contact' && (
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Contact Opnemen</h2>
            
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-6">Direct Contact</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary text-xl">📞</span>
                    </div>
                    <div>
                      <h4 className="font-bold">Telefoon</h4>
                      <p className="text-gray-600">+31 (0)20 123 4567</p>
                      <p className="text-sm text-gray-500">Ma-Vr: 09:00-18:00</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary text-xl">✉️</span>
                    </div>
                    <div>
                      <h4 className="font-bold">E-mail</h4>
                      <p className="text-gray-600">support@doeklus.nl</p>
                      <p className="text-sm text-gray-500">Reactie binnen 24 uur</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary text-xl">💬</span>
                    </div>
                    <div>
                      <h4 className="font-bold">Live Chat</h4>
                      <p className="text-gray-600">Direct beschikbaar</p>
                      <p className="text-sm text-gray-500">Ma-Vr: 09:00-18:00</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-2xl font-bold mb-6">Stuur een Bericht</h3>
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Onderwerp</label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                      <option>Algemene vraag</option>
                      <option>Technisch probleem</option>
                      <option>Klacht</option>
                      <option>Feedback</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">E-mail</label>
                    <input 
                      type="email" 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="uw@email.nl"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Bericht</label>
                    <textarea 
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Beschrijf uw vraag of probleem..."
                    />
                  </div>
                  
                  <button className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-dark transition-colors">
                    Verstuur Bericht
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Troubleshooting Tab */}
      {activeTab === 'troubleshooting' && (
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Probleem Oplossen</h2>
            
            <div className="space-y-8">
              {[
                {
                  title: "App werkt niet goed",
                  steps: [
                    "Controleer uw internetverbinding",
                    "Herstart de app volledig",
                    "Update naar de nieuwste versie",
                    "Verwijder en installeer de app opnieuw"
                  ]
                },
                {
                  title: "Betaling mislukt",
                  steps: [
                    "Controleer uw betaalgegevens",
                    "Zorg dat er voldoende saldo is",
                    "Probeer een andere betaalmethode",
                    "Neem contact op met uw bank"
                  ]
                },
                {
                  title: "Klusser komt niet opdagen",
                  steps: [
                    "Wacht 15 minuten na afspraaktijd",
                    "Neem contact op met de klusser",
                    "Meld het probleem bij ons support team",
                    "Wij regelen een vervanger of terugbetaling"
                  ]
                }
              ].map((troubleshoot, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="text-xl font-bold mb-4">{troubleshoot.title}</h3>
                  <ol className="space-y-2">
                    {troubleshoot.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {stepIndex + 1}
                        </span>
                        <span className="text-gray-600">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
