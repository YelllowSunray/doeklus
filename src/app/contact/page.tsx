import type { Metadata } from "next";
import Header from "@/components/Header";
import { generateMetadata } from "@/lib/seo";

export const metadata: Metadata = generateMetadata({
  title: 'Contact - Neem Contact Op',
  description: 'Heb je een vraag of hulp nodig? Neem contact op met het Doeklus team. We helpen je graag verder met al je vragen over klussen en ons platform.',
  keywords: ['contact', 'klantenservice', 'hulp', 'support', 'vragen']
});

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-black mb-4">Contact</h1>
          <p className="text-xl text-gray-600 mb-12">
            We helpen je graag verder
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6">
                <div className="text-3xl mb-3">📧</div>
                <h3 className="font-bold text-lg mb-2">Email</h3>
                <p className="text-gray-600 mb-2">Voor algemene vragen:</p>
                <a href="mailto:info@doeklus.nl" className="text-[#ff4d00] hover:underline">
                  info@doeklus.nl
                </a>
                <p className="text-gray-600 mt-3 mb-2">Voor support:</p>
                <a href="mailto:support@doeklus.nl" className="text-[#ff4d00] hover:underline">
                  support@doeklus.nl
                </a>
              </div>

              <div className="bg-white rounded-2xl p-6">
                <div className="text-3xl mb-3">💬</div>
                <h3 className="font-bold text-lg mb-2">Social Media</h3>
                <div className="space-y-2">
                  <a href="https://facebook.com/doeklus" className="block text-gray-600 hover:text-[#ff4d00]">
                    Facebook: @doeklus
                  </a>
                  <a href="https://instagram.com/doeklus" className="block text-gray-600 hover:text-[#ff4d00]">
                    Instagram: @doeklus
                  </a>
                  <a href="https://linkedin.com/company/doeklus" className="block text-gray-600 hover:text-[#ff4d00]">
                    LinkedIn: Doeklus
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6">
                <div className="text-3xl mb-3">⏰</div>
                <h3 className="font-bold text-lg mb-2">Openingstijden</h3>
                <p className="text-gray-600">
                  Maandag - Vrijdag: 09:00 - 18:00<br />
                  Weekend: 10:00 - 16:00
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Stuur een bericht</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2">Naam</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#ff4d00] focus:outline-none"
                    placeholder="Je naam"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#ff4d00] focus:outline-none"
                    placeholder="je@email.nl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Onderwerp</label>
                  <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#ff4d00] focus:outline-none">
                    <option>Algemene vraag</option>
                    <option>Technische support</option>
                    <option>Betaling</option>
                    <option>Klusser worden</option>
                    <option>Anders</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Bericht</label>
                  <textarea
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#ff4d00] focus:outline-none"
                    placeholder="Je bericht..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#ff4d00] text-white px-6 py-3 rounded-full font-bold hover:bg-[#ff6b35] transition-colors"
                >
                  Verstuur bericht
                </button>
              </form>
            </div>
          </div>

          {/* FAQ Link */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-3">Veelgestelde vragen</h2>
            <p className="mb-6 opacity-90">
              Misschien staat je antwoord al tussen onze veelgestelde vragen
            </p>
            <a
              href="/help"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors"
            >
              Bekijk FAQ
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
