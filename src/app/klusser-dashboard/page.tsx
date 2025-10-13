"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import { signOut } from "@/lib/firebase/auth";
import { getInitials } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { getDocument, setOrUpdateDocument, queryDocuments } from "@/lib/firebase/firestore";
import { where, orderBy } from "firebase/firestore";
import { updateUserProfile } from "@/lib/firebase/auth";
import { uploadFile } from "@/lib/firebase/storage";

export default function KlusserDashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('available');
  const [klusserStatus, setKlusserStatus] = useState<string>('approved');
  const [userDoc, setUserDoc] = useState<any>(null);
  const [availableTasks, setAvailableTasks] = useState<any[]>([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [tasksError, setTasksError] = useState<string | null>(null);
  const [autoRefreshSeconds, setAutoRefreshSeconds] = useState(30);
  
  // Profile editing states
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: '',
    phone: '',
    address: '',
    bio: '',
    experience: '',
    hourlyRate: '',
    skills: [] as string[],
    availability: [] as string[]
  });
  const [savingProfile, setSavingProfile] = useState(false);
  
  // Camera states
  const [showCamera, setShowCamera] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Camera functions (same as dashboard)
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  useEffect(() => {
    if (showCamera && stream && videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch(err => console.error("Video play error:", err));
    }
  }, [showCamera, stream]);

  const startCamera = async () => {
    try {
      setShowCamera(true);
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
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
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    if (!context) return;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    canvas.toBlob(async (blob) => {
      if (!blob) return;
      setUploading(true);
      stopCamera();
      
      try {
        const file = new File([blob], 'profile.jpg', { type: 'image/jpeg' });
        const photoURL = await uploadFile(file, `users/${user.uid}/profile.jpg`);
        await updateUserProfile({ photoURL });
        await setOrUpdateDocument("users", user.uid, { photoURL });
        window.location.reload();
      } catch (error) {
        console.error("Photo upload error:", error);
        alert('Foto uploaden mislukt. Probeer opnieuw.');
      } finally {
        setUploading(false);
      }
    }, 'image/jpeg', 0.9);
  };

  // Profile editing functions
  const loadProfileData = () => {
    if (userDoc) {
      setProfileData({
        displayName: userDoc.displayName || '',
        phone: userDoc.klusserProfile?.phone || '',
        address: userDoc.klusserProfile?.address || '',
        bio: userDoc.klusserProfile?.bio || '',
        experience: userDoc.klusserProfile?.experience || '',
        hourlyRate: userDoc.klusserProfile?.hourlyRate?.toString() || '',
        skills: userDoc.klusserProfile?.skills || [],
        availability: userDoc.klusserProfile?.availability || []
      });
    }
  };

  const toggleSkill = (skill: string) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const toggleAvailability = (day: string) => {
    setProfileData(prev => ({
      ...prev,
      availability: prev.availability.includes(day)
        ? prev.availability.filter(d => d !== day)
        : [...prev.availability, day]
    }));
  };

  const saveProfile = async () => {
    if (!user) return;
    setSavingProfile(true);

    try {
      // Update display name in Auth
      if (profileData.displayName !== user.displayName) {
        await updateUserProfile({ displayName: profileData.displayName });
      }

      // Update Firestore document
      await setOrUpdateDocument("users", user.uid, {
        displayName: profileData.displayName,
        klusserProfile: {
          ...userDoc.klusserProfile,
          phone: profileData.phone,
          address: profileData.address,
          bio: profileData.bio,
          experience: profileData.experience,
          hourlyRate: parseFloat(profileData.hourlyRate) || 0,
          skills: profileData.skills,
          availability: profileData.availability
        }
      });

      alert('Profiel succesvol bijgewerkt!');
      setIsEditingProfile(false);
      window.location.reload();
    } catch (error) {
      console.error("Error saving profile:", error);
      alert('Fout bij opslaan. Probeer opnieuw.');
    } finally {
      setSavingProfile(false);
    }
  };

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
    "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"
  ];

  // Get user document and load available tasks
  useEffect(() => {
    const loadData = async () => {
      if (!user) return;
      
      // Get user document
      const doc = await getDocument('users', user.uid) as any;
      if (doc) {
        setUserDoc(doc);
        setKlusserStatus(doc.klusserProfile?.status || 'approved');
        
        // Load profile data for editing
        setProfileData({
          displayName: doc.displayName || '',
          phone: doc.klusserProfile?.phone || '',
          address: doc.klusserProfile?.address || '',
          bio: doc.klusserProfile?.bio || '',
          experience: doc.klusserProfile?.experience || '',
          hourlyRate: doc.klusserProfile?.hourlyRate?.toString() || '',
          skills: doc.klusserProfile?.skills || [],
          availability: doc.klusserProfile?.availability || []
        });
      }
      
      // Fetch available tasks from Firestore
      try {
        const tasks = await queryDocuments('tasks', [
          where('status', '==', 'open'),
          orderBy('createdAt', 'desc')
        ]);
        console.log("Loaded tasks:", tasks.length);
        setAvailableTasks(tasks);
      } catch (error: any) {
        console.error("Error loading tasks:", error);
        
        // Check if it's an index error
        if (error.message?.includes('index') || error.message?.includes('Index')) {
          // Check if it's building
          if (error.message?.includes('building') || error.message?.includes('Building')) {
            setTasksError('building');
          } else {
            setTasksError('index');
          }
        } else {
          setTasksError('general');
        }
      } finally {
        setLoadingTasks(false);
      }
    };
    
    loadData();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-16 h-16 border-4 border-[#ffd900] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Laden...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    router.push("/inloggen");
    return null;
  }

  // Stats from user profile
  const stats = {
    earned: userDoc?.klusserProfile?.totalEarnings || 0,
    completed: userDoc?.klusserProfile?.completedTasks || 0,
    rating: userDoc?.klusserProfile?.rating || 0,
    reviews: userDoc?.klusserProfile?.reviewCount || 0
  };

  // Format time ago
  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMins < 60) return `${diffMins} min geleden`;
    if (diffHours < 24) return `${diffHours} uur geleden`;
    return `${diffDays} dag${diffDays > 1 ? 'en' : ''} geleden`;
  };

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
              <div className="flex items-center gap-4">
                <Link href="/klusser-dashboard" className="text-sm font-medium text-[#ffd900]">
                  Dashboard
                </Link>
                <Link href="/profiel" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
                  Profiel
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-white/80 hover:text-white transition-colors"
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
          {/* Welcome Section */}
          <div className="bg-gradient-to-br from-[#ffd900] to-[#ff9500] rounded-3xl p-8 md:p-12 text-black mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-black/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl font-black">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || ""} className="w-full h-full rounded-2xl object-cover" />
                  ) : (
                    getInitials(user.displayName || user.email || "K")
                  )}
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-black mb-2">
                    Hey {user.displayName?.split(' ')[0] || "Klusser"}! 👷
                  </h1>
                  <p className="text-black/80">
                    Klaar voor nieuwe klussen?
                  </p>
                </div>
              </div>
              
              {/* Status Badge */}
              <div className="hidden md:block">
                {klusserStatus === 'approved' ? (
                  <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                    ✓ Goedgekeurd
                  </div>
                ) : klusserStatus === 'pending' ? (
                  <div className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                    ⏳ In behandeling
                  </div>
                ) : (
                  <div className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                    ✗ Afgekeurd
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stats */}
          {(
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
                <div className="text-3xl font-black text-[#ffd900] mb-2">€{stats.earned}</div>
                <div className="text-sm text-gray-400">Deze maand verdiend</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
                <div className="text-3xl font-black text-[#ffd900] mb-2">{stats.completed}</div>
                <div className="text-sm text-gray-400">Klussen voltooid</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
                <div className="text-3xl font-black text-[#ffd900] mb-2">{stats.rating} ⭐</div>
                <div className="text-sm text-gray-400">Gemiddelde rating</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
                <div className="text-3xl font-black text-[#ffd900] mb-2">{stats.reviews}</div>
                <div className="text-sm text-gray-400">Beoordelingen</div>
              </div>
            </div>
          )}

          {/* Dashboard Content */}
          {(
            <>
              {/* Tabs */}
              <div className="flex gap-1 mb-8 overflow-x-auto">
                {[
                  { id: 'available', label: 'Beschikbare Klussen', count: availableTasks.length },
                  { id: 'profile', label: 'Mijn Profiel', icon: '👤' },
                  { id: 'active', label: 'Actieve Klussen', count: 0 },
                  { id: 'completed', label: 'Voltooid', count: stats.completed }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 md:px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${
                      activeTab === tab.id 
                        ? 'bg-[#ffd900] text-black' 
                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {tab.icon || ''} {tab.label} {tab.count !== undefined && `(${tab.count})`}
                  </button>
                ))}
              </div>

              {/* Available Jobs List */}
              {activeTab === 'available' && (
                <div className="space-y-6">
                  {loadingTasks ? (
                    <div className="text-center py-20">
                      <div className="w-12 h-12 border-4 border-[#ffd900] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-gray-400">Klussen laden...</p>
                    </div>
                  ) : tasksError === 'building' ? (
                    <div className="bg-blue-500/20 border-2 border-blue-500 rounded-2xl p-8">
                      <div className="text-center">
                        <div className="text-6xl mb-4">⏳</div>
                        <h3 className="text-2xl font-bold mb-4 text-blue-200">Index wordt gebouwd...</h3>
                        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                          Firebase is de index aan het bouwen. Dit duurt 2-5 minuten. 
                          Deze pagina refresht automatisch elke 30 seconden.
                        </p>
                        <div className="bg-black/30 rounded-xl p-4 mb-6 inline-block">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 border-4 border-[#ffd900] border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-lg font-bold text-[#ffd900]">Building...</span>
                          </div>
                        </div>
                        <p className="text-sm text-blue-200">
                          💡 Je kunt ondertussen je profiel compleet maken in het "Mijn Profiel" tab
                        </p>
                      </div>
                    </div>
                  ) : tasksError === 'index' ? (
                    <div className="bg-orange-500/20 border-2 border-orange-500 rounded-2xl p-8">
                      <div className="text-center">
                        <div className="text-6xl mb-4">🔧</div>
                        <h3 className="text-2xl font-bold mb-4 text-orange-200">Firestore Index Vereist</h3>
                        <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
                          Om klussen te laden, moet je een Firestore index aanmaken. Dit hoef je maar 1 keer te doen!
                        </p>
                        <div className="bg-black/30 rounded-xl p-6 mb-6 text-left max-w-2xl mx-auto">
                          <p className="text-sm text-gray-300 mb-3"><strong>Stappen:</strong></p>
                          <ol className="text-sm text-gray-300 space-y-2 list-decimal list-inside">
                            <li>Open de browser console (F12)</li>
                            <li>Klik op de Firebase Console link in de error</li>
                            <li>Klik "Create Index"</li>
                            <li>Wacht 2-5 minuten tot status "Enabled" is</li>
                            <li>Refresh deze pagina</li>
                          </ol>
                        </div>
                        <a 
                          href="https://console.firebase.google.com/project/doeklus/firestore/indexes"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-[#ffd900] text-black px-8 py-3 rounded-lg font-bold hover:bg-yellow-400 transition-colors"
                        >
                          Open Firebase Console →
                        </a>
                      </div>
                    </div>
                  ) : tasksError ? (
                    <div className="text-center py-20">
                      <div className="text-6xl mb-4">⚠️</div>
                      <h3 className="text-2xl font-bold mb-4">Fout bij laden</h3>
                      <p className="text-gray-400 mb-8">
                        Er is een fout opgetreden. Check de console (F12) voor details.
                      </p>
                      <button
                        onClick={() => window.location.reload()}
                        className="bg-[#ffd900] text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-400 transition-colors"
                      >
                        Probeer opnieuw
                      </button>
                    </div>
                  ) : availableTasks.length === 0 ? (
                    <div className="text-center py-20">
                      <div className="text-6xl mb-4">🔍</div>
                      <h3 className="text-2xl font-bold mb-4">Geen beschikbare klussen</h3>
                      <p className="text-gray-400 mb-8">
                        Er zijn momenteel geen openstaande klussen. Check later opnieuw!
                      </p>
                    </div>
                  ) : (
                    availableTasks.map(task => (
                      <div key={task.id} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:border-[#ffd900]/50 transition-colors">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="bg-[#ffd900] text-black px-2 py-1 rounded text-xs font-bold uppercase">
                                {task.service}
                              </span>
                              <span className="text-xs text-gray-400">
                                🕐 {getTimeAgo(task.createdAt)}
                              </span>
                            </div>
                            <h3 className="text-xl font-bold mb-2">{task.service}</h3>
                            <p className="text-gray-400 mb-3">{task.description}</p>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                              <span>📍 {task.location}, {task.postcode}</span>
                              <span>📅 {task.date}</span>
                              {task.time && <span>🕐 {task.time}</span>}
                              <span>👤 {task.userName}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            {task.budget && (
                              <div className="bg-[#ffd900]/20 px-4 py-2 rounded-lg">
                                <div className="text-sm text-gray-400">Budget</div>
                                <div className="text-xl font-bold text-[#ffd900]">{task.budget}</div>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex gap-3">
                          <button 
                            onClick={() => router.push(`/klussen/${task.id}`)}
                            className="flex-1 bg-[#ffd900] text-black py-3 rounded-lg font-bold hover:bg-yellow-400 transition-colors"
                          >
                            Bekijk & Bied
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'active' && (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">🔨</div>
                  <h3 className="text-2xl font-bold mb-4">Geen actieve klussen</h3>
                  <p className="text-gray-400 mb-8">
                    Je hebt momenteel geen actieve klussen. Accepteer een nieuwe klus om te beginnen!
                  </p>
                </div>
              )}

              {activeTab === 'completed' && (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-2xl font-bold mb-4">Voltooide klussen</h3>
                  <p className="text-gray-400">
                    Je hebt {stats.completed} klussen voltooid. Geweldig werk!
                  </p>
                </div>
              )}

              {/* Profile Editing Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  {/* Profile Photo Section */}
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
                    <h3 className="text-2xl font-bold mb-6">Profielfoto</h3>
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      <div className="relative">
                        <button
                          onClick={startCamera}
                          disabled={uploading}
                          className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center text-4xl overflow-hidden relative hover:bg-white/30 transition-all border-4 border-[#ffd900]/50"
                        >
                          {user.photoURL ? (
                            <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-white/60">📷</span>
                          )}
                          <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
                            <span className="text-3xl">📸</span>
                            <span className="text-xs font-bold mt-1">Selfie</span>
                          </div>
                        </button>
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <h4 className="font-bold text-lg mb-2">Voeg een profielfoto toe</h4>
                        <p className="text-gray-400 text-sm mb-4">
                          Klanten vertrouwen klussers met een duidelijke foto meer. Neem een selfie!
                        </p>
                        <button
                          onClick={startCamera}
                          className="bg-[#ffd900] text-black px-6 py-2 rounded-lg font-bold hover:bg-yellow-400 transition-colors"
                        >
                          📸 Neem Selfie
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Profile Info Section */}
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold">Profiel Informatie</h3>
                      {!isEditingProfile && (
                        <button
                          onClick={() => {
                            loadProfileData();
                            setIsEditingProfile(true);
                          }}
                          className="bg-white/10 text-white px-4 py-2 rounded-lg font-medium hover:bg-white/20 transition-colors"
                        >
                          ✏️ Bewerken
                        </button>
                      )}
                    </div>

                    {isEditingProfile ? (
                      <form onSubmit={(e) => { e.preventDefault(); saveProfile(); }} className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Naam</label>
                          <input
                            type="text"
                            value={profileData.displayName}
                            onChange={(e) => setProfileData({...profileData, displayName: e.target.value})}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-[#ffd900]"
                            required
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Telefoon</label>
                            <input
                              type="tel"
                              value={profileData.phone}
                              onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                              className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-[#ffd900]"
                              placeholder="+31 6 12345678"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Uurtarief (€)</label>
                            <input
                              type="number"
                              value={profileData.hourlyRate}
                              onChange={(e) => setProfileData({...profileData, hourlyRate: e.target.value})}
                              className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-[#ffd900]"
                              placeholder="35"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Adres/Locatie</label>
                          <input
                            type="text"
                            value={profileData.address}
                            onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-[#ffd900]"
                            placeholder="Amsterdam"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Over jou</label>
                          <textarea
                            value={profileData.bio}
                            onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                            rows={4}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-[#ffd900]"
                            placeholder="Vertel over je ervaring..."
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Ervaring</label>
                          <input
                            type="text"
                            value={profileData.experience}
                            onChange={(e) => setProfileData({...profileData, experience: e.target.value})}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-[#ffd900]"
                            placeholder="5+ jaar ervaring"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-3">Vaardigheden</label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {skillOptions.map(skill => (
                              <button
                                key={skill}
                                type="button"
                                onClick={() => toggleSkill(skill)}
                                className={`p-3 rounded-lg border-2 transition-all text-sm ${
                                  profileData.skills.includes(skill)
                                    ? 'border-[#ffd900] bg-[#ffd900]/20 text-white'
                                    : 'border-white/20 hover:border-white/40 text-gray-400'
                                }`}
                              >
                                {profileData.skills.includes(skill) && '✓ '}{skill}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-3">Beschikbaarheid</label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {availabilityOptions.map(day => (
                              <button
                                key={day}
                                type="button"
                                onClick={() => toggleAvailability(day)}
                                className={`p-3 rounded-lg border-2 transition-all text-sm ${
                                  profileData.availability.includes(day)
                                    ? 'border-[#ffd900] bg-[#ffd900]/20 text-white'
                                    : 'border-white/20 hover:border-white/40 text-gray-400'
                                }`}
                              >
                                {profileData.availability.includes(day) && '✓ '}{day}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <button
                            type="button"
                            onClick={() => setIsEditingProfile(false)}
                            className="flex-1 bg-white/10 text-white py-3 rounded-lg font-bold hover:bg-white/20 transition-colors"
                          >
                            Annuleren
                          </button>
                          <button
                            type="submit"
                            disabled={savingProfile}
                            className="flex-1 bg-[#ffd900] text-black py-3 rounded-lg font-bold hover:bg-yellow-400 transition-colors disabled:opacity-50"
                          >
                            {savingProfile ? 'Opslaan...' : 'Profiel Opslaan'}
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm text-gray-400 mb-1">Naam</div>
                            <div className="text-lg font-medium">{userDoc?.displayName || 'Niet ingevuld'}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-400 mb-1">Telefoon</div>
                            <div className="text-lg font-medium">{userDoc?.klusserProfile?.phone || 'Niet ingevuld'}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-400 mb-1">Locatie</div>
                            <div className="text-lg font-medium">{userDoc?.klusserProfile?.address || 'Niet ingevuld'}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-400 mb-1">Uurtarief</div>
                            <div className="text-lg font-medium text-[#ffd900]">
                              €{userDoc?.klusserProfile?.hourlyRate || '0'}/uur
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-gray-400 mb-1">Over mij</div>
                          <div className="text-gray-300">{userDoc?.klusserProfile?.bio || 'Niet ingevuld'}</div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-gray-400 mb-2">Vaardigheden</div>
                          <div className="flex flex-wrap gap-2">
                            {userDoc?.klusserProfile?.skills?.length > 0 ? (
                              userDoc.klusserProfile.skills.map((skill: string) => (
                                <span key={skill} className="bg-[#ffd900]/20 text-[#ffd900] px-3 py-1 rounded-full text-sm">
                                  {skill}
                                </span>
                              ))
                            ) : (
                              <span className="text-gray-500">Geen vaardigheden toegevoegd</span>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-gray-400 mb-2">Beschikbaarheid</div>
                          <div className="flex flex-wrap gap-2">
                            {userDoc?.klusserProfile?.availability?.length > 0 ? (
                              userDoc.klusserProfile.availability.map((day: string) => (
                                <span key={day} className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">
                                  {day}
                                </span>
                              ))
                            ) : (
                              <span className="text-gray-500">Geen beschikbaarheid ingesteld</span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Camera Modal - Same as customer dashboard */}
      {showCamera && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col">
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
            
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-48 h-48 md:w-64 md:h-64 border-4 border-white/50 rounded-full"></div>
            </div>

            {!stream && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-lg">Camera wordt gestart...</p>
                </div>
              </div>
            )}
          </div>

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

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}

