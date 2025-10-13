import Link from "next/link";

export default function PrivacyPage() {
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
          <h1 className="text-5xl font-black mb-8">Privacybeleid</h1>
          
          <div className="bg-white rounded-3xl p-8 md:p-12 space-y-8">
            <section>
              <p className="text-gray-600 mb-6">
                <strong>Laatst bijgewerkt:</strong> {new Date().toLocaleDateString('nl-NL', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p className="text-gray-700 leading-relaxed">
                Doeklus respecteert je privacy. Dit privacybeleid legt uit hoe we je persoonlijke gegevens verzamelen, gebruiken en beschermen wanneer je onze diensten gebruikt.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">1. Welke gegevens verzamelen we?</h2>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="font-semibold mb-2">Accountgegevens</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Naam en e-mailadres</li>
                    <li>Telefoonnummer (optioneel)</li>
                    <li>Profielfoto (optioneel)</li>
                    <li>Locatiegegevens (postcode/stad)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Klusgegevens</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Beschrijvingen van klussen</li>
                    <li>Foto's van klussen</li>
                    <li>Locatie waar klus uitgevoerd moet worden</li>
                    <li>Communicatie tussen klanten en klussers</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Betalingsgegevens</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Betaalgeschiedenis</li>
                    <li>Factuurinformatie</li>
                    <li>Bankrekeningnummer (alleen voor klussers)</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Hoe gebruiken we je gegevens?</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Om je account te beheren en je toegang te geven tot onze diensten</li>
                <li>Om klanten en klussers met elkaar te verbinden</li>
                <li>Om betalingen te verwerken</li>
                <li>Om je te informeren over je klussen en boekingen</li>
                <li>Om de kwaliteit van onze dienst te verbeteren</li>
                <li>Om te voldoen aan wettelijke verplichtingen</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Met wie delen we je gegevens?</h2>
              <div className="space-y-4 text-gray-700">
                <p>We delen je gegevens alleen wanneer noodzakelijk:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Met klussers:</strong> Je naam, locatie en klusdetails worden gedeeld met klussers die je selecteert</li>
                  <li><strong>Betalingsproviders:</strong> Voor het verwerken van betalingen</li>
                  <li><strong>Cloudopslag:</strong> We gebruiken Firebase (Google) voor veilige gegevensopslag</li>
                  <li><strong>Wettelijke verplichtingen:</strong> Wanneer dit wettelijk verplicht is</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Hoe beschermen we je gegevens?</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Alle gegevens worden versleuteld opgeslagen</li>
                <li>We gebruiken HTTPS voor veilige communicatie</li>
                <li>Toegang tot gegevens is strikt beperkt</li>
                <li>Regelmatige beveiligingscontroles</li>
                <li>Twee-factor authenticatie voor accounts (binnenkort)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Je rechten</h2>
              <p className="text-gray-700 mb-4">Volgens de AVG (GDPR) heb je de volgende rechten:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li><strong>Inzagerecht:</strong> Je kunt opvragen welke gegevens we van je hebben</li>
                <li><strong>Rectificatie:</strong> Je kunt onjuiste gegevens laten corrigeren</li>
                <li><strong>Verwijdering:</strong> Je kunt je account en gegevens laten verwijderen</li>
                <li><strong>Bezwaar:</strong> Je kunt bezwaar maken tegen bepaalde verwerkingen</li>
                <li><strong>Dataportabiliteit:</strong> Je kunt je gegevens in een leesbaar formaat opvragen</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Cookies</h2>
              <p className="text-gray-700 mb-4">
                We gebruiken cookies om je ervaring te verbeteren en onze dienst te optimaliseren:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li><strong>Essentiële cookies:</strong> Nodig voor het functioneren van de site</li>
                <li><strong>Analytische cookies:</strong> Om te begrijpen hoe je de site gebruikt</li>
                <li><strong>Functionele cookies:</strong> Om je voorkeuren te onthouden</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Je kunt cookies uitschakelen in je browserinstellingen, maar dit kan de functionaliteit beperken.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Bewaartermijnen</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Accountgegevens: Totdat je je account verwijdert</li>
                <li>Klusgegevens: 7 jaar (wettelijke verplichting voor belastingen)</li>
                <li>Betalingsgegevens: 7 jaar (wettelijke verplichting)</li>
                <li>Communicatie: 2 jaar na laatste contact</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Contact</h2>
              <p className="text-gray-700 mb-4">
                Vragen over je privacy of dit beleid? Neem contact met ons op:
              </p>
              <div className="bg-gray-50 rounded-xl p-6 space-y-2">
                <p><strong>Email:</strong> privacy@doeklus.nl</p>
                <p><strong>Telefoon:</strong> 020 123 4567</p>
                <p><strong>Adres:</strong> Doeklus B.V., Amsterdam, Nederland</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Wijzigingen</h2>
              <p className="text-gray-700">
                We kunnen dit privacybeleid van tijd tot tijd aanpassen. Belangrijke wijzigingen communiceren we via email. 
                De meest recente versie vind je altijd op deze pagina.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

