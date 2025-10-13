"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import { getDocument, setOrUpdateDocument } from "@/lib/firebase/firestore";
import Header from "@/components/Header";

export default function TaskDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { user, loading: authLoading } = useAuth();
  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [bidAmount, setBidAmount] = useState("");
  const [bidMessage, setBidMessage] = useState("");
  const [submittingBid, setSubmittingBid] = useState(false);

  useEffect(() => {
    const loadTask = async () => {
      if (!params.id) return;
      
      try {
        const taskData = await getDocument('tasks', params.id as string);
        setTask(taskData);
      } catch (error) {
        console.error("Error loading task:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTask();
  }, [params.id]);

  const handleSubmitBid = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !task) return;

    // Validation
    if (!bidAmount || parseFloat(bidAmount) <= 0) {
      alert('Voer een geldig bedrag in');
      return;
    }

    if (!bidMessage.trim()) {
      alert('Voeg een bericht toe voor de klant');
      return;
    }

    setSubmittingBid(true);
    try {
      const newBid = {
        klusserId: user.uid,
        klusserName: user.displayName || user.email,
        klusserPhoto: user.photoURL,
        amount: parseFloat(bidAmount),
        message: bidMessage,
        createdAt: new Date().toISOString(),
        status: "pending" // pending, accepted, rejected
      };

      // Add bid to task - preserve all existing task data
      const currentBids = task.bids || [];
      await setOrUpdateDocument('tasks', task.id, {
        ...task,
        bids: [...currentBids, newBid]
      });

      console.log('Bid submitted successfully:', newBid);
      alert('Bod succesvol uitgebracht! De klant ontvangt een notificatie.');
      
      // Small delay to ensure write completes
      await new Promise(resolve => setTimeout(resolve, 300));
      
      router.push('/klusser-dashboard');
    } catch (error) {
      console.error("Error submitting bid:", error);
      alert('Fout bij uitbrengen bod. Probeer opnieuw.');
    } finally {
      setSubmittingBid(false);
    }
  };

  if (loading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#ff4d00] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Laden...</p>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-32 pb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Klus niet gevonden</h1>
            <p className="text-gray-600 mb-8">Deze klus bestaat niet of is verwijderd.</p>
            <button
              onClick={() => router.back()}
              className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-dark transition-colors"
            >
              Terug
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isOwner = user?.uid === task.userId;
  const hasUserBid = task.bids?.some((bid: any) => bid.klusserId === user?.uid);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pt-24 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="mb-6 text-gray-600 hover:text-gray-900 font-medium flex items-center gap-2"
          >
            ← Terug
          </button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Task Header */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold uppercase">
                      {task.service}
                    </span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    task.status === 'open' ? 'bg-green-100 text-green-700' :
                    task.status === 'assigned' ? 'bg-blue-100 text-blue-700' :
                    task.status === 'completed' ? 'bg-gray-100 text-gray-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {task.status === 'open' ? 'Open' :
                     task.status === 'assigned' ? 'Toegewezen' :
                     task.status === 'completed' ? 'Voltooid' :
                     'In behandeling'}
                  </span>
                </div>

                <h1 className="text-3xl font-black mb-4">{task.service}</h1>
                <p className="text-gray-700 text-lg mb-6 whitespace-pre-wrap">{task.description}</p>

                <div className="grid md:grid-cols-2 gap-4 py-4 border-t border-gray-100">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">📍 Locatie</div>
                    <div className="font-medium">{task.location}, {task.postcode}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">📅 Datum</div>
                    <div className="font-medium">{task.date}</div>
                  </div>
                  {task.time && (
                    <div>
                      <div className="text-sm text-gray-500 mb-1">🕐 Tijd</div>
                      <div className="font-medium capitalize">{task.time}</div>
                    </div>
                  )}
                  {task.budget && (
                    <div>
                      <div className="text-sm text-gray-500 mb-1">💰 Budget</div>
                      <div className="font-medium text-primary">{task.budget}</div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="text-sm text-gray-500 mb-1">👤 Geplaatst door</div>
                  <div className="font-medium">{task.userName}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(task.createdAt).toLocaleDateString('nl-NL', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>

              {/* Bids Section */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold mb-6">
                  Biedingen ({task.bids?.length || 0})
                </h2>

                {task.bids && task.bids.length > 0 ? (
                  <div className="space-y-4">
                    {task.bids.map((bid: any, index: number) => (
                      <div key={index} className="border border-gray-200 rounded-xl p-4">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#ff4d00] to-[#0066ff] rounded-full flex items-center justify-center text-white font-bold">
                            {bid.klusserPhoto ? (
                              <img src={bid.klusserPhoto} alt={bid.klusserName} className="w-full h-full rounded-full object-cover" />
                            ) : (
                              bid.klusserName.charAt(0).toUpperCase()
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-bold">{bid.klusserName}</h3>
                              <div className="text-xl font-black text-primary">€{bid.amount}</div>
                            </div>
                            <p className="text-gray-600 text-sm mb-2">{bid.message}</p>
                            <div className="text-xs text-gray-500">
                              {new Date(bid.createdAt).toLocaleDateString('nl-NL', { 
                                day: 'numeric', 
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </div>
                            {isOwner && bid.status === 'pending' && (
                              <div className="flex gap-2 mt-3">
                                <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors">
                                  Accepteren
                                </button>
                                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors">
                                  Afwijzen
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Nog geen biedingen ontvangen
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {!isOwner && user && task.status === 'open' && (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
                  <h3 className="text-xl font-bold mb-4">
                    {hasUserBid ? 'Je hebt al geboden' : 'Breng een bod uit'}
                  </h3>

                  {hasUserBid ? (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-700">
                        Je bod is verzonden. De klant ontvangt een notificatie en kan je bod accepteren.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmitBid} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Jouw prijs (€)
                        </label>
                        <input
                          type="number"
                          value={bidAmount}
                          onChange={(e) => setBidAmount(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="75"
                          required
                          min="1"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Totaalprijs voor deze klus
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Bericht aan klant
                        </label>
                        <textarea
                          value={bidMessage}
                          onChange={(e) => setBidMessage(e.target.value)}
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Vertel waarom jij de beste keuze bent..."
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={submittingBid}
                        className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {submittingBid ? 'Bod uitbrengen...' : 'Bod Uitbrengen'}
                      </button>

                      <p className="text-xs text-gray-500 text-center">
                        Door een bod uit te brengen ga je akkoord met onze voorwaarden
                      </p>
                    </form>
                  )}
                </div>
              )}

              {isOwner && (
                <div className="bg-gradient-to-br from-[#ff4d00] to-[#0066ff] rounded-2xl p-6 text-white">
                  <h3 className="text-xl font-bold mb-4">Je klus</h3>
                  <p className="text-white/90 mb-4">
                    Dit is jouw klus. Je ontvangt notificaties wanneer klussers bieden.
                  </p>
                  <div className="bg-white/20 rounded-lg p-4">
                    <div className="text-2xl font-black mb-1">{task.bids?.length || 0}</div>
                    <div className="text-sm">Biedingen ontvangen</div>
                  </div>
                </div>
              )}

              {!user && (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-xl font-bold mb-4">Interesse?</h3>
                  <p className="text-gray-600 mb-4">
                    Log in om een bod uit te brengen op deze klus.
                  </p>
                  <button
                    onClick={() => router.push('/inloggen')}
                    className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-dark transition-colors"
                  >
                    Inloggen
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

