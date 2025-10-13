import type { Metadata } from "next";
import Header from "@/components/Header";
import { generateMetadata } from "@/lib/seo";

export const metadata: Metadata = generateMetadata({
  title: 'Privacybeleid - Jouw Privacy is Belangrijk',
  description: 'Lees ons privacybeleid en ontdek hoe Doeklus omgaat met jouw persoonlijke gegevens. Transparant en volgens AVG-wetgeving.',
  keywords: ['privacy', 'AVG', 'gegevensbescherming', 'privacybeleid'],
  noIndex: false
});

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-black mb-4">Privacybeleid</h1>
          <p className="text-gray-600 mb-8">Laatst bijgewerkt: 13 januari 2025</p>

          <div className="prose prose-lg max-w-none space-y-6">
            <section className="bg-white rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">1. Introductie</h2>
              <p className="text-gray-700 leading-relaxed">
                Doeklus ("wij", "ons") hecht groot belang aan de bescherming van je privacy. 
                In dit privacybeleid leggen we uit welke persoonsgegevens we verzamelen, 
                hoe we deze gebruiken en welke rechten je hebt.
              </p>
            </section>

            <section className="bg-white rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">2. Welke gegevens verzamelen we?</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Accountgegevens:</strong> naam, e-mailadres, telefoonnummer</li>
                <li><strong>Profielinformatie:</strong> foto, vaardigheden (voor klussers), adres</li>
                <li><strong>Klusgegevens:</strong> klussen die je plaatst of waarop je biedt</li>
                <li><strong>Betalingsgegevens:</strong> transactiehistorie (geen creditcardnummers)</li>
                <li><strong>Technische gegevens:</strong> IP-adres, browsertype, apparaatinformatie</li>
                <li><strong>Communicatie:</strong> berichten tussen klanten en klussers</li>
              </ul>
            </section>

            <section className="bg-white rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">3. Hoe gebruiken we je gegevens?</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Het aanmaken en beheren van je account</li>
                <li>Het matchen van klussen met klussers</li>
                <li>Het verwerken van betalingen</li>
                <li>Het verbeteren van onze diensten</li>
                <li>Het versturen van belangrijke updates</li>
                <li>Het naleven van wettelijke verplichtingen</li>
              </ul>
            </section>

            <section className="bg-white rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">4. Delen van gegevens</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                We delen je gegevens alleen in de volgende gevallen:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Met klussers/klanten bij het matchen van klussen (naam, locatie, klusinformatie)</li>
                <li>Met betalingsproviders voor het verwerken van transacties</li>
                <li>Met autoriteiten als dit wettelijk verplicht is</li>
                <li>Nooit met derden voor marketing zonder jouw toestemming</li>
              </ul>
            </section>

            <section className="bg-white rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">5. Beveiliging</h2>
              <p className="text-gray-700 leading-relaxed">
                We nemen passende technische en organisatorische maatregelen om je gegevens 
                te beschermen tegen ongeautoriseerde toegang, verlies of wijziging. Dit omvat 
                encryptie, beveiligde servers en regelmatige security audits.
              </p>
            </section>

            <section className="bg-white rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">6. Je rechten (AVG)</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Je hebt de volgende rechten met betrekking tot je persoonlijke gegevens:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Inzage:</strong> Je kunt opvragen welke gegevens we van je hebben</li>
                <li><strong>Correctie:</strong> Je kunt onjuiste gegevens laten aanpassen</li>
                <li><strong>Verwijdering:</strong> Je kunt je account en gegevens laten verwijderen</li>
                <li><strong>Bezwaar:</strong> Je kunt bezwaar maken tegen bepaalde verwerkingen</li>
                <li><strong>Dataportabiliteit:</strong> Je kunt je gegevens in een gestructureerd formaat ontvangen</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Neem contact op via <a href="mailto:privacy@doeklus.nl" className="text-[#ff4d00] hover:underline">privacy@doeklus.nl</a> om je rechten uit te oefenen.
              </p>
            </section>

            <section className="bg-white rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">7. Cookies</h2>
              <p className="text-gray-700 leading-relaxed">
                We gebruiken cookies om onze website te laten functioneren en je ervaring te verbeteren. 
                Je kunt cookies beheren via je browserinstellingen. Essentiële cookies kunnen niet 
                worden uitgeschakeld zonder dat de functionaliteit wordt beïnvloed.
              </p>
            </section>

            <section className="bg-white rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">8. Bewaartermijn</h2>
              <p className="text-gray-700 leading-relaxed">
                We bewaren je gegevens niet langer dan noodzakelijk. Accountgegevens bewaren we 
                zolang je account actief is. Na verwijdering van je account bewaren we sommige 
                gegevens nog maximaal 7 jaar voor administratieve en juridische doeleinden.
              </p>
            </section>

            <section className="bg-white rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">9. Wijzigingen</h2>
              <p className="text-gray-700 leading-relaxed">
                We kunnen dit privacybeleid van tijd tot tijd aanpassen. Belangrijke wijzigingen 
                communiceren we via e-mail. We raden je aan om dit beleid regelmatig te controleren.
              </p>
            </section>

            <section className="bg-white rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">10. Contact</h2>
              <p className="text-gray-700 leading-relaxed">
                Heb je vragen over ons privacybeleid of je gegevens? Neem contact op:
              </p>
              <div className="mt-4 text-gray-700">
                <p><strong>Email:</strong> <a href="mailto:privacy@doeklus.nl" className="text-[#ff4d00] hover:underline">privacy@doeklus.nl</a></p>
                <p><strong>Telefoon:</strong> +31 (0)20 123 4567</p>
                <p className="mt-2">
                  <strong>Doeklus B.V.</strong><br />
                  Amsterdam, Nederland<br />
                  KvK: 12345678
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
