"use client";

import Header from "@/components/Header";

export default function SafetyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-black mb-6">Veiligheid & Vertrouwen</h1>
          <p className="text-xl text-gray-600">
            Uw veiligheid is onze prioriteit. Ontdek hoe we dit waarborgen.
          </p>
        </div>
      </section>

      {/* Safety Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Veiligheidsmaatregelen</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🔍",
                title: "ID Verificatie",
                desc: "Alle klussers worden gecontroleerd op identiteit en achtergrond"
              },
              {
                icon: "🛡️",
                title: "Verzekering",
                desc: "Alle werkzaamheden zijn gedekt door onze aansprakelijkheidsverzekering"
              },
              {
                icon: "⭐",
                title: "Beoordelingen",
                desc: "Transparant beoordelingssysteem voor kwaliteit en betrouwbaarheid"
              },
              {
                icon: "💳",
                title: "Veilige Betalingen",
                desc: "Alle transacties worden beveiligd via versleutelde verbindingen"
              },
              {
                icon: "🚨",
                title: "24/7 Support",
                desc: "Ons team is altijd beschikbaar voor vragen en hulp"
              },
              {
                icon: "🔒",
                title: "Privacy Bescherming",
                desc: "Uw gegevens worden veilig opgeslagen en nooit gedeeld"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Background Checks */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Achtergrondcontroles</h2>
              <p className="text-gray-600 mb-6">
                Elke klusser doorloopt een uitgebreide screening voordat ze kunnen werken op ons platform.
              </p>
              
              <div className="space-y-4">
                {[
                  "Identiteitsverificatie via officiële documenten",
                  "Crimineel antecedentenonderzoek",
                  "Referentiecontrole van vorige werkgevers",
                  "Beoordeling van vaardigheden en ervaring"
                ].map((check, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-gray-700">{check}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4">Verificatie Status</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>ID Geverifieerd</span>
                  <span className="text-success font-bold">✓</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Achtergrond Check</span>
                  <span className="text-success font-bold">✓</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Verzekerd</span>
                  <span className="text-success font-bold">✓</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Actief Platform</span>
                  <span className="text-success font-bold">✓</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Verzekering & Aansprakelijkheid</h2>
          <p className="text-gray-600 mb-12 max-w-3xl mx-auto">
            Alle werkzaamheden via Doeklus zijn gedekt door onze uitgebreide verzekering. 
            U kunt met vertrouwen klussen laten uitvoeren.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Aansprakelijkheidsverzekering",
                amount: "€ 2.5 miljoen",
                desc: "Dekking voor schade aan uw eigendom"
              },
              {
                title: "Personenschade",
                amount: "€ 1 miljoen", 
                desc: "Dekking voor letsel tijdens werkzaamheden"
              },
              {
                title: "Eigen schade",
                amount: "€ 25.000",
                desc: "Dekking voor schade aan gereedschap"
              }
            ].map((coverage, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold mb-2">{coverage.title}</h3>
                <div className="text-3xl font-black text-primary mb-4">{coverage.amount}</div>
                <p className="text-gray-600">{coverage.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reporting */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Probleem Melden</h2>
          <p className="text-gray-600 mb-8">
            Ziet u iets verdachts of heeft u een klacht? Meld het direct bij ons.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-2xl">
              <h3 className="text-xl font-bold mb-4">Direct Melden</h3>
              <p className="text-gray-600 mb-6">
                Voor urgente veiligheidsproblemen
              </p>
              <button className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-dark transition-colors">
                Meld Probleem
              </button>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-2xl">
              <h3 className="text-xl font-bold mb-4">Contact Support</h3>
              <p className="text-gray-600 mb-6">
                Voor vragen of algemene klachten
              </p>
              <button className="bg-secondary text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-600 transition-colors">
                Contact
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
