import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-4 left-0 right-0 z-50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-lg px-6 py-3">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold text-gradient">
                Doeklus
              </Link>
              <Link href="/" className="text-sm font-medium hover:text-[#ff4d00] transition-colors">
                ← Terug naar home
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-black mb-8">Algemene Voorwaarden</h1>
          
          <div className="bg-white rounded-3xl p-8 md:p-12 space-y-8">
            <section>
              <p className="text-gray-600 mb-6">
                <strong>Laatst bijgewerkt:</strong> {new Date().toLocaleDateString('nl-NL', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p className="text-gray-700 leading-relaxed">
                Deze algemene voorwaarden zijn van toepassing op het gebruik van het platform Doeklus en alle diensten die via dit platform worden aangeboden.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">1. Definities</h2>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Doeklus:</strong> Het online platform dat klanten en klussers met elkaar verbindt</li>
                <li><strong>Klant:</strong> Persoon die via Doeklus een klus plaatst</li>
                <li><strong>Klusser:</strong> Zelfstandige professional die klussen uitvoert via Doeklus</li>
                <li><strong>Klus:</strong> De opdracht die een klant via het platform plaatst</li>
                <li><strong>Overeenkomst:</strong> De afspraak tussen klant en klusser voor een specifieke klus</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Toepasselijkheid</h2>
              <div className="space-y-4 text-gray-700">
                <p>Door gebruik te maken van Doeklus ga je akkoord met deze voorwaarden.</p>
                <p>Deze voorwaarden zijn van toepassing op:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Alle transacties via het platform</li>
                  <li>Alle communicatie tussen klanten en klussers</li>
                  <li>Het gebruik van alle functies van Doeklus</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Account en Registratie</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Je moet minimaal 18 jaar zijn om een account aan te maken</li>
                <li>Je bent verantwoordelijk voor de juistheid van je accountgegevens</li>
                <li>Je mag je account niet delen met anderen</li>
                <li>Je bent verantwoordelijk voor alle activiteiten onder je account</li>
                <li>Bij misbruik kunnen we je account opschorten of verwijderen</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Voor Klanten</h2>
              <div className="space-y-4 text-gray-700">
                <h3 className="font-semibold">4.1 Klus plaatsen</h3>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Geef een eerlijke en volledige beschrijving van de klus</li>
                  <li>Zorg voor veilige toegang tot de locatie</li>
                  <li>Wees aanwezig of regel toegang voor de klusser</li>
                </ul>

                <h3 className="font-semibold">4.2 Klusser selecteren</h3>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Je kunt vrij kiezen welke klusser je inhuurt</li>
                  <li>Check altijd beoordelingen en profielen</li>
                  <li>Communiceer duidelijk over verwachtingen</li>
                </ul>

                <h3 className="font-semibold">4.3 Betaling</h3>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Betaling gebeurt via het platform</li>
                  <li>Servicekosten: 15% van het uurtarief</li>
                  <li>Betaal alleen via het platform, nooit cash aan klusser</li>
                  <li>Geld wordt pas vrijgegeven na goedkeuring van de klus</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Voor Klussers</h2>
              <div className="space-y-4 text-gray-700">
                <h3 className="font-semibold">5.1 Vereisten</h3>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Je moet ingeschreven zijn bij de KvK</li>
                  <li>Je moet aansprakelijkheidsverzekering hebben</li>
                  <li>Je moet de benodigde certificaten/diploma's hebben</li>
                  <li>Je bent een zelfstandige, geen werknemer van Doeklus</li>
                </ul>

                <h3 className="font-semibold">5.2 Uitvoering</h3>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Voer klussen vakkundig en professioneel uit</li>
                  <li>Kom afspraken na</li>
                  <li>Communiceer tijdig bij problemen</li>
                  <li>Zorg voor je eigen gereedschap en materialen (tenzij anders afgesproken)</li>
                </ul>

                <h3 className="font-semibold">5.3 Commissie</h3>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Doeklus rekent 15% commissie over je uurtarief</li>
                  <li>Uitbetaling gebeurt wekelijks</li>
                  <li>Je ontvangt een factuur voor de commissie</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Annuleringsbeleid</h2>
              <div className="space-y-4 text-gray-700">
                <h3 className="font-semibold">Door klant:</h3>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Meer dan 24 uur voor afspraak: gratis annuleren</li>
                  <li>Binnen 24 uur: 50% annuleringskosten</li>
                  <li>No-show: 100% van afgesproken bedrag</li>
                </ul>

                <h3 className="font-semibold">Door klusser:</h3>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Bij annulering krijgt klant volledige terugbetaling</li>
                  <li>Herhaaldelijke annuleringen kunnen leiden tot accountopschorting</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Aansprakelijkheid</h2>
              <div className="space-y-4 text-gray-700">
                <p><strong>Doeklus is een platform en geen contractspartij.</strong></p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>De overeenkomst is tussen klant en klusser</li>
                  <li>Doeklus is niet aansprakelijk voor de kwaliteit van uitgevoerde klussen</li>
                  <li>Doeklus is niet aansprakelijk voor schade tijdens klussen</li>
                  <li>Wel bieden we een verzekering die schade tot €2.500 dekt</li>
                  <li>Klussers moeten eigen aansprakelijkheidsverzekering hebben</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Geschillen</h2>
              <div className="space-y-4 text-gray-700">
                <p>Bij een geschil:</p>
                <ol className="list-decimal list-inside ml-4 space-y-2">
                  <li>Probeer het eerst onderling op te lossen</li>
                  <li>Neem contact op met onze klantenservice</li>
                  <li>Wij bemiddelen en zoeken naar een oplossing</li>
                  <li>Bij geen oplossing kan het geschil voorgelegd worden aan de rechter</li>
                </ol>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Intellectueel Eigendom</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Alle content op Doeklus is eigendom van Doeklus B.V.</li>
                <li>Je mag content niet kopiëren zonder toestemming</li>
                <li>Foto's die je uploadt blijven jouw eigendom</li>
                <li>Je geeft Doeklus wel het recht om je foto's te gebruiken voor marketingdoeleinden</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Wijzigingen</h2>
              <p className="text-gray-700">
                We kunnen deze voorwaarden aanpassen. Bij belangrijke wijzigingen informeren we je via email. 
                Door het platform te blijven gebruiken na wijzigingen, ga je akkoord met de nieuwe voorwaarden.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">11. Toepasselijk Recht</h2>
              <p className="text-gray-700">
                Op deze voorwaarden is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter in Nederland.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">12. Contact</h2>
              <div className="bg-gray-50 rounded-xl p-6 space-y-2">
                <p className="text-gray-700"><strong>Doeklus B.V.</strong></p>
                <p className="text-gray-700">Email: info@doeklus.nl</p>
                <p className="text-gray-700">Telefoon: 020 123 4567</p>
                <p className="text-gray-700">KvK: 12345678</p>
                <p className="text-gray-700">BTW: NL123456789B01</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

