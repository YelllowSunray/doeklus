"use client";

import Header from "@/components/Header";
import { useAuth } from "@/lib/context/AuthContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { queryDocuments } from "@/lib/firebase/firestore";
import { where, orderBy } from "firebase/firestore";

export default function MyTasksPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('active');
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Load user's tasks from Firestore
  useEffect(() => {
    const loadTasks = async () => {
      if (!user) return;
      
      try {
        const userTasks = await queryDocuments('tasks', [
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        ]);
        setTasks(userTasks);
      } catch (error) {
        console.error("Error loading tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, [user]);

  // Filter tasks by status
  const activeTasks = tasks.filter(t => t.status === 'open' || t.status === 'assigned' || t.status === 'in_progress');
  const completedTasks = tasks.filter(t => t.status === 'completed');

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-32 pb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Inloggen vereist</h1>
            <p className="text-gray-600 mb-8">Log in om uw klussen te bekijken</p>
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
          <h1 className="text-4xl font-black mb-2">Mijn Klussen</h1>
          <p className="text-gray-600">Beheer al uw boekingen en afspraken</p>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-1">
            {[
              { id: 'active', label: 'Actieve Klussen', count: activeTasks.length },
              { id: 'completed', label: 'Voltooid', count: completedTasks.length }
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
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tasks List */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Klussen laden...</p>
            </div>
          ) : (activeTab === 'active' ? activeTasks : completedTasks).length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-2xl font-bold mb-4">Geen {activeTab === 'active' ? 'actieve' : 'voltooide'} klussen</h3>
              <p className="text-gray-600 mb-8">
                {activeTab === 'active' 
                  ? 'U heeft momenteel geen actieve klussen. Boek een klusser om te beginnen!' 
                  : 'U heeft nog geen voltooide klussen.'}
              </p>
              {activeTab === 'active' && (
                <a href="/klus-plaatsen" className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-dark transition-colors">
                  Klus Plaatsen
                </a>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {(activeTab === 'active' ? activeTasks : completedTasks).map((task: any) => (
                <div key={task.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-bold uppercase">
                          {task.service}
                        </span>
                        {task.bids && task.bids.length > 0 && (
                          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold">
                            {task.bids.length} {task.bids.length === 1 ? 'bod' : 'biedingen'}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{task.service}</h3>
                      <p className="text-gray-600 mb-3">{task.description}</p>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                        <span>📅 {task.date}</span>
                        {task.time && <span>🕐 {task.time}</span>}
                        <span>📍 {task.location}, {task.postcode}</span>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      {task.budget && (
                        <div className="text-lg font-bold text-primary mb-2">{task.budget}</div>
                      )}
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        task.status === 'open' ? 'bg-green-100 text-green-700' :
                        task.status === 'assigned' ? 'bg-blue-100 text-blue-700' :
                        task.status === 'in_progress' ? 'bg-yellow-100 text-yellow-700' :
                        task.status === 'completed' ? 'bg-gray-100 text-gray-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {task.status === 'open' ? 'Open' :
                         task.status === 'assigned' ? 'Toegewezen' :
                         task.status === 'in_progress' ? 'Bezig' :
                         task.status === 'completed' ? 'Voltooid' :
                         task.status}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button 
                      onClick={() => router.push(`/klussen/${task.id}`)}
                      className="flex-1 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
                    >
                      Details & Biedingen ({task.bids?.length || 0})
                    </button>
                    {task.status === 'open' && (
                      <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                        Bewerken
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
