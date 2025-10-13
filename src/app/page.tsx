"use client";

import Link from "next/link";
import Header from "@/components/Header";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { generateOrganizationSchema, generateServiceSchema } from "@/lib/seo";

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [postcode, setPostcode] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Build search URL with query parameters
    const params = new URLSearchParams();
    if (searchQuery) params.append('q', searchQuery);
    if (postcode) params.append('postcode', postcode);
    
    // Navigate to search results page
    router.push(`/diensten?${params.toString()}`);
  };

  const organizationSchema = generateOrganizationSchema();

  return (
    <div className="min-h-screen">
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* Modern Floating Header */}
      <Header />

      {/* Bold Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#ff4d00]/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0066ff]/10 rounded-full blur-3xl animate-float" style={{animationDelay: '3s'}}></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6">
              <span className="bg-[#ffd900] text-black px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide">
                ✨ 10.000+ Klussers actief
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-none">
              Klus?<br/>
              <span className="text-gradient">Direct geregeld.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Vind de beste klusser in jouw buurt. Binnen 24 uur aan de slag. Geen gedoe, gewoon doen.
            </p>
            
            {/* Modern Search Bar - Now Functional */}
            <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-8">
              <div className="bg-white rounded-2xl shadow-2xl p-3 flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Wat moet er gebeuren?"
                    className="w-full px-6 py-4 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff4d00] text-lg"
                  />
                </div>
                <div className="md:w-40 relative">
                  <input
                    type="text"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    placeholder="Postcode"
                    className="w-full px-6 py-4 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff4d00] text-lg"
                  />
                </div>
                <button 
                  type="submit"
                  className="gradient-primary text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  Zoek →
                </button>
              </div>
            </form>

            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <span className="text-gray-500">Populair:</span>
              {['Meubels monteren', 'Schilderen', 'Verhuizen', 'Tuin'].map((tag) => (
                <Link 
                  key={tag}
                  href={`/diensten/${tag.toLowerCase().replace(' ', '-')}`} 
                  className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full font-medium transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 border-y border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '50K+', label: 'Klussen per jaar' },
              { number: '10K+', label: 'Klussers' },
              { number: '4.8★', label: 'Gemiddelde score' },
              { number: '24/7', label: 'Beschikbaar' }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-black text-[#ff4d00] mb-1">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid - Bold Cards */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4">Wat kunnen we doen?</h2>
            <p className="text-xl text-gray-600">Van klein tot groot. Alles geregeld.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularServices.map((service) => (
              <Link 
                key={service.slug}
                href={`/diensten/${service.slug}`}
                className="group relative bg-white rounded-3xl p-8 card-hover border border-gray-200 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#ff4d00]/10 to-transparent rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform"></div>
                <div className="relative z-10">
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <h3 className="font-bold text-xl mb-2 group-hover:text-[#ff4d00] transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">€{service.priceFrom}/u</span>
                    <span className="text-[#ff4d00] group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/diensten" className="inline-block border-2 border-black hover:bg-black hover:text-white px-8 py-4 rounded-full font-bold transition-all">
              Bekijk alle diensten
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works - Visual Steps */}
      <section className="py-20 px-4 section-pattern bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4">Simpel toch?</h2>
            <p className="text-xl text-gray-600">3 stappen en je bent klaar</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#ff4d00] via-[#0066ff] to-[#00cc66] opacity-20 -translate-y-1/2"></div>
            
            {[
              { step: '1', title: 'Post je klus', desc: 'Vertel wat er moet gebeuren', color: 'bg-[#ff4d00]', icon: '📝' },
              { step: '2', title: 'Kies je klusser', desc: 'Vergelijk en kies', color: 'bg-[#0066ff]', icon: '🔍' },
              { step: '3', title: 'Klaar!', desc: 'Betaal en review', color: 'bg-[#00cc66]', icon: '✓' }
            ].map((item, i) => (
              <div key={i} className="relative bg-white rounded-3xl p-8 text-center card-hover">
                <div className={`w-20 h-20 ${item.color} rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6 rotate-3 group-hover:rotate-6 transition-transform`}>
                  {item.icon}
                </div>
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/klus-plaatsen" className="inline-block gradient-primary text-white px-10 py-5 rounded-full font-bold text-lg hover:shadow-2xl transition-all hover:scale-105">
              Start nu gratis →
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof - Reviews */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4">Wat zeggen anderen?</h2>
            <div className="flex items-center justify-center gap-2 text-yellow-400 text-2xl">
              {'★★★★★'.split('').map((star, i) => <span key={i}>{star}</span>)}
              <span className="text-gray-600 text-lg ml-2">4.8/5 gemiddeld</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border-2 border-gray-100">
                <div className="flex items-center gap-2 text-yellow-400 mb-4">
                  {'★★★★★'.split('').map((star, i) => <span key={i}>{star}</span>)}
                </div>
                <p className="text-lg mb-6 font-medium">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#ff4d00] to-[#0066ff] rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.service}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become Klusser CTA - Bold */}
      <section className="py-20 px-4 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#ff4d00] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0066ff] rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-[#ffd900] text-black px-4 py-2 rounded-full text-sm font-bold mb-6">
                💰 VERDIEN €25-50/UUR
              </div>
              <h2 className="text-5xl font-black mb-6">
                Word klusser.<br/>
                Bepaal je eigen succes.
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Flexibel werken, zelf je klussen kiezen, goed verdienen. Start vandaag nog.
              </p>
              <Link href="/word-klusser" className="inline-block bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition-all">
                Start als klusser →
              </Link>
            </div>
            
            <div className="space-y-4">
              {[
                { icon: '🕐', title: 'Flexibel werken', desc: 'Werk wanneer je wilt' },
                { icon: '✓', title: 'Kies je klussen', desc: 'Alleen wat bij je past' },
                { icon: '💶', title: 'Wekelijks betaald', desc: 'Direct geld op je rekening' }
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="text-4xl">{benefit.icon}</div>
                  <div>
                    <div className="font-bold text-lg">{benefit.title}</div>
                    <div className="text-gray-400">{benefit.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Modern */}
      <footer className="bg-gray-900 text-gray-300 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2">
              <div className="text-3xl font-bold text-white mb-4">Doeklus</div>
              <p className="text-gray-400 mb-4">Direct klussen regelen. Simpel, snel, betrouwbaar.</p>
              <div className="flex gap-3">
                {[
                  { name: 'Facebook', icon: 'f', url: '#' },
                  { name: 'Instagram', icon: '📷', url: '#' },
                  { name: 'LinkedIn', icon: 'in', url: '#' },
                  { name: 'Twitter', icon: '🐦', url: '#' }
                ].map(social => (
                  <a 
                    key={social.name} 
                    href={social.url} 
                    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors text-sm font-bold"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
            
            {[
              { title: 'Platform', links: ['Diensten', 'Prijzen', 'Hoe werkt het', 'Word Klusser'] },
              { title: 'Bedrijf', links: ['Over ons', 'Carrière', 'Pers', 'Contact'] },
              { title: 'Support', links: ['Help', 'Veiligheid', 'Voorwaarden', 'Privacy'] }
            ].map((column, i) => (
              <div key={i}>
                <h4 className="text-white font-bold mb-4">{column.title}</h4>
                <ul className="space-y-2">
                  {column.links.map(link => (
                    <li key={link}>
                      <Link href={`/${link.toLowerCase().replace(' ', '-')}`} className="hover:text-white transition-colors">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm">© 2025 Doeklus. Klussen geregeld.</div>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/voorwaarden" className="hover:text-white transition-colors">Voorwaarden</Link>
              <Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const popularServices = [
  { slug: "meubelmontage", name: "Meubels", icon: "🪛", description: "IKEA & meer monteren", priceFrom: 25 },
  { slug: "schilderen", name: "Schilderen", icon: "🎨", description: "Binnen & buiten", priceFrom: 30 },
  { slug: "verhuizen", name: "Verhuizen", icon: "📦", description: "Sjouwen & transporteren", priceFrom: 28 },
  { slug: "tuinonderhoud", name: "Tuin", icon: "🌱", description: "Maaien & snoeien", priceFrom: 25 },
  { slug: "schoonmaken", name: "Schoonmaken", icon: "🧹", description: "Huis & kantoor", priceFrom: 22 },
  { slug: "klusjesman", name: "Klussen", icon: "🔧", description: "Alles wat kapot is", priceFrom: 28 },
  { slug: "elektrisch", name: "Elektra", icon: "💡", description: "Lampen & stopcontacten", priceFrom: 35 },
  { slug: "loodgieter", name: "Loodgieter", icon: "🚰", description: "Lekken & kranen", priceFrom: 40 }
];

const testimonials = [
  { name: "Marieke V.", service: "Meubelmontage", text: "Binnen een uur stond mijn kast. Simpel en snel geregeld!" },
  { name: "Jan D.", service: "Verhuizen", text: "Top jongens, harde werkers. Verhuizing was zo gepiept." },
  { name: "Sophie M.", service: "Schilderen", text: "Netjes afgewerkt en vooraf duidelijke prijs. Perfect!" }
];
