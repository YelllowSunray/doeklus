"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/firebase/auth";
import { useAuth } from "@/lib/context/AuthContext";
import { handleAuthError } from "@/lib/firebase/errors";

export default function LoginPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user && !authLoading) {
      router.push("/dashboard");
    }
  }, [user, authLoading, router]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signIn(email, password);
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

      {/* Login Form */}
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black mb-3">Welkom terug!</h1>
            <p className="text-gray-600">Log in om verder te gaan</p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200">

            {/* Error Message */}
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            {/* Email/Password Form */}
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff4d00] focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded accent-[#ff4d00]" />
                  <span className="text-gray-600">Onthoud mij</span>
                </label>
                <Link href="/wachtwoord-vergeten" className="text-[#ff4d00] hover:underline">
                  Wachtwoord vergeten?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full gradient-primary text-white px-6 py-3 rounded-xl font-bold transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Bezig met inloggen..." : "Inloggen"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              Nog geen account?{" "}
              <Link href="/aanmelden" className="text-[#ff4d00] font-semibold hover:underline">
                Meld je aan
              </Link>
            </div>
          </div>

          {/* Klusser CTA */}
          <div className="mt-8 bg-gradient-to-r from-[#ff4d00] to-[#0066ff] rounded-3xl p-6 text-white text-center">
            <h3 className="font-bold text-lg mb-2">Ben je klusser?</h3>
            <p className="text-sm text-white/90 mb-4">
              Verdien geld met je vaardigheden
            </p>
            <Link
              href="/word-klusser"
              className="inline-block bg-white text-[#ff4d00] px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Word klusser →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

