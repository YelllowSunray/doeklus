"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/firebase/auth";
import { useAuth } from "@/lib/context/AuthContext";
import { createDocument } from "@/lib/firebase/firestore";
import { handleAuthError } from "@/lib/firebase/errors";

export default function SignupPage() {
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
    if (user && !authLoading) {
      router.push("/dashboard");
    }
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
      
      // Create user profile in Firestore with custom ID (user's UID)
      await createDocument("users", {
        email: formData.email,
        displayName: formData.name,
        role: "customer",
        photoURL: null
      }, userCredential.uid);

      router.push("/dashboard");
    } catch (err: any) {
      setError(handleAuthError(err));
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Header */}
      <header className="fixed top-4 left-0 right-0 z-50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-lg px-6 py-3">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold text-gradient">
                Doeklus
              </Link>
              <Link href="/" className="text-sm font-medium hover:text-[#ff4d00] transition-colors">
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
            <h1 className="text-4xl font-black mb-3">Account aanmaken</h1>
            <p className="text-gray-600">Start met klussen regelen</p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200">

            {/* Error Message */}
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            {/* Email/Password Form */}
            <form onSubmit={handleEmailSignup} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Naam
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff4d00] focus:border-transparent"
                  placeholder="Je naam"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff4d00] focus:border-transparent"
                  placeholder="jouw@email.nl"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Wachtwoord
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff4d00] focus:border-transparent"
                  placeholder="Minimaal 6 tekens"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bevestig wachtwoord
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff4d00] focus:border-transparent"
                  placeholder="Herhaal wachtwoord"
                />
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-1 rounded accent-[#ff4d00]"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  Ik ga akkoord met de{" "}
                  <Link href="/voorwaarden" className="text-[#ff4d00] hover:underline">
                    voorwaarden
                  </Link>{" "}
                  en{" "}
                  <Link href="/privacy" className="text-[#ff4d00] hover:underline">
                    privacybeleid
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full gradient-primary text-white px-6 py-3 rounded-xl font-bold transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Account aanmaken..." : "Account aanmaken"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              Heb je al een account?{" "}
              <Link href="/inloggen" className="text-[#ff4d00] font-semibold hover:underline">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

