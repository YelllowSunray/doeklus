"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import { signOut, updateUserProfile } from "@/lib/firebase/auth";
import { uploadFile } from "@/lib/firebase/storage";
import { setOrUpdateDocument } from "@/lib/firebase/firestore";
import { getInitials } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import { queryDocuments } from "@/lib/firebase/firestore";
import { where, orderBy, limit as firestoreLimit } from "firebase/firestore";

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [uploading, setUploading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recentTasks, setRecentTasks] = useState<any[]>([]);
  const [loadingTasks, setLoadingTasks] = useState(true);

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Cleanup camera stream when component unmounts or camera closes
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  // Attach stream to video when modal opens
  useEffect(() => {
    if (showCamera && stream && videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch(err => {
        console.error("Video play error:", err);
      });
    }
  }, [showCamera, stream]);

  // Load user's recent tasks
  useEffect(() => {
    const loadTasks = async () => {
      if (!user) return;
      
      try {
        const tasks = await queryDocuments('tasks', [
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc'),
          firestoreLimit(3)
        ]);
        setRecentTasks(tasks);
      } catch (error) {
        console.error("Error loading tasks:", error);
      } finally {
        setLoadingTasks(false);
      }
    };

    loadTasks();
  }, [user]);

  const startCamera = async () => {
    try {
      // First show the modal
      setShowCamera(true);
      
      // Then request camera access
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });
      
      console.log("Camera stream obtained:", mediaStream.getVideoTracks()[0].label);
      setStream(mediaStream);
      
    } catch (error) {
      console.error("Camera error:", error);
      setShowCamera(false);
      alert('Camera toegang geweigerd. Controleer je browser instellingen.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setShowCamera(false);
  };

  const capturePhoto = async () => {
    if (!videoRef.current || !canvasRef.current || !user) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw video frame to canvas
    const context = canvas.getContext('2d');
    if (!context) return;
    
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Convert canvas to blob
    canvas.toBlob(async (blob) => {
      if (!blob) return;
      
      setUploading(true);
      stopCamera();
      
      try {
        // Create File from blob
        const file = new File([blob], 'profile.jpg', { type: 'image/jpeg' });
        
        // Upload to Firebase Storage
        const photoURL = await uploadFile(file, `users/${user.uid}/profile.jpg`);
        
        // Update Firebase Auth profile
        await updateUserProfile({ photoURL });
        
        // Update Firestore user document (creates if doesn't exist)
        await setOrUpdateDocument("users", user.uid, { photoURL });
        
        // Force refresh to show new photo
        window.location.reload();
      } catch (error) {
        console.error("Photo upload error:", error);
        alert('Foto uploaden mislukt. Probeer opnieuw.');
      } finally {
        setUploading(false);
      }
    }, 'image/jpeg', 0.9);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#ff4d00] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Laden...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    router.push("/inloggen");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-4 left-0 right-0 z-50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-lg px-6 py-3">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold text-gradient">
                Doeklus
              </Link>
              <div className="flex items-center gap-4">
                <Link href="/klus-plaatsen" className="bg-[#ff4d00] hover:bg-[#cc3d00] text-white px-5 py-2 rounded-full text-sm font-semibold transition-all">
                  + Nieuwe klus
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium hover:text-[#ff4d00] transition-colors"
                >
                  Uitloggen
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section - Mobile Optimized */}
          <div className="bg-gradient-to-br from-[#ff4d00] to-[#0066ff] rounded-2xl md:rounded-3xl p-6 md:p-12 text-white mb-6 md:mb-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6">
              {/* Profile Photo - Clickable with Prompt */}
              <div className="relative flex-shrink-0">
                <button
                  onClick={startCamera}
                  disabled={uploading}
                  className="w-20 h-20 md:w-24 md:h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-3xl md:text-4xl font-black overflow-hidden relative active:bg-white/30 transition-all disabled:cursor-not-allowed border-4 border-white/30 active:border-white/50 touch-manipulation"
                >
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || ""} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-white/60">📷</span>
                  )}
                  
                  {/* Camera Icon Overlay - Hidden on mobile (touch), shown on hover (desktop) */}
                  {!uploading && (
                    <div className="absolute inset-0 bg-black/60 opacity-0 md:hover:opacity-100 transition-opacity flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-2xl md:text-3xl mb-1">📸</span>
                      <span className="text-xs font-bold">Selfie</span>
                    </div>
                  )}
                  
                  {uploading && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <div className="w-6 h-6 md:w-8 md:h-8 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </button>
                
                {/* Tooltip for users without photo */}
                {!user.photoURL && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-[#ffd900] text-black px-2 md:px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap animate-pulse">
                    Klik voor selfie! ✨
                  </div>
                )}
              </div>
              
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-2xl md:text-4xl font-black mb-2">
                  Welkom, {user.displayName?.split(' ')[0] || "daar"}! 👋
                </h1>
                <p className="text-white/90 mb-2 text-sm md:text-base">
                  Klaar om een klus te regelen?
                </p>
                {!user.photoURL && (
                  <p className="text-white/70 text-xs md:text-sm flex items-center justify-center sm:justify-start gap-2">
                    <span className="bg-white/20 px-2 py-1 rounded">💡 Tip:</span>
                    <span className="hidden sm:inline">Voeg een profielfoto toe voor meer vertrouwen</span>
                    <span className="sm:hidden">Voeg een foto toe</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Link href="/klus-plaatsen" className="bg-white rounded-3xl p-8 card-hover border border-gray-200">
              <div className="text-5xl mb-4">📝</div>
              <h3 className="font-bold text-xl mb-2">Plaats een klus</h3>
              <p className="text-gray-600">Vertel wat er moet gebeuren en krijg aanbiedingen</p>
            </Link>

            <Link href="/mijn-klussen" className="bg-white rounded-3xl p-8 card-hover border border-gray-200">
              <div className="text-5xl mb-4">📋</div>
              <h3 className="font-bold text-xl mb-2">Mijn klussen</h3>
              <p className="text-gray-600">Bekijk de status van je klussen</p>
            </Link>

            <Link href="/favorieten" className="bg-white rounded-3xl p-8 card-hover border border-gray-200">
              <div className="text-5xl mb-4">⭐</div>
              <h3 className="font-bold text-xl mb-2">Favoriete klussers</h3>
              <p className="text-gray-600">Je opgeslagen klussers</p>
            </Link>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-3xl p-8 border border-gray-200">
            <h2 className="text-2xl font-black mb-6">Recente activiteit</h2>
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔨</div>
              <p className="text-gray-600 mb-6">Je hebt nog geen klussen geplaatst</p>
              <Link href="/klus-plaatsen" className="inline-block gradient-primary text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all">
                Plaats je eerste klus
              </Link>
            </div>
          </div>

          {/* Become Klusser CTA */}
          <div className="mt-8 bg-black rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-64 h-64 bg-[#ff4d00] rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#ffd900] rounded-full blur-3xl"></div>
            </div>
            <div className="relative z-10 max-w-2xl">
              <div className="inline-block bg-[#ffd900] text-black px-4 py-2 rounded-full text-sm font-bold mb-4">
                💰 VERDIEN €25-50/UUR
              </div>
              <h3 className="text-3xl font-black mb-4">Zelf klussen doen?</h3>
              <p className="text-gray-300 mb-6">
                Word klusser en verdien geld met je vaardigheden. Flexibel werken, zelf je klussen kiezen.
              </p>
              <Link href="/word-klusser" className="inline-block bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">
                Word klusser →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Camera Modal - Mobile Optimized */}
      {showCamera && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col">
          {/* Camera Header */}
          <div className="bg-gradient-to-r from-[#ff4d00] to-[#0066ff] p-4 md:p-6 text-white flex-shrink-0 safe-area-top">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl md:text-2xl font-black">📸 Neem een selfie</h3>
                <p className="text-white/80 text-sm md:text-base mt-1">Zorg dat je gezicht goed zichtbaar is</p>
              </div>
              <button
                onClick={stopCamera}
                className="w-10 h-10 md:w-12 md:h-12 bg-white/20 hover:bg-white/30 active:bg-white/40 rounded-full flex items-center justify-center transition-colors flex-shrink-0"
                aria-label="Sluiten"
              >
                <span className="text-xl">✕</span>
              </button>
            </div>
          </div>

          {/* Camera View */}
          <div className="relative bg-black flex-1 flex items-center justify-center">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover mirror"
              onLoadedMetadata={(e) => {
                const video = e.currentTarget;
                video.play().catch(err => console.error("Play error:", err));
              }}
            />
            
            {/* Guide Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-48 h-48 md:w-64 md:h-64 border-4 border-white/50 rounded-full"></div>
            </div>

            {/* Loading indicator if stream not ready */}
            {!stream && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-lg">Camera wordt gestart...</p>
                </div>
              </div>
            )}
          </div>

          {/* Camera Controls - Mobile Optimized */}
          <div className="p-4 md:p-6 bg-gray-900/50 backdrop-blur-md flex-shrink-0 safe-area-bottom">
            <div className="flex gap-3 md:gap-4 justify-center max-w-md mx-auto">
              <button
                onClick={stopCamera}
                className="flex-1 px-6 py-4 bg-white/20 hover:bg-white/30 active:bg-white/40 text-white rounded-2xl font-bold transition-colors text-base md:text-lg"
              >
                Annuleren
              </button>
              <button
                onClick={capturePhoto}
                disabled={uploading || !stream}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-[#ff4d00] to-[#0066ff] hover:shadow-lg active:scale-95 text-white rounded-2xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base md:text-lg"
              >
                {uploading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span className="hidden sm:inline">Uploaden...</span>
                    <span className="sm:hidden">...</span>
                  </>
                ) : (
                  <>
                    <span className="text-2xl">📷</span>
                    <span>Maak foto</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden Canvas for Photo Capture */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}

