"use client";

import type { Metadata } from "next";
import { useState } from "react";
import Header from "@/components/Header";
import { generateFAQSchema } from "@/lib/seo";

export default function Help() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const helpTopics = [
    {
      question: "Hoe plaats ik een klus?",
      answer: "Log in op je account, klik op '+ Nieuwe Klus', vul de details in (type klus, beschrijving, locatie, datum en budget), en plaats de klus. Binnen enkele uren ontvang je biedingen van klussers."
    },
    {
      question: "Hoe word ik klusser?",
      answer: "Klik op 'Word Klusser' in het menu, meld je aan met je gegevens, doorloop de onboarding (vertel over je vaardigheden en ervaring), en je kunt direct beginnen met bieden op klussen."
    },
    {
      question: "Wat kost het gebruik van Doeklus?",
      answer: "Voor klanten is het plaatsen van een klus gratis. Je betaalt alleen de afgesproken prijs aan de klusser. Voor klussers rekenen we een kleine servicefee van 10% per klus."
    },
    {
      question: "Hoe werkt de betaling?",
      answer: "Na het accepteren van een bod betaal je veilig via iDEAL of creditcard. Het geld wordt pas vrijgegeven aan de klusser nadat de klus is voltooid en jij akkoord geeft."
    },
    {
      question: "Zijn klussers verzekerd?",
      answer: "Alle klussers op ons platform moeten aantonen dat ze een geldige aansprakelijkheidsverzekering hebben. Controleer altijd het profiel van de klusser voordat je een bod accepteert."
    },
    {
      question: "Wat als ik niet tevreden ben?",
      answer: "Als je niet tevreden bent, neem dan eerst contact op met de klusser om het op te lossen. Lukt dit niet? Neem contact op met onze klantenservice via het contactformulier."
    },
    {
      question: "Kan ik een klus annuleren?",
      answer: "Ja, tot 24 uur voor de afgesproken startdatum kun je een klus kosteloos annuleren. Bij annulering binnen 24 uur kunnen kosten in rekening worden gebracht."
    },
    {
      question: "Hoe snel krijg ik een reactie?",
      answer: "Gemiddeld ontvang je binnen 2-4 uur de eerste biedingen. Urgente klussen kunnen binnen 30 minuten een reactie krijgen."
    },
    {
      question: "Kan ik meerdere biedingen ontvangen?",
      answer: "Ja! Je ontvangt meerdere biedingen van verschillende klussers. Vergelijk prijzen, reviews en beschikbaarheid voordat je kiest."
    },
    {
      question: "Hoe werken de reviews?",
      answer: "Na elke voltooide klus kunnen zowel klant als klusser elkaar beoordelen. Reviews zijn openbaar en helpen anderen bij het maken van een keuze."
    },
    {
      question: "Wat voor klussen kan ik plaatsen?",
      answer: "Bijna alles! Van meubelmontage en schilderen tot verhuizen en tuinonderhoud. Als het niet in onze lijst staat, kun je een aangepaste klus plaatsen."
    },
    {
      question: "Moet ik thuis zijn tijdens de klus?",
      answer: "Dat hangt af van de klus. Bespreek dit vooraf met de klusser. Voor sommige klussen moet je aanwezig zijn, voor andere kan de klusser zelfstandig werken."
    },
    {
      question: "Hoe wijzig ik mijn profiel?",
      answer: "Ga naar 'Mijn Account' in het menu, klik op 'Profiel bewerken'. Hier kun je je gegevens, foto en voorkeuren aanpassen."
    },
    {
      question: "Is mijn persoonlijke informatie veilig?",
      answer: "Ja, we nemen privacy zeer serieus. Je gegevens worden versleuteld opgeslagen en nooit gedeeld met derden zonder jouw toestemming. Lees ons privacybeleid voor meer info."
    },
    {
      question: "Kan ik een klusser terugvragen?",
      answer: "Absoluut! Als je tevreden was, kun je de klusser een bericht sturen voor toekomstige klussen. Veel klanten bouwen een vaste relatie op met hun favoriete klussers."
    }
  ];

  const filteredTopics = searchQuery
    ? helpTopics.filter(
        topic =>
          topic.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          topic.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : helpTopics;

  const faqSchema = generateFAQSchema(helpTopics);

  return (
    <>
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Header />
        
        <main className="pt-32 pb-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-black mb-4">Hoe kunnen we helpen?</h1>
            <p className="text-xl text-gray-600 mb-8">
              Veelgestelde vragen en antwoorden
            </p>

            {/* Search Bar */}
            <div className="mb-12">
              <input
                type="text"
                placeholder="Zoek in veelgestelde vragen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-full border-2 border-gray-200 focus:border-[#ff4d00] focus:outline-none text-lg"
              />
            </div>

            {/* FAQ Accordion */}
            <div className="space-y-4">
              {filteredTopics.map((topic, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <button
                    onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center gap-4"
                  >
                    <h3 className="font-bold text-lg">{topic.question}</h3>
                    <span className="text-2xl flex-shrink-0">
                      {expandedIndex === index ? "−" : "+"}
                    </span>
                  </button>
                  {expandedIndex === index && (
                    <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                      {topic.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredTopics.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-gray-500">
                  Geen resultaten gevonden voor "{searchQuery}"
                </p>
                <p className="text-gray-400 mt-2">
                  Probeer een andere zoekterm of neem contact met ons op
                </p>
              </div>
            )}

            {/* Contact CTA */}
            <div className="mt-16 bg-gradient-to-r from-[#ff4d00] to-[#ff6b35] rounded-2xl p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-3">Nog vragen?</h2>
              <p className="mb-6 opacity-90">
                Ons team staat voor je klaar om te helpen
              </p>
              <a
                href="/contact"
                className="inline-block bg-white text-[#ff4d00] px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors"
              >
                Neem contact op
              </a>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
