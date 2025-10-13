import Link from "next/link";
import Header from "@/components/Header";
import { useEffect } from "react";

export default function CareerPage() {
  // SEO metadata via document title
  useEffect(() => {
    document.title = 'Carrière - Werk bij Doeklus | Doeklus';
  }, []);
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-black mb-8">Carrière bij Doeklus</h1>
          
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-6">Bouw mee aan de toekomst van klussen</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                We zijn op zoek naar gedreven mensen die mee willen bouwen aan Doeklus. 
                Of je nu developer, designer, marketeer of operations talent bent - 
                we groeien hard en kunnen je hulp gebruiken.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Bij Doeklus werk je in een klein team waar je impact direct zichtbaar is. 
                We zijn direct, pragmatisch en gefocust op resultaat. Geen corporate bullshit, 
                gewoon goed werk leveren en groeien.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#ff4d00] to-[#0066ff] rounded-3xl p-8 md:p-12 text-white">
              <h2 className="text-2xl font-bold mb-6">Waarom Doeklus?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl mb-3">🚀</div>
                  <h3 className="font-bold text-lg mb-2">Impact maken</h3>
                  <p className="text-white/90 text-sm">
                    Je werk heeft direct impact. Zie hoe jouw code of design duizenden mensen helpt.
                  </p>
                </div>
                <div>
                  <div className="text-3xl mb-3">📈</div>
                  <h3 className="font-bold text-lg mb-2">Groeien</h3>
                  <p className="text-white/90 text-sm">
                    We groeien hard. Groei mee en ontwikkel jezelf in een scale-up omgeving.
                  </p>
                </div>
                <div>
                  <div className="text-3xl mb-3">🏠</div>
                  <h3 className="font-bold text-lg mb-2">Flexibel werken</h3>
                  <p className="text-white/90 text-sm">
                    Hybride werken. Kantoor in Amsterdam, maar ook thuis werken kan.
                  </p>
                </div>
                <div>
                  <div className="text-3xl mb-3">🎯</div>
                  <h3 className="font-bold text-lg mb-2">Ownership</h3>
                  <p className="text-white/90 text-sm">
                    Eigen je projecten. Volledige verantwoordelijkheid en vrijheid.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 md:p-12">
              <h2 className="text-2xl font-bold mb-6">Open vacatures</h2>
              <div className="space-y-4">
                {jobs.map((job, idx) => (
                  <div key={idx} className="border-2 border-gray-200 rounded-2xl p-6 hover:border-[#ff4d00] transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                        <div className="flex gap-3 text-sm text-gray-600">
                          <span>📍 {job.location}</span>
                          <span>⏰ {job.hours}</span>
                          <span>💶 {job.salary}</span>
                        </div>
                      </div>
                      <span className="bg-[#ff4d00]/10 text-[#ff4d00] px-3 py-1 rounded-full text-sm font-semibold">
                        {job.type}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-4">{job.description}</p>
                    <Link 
                      href={`mailto:careers@doeklus.nl?subject=Sollicitatie ${job.title}`}
                      className="inline-block bg-[#ff4d00] hover:bg-[#cc3d00] text-white px-6 py-2 rounded-full font-semibold transition-colors"
                    >
                      Solliciteer nu
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-100 rounded-3xl p-8 md:p-12">
              <h2 className="text-2xl font-bold mb-6">Zie je vacature niet staan?</h2>
              <p className="text-gray-700 mb-6">
                We zijn altijd op zoek naar talent. Stuur ons een open sollicitatie en vertel waarom je bij Doeklus wilt werken.
              </p>
              <Link 
                href="mailto:careers@doeklus.nl?subject=Open sollicitatie"
                className="inline-block border-2 border-black hover:bg-black hover:text-white px-6 py-3 rounded-full font-semibold transition-colors"
              >
                Open sollicitatie →
              </Link>
            </div>

            <div className="bg-white rounded-3xl p-8 md:p-12">
              <h2 className="text-2xl font-bold mb-6">Het sollicitatieproces</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#ff4d00] text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Sollicitatie</h3>
                    <p className="text-gray-600">Stuur je CV en motivatie naar careers@doeklus.nl</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#ff4d00] text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Kennismaking</h3>
                    <p className="text-gray-600">Videocall met het team (30 min)</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#ff4d00] text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Opdracht</h3>
                    <p className="text-gray-600">Praktische opdracht (betaald, max 4 uur)</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#ff4d00] text-white rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Beslissing</h3>
                    <p className="text-gray-600">Binnen 1 week hoor je of je bij het team komt</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const jobs = [
  {
    title: "Full-stack Developer",
    location: "Amsterdam/Remote",
    hours: "32-40u",
    salary: "€4.000-€6.000",
    type: "Tech",
    description: "Bouw mee aan ons platform. TypeScript, React, Next.js, Firebase. Je werkt aan features die direct impact hebben op duizenden gebruikers."
  },
  {
    title: "Growth Marketeer",
    location: "Amsterdam",
    hours: "32-40u",
    salary: "€3.500-€5.000",
    type: "Marketing",
    description: "Groei Doeklus. Van SEO tot social media, van content tot partnerships. Jij bedenkt en voert growth strategieën uit."
  },
  {
    title: "Customer Success Manager",
    location: "Amsterdam",
    hours: "32-40u",
    salary: "€3.000-€4.500",
    type: "Operations",
    description: "Help onze klanten en klussers. Los problemen op, verbeter processen en zorg dat iedereen tevreden is."
  }
];

