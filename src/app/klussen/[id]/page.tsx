"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import { getDocument, setOrUpdateDocument, deleteDocument } from "@/lib/firebase/firestore";
import { createBidNotification, createBidAcceptedNotification } from "@/lib/notifications";
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
  const [userPhone, setUserPhone] = useState<string>("");
  const [editingBid, setEditingBid] = useState<any>(null);
  const [removingBid, setRemovingBid] = useState<string | null>(null);
  const [klusserPhones, setKlusserPhones] = useState<{[klusserId: string]: string}>({});
  const [deletingTask, setDeletingTask] = useState(false);
  const [currentUserDoc, setCurrentUserDoc] = useState<any>(null);

  useEffect(() => {
    const loadTask = async () => {
      if (!params.id) return;
      
      try {
        const taskData = await getDocument('tasks', params.id as string);
        setTask(taskData);

        // Fetch user's phone number
        if (taskData?.userId) {
          try {
            const userDoc = await getDocument('users', taskData.userId) as any;
            setUserPhone(userDoc?.phone || '');
          } catch (error) {
            console.error("Error fetching user phone:", error);
          }
        }

        // Load klusser phone numbers for all bids
        if (taskData?.bids && taskData.bids.length > 0) {
          const uniqueKlusserIds = [...new Set(taskData.bids.map((bid: any) => bid.klusserId))] as string[];
          const phoneNumbers: {[klusserId: string]: string} = {};
          
          for (const klusserId of uniqueKlusserIds) {
            try {
              const klusserDoc = await getDocument('users', klusserId) as any;
              if (klusserDoc?.phone) {
                phoneNumbers[klusserId] = klusserDoc.phone;
              }
            } catch (error) {
              console.error(`Error fetching klusser ${klusserId} phone:`, error);
            }
          }
          setKlusserPhones(phoneNumbers);
        }
      } catch (error) {
        console.error("Error loading task:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTask();
  }, [params.id]);

  // Load current user's profile to check phone number
  useEffect(() => {
    const loadCurrentUserProfile = async () => {
      if (!user) return;
      
      try {
        const userDoc = await getDocument('users', user.uid) as any;
        setCurrentUserDoc(userDoc);
      } catch (error) {
        console.error("Error loading current user profile:", error);
      }
    };

    loadCurrentUserProfile();
  }, [user]);

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

    // Check if user has phone number
    const userPhone = currentUserDoc?.phone || currentUserDoc?.klusserProfile?.phone;
    if (!userPhone || userPhone.trim() === '') {
      alert('Je moet eerst een telefoonnummer toevoegen aan je profiel voordat je kunt bieden. Klik op de cirkel rechtsboven om naar je profiel te gaan.');
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

      console.log('Submitting bid:', newBid);
      console.log('Task ID:', task.id);

      // Add bid to task - only update the bids array
      const currentBids = task.bids || [];
      console.log('Current bids:', currentBids);
      
      await setOrUpdateDocument('tasks', task.id, {
        bids: [...currentBids, newBid]
      });

      console.log('Bid submitted successfully:', newBid);

      // Create notification for task owner (if not bidding on own task)
      if (task.userId !== user.uid) {
        try {
          await createBidNotification(
            task.userId,
            user.displayName || user.email || 'Anonieme klusser',
            task.service,
            parseFloat(bidAmount),
            task.id
          );
          console.log('Notification sent to task owner');
        } catch (notificationError) {
          console.error('Failed to send notification:', notificationError);
          // Don't fail the bid submission if notification fails
        }
      }
      
      // Update local state to show the new bid immediately
      setTask({ ...task, bids: [...currentBids, newBid] });
      setBidAmount("");
      setBidMessage("");
      
      alert('Bod succesvol uitgebracht! De eigenaar van de klus is op de hoogte gesteld.');
    } catch (error) {
      console.error("Error submitting bid:", error);
      console.error("Error details:", {
        taskId: task.id,
        userId: user.uid,
        bidAmount: bidAmount,
        bidMessage: bidMessage
      });
      alert('Fout bij uitbrengen bod. Probeer opnieuw.');
    } finally {
      setSubmittingBid(false);
    }
  };

  const handleEditBid = (bid: any) => {
    setEditingBid(bid);
    setBidAmount(bid.amount.toString());
    setBidMessage(bid.message);
  };

  const handleCancelEdit = () => {
    setEditingBid(null);
    setBidAmount("");
    setBidMessage("");
  };

  const handleUpdateBid = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !task || !editingBid) return;

    // Validation
    if (!bidAmount || parseFloat(bidAmount) <= 0) {
      alert('Voer een geldig bedrag in');
      return;
    }

    if (!bidMessage.trim()) {
      alert('Voeg een bericht toe voor de klant');
      return;
    }

    // Check if user has phone number
    const userPhone = currentUserDoc?.phone || currentUserDoc?.klusserProfile?.phone;
    if (!userPhone || userPhone.trim() === '') {
      alert('Je moet eerst een telefoonnummer toevoegen aan je profiel voordat je kunt bieden. Klik op de cirkel rechtsboven om naar je profiel te gaan.');
      return;
    }

    setSubmittingBid(true);
    try {
      // Update the specific bid in the bids array
      const updatedBids = task.bids.map((bid: any) => 
        bid.klusserId === editingBid.klusserId 
          ? {
              ...bid,
              amount: parseFloat(bidAmount),
              message: bidMessage,
              updatedAt: new Date().toISOString()
            }
          : bid
      );

      await setOrUpdateDocument('tasks', task.id, {
        bids: updatedBids
      });

      // Update local state
      setTask({ ...task, bids: updatedBids });
      setEditingBid(null);
      setBidAmount("");
      setBidMessage("");

      alert('Bod succesvol bijgewerkt!');
    } catch (error) {
      console.error("Error updating bid:", error);
      alert('Fout bij bijwerken van bod. Probeer opnieuw.');
    } finally {
      setSubmittingBid(false);
    }
  };

  const handleRemoveBid = async (bidId: string) => {
    if (!confirm('Weet je zeker dat je dit bod wilt verwijderen?')) {
      return;
    }

    setRemovingBid(bidId);
    try {
      // Remove the bid from the bids array
      const updatedBids = task.bids.filter((bid: any) => bid.klusserId !== bidId);

      await setOrUpdateDocument('tasks', task.id, {
        bids: updatedBids
      });

      // Update local state
      setTask({ ...task, bids: updatedBids });
      alert('Bod succesvol verwijderd!');
    } catch (error) {
      console.error("Error removing bid:", error);
      alert('Fout bij verwijderen van bod. Probeer opnieuw.');
    } finally {
      setRemovingBid(null);
    }
  };

  const handleDeleteTask = async () => {
    if (!confirm('Weet je zeker dat je deze klus wilt verwijderen? Dit kan niet ongedaan worden gemaakt en alle biedingen zullen verloren gaan.')) {
      return;
    }

    setDeletingTask(true);
    try {
      await deleteDocument('tasks', task.id);
      alert('Klus succesvol verwijderd!');
      router.push('/klusser-dashboard');
    } catch (error) {
      console.error("Error deleting task:", error);
      alert('Fout bij verwijderen van klus. Probeer opnieuw.');
    } finally {
      setDeletingTask(false);
    }
  };

  const handleAcceptBid = async (bid: any) => {
    if (!confirm(`Weet je zeker dat je het bod van ${bid.klusserName} voor €${bid.amount} wilt accepteren?`)) {
      return;
    }

    try {
      // Update all bids - mark the accepted one as accepted and others as rejected
      const updatedBids = task.bids.map((b: any) => ({
        ...b,
        status: b.klusserId === bid.klusserId ? 'accepted' : 'rejected'
      }));

      // Update task status and assign klusser
      await setOrUpdateDocument('tasks', task.id, {
        bids: updatedBids,
        status: 'assigned',
        klusserId: bid.klusserId,
        acceptedBid: {
          klusserId: bid.klusserId,
          klusserName: bid.klusserName,
          amount: bid.amount,
          message: bid.message,
          acceptedAt: new Date().toISOString()
        }
      });

      // Update klusser's profile to add this as an active task
      try {
        const klusserDoc = await getDocument('users', bid.klusserId) as any;
        if (klusserDoc) {
          const currentActiveTasks = klusserDoc.klusserProfile?.activeTasks || [];
          const updatedActiveTasks = [...currentActiveTasks, {
            taskId: task.id,
            taskTitle: task.service,
            customerName: task.userName,
            amount: bid.amount,
            acceptedAt: new Date().toISOString(),
            status: 'active'
          }];

          await setOrUpdateDocument('users', bid.klusserId, {
            klusserProfile: {
              ...klusserDoc.klusserProfile,
              activeTasks: updatedActiveTasks
            }
          });
        }
      } catch (error) {
        console.error("Error updating klusser profile:", error);
        // Don't fail the whole operation if this fails
      }

      // Update local state
      // Create notification for the klusser whose bid was accepted
      if (user) {
        try {
          await createBidAcceptedNotification(
            bid.klusserId,
            user.displayName || user.email || 'Klant',
            task.service,
            bid.amount,
            task.id
          );
          console.log('Notification sent to klusser');
        } catch (notificationError) {
          console.error('Failed to send notification to klusser:', notificationError);
          // Don't fail the acceptance if notification fails
        }
      }

      setTask({ 
        ...task, 
        bids: updatedBids,
        status: 'assigned',
        klusserId: bid.klusserId,
        acceptedBid: {
          klusserId: bid.klusserId,
          klusserName: bid.klusserName,
          amount: bid.amount,
          message: bid.message,
          acceptedAt: new Date().toISOString()
        }
      });

      alert(`Bod van ${bid.klusserName} geaccepteerd! De klusser is op de hoogte gesteld.`);
    } catch (error) {
      console.error("Error accepting bid:", error);
      alert('Fout bij accepteren van bod. Probeer opnieuw.');
    }
  };

  const handleRejectBid = async (bid: any) => {
    if (!confirm(`Weet je zeker dat je het bod van ${bid.klusserName} wilt afwijzen?`)) {
      return;
    }

    try {
      // Update the specific bid to rejected
      const updatedBids = task.bids.map((b: any) => 
        b.klusserId === bid.klusserId 
          ? { ...b, status: 'rejected' }
          : b
      );

      await setOrUpdateDocument('tasks', task.id, {
        bids: updatedBids
      });

      // Update local state
      setTask({ ...task, bids: updatedBids });

      alert(`Bod van ${bid.klusserName} afgewezen.`);
    } catch (error) {
      console.error("Error rejecting bid:", error);
      alert('Fout bij afwijzen van bod. Probeer opnieuw.');
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
                  <div className="flex items-center gap-3">
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
                    {isOwner && task.status === 'open' && (
                      <>
                        <button
                          onClick={() => router.push(`/klus-plaatsen?edit=${task.id}`)}
                          className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors flex items-center gap-1"
                        >
                          ✏️ Bewerken
                        </button>
                        <button
                          onClick={handleDeleteTask}
                          disabled={deletingTask}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center gap-1"
                        >
                          {deletingTask ? '⏳' : '🗑️'} Verwijderen
                        </button>
                      </>
                    )}
                  </div>
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
                  {userPhone && (
                    <div className="mt-2">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <span className="text-green-600">📞</span>
                          <span className="text-green-800 font-medium">{userPhone}</span>
                        </div>
                        <p className="text-xs text-green-600 mt-1">Contact de klant direct voor vragen</p>
                      </div>
                    </div>
                  )}
                  <div className="text-sm text-gray-500 mt-2">
                    {(() => {
                      const date = new Date(task.createdAt);
                      if (isNaN(date.getTime())) {
                        return 'Datum onbekend';
                      }
                      return date.toLocaleDateString('nl-NL', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      });
                    })()}
                  </div>
                </div>

                {/* Accepted Bid Information */}
                {task.acceptedBid && (
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-green-600">✅</span>
                      <h3 className="font-bold text-green-800">Klus toegewezen aan {task.acceptedBid.klusserName}</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-green-600 mb-1">💰 Prijs</div>
                        <div className="font-bold text-green-800">€{task.acceptedBid.amount}</div>
                      </div>
                      <div>
                        <div className="text-sm text-green-600 mb-1">📅 Geaccepteerd</div>
                        <div className="font-medium text-green-800">
                          {(() => {
                            const date = new Date(task.acceptedBid.acceptedAt);
                            return date.toLocaleDateString('nl-NL', { 
                              day: 'numeric', 
                              month: 'long', 
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            });
                          })()}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="text-sm text-green-600 mb-1">💬 Bericht</div>
                      <div className="text-green-800 italic">"{task.acceptedBid.message}"</div>
                    </div>
                  </div>
                )}
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
                              <div className="flex items-center gap-2">
                                <h3 className="font-bold">{bid.klusserName}</h3>
                                {bid.status === 'accepted' && (
                                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">
                                    ✅ Geaccepteerd
                                  </span>
                                )}
                                {bid.status === 'rejected' && (
                                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-bold">
                                    ❌ Afgewezen
                                  </span>
                                )}
                              </div>
                              <div className="text-xl font-black text-primary">€{bid.amount}</div>
                            </div>
                            <p className="text-gray-600 text-sm mb-2">{bid.message}</p>
                            
                            {/* Show phone number based on user role and privacy rules */}
                            {(isOwner || user?.uid === bid.klusserId) && klusserPhones[bid.klusserId] && (
                              <div className="mb-2">
                                <div className="bg-green-50 border border-green-200 rounded-lg p-2">
                                  <div className="flex items-center gap-2">
                                    <span className="text-green-600">📞</span>
                                    <span className="text-green-800 font-medium text-sm">{klusserPhones[bid.klusserId]}</span>
                                    {isOwner && (
                                      <span className="text-xs text-green-600">(Klusser contact)</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            <div className="flex items-center justify-between">
                              <div className="text-xs text-gray-500">
                                {(() => {
                                  const date = new Date(bid.createdAt);
                                  if (isNaN(date.getTime())) {
                                    return 'Datum onbekend';
                                  }
                                  return date.toLocaleDateString('nl-NL', { 
                                    day: 'numeric', 
                                    month: 'short',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  });
                                })()}
                                {bid.updatedAt && (
                                  <span className="text-blue-500 ml-2">(bewerkt)</span>
                                )}
                              </div>
                              {user?.uid === bid.klusserId && bid.status === 'pending' && (
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => handleEditBid(bid)}
                                    className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                                  >
                                    ✏️ Bewerken
                                  </button>
                                  <button
                                    onClick={() => handleRemoveBid(bid.klusserId)}
                                    disabled={removingBid === bid.klusserId}
                                    className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200 transition-colors disabled:opacity-50"
                                  >
                                    {removingBid === bid.klusserId ? '⏳' : '🗑️'} Verwijderen
                                  </button>
                                </div>
                              )}
                            </div>
                            {isOwner && bid.status === 'pending' && (
                              <div className="flex gap-2 mt-3">
                                <button 
                                  onClick={() => handleAcceptBid(bid)}
                                  className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
                                >
                                  Accepteren
                                </button>
                                <button 
                                  onClick={() => handleRejectBid(bid)}
                                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
                                >
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
                    {editingBid ? 'Bod bewerken' : hasUserBid ? 'Je hebt al geboden' : 'Breng een bod uit'}
                  </h3>

                  {editingBid ? (
                    <form onSubmit={handleUpdateBid} className="space-y-4">
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

                      <div className="flex gap-2">
                        <button
                          type="submit"
                          disabled={submittingBid}
                          className="flex-1 bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {submittingBid ? 'Bijwerken...' : 'Bod Bijwerken'}
                        </button>
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                        >
                          Annuleren
                        </button>
                      </div>
                    </form>
                  ) : hasUserBid ? (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-700">
                        Je bod is verzonden. De klant ontvangt een notificatie en kan je bod accepteren.
                      </p>
                      <button
                        onClick={() => handleEditBid(task.bids.find((bid: any) => bid.klusserId === user.uid))}
                        className="mt-3 text-sm text-blue-600 hover:text-blue-800 underline"
                      >
                        Bod bewerken
                      </button>
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

