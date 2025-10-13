import type { Metadata } from "next";
import Header from "@/components/Header";
import { generateMetadata } from "@/lib/seo";

export const metadata: Metadata = generateMetadata({
  title: 'Algemene Voorwaarden - Doeklus Gebruikersvoorwaarden',
  description: 'Lees de algemene voorwaarden van Doeklus. Ontdek de regels en afspraken voor het gebruik van ons klussenplatform.',
  keywords: ['voorwaarden', 'gebruikersvoorwaarden', 'algemene voorwaarden', 'terms'],
  noIndex: false
});

export default function Voorwaarden() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-black mb-4">Algemene Voorwaarden</h1>
          <p className="text-gray-600 mb-8">Laatst bijgewerkt: 13 januari 2025</p>

          <div className="prose prose-lg max-w-none space-y-6">
            <section className="bg-white rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">1. Algemeen</h2>
              <p className="text-gray-700 leading-relaxed">
                Deze algemene voorwaarden zijn van toepassing op het gebruik van het Doeklus platform, 
                geëxploiteerd door Doeklus B.V. ("Doeklus", "wij", "ons"). Door gebruik te maken van 
                onze diensten, ga je akkoord met deze voorwaarden.
              </p>
            </section>

            <section className="bg-white rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">2. Definities</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Platform:</strong> De website en mobiele applicatie van Doeklus</li>
                <li><strong>Klant:</strong> Gebruiker die een klus plaatst</li>
                <li><strong>Klusser:</strong> Gebruiker die klussen uitvoert</li>
                <li><strong>Klus:</strong> Opdracht die via het platform wordt aangeboden</li>
                <li><strong>Overeenkomst:</strong> Akkoord tussen klant en klusser voor een klus</li>
              </ul>
            </section>

            <section className="bg-white rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">3. Gebruik van het Platform</h2>
              <p className="text-gray-700 mb-3"><strong>3.1 Account</strong></p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Je moet minimaal 18 jaar zijn om een account aan te maken</li>
                <li>Je bent verantwoordelijk voor het geheimhouden van je inloggegevens</li>
                <li>Je mag slechts één account aanmaken</li>
                <li>Je verstrekt juiste en actuele informatie</li>
              </ul>
              
              <p className="text-gray-700 mb-3"><strong>3.2 Verboden Gebruik</strong></p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Het plaatsen van illegale of frauduleuze opdrachten</li>
                <li>Het omzeilen van het platform voor directe betalingen</li>
                <li>Het plaatsen van misleidende informatie</li>
                <li>Het schenden van intellectuele eigendomsrechten</li>
                <li>Het versturen van spam of ongepaste berichten</li>
              </ul>
            </section>

            <section className="bg-white rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">4. Voor Klanten</h2>
              <p className="text-gray-700 mb-3"><strong>4.1 Klus Plaatsen</strong></p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Je geeft een nauwkeurige en volledige beschrijving van de klus</li>
                <li>Je stelt een realistisch budget vast</li>
                <li>Je bent beschikbaar op de aangegeven datum en tijd</li>
              </ul>
              
              <p className="text-gray-700 mb-3"><strong>4.2 Selectie en Betaling</strong></p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Je kiest zelf welke klusser de klus uitvoert</li>
                <li>Je betaalt vooraf via het platform (veilig in escrow)</li>
                <li>Geld wordt vrijgegeven na succesvolle voltooiing</li>
                <li>Bij annulering binnen 24 uur kunnen kosten in rekening worden gebracht</li>
              </ul>
            </section>

            <section className="bg-white rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">5. Voor Klussers</h2>
              <p className="text-gray-700 mb-3"><strong>5.1 Kwaliteit</strong></p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Je voert klussen professioneel en vakkundig uit</li>
                <li>Je beschikt over de benodigde vaardigheden en certificaten</li>
                <li>Je hebt een geldige aansprakelijkheidsverzekering</li>
                <li>Je houdt je aan afgesproken tijden en deadlines</li>
              </ul>
              
              <p className="text-gray-700 mb-3"><strong>5.2 Bieden en Uitvoering</strong></p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Je doet realistische biedingen op basis van de klus</li>
                <li>Je communiceert duidelijk met de klant</li>
                <li>Je meldt problemen of vertragingen direct</li>
              </ul>

              <p className="text-gray-700 mb-3"><strong>5.3 Servicefee</strong></p>
              <p className="text-gray-700">
                Doeklus rekent een servicefee van 10% op elke voltooide klus. 
                Deze wordt automatisch ingehouden bij uitbetaling.
              </p>
            </section>

            <section className="bg-white rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">6. Betalingen</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Alle betalingen verlopen via het platform</li>
                <li>Geld wordt pas vrijgegeven na voltooiing van de klus</li>
                <li>Bij geschillen kan Doeklus bemiddelen</li>
                <li>Terugbetalingen worden per geval beoordeeld</li>
                <li>Prijzen zijn inclusief BTW waar van toepassing</li>
              </ul>
            </section>

            <section className="bg-white rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">7. Aansprakelijkheid</h2>
              <p className="text-gray-700 mb-3"><strong>7.1 Role van Doeklus</strong></p>
              <p className="text-gray-700 mb-4">
                Doeklus is een platform dat klanten en klussers met elkaar verbindt. 
                De overeenkomst over de klus wordt direct tussen klant en klusser aangegaan. 
                Doeklus is geen partij bij deze overeenkomst.
              </p>
              
              <p className="text-gray-700 mb-3"><strong>7.2 Beperking</strong></p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Doeklus is niet aansprakelijk voor de kwaliteit van uitgevoerde klussen</li>
                <li>Doeklus is niet aansprakelijk voor schade ontstaan tijdens klussen</li>
                <li>Doeklus garandeert niet de betrouwbaarheid van gebruikers</li>
                <li>Doeklus is niet aansprakelijk voor indirecte schade</li>
              </ul>
            </section>

            <section className="bg-white rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">8. Reviews en Reputatie</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Reviews moeten eerlijk en oprecht zijn</li>
                <li>Nepreviews of manipulatie is verboden</li>
                <li>Doeklus kan ongepaste reviews verwijderen</li>
                <li>Reviews zijn openbaar zichtbaar</li>
              </ul>
            </section>

            <section className="bg-white rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">9. Geschillen</h2>
              <p className="text-gray-700 leading-relaxed">
                Bij geschillen tussen klant en klusser, probeer eerst onderling tot een oplossing te komen. 
                Lukt dit niet, dan kan Doeklus als bemiddelaar optreden. Bij aanhoudende geschillen 
                is Nederlands recht van toepassing en is de rechtbank Amsterdam bevoegd.
              </p>
            </section>

            <section className="bg-white rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">10. Wijzigingen en Beëindiging</h2>
              <p className="text-gray-700 mb-3"><strong>10.1 Wijzigingen</strong></p>
              <p className="text-gray-700 mb-4">
                Doeklus kan deze voorwaarden wijzigen. Belangrijke wijzigingen worden van tevoren 
                aangekondigd via e-mail of een melding op het platform.
              </p>
              
              <p className="text-gray-700 mb-3"><strong>10.2 Beëindiging</strong></p>
              <p className="text-gray-700">
                Zowel jij als Doeklus kan het account beëindigen. Bij schending van deze voorwaarden 
                kan Doeklus je account onmiddellijk opschorten of verwijderen.
              </p>
            </section>

            <section className="bg-white rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">11. Contact</h2>
              <p className="text-gray-700 leading-relaxed">
                Vragen over deze voorwaarden? Neem contact op:
              </p>
              <div className="mt-4 text-gray-700">
                <p><strong>Email:</strong> <a href="mailto:info@doeklus.nl" className="text-[#ff4d00] hover:underline">info@doeklus.nl</a></p>
                <p><strong>Telefoon:</strong> +31 (0)20 123 4567</p>
                <p className="mt-2">
                  <strong>Doeklus B.V.</strong><br />
                  Amsterdam, Nederland<br />
                  KvK: 12345678<br />
                  BTW: NL123456789B01
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
