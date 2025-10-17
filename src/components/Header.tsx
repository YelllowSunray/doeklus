"use client";

import Link from "next/link";
import { useAuth } from "@/lib/context/AuthContext";
import { signOut } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { getInitials } from "@/lib/utils";
import { useState, useEffect } from "react";
import { getDocument } from "@/lib/firebase/firestore";
import NotificationDropdown from "./NotificationDropdown";

export default function Header() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [userDoc, setUserDoc] = useState<any>(null);
  const [loadingUserDoc, setLoadingUserDoc] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setShowMobileMenu(false);
    setShowDropdown(false);
  }, [router]);

  // Load user document to check if they're a klusser
  useEffect(() => {
    const loadUserDoc = async () => {
      if (user) {
        setLoadingUserDoc(true);
        try {
          const doc = await getDocument('users', user.uid) as any;
          setUserDoc(doc);
        } catch (error) {
          console.error("Error loading user doc:", error);
          setUserDoc(null);
        } finally {
          setLoadingUserDoc(false);
        }
      } else {
        setUserDoc(null);
        setLoadingUserDoc(false);
      }
    };
    loadUserDoc();
  }, [user]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showMobileMenu]);

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 md:top-4 md:py-0">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/95 md:bg-white/80 backdrop-blur-xl border border-gray-200/50 md:rounded-2xl shadow-lg px-4 md:px-6 py-3">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <Link href="/" className="text-xl md:text-2xl font-bold text-gradient">
                Doeklus
              </Link>
              
              {/* Desktop Navigation */}
              <nav className="hidden lg:flex gap-6">
                <Link href="/diensten" className="text-sm font-medium hover:text-[#ff4d00] transition-colors">
                  Diensten
                </Link>
                <Link href="/prijzen" className="text-sm font-medium hover:text-[#ff4d00] transition-colors">
                  Prijzen
                </Link>
                <Link href="/hoe-werkt-het" className="text-sm font-medium hover:text-[#ff4d00] transition-colors">
                  Hoe werkt het
                </Link>
                {!loading && !user && (
                  <Link href="/word-klusser" className="text-sm font-medium hover:text-[#ff4d00] transition-colors">
                    Word Klusser
                  </Link>
                )}
              </nav>
              
              {/* Desktop Actions */}
              <div className="hidden lg:flex items-center gap-4">
                {loading ? (
                  <div className="w-8 h-8 border-2 border-[#ff4d00] border-t-transparent rounded-full animate-spin"></div>
                ) : user ? (
                  <>
                    <Link href="/word-klusser/aanmelden" className="text-sm font-medium text-white hover:text-[#ffd900] bg-black hover:bg-gray-800 px-4 py-2 rounded-full transition-colors">
                      + Start als klusser
                    </Link>
                    <Link href="/klus-plaatsen" className="text-sm font-medium hover:text-[#ff4d00] transition-colors">
                      + Nieuwe klus
                    </Link>
                    <NotificationDropdown />
                    <div className="relative">
                      <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                      >
                        {user.photoURL ? (
                          <img 
                            src={user.photoURL} 
                            alt={user.displayName || "Profile"} 
                            className="w-10 h-10 rounded-full object-cover border-2 border-[#ff4d00]"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gradient-to-br from-[#ff4d00] to-[#0066ff] rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {getInitials(user.displayName || user.email || "U")}
                          </div>
                        )}
                      </button>
                      
                      {showDropdown && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2">
                          <div className="px-4 py-2 border-b border-gray-100">
                            <p className="font-semibold text-sm text-gray-900">{user.displayName || "Account"}</p>
                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                            {userDoc?.role === 'klusser' && (
                              <span className="inline-block bg-[#ffd900] text-black px-2 py-1 rounded text-xs font-bold mt-1">
                                👷 KLUSSER
                              </span>
                            )}
                          </div>
                          
                          {loadingUserDoc ? (
                            // Loading state
                            <div className="px-4 py-2 text-sm text-gray-500">
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                                <span>Laden...</span>
                              </div>
                            </div>
                          ) : userDoc?.role === 'klusser' ? (
                            // Klusser menu
                            <>
                              <Link 
                                href="/klusser-dashboard?tab=profile" 
                                className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-50 transition-colors"
                                onClick={() => setShowDropdown(false)}
                              >
                                Mijn profiel
                              </Link>
                              <Link 
                                href="/klusser-dashboard" 
                                className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-50 transition-colors"
                                onClick={() => setShowDropdown(false)}
                              >
                                Klusser dashboard
                              </Link>
                              <Link 
                                href="/klusser-dashboard?tab=available" 
                                className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-50 transition-colors"
                                onClick={() => setShowDropdown(false)}
                              >
                                Beschikbare klussen
                              </Link>
                              <Link 
                                href="/dashboard" 
                                className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-50 transition-colors border-t border-gray-100"
                                onClick={() => setShowDropdown(false)}
                              >
                                Customer dashboard
                              </Link>
                            </>
                          ) : (
                            // Customer menu (default)
                            <>
                              <Link 
                                href="/profiel" 
                                className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-50 transition-colors"
                                onClick={() => setShowDropdown(false)}
                              >
                                Profiel
                              </Link>
                              <Link 
                                href="/dashboard" 
                                className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-50 transition-colors"
                                onClick={() => setShowDropdown(false)}
                              >
                                Dashboard
                              </Link>
                              <Link 
                                href="/mijn-klussen" 
                                className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-50 transition-colors"
                                onClick={() => setShowDropdown(false)}
                              >
                                Mijn klussen
                              </Link>
                              <Link 
                                href="/word-klusser" 
                                className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-50 transition-colors border-t border-gray-100"
                                onClick={() => setShowDropdown(false)}
                              >
                                Word klusser
                              </Link>
                            </>
                          )}
                          
                          <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            Uitloggen
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <Link href="/inloggen" className="text-sm font-medium hover:text-[#ff4d00] transition-colors">
                      Inloggen
                    </Link>
                    <Link href="/aanmelden" className="bg-[#ff4d00] hover:bg-[#cc3d00] text-white px-5 py-2 rounded-full text-sm font-semibold transition-all hover:shadow-lg">
                      Start nu
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="lg:hidden w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Menu"
              >
                {showMobileMenu ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setShowMobileMenu(false)}
          />
          <div className="fixed top-[72px] left-0 right-0 bottom-0 bg-white z-40 lg:hidden overflow-y-auto">
            <div className="p-6">
              {/* User Info */}
              {user && (
                <div className="flex items-center gap-4 pb-6 mb-6 border-b border-gray-200">
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt={user.displayName || "Profile"} 
                      className="w-16 h-16 rounded-full object-cover border-2 border-[#ff4d00]"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gradient-to-br from-[#ff4d00] to-[#0066ff] rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {getInitials(user.displayName || user.email || "U")}
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-lg">{user.displayName || "Account"}</p>
                    <p className="text-sm text-gray-500 truncate">{user.email}</p>
                  </div>
                </div>
              )}

              {/* Main Navigation */}
              <nav className="space-y-2">
                <Link 
                  href="/diensten" 
                  className="block px-4 py-3 text-base font-medium hover:bg-gray-50 rounded-xl transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  🛠️ Diensten
                </Link>
                <Link 
                  href="/prijzen" 
                  className="block px-4 py-3 text-base font-medium hover:bg-gray-50 rounded-xl transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  💰 Prijzen
                </Link>
                <Link 
                  href="/hoe-werkt-het" 
                  className="block px-4 py-3 text-base font-medium hover:bg-gray-50 rounded-xl transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  ❓ Hoe werkt het
                </Link>

                {user ? (
                  <>
                    <div className="h-px bg-gray-200 my-4"></div>
                    <Link 
                      href="/profiel" 
                      className="block px-4 py-3 text-base font-medium hover:bg-gray-50 rounded-xl transition-colors"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      👤 Profiel
                    </Link>
                    <Link 
                      href="/dashboard" 
                      className="block px-4 py-3 text-base font-medium hover:bg-gray-50 rounded-xl transition-colors"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      📊 Dashboard
                    </Link>
                    <Link 
                      href="/klus-plaatsen" 
                      className="block px-4 py-3 text-base font-medium hover:bg-gray-50 rounded-xl transition-colors"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      ➕ Nieuwe klus
                    </Link>
                    <Link 
                      href="/mijn-klussen" 
                      className="block px-4 py-3 text-base font-medium hover:bg-gray-50 rounded-xl transition-colors"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      📋 Mijn klussen
                    </Link>
                    <div className="h-px bg-gray-200 my-4"></div>
                    <Link 
                      href="/word-klusser" 
                      className="block px-4 py-3 text-base font-medium bg-black text-white hover:bg-gray-800 rounded-xl transition-colors"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      👷 Word klusser
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-base font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      🚪 Uitloggen
                    </button>
                  </>
                ) : (
                  <>
                    <div className="h-px bg-gray-200 my-4"></div>
                    <Link 
                      href="/word-klusser" 
                      className="block px-4 py-3 text-base font-medium hover:bg-gray-50 rounded-xl transition-colors"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      👷 Word Klusser
                    </Link>
                    <Link 
                      href="/inloggen" 
                      className="block px-4 py-3 text-base font-medium hover:bg-gray-50 rounded-xl transition-colors"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      🔐 Inloggen
                    </Link>
                    <Link 
                      href="/aanmelden" 
                      className="block px-4 py-3 text-base font-bold bg-gradient-to-r from-[#ff4d00] to-[#0066ff] text-white hover:shadow-lg rounded-xl transition-all text-center"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      🚀 Start nu
                    </Link>
                  </>
                )}
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  );
}

