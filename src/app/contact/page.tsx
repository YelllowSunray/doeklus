import Link from "next/link";
import Header from "@/components/Header";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl font-black mb-8">Contact</h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-8">
                <h2 className="text-2xl font-bold mb-6">Neem contact op</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#ff4d00]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">📧</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <a href="mailto:info@doeklus.nl" className="text-[#ff4d00] hover:underline">
                        info@doeklus.nl
                      </a>
                      <p className="text-sm text-gray-600 mt-1">We reageren binnen 24 uur</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#ff4d00]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">📞</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Telefoon</h3>
                      <a href="tel:0201234567" className="text-[#ff4d00] hover:underline">
                        020 123 4567
                      </a>
                      <p className="text-sm text-gray-600 mt-1">Ma-vr 9:00-18:00 | Za 10:00-16:00</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#ff4d00]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">💬</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Live chat</h3>
                      <button className="text-[#ff4d00] hover:underline">
                        Start chat
                      </button>
                      <p className="text-sm text-gray-600 mt-1">Gemiddelde reactietijd: 2 min</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#ff4d00]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">📍</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Adres</h3>
                      <p className="text-gray-700">Doeklus B.V.</p>
                      <p className="text-gray-700">Amsterdam</p>
                      <p className="text-gray-700">Nederland</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#ff4d00] to-[#0066ff] rounded-3xl p-8 text-white">
                <h3 className="text-xl font-bold mb-4">Specifieke vragen?</h3>
                <div className="space-y-3 text-sm">
                  <Link href="/help" className="block hover:underline">
                    💡 Algemene vragen → Help center
                  </Link>
                  <Link href="mailto:support@doeklus.nl" className="block hover:underline">
                    🔧 Technische problemen → support@doeklus.nl
                  </Link>
                  <Link href="mailto:press@doeklus.nl" className="block hover:underline">
                    📰 Pers & Media → press@doeklus.nl
                  </Link>
                  <Link href="mailto:careers@doeklus.nl" className="block hover:underline">
                    👔 Werken bij Doeklus → careers@doeklus.nl
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8">
              <h2 className="text-2xl font-bold mb-6">Stuur een bericht</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Naam *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff4d00] focus:border-transparent"
                    placeholder="Je naam"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff4d00] focus:border-transparent"
                    placeholder="jouw@email.nl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Onderwerp *
                  </label>
                  <select className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff4d00] focus:border-transparent">
                    <option>Algemene vraag</option>
                    <option>Hulp bij klus</option>
                    <option>Account probleem</option>
                    <option>Betaling</option>
                    <option>Feedback</option>
                    <option>Anders</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bericht *
                  </label>
                  <textarea
                    rows={6}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff4d00] focus:border-transparent"
                    placeholder="Vertel ons wat je op je hart hebt..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#ff4d00] hover:bg-[#cc3d00] text-white px-6 py-3 rounded-xl font-bold transition-colors"
                >
                  Verstuur bericht
                </button>

                <p className="text-xs text-gray-500 text-center">
                  We reageren meestal binnen 24 uur
                </p>
              </form>
            </div>
          </div>

          <div className="mt-12 bg-gray-100 rounded-3xl p-8">
            <h2 className="text-2xl font-bold mb-4">Veelgestelde vragen</h2>
            <p className="text-gray-700 mb-4">
              Misschien staat je vraag al beantwoord in ons{" "}
              <Link href="/help" className="text-[#ff4d00] font-semibold hover:underline">
                help center
              </Link>
              . Check het eerst voordat je contact opneemt!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

