"use client";

import Header from "@/components/Header";
import { useEffect } from "react";

export default function PressPage() {
  // SEO metadata via document title
  useEffect(() => {
    document.title = 'Pers & Media - Nieuws en persberichten | Doeklus';
  }, []);
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-black mb-6">Pers & Media</h1>
          <p className="text-xl text-gray-600">
            Nieuws, updates en media-kit voor journalisten
          </p>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Recent Nieuws</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                date: "15 Jan 2024",
                title: "Doeklus lanceert in Nederland",
                excerpt: "Nieuwe platform verbindt klussers met klanten voor eenvoudige huishoudelijke taken.",
                category: "Lancering"
              },
              {
                date: "22 Jan 2024", 
                title: "10.000 klussers sluiten zich aan",
                excerpt: "Snelle groei toont behoefte aan flexibele klusdiensten in Nederland.",
                category: "Groei"
              }
            ].map((release, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    {release.category}
                  </span>
                  <span className="text-gray-500 text-sm">{release.date}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{release.title}</h3>
                <p className="text-gray-600 mb-4">{release.excerpt}</p>
                <button className="text-primary font-medium hover:underline">
                  Lees meer →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Kit */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Media Kit</h2>
          <p className="text-gray-600 mb-8">
            Download logo's, afbeeldingen en informatie voor uw artikelen
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Logo's", desc: "High-res logo's in verschillende formaten" },
              { title: "Afbeeldingen", desc: "Stock foto's en screenshots van het platform" },
              { title: "Factsheet", desc: "Kerncijfers en bedrijfsinformatie" }
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{item.desc}</p>
                <button className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors">
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Pers Contact</h2>
          <p className="text-gray-600 mb-8">
            Voor persvragen en interviewaanvragen
          </p>
          
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">Pers & Media Team</h3>
              <p className="text-gray-600 mb-2">
                <strong>E-mail:</strong> pers@doeklus.nl
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Telefoon:</strong> +31 (0)20 123 4567
              </p>
              <p className="text-gray-600">
                <strong>Adres:</strong> Amsterdam, Nederland
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
