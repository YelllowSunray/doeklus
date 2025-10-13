"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import { setOrUpdateDocument, getDocument } from "@/lib/firebase/firestore";

export default function KlusserOnboardingPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    skills: [] as string[],
    hourlyRate: "",
    phone: "",
    address: "",
    bio: "",
    experience: "",
    availability: [] as string[]
  });

  useEffect(() => {
    const checkOnboarding = async () => {
      if (!user && !authLoading) {
        router.push("/word-klusser/aanmelden");
        return;
      }
      
      if (user) {
        // Check if onboarding is already complete
        const userDoc = await getDocument('users', user.uid);
        if (userDoc?.klusserProfile?.onboardingComplete) {
          console.log("Onboarding already complete, redirecting to dashboard");
          router.push("/klusser-dashboard");
        }
      }
    };
    
    checkOnboarding();
  }, [user, authLoading, router]);

  const skillOptions = [
    "Tuin onderhoud",
    "Schilderen",
    "Elektra",
    "Loodgieterswerk",
    "Meubelassemblage",
    "Verhuizen",
    "Schoonmaken",
    "Klussen algemeen",
    "Reparaties",
    "Handyman"
  ];

  const availabilityOptions = [
    "Maandag",
    "Dinsdag", 
    "Woensdag",
    "Donderdag",
    "Vrijdag",
    "Zaterdag",
    "Zondag"
  ];

  const toggleSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const toggleAvailability = (day: string) => {
    setFormData(prev => ({
      ...prev,
      availability: prev.availability.includes(day)
        ? prev.availability.filter(d => d !== day)
        : [...prev.availability, day]
    }));
  };

  const handleSubmit = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Get existing user document first
      const existingDoc = await getDocument('users', user.uid);
      
      // Merge with existing klusserProfile
      const updatedProfile = {
        ...existingDoc?.klusserProfile,
        status: "approved",
        onboardingComplete: true,
        skills: formData.skills,
        hourlyRate: parseFloat(formData.hourlyRate),
        phone: formData.phone,
        address: formData.address,
        bio: formData.bio,
        experience: formData.experience,
        availability: formData.availability,
        rating: 0,
        reviewCount: 0,
        totalEarnings: 0,
        completedTasks: 0
      };

      await setOrUpdateDocument("users", user.uid, {
        ...existingDoc,
        klusserProfile: updatedProfile
      });

      console.log("Onboarding saved successfully for user:", user.uid);
      alert("Profiel voltooid! Je kunt nu klussen bekijken.");
      
      // Small delay to ensure Firestore writes complete
      await new Promise(resolve => setTimeout(resolve, 500));
      
      router.push("/klusser-dashboard");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Er is een fout opgetreden. Probeer het opnieuw.");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-16 h-16 border-4 border-[#ffd900] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Laden...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-4 left-0 right-0 z-50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg px-6 py-3">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold text-white">
                Doeklus
              </Link>
              <div className="text-sm text-gray-300">
                Stap {step} van 3
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Onboarding Content */}
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-400">Voortgang</span>
              <span className="text-sm text-[#ffd900] font-bold">{Math.round((step / 3) * 100)}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#ffd900] transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>

          {/* Step 1: Skills */}
          {step === 1 && (
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
              <h2 className="text-3xl font-black mb-4">Wat kun je?</h2>
              <p className="text-gray-300 mb-8">Selecteer je vaardigheden (kies minimaal 1)</p>
              
              <div className="grid md:grid-cols-2 gap-3">
                {skillOptions.map(skill => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      formData.skills.includes(skill)
                        ? 'border-[#ffd900] bg-[#ffd900]/20'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{skill}</span>
                      {formData.skills.includes(skill) && (
                        <span className="text-[#ffd900]">✓</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={formData.skills.length === 0}
                className="w-full mt-8 bg-[#ffd900] text-black px-6 py-4 rounded-xl font-bold transition-all hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Volgende →
              </button>
            </div>
          )}

          {/* Step 2: Details */}
          {step === 2 && (
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
              <h2 className="text-3xl font-black mb-4">Jouw gegevens</h2>
              <p className="text-gray-300 mb-8">Vertel ons meer over jezelf</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Uurtarief (€)
                  </label>
                  <input
                    type="number"
                    value={formData.hourlyRate}
                    onChange={(e) => setFormData({...formData, hourlyRate: e.target.value})}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ffd900] focus:border-transparent"
                    placeholder="25"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Telefoon
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ffd900] focus:border-transparent"
                    placeholder="+31 6 12345678"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Adres
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ffd900] focus:border-transparent"
                    placeholder="Amsterdam"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Ervaring (jaren)
                  </label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ffd900] focus:border-transparent"
                    placeholder="5+ jaar ervaring in..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Over jou
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ffd900] focus:border-transparent"
                    placeholder="Vertel klanten over jezelf..."
                    required
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 bg-white/10 text-white px-6 py-4 rounded-xl font-bold transition-all hover:bg-white/20"
                >
                  ← Terug
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!formData.hourlyRate || !formData.phone || !formData.address || !formData.bio}
                  className="flex-1 bg-[#ffd900] text-black px-6 py-4 rounded-xl font-bold transition-all hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Volgende →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Availability */}
          {step === 3 && (
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
              <h2 className="text-3xl font-black mb-4">Beschikbaarheid</h2>
              <p className="text-gray-300 mb-8">Op welke dagen ben je beschikbaar?</p>
              
              <div className="grid md:grid-cols-2 gap-3 mb-8">
                {availabilityOptions.map(day => (
                  <button
                    key={day}
                    onClick={() => toggleAvailability(day)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      formData.availability.includes(day)
                        ? 'border-[#ffd900] bg-[#ffd900]/20'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{day}</span>
                      {formData.availability.includes(day) && (
                        <span className="text-[#ffd900]">✓</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4 mb-8">
                <p className="text-sm text-green-200">
                  <strong>Bijna klaar!</strong> Na het voltooien kun je direct klussen accepteren.
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 bg-white/10 text-white px-6 py-4 rounded-xl font-bold transition-all hover:bg-white/20"
                >
                  ← Terug
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading || formData.availability.length === 0}
                  className="flex-1 bg-[#ffd900] text-black px-6 py-4 rounded-xl font-bold transition-all hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Opslaan..." : "Voltooien ✓"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

