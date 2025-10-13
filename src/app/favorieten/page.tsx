"use client";

import Header from "@/components/Header";
import { useAuth } from "@/lib/context/AuthContext";

export default function FavoritesPage() {
  const { user } = useAuth();

  // Mock data - in real app this would come from Firebase
  const favoriteKlussers = [
    {
      id: 1,
      name: "Jan de Vries",
      specialty: "Tuinonderhoud",
      rating: 4.9,
      reviews: 127,
      price: "€35/uur",
      photo: "👨‍🌾",
      location: "Amsterdam",
      availability: "Beschikbaar",
      tags: ["Tuin", "Snoeien", "Onderhoud"]
    },
    {
      id: 2,
      name: "Piet Bakker",
      specialty: "Elektricien",
      rating: 4.8,
      reviews: 89,
      price: "€45/uur",
      photo: "👨‍🔧",
      location: "Amsterdam",
      availability: "Beschikbaar",
      tags: ["Elektra", "Lampen", "Stopcontacten"]
    },
    {
      id: 3,
      name: "Klaas Jansen",
      specialty: "Apparaten",
      rating: 4.7,
      reviews: 203,
      price: "€40/uur",
      photo: "👨‍🔧",
      location: "Amsterdam",
      availability: "Beperkt",
      tags: ["Reparaties", "Wasmachine", "Koelkast"]
    }
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-32 pb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Inloggen vereist</h1>
            <p className="text-gray-600 mb-8">Log in om uw favoriete klussers te bekijken</p>
            <a href="/inloggen" className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-dark transition-colors">
              Inloggen
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-black mb-2">Favoriete Klussers</h1>
          <p className="text-gray-600">Uw bewaarde klussers voor snelle herboekingen</p>
        </div>
      </section>

      {/* Favorites Grid */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {favoriteKlussers.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">❤️</div>
              <h3 className="text-2xl font-bold mb-4">Geen favorieten</h3>
              <p className="text-gray-600 mb-8">
                Voeg klussers toe aan uw favorieten voor snelle herboekingen
              </p>
              <a href="/diensten" className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-dark transition-colors">
                Klussers Ontdekken
              </a>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteKlussers.map((klusser) => (
                <div key={klusser.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-2xl">
                        {klusser.photo}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{klusser.name}</h3>
                        <p className="text-gray-600 text-sm">{klusser.specialty}</p>
                      </div>
                    </div>
                    <button className="text-red-500 hover:text-red-600 text-xl">
                      ❤️
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < Math.floor(klusser.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                          ⭐
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {klusser.rating} ({klusser.reviews} beoordelingen)
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-primary font-bold text-lg">{klusser.price}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      klusser.availability === 'Beschikbaar' 
                        ? 'bg-success/10 text-success' 
                        : 'bg-warning/10 text-warning'
                    }`}>
                      {klusser.availability}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {klusser.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="flex-1 bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors">
                      Boeken
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                      Profiel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">Meer Klussers Ontdekken</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/diensten" className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
              Alle Diensten
            </a>
            <a href="/klus-plaatsen" className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors">
              Nieuwe Klus Plaatsen
            </a>
            <a href="/prijzen" className="bg-secondary text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors">
              Prijzen Bekijken
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
