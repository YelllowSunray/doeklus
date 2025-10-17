"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/firebase/auth";
import { useAuth } from "@/lib/context/AuthContext";
import { createDocument, getDocument, setOrUpdateDocument } from "@/lib/firebase/firestore";
import { handleAuthError } from "@/lib/firebase/errors";

export default function KlusserSignupPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    const checkUserRole = async () => {
      if (user && !authLoading) {
        // Check if user is already a klusser
        const userDoc = await getDocument('users', user.uid) as any;
        
        if (userDoc?.role === 'klusser') {
          // Already a klusser
          if (userDoc.klusserProfile?.onboardingComplete) {
            router.push("/klusser-dashboard");
          } else {
            router.push("/word-klusser/onboarding");
          }
        } else {
          // Customer wants to become klusser - go to onboarding
          router.push("/word-klusser/onboarding");
        }
      }
    };
    
    checkUserRole();
  }, [user, authLoading, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Wachtwoorden komen niet overeen");
      return;
    }

    if (formData.password.length < 6) {
      setError("Wachtwoord moet minimaal 6 tekens zijn");
      return;
    }

    if (!acceptedTerms) {
      setError("Je moet akkoord gaan met de voorwaarden");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signUp(formData.email, formData.password, formData.name);
      
      // Check if user document already exists (shouldn't for new signup, but just in case)
      const existingDoc = await getDocument('users', userCredential.uid) as any;
      
      if (existingDoc) {
        // User exists, upgrade to klusser
        await setOrUpdateDocument("users", userCredential.uid, {
          ...existingDoc,
          role: "klusser",
          klusserProfile: {
            status: "approved",
            onboardingComplete: false,
            skills: [],
            hourlyRate: null,
            availability: [],
            rating: 0,
            reviewCount: 0
          }
        });
      } else {
        // New user, create as klusser
        await createDocument("users", {
          email: formData.email,
          displayName: formData.name,
          role: "klusser",
          klusserProfile: {
            status: "approved",
            onboardingComplete: false,
            skills: [],
            hourlyRate: null,
            availability: [],
            rating: 0,
            reviewCount: 0
          },
          photoURL: null
        }, userCredential.uid);
      }

      // Redirect to klusser onboarding
      router.push("/word-klusser/onboarding");
    } catch (err: any) {
      setError(handleAuthError(err));
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-black text-white">
      {/* Simple Header */}
      <header className="fixed top-4 left-0 right-0 z-50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg px-6 py-3">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold text-white">
                Doeklus
              </Link>
              <Link href="/word-klusser" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
                ← Terug
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Signup Form */}
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="inline-block bg-[#ffd900] text-black px-4 py-2 rounded-full text-sm font-bold mb-4">
              💰 WORD KLUSSER
            </div>
            <h1 className="text-4xl font-black mb-3">Start als klusser</h1>
            <p className="text-gray-300">Maak een account aan en begin met verdienen</p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">

            {/* Error Message */}
            {error && (
              <div className="mb-6 bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            {/* Email/Password Form */}
            <form onSubmit={handleEmailSignup} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Naam
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ffd900] focus:border-transparent placeholder-gray-400"
                  placeholder="Je naam"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ffd900] focus:border-transparent placeholder-gray-400"
                  placeholder="jouw@email.nl"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Wachtwoord
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ffd900] focus:border-transparent placeholder-gray-400"
                  placeholder="Minimaal 6 tekens"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Bevestig wachtwoord
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ffd900] focus:border-transparent placeholder-gray-400"
                  placeholder="Herhaal wachtwoord"
                />
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-1 rounded accent-[#ffd900]"
                />
                <label htmlFor="terms" className="text-sm text-gray-300">
                  Ik ga akkoord met de{" "}
                  <Link href="/voorwaarden" className="text-[#ffd900] hover:underline">
                    voorwaarden
                  </Link>{" "}
                  en{" "}
                  <Link href="/privacy" className="text-[#ffd900] hover:underline">
                    privacybeleid
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#ffd900] text-black px-6 py-3 rounded-xl font-bold transition-all hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Account aanmaken..." : "Start als klusser"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-300">
              Heb je al een klusser account?{" "}
              <Link href="/inloggen?role=klusser" className="text-[#ffd900] font-semibold hover:underline">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

