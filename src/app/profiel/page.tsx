"use client";

import Header from "@/components/Header";
import { useAuth } from "@/lib/context/AuthContext";
import { useState, useEffect, useRef } from "react";
import { setOrUpdateDocument, getDocument } from "@/lib/firebase/firestore";
import { updateUserProfile } from "@/lib/firebase/auth";
import { uploadFile } from "@/lib/firebase/storage";

export default function ProfilePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: ''
  });

  // Camera states
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [uploading, setUploading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Load user data from Firestore
  useEffect(() => {
    const loadUserData = async () => {
      if (!user) return;
      
      try {
        const userDoc = await getDocument('users', user.uid) as any;
        if (userDoc) {
          setFormData({
            firstName: userDoc.displayName?.split(' ')[0] || user.displayName?.split(' ')[0] || '',
            lastName: userDoc.displayName?.split(' ')[1] || user.displayName?.split(' ')[1] || '',
            phone: userDoc.phone || '',
            address: userDoc.address || ''
          });
        } else {
          // No document yet, use Auth data
          setFormData({
            firstName: user.displayName?.split(' ')[0] || '',
            lastName: user.displayName?.split(' ')[1] || '',
            phone: '',
            address: ''
          });
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [user]);

  // Cleanup camera stream when component unmounts or camera closes
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  // Set video source when stream changes
  useEffect(() => {
    if (showCamera && stream && videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch(err => console.error("Play error:", err));
    }
  }, [showCamera, stream]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setSaving(true);
    try {
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      
      // Update Firebase Auth displayName
      if (fullName !== user.displayName) {
        await updateUserProfile({ displayName: fullName });
      }
      
      // Update Firestore document
      await setOrUpdateDocument("users", user.uid, {
        displayName: fullName,
        phone: formData.phone,
        address: formData.address
      });
      
      alert('Profiel succesvol opgeslagen!');
      window.location.reload();
    } catch (error) {
      console.error("Error saving profile:", error);
      alert('Fout bij opslaan. Probeer opnieuw.');
    } finally {
      setSaving(false);
    }
  };

  const startCamera = async () => {
    try {
      // First show the modal
      setShowCamera(true);
      
      // Then request camera access
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 640 },
          height: { ideal: 480 }
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
        // Create a File object from the blob
        const file = new File([blob], `profile-${Date.now()}.jpg`, { type: 'image/jpeg' });
        
        // Upload to Firebase Storage
        const photoURL = await uploadFile(file, `users/${user.uid}/profile.jpg`);
        
        // Update Firebase Auth profile
        await updateUserProfile({ photoURL });
        
        // Update Firestore document
        await setOrUpdateDocument("users", user.uid, { photoURL });
        
        alert('Profielfoto succesvol bijgewerkt!');
        window.location.reload();
        
      } catch (error) {
        console.error("Error uploading photo:", error);
        alert('Fout bij uploaden van foto. Probeer opnieuw.');
      } finally {
        setUploading(false);
      }
    }, 'image/jpeg', 0.8);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-32 pb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Inloggen vereist</h1>
            <p className="text-gray-600 mb-8">Log in om uw profiel te bekijken</p>
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
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-3xl text-white overflow-hidden">
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || 'Profile'} className="w-full h-full object-cover" />
              ) : (
                user.displayName ? user.displayName.charAt(0).toUpperCase() : '👤'
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-black mb-2">
                {user.displayName || 'Gebruiker'}
              </h1>
              <p className="text-gray-600">{user.email}</p>
              {(!formData.phone || !formData.address) && !loading && (
                <p className="text-orange-600 text-sm mt-2 flex items-center gap-2">
                  <span>⚠️</span>
                  <span>Vul je telefoonnummer en adres in om klussen te kunnen plaatsen</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-1">
            {[
              { id: 'profile', label: 'Profiel' },
              { id: 'settings', label: 'Instellingen' },
              { id: 'security', label: 'Veiligheid' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-primary text-white' 
                    : 'text-gray-600 hover:text-primary hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <section className="py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Personal Info */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold mb-6">Persoonlijke Informatie</h2>
                
                <form onSubmit={handleSaveProfile} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Voornaam</label>
                      <input 
                        type="text" 
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Achternaam</label>
                      <input 
                        type="text" 
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">E-mail</label>
                    <input 
                      type="email" 
                      className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                      value={user.email || ''}
                      disabled
                    />
                    <p className="text-xs text-gray-500 mt-1">E-mail kan niet worden gewijzigd</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Telefoon *
                    </label>
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="+31 6 12345678"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Verplicht - zodat klussers contact kunnen opnemen
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Adres *
                    </label>
                    <textarea 
                      rows={3}
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Straatnaam 123, 1234 AB Amsterdam"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Verplicht - voor nauwkeurige klus locatie
                    </p>
                  </div>
                  
                  <button 
                    type="submit"
                    disabled={saving}
                    className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? 'Opslaan...' : 'Profiel Bijwerken'}
                  </button>
                </form>
              </div>

              {/* Profile Photo */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold mb-6">Profielfoto</h2>
                
                <div className="text-center">
                  <div className="w-32 h-32 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl text-gray-400 overflow-hidden">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="Profile" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <span className="text-6xl">📷</span>
                    )}
                  </div>
                  
                  <button 
                    onClick={startCamera}
                    disabled={uploading}
                    className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploading ? 'Uploaden...' : 'Foto Wijzigen'}
                  </button>
                  
                  <p className="text-sm text-gray-600">
                    Upload een duidelijke foto van uzelf
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <section className="py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {/* Notifications */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold mb-6">Notificaties</h2>
                
                <div className="space-y-4">
                  {[
                    { label: "E-mail notificaties", desc: "Ontvang updates over uw klussen" },
                    { label: "SMS berichten", desc: "Belangrijke updates via SMS" },
                    { label: "Push notificaties", desc: "Meldingen in de app" },
                    { label: "Marketing e-mails", desc: "Nieuws en aanbiedingen" }
                  ].map((setting, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{setting.label}</h3>
                        <p className="text-sm text-gray-600">{setting.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked={index < 3} />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preferences */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold mb-6">Voorkeuren</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Taal</label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                      <option>Nederlands</option>
                      <option>English</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Tijdzone</label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                      <option>Europa/Amsterdam (CET)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Valuta</label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                      <option>Euro (€)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <section className="py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {/* Password */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold mb-6">Wachtwoord Wijzigen</h2>
                
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Huidig wachtwoord</label>
                    <input 
                      type="password" 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Nieuw wachtwoord</label>
                    <input 
                      type="password" 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Bevestig nieuw wachtwoord</label>
                    <input 
                      type="password" 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <button className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-dark transition-colors">
                    Wachtwoord Bijwerken
                  </button>
                </form>
              </div>

              {/* Two-Factor Authentication */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold mb-6">Twee-Factor Authenticatie</h2>
                
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-medium">SMS Verificatie</h3>
                    <p className="text-sm text-gray-600">Extra beveiliging via SMS</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Tip:</strong> Twee-factor authenticatie verhoogt de beveiliging van uw account aanzienlijk.
                  </p>
                </div>
              </div>

              {/* Account Actions */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold mb-6">Account Acties</h2>
                
                <div className="space-y-4">
                  <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <h3 className="font-medium text-gray-900">Account Downloaden</h3>
                    <p className="text-sm text-gray-600">Download een kopie van uw gegevens</p>
                  </button>
                  
                  <button className="w-full text-left p-4 border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-red-600">
                    <h3 className="font-medium">Account Verwijderen</h3>
                    <p className="text-sm">Permanent verwijderen van uw account</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Camera Modal - Mobile Optimized */}
      {showCamera && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col overflow-hidden">
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
          <div className="relative bg-black flex-1 flex items-center justify-center overflow-hidden">
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
              <div className="w-64 h-64 md:w-80 md:h-80 border-4 border-white/50 rounded-full"></div>
            </div>

            {/* Loading indicator if stream not ready */}
            {!stream && (
              <div className="absolute inset-0 flex items-center justify-center bg-black">
                <div className="text-white text-center">
                  <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-lg">Camera wordt gestart...</p>
                </div>
              </div>
            )}
          </div>

          {/* Camera Controls - Mobile Optimized */}
          <div className="p-4 md:p-6 bg-black backdrop-blur-md flex-shrink-0 safe-area-bottom border-t border-gray-700">
            <div className="flex gap-3 md:gap-4 justify-center max-w-md mx-auto">
              <button
                onClick={stopCamera}
                className="flex-1 px-6 py-4 bg-white/20 hover:bg-white/30 active:bg-white/40 text-white rounded-2xl font-bold transition-colors text-base md:text-lg min-h-[56px]"
              >
                Annuleren
              </button>
              <button
                onClick={capturePhoto}
                disabled={uploading || !stream}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-[#ff4d00] to-[#0066ff] hover:shadow-lg active:scale-95 text-white rounded-2xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base md:text-lg min-h-[56px]"
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

      {/* Hidden canvas for photo capture */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
