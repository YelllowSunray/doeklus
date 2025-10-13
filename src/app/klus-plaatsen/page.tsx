"use client";

import Link from "next/link";
import { useState } from "react";

export default function PostTaskPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: "",
    description: "",
    location: "",
    postcode: "",
    date: "",
    time: "",
    budget: "",
    images: [] as string[]
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-[#ff6b35]">
              Doeklus
            </Link>
            <Link href="/" className="text-gray-700 hover:text-[#ff6b35]">
              Annuleren
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className={`flex items-center ${step >= 1 ? 'text-[#ff6b35]' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-[#ff6b35] text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <span className="ml-2 hidden sm:inline">Details</span>
            </div>
            <div className={`flex-1 h-1 mx-4 ${step >= 2 ? 'bg-[#ff6b35]' : 'bg-gray-200'}`} />
            <div className={`flex items-center ${step >= 2 ? 'text-[#ff6b35]' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-[#ff6b35] text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span className="ml-2 hidden sm:inline">Locatie & Tijd</span>
            </div>
            <div className={`flex-1 h-1 mx-4 ${step >= 3 ? 'bg-[#ff6b35]' : 'bg-gray-200'}`} />
            <div className={`flex items-center ${step >= 3 ? 'text-[#ff6b35]' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-[#ff6b35] text-white' : 'bg-gray-200'}`}>
                3
              </div>
              <span className="ml-2 hidden sm:inline">Bevestigen</span>
            </div>
          </div>
        </div>

        {/* Step 1: Task Details */}
        {step === 1 && (
          <div className="bg-white rounded-lg p-8 shadow-md">
            <h1 className="text-3xl font-bold mb-6">Wat moet er gebeuren?</h1>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type klus *
                </label>
                <select 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
                  value={formData.service}
                  onChange={(e) => setFormData({...formData, service: e.target.value})}
                >
                  <option value="">Kies een dienst</option>
                  <option value="meubelmontage">Meubelmontage</option>
                  <option value="schilderen">Schilderen</option>
                  <option value="verhuizen">Verhuizen</option>
                  <option value="tuinonderhoud">Tuinonderhoud</option>
                  <option value="schoonmaken">Schoonmaken</option>
                  <option value="klusjesman">Algemene klussen</option>
                  <option value="elektrische-klussen">Elektrische klussen</option>
                  <option value="loodgieter">Loodgieterswerk</option>
                  <option value="anders">Anders</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Beschrijving *
                </label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
                  placeholder="Beschrijf wat er precies moet gebeuren. Hoe meer details, hoe beter de Doekler kan inschatten wat nodig is..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
                <p className="text-sm text-gray-500 mt-2">
                  Tip: Vermeld afmetingen, aantal, materiaal, enz.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Foto's uploaden (optioneel)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#ff6b35] transition-colors cursor-pointer">
                  <div className="text-4xl mb-2">📷</div>
                  <p className="text-gray-600">Klik om foto's toe te voegen</p>
                  <p className="text-sm text-gray-500 mt-1">Of sleep ze hierheen</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget indicatie
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button 
                    className={`px-4 py-3 border rounded-lg font-medium transition-colors ${formData.budget === 'low' ? 'border-[#ff6b35] bg-[#ff6b35]/10 text-[#ff6b35]' : 'border-gray-300 hover:border-[#ff6b35]'}`}
                    onClick={() => setFormData({...formData, budget: 'low'})}
                  >
                    € - €€
                  </button>
                  <button 
                    className={`px-4 py-3 border rounded-lg font-medium transition-colors ${formData.budget === 'medium' ? 'border-[#ff6b35] bg-[#ff6b35]/10 text-[#ff6b35]' : 'border-gray-300 hover:border-[#ff6b35]'}`}
                    onClick={() => setFormData({...formData, budget: 'medium'})}
                  >
                    €€ - €€€
                  </button>
                  <button 
                    className={`px-4 py-3 border rounded-lg font-medium transition-colors ${formData.budget === 'high' ? 'border-[#ff6b35] bg-[#ff6b35]/10 text-[#ff6b35]' : 'border-gray-300 hover:border-[#ff6b35]'}`}
                    onClick={() => setFormData({...formData, budget: 'high'})}
                  >
                    €€€+
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button 
                onClick={() => setStep(2)}
                disabled={!formData.service || !formData.description}
                className="bg-[#ff6b35] hover:bg-[#e55a28] disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Volgende stap
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Location & Time */}
        {step === 2 && (
          <div className="bg-white rounded-lg p-8 shadow-md">
            <h1 className="text-3xl font-bold mb-6">Waar en wanneer?</h1>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adres *
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
                  placeholder="Straat en huisnummer"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Postcode *
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
                  placeholder="1234 AB"
                  value={formData.postcode}
                  onChange={(e) => setFormData({...formData, postcode: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gewenste datum *
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gewenste tijd
                </label>
                <select 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                >
                  <option value="">Maakt niet uit</option>
                  <option value="morning">Ochtend (8:00 - 12:00)</option>
                  <option value="afternoon">Middag (12:00 - 17:00)</option>
                  <option value="evening">Avond (17:00 - 21:00)</option>
                </select>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">ℹ️</div>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">Flexibel zijn loont</h3>
                    <p className="text-sm text-blue-700">
                      Doeklers die op korte termijn beschikbaar zijn geven vaak een betere prijs. Heb je wat meer tijd? Geef dan een ruimere planning op.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button 
                onClick={() => setStep(1)}
                className="border border-gray-300 hover:border-[#ff6b35] text-gray-700 hover:text-[#ff6b35] px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Vorige
              </button>
              <button 
                onClick={() => setStep(3)}
                disabled={!formData.location || !formData.postcode || !formData.date}
                className="bg-[#ff6b35] hover:bg-[#e55a28] disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Volgende stap
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Review & Submit */}
        {step === 3 && (
          <div className="bg-white rounded-lg p-8 shadow-md">
            <h1 className="text-3xl font-bold mb-6">Controleer je klus</h1>
            
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-1">Type klus</h3>
                    <p className="text-lg">{formData.service}</p>
                  </div>
                  <button onClick={() => setStep(1)} className="text-[#ff6b35] hover:underline text-sm">
                    Bewerken
                  </button>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-700 mb-1">Beschrijving</h3>
                    <p className="text-gray-600">{formData.description}</p>
                  </div>
                  <button onClick={() => setStep(1)} className="text-[#ff6b35] hover:underline text-sm ml-4">
                    Bewerken
                  </button>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-1">Locatie</h3>
                    <p className="text-gray-600">{formData.location}</p>
                    <p className="text-gray-600">{formData.postcode}</p>
                  </div>
                  <button onClick={() => setStep(2)} className="text-[#ff6b35] hover:underline text-sm">
                    Bewerken
                  </button>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-1">Planning</h3>
                    <p className="text-gray-600">{formData.date}</p>
                    {formData.time && <p className="text-gray-600 capitalize">{formData.time}</p>}
                  </div>
                  <button onClick={() => setStep(2)} className="text-[#ff6b35] hover:underline text-sm">
                    Bewerken
                  </button>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">✓</div>
                  <div>
                    <h3 className="font-semibold text-green-900 mb-1">Wat gebeurt er nu?</h3>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Doeklers in je buurt zien je klus binnen 5 minuten</li>
                      <li>• Je ontvangt binnen 24 uur aanbiedingen met prijzen</li>
                      <li>• Je kiest zelf welke Doekler de klus mag doen</li>
                      <li>• Na de klus betaal je veilig online</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button 
                onClick={() => setStep(2)}
                className="border border-gray-300 hover:border-[#ff6b35] text-gray-700 hover:text-[#ff6b35] px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Vorige
              </button>
              <button 
                className="bg-[#ff6b35] hover:bg-[#e55a28] text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Plaats klus
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

