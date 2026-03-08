'use client';

import { useState, useEffect } from 'react';
import { Plus, Bell, Activity, Loader2 } from 'lucide-react';
import { ViTrackData } from '@/types';
import { useViTrack } from '@/hooks/useViTrack';
import PathwaySummaryCard from './PathwaySummaryCard';
import AddPathwayModal from './AddPathwayModal';
import ViTrackDashboard from './ViTrackDashboard';

export default function ViTrackHub() {
  const { getTracks, createTrack, loading, error } = useViTrack();
  const [tracks, setTracks] = useState<ViTrackData[]>([]);
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch live tracks on mount
  useEffect(() => {
    getTracks().then(data => setTracks(data));
  }, [getTracks]);

  const handleAddTrack = async (newTrack: ViTrackData) => {
    // 1. Save to Supabase
    const id = await createTrack(newTrack);
    if (!id) return; // Hook handles error state internally
    
    // 2. Refresh local state
    const updatedTracks = await getTracks();
    setTracks(updatedTracks);
    setIsModalOpen(false);
  };

  const handleEditTitle = (trackId: string, newTitle: string) => {
    setTracks(prev => prev.map(t => 
      t.track_id === trackId ? { ...t, title: newTitle } : t
    ));
  };

  // Derived state: Recent Activity / Upcoming Tasks
  const upcomingTasks = tracks.flatMap(track => {
    return track.milestones
      .filter(m => m.status !== 'completed')
      .flatMap(m => m.tasks)
      .filter(t => !t.completed)
      .slice(0, 3) // taking a few for the global summary
      .map(t => ({ ...t, trackTitle: track.title }));
  }).slice(0, 4); // limit total global alerts

  // Conditionally render the specific dashboard if a track is selected
  if (selectedTrackId) {
    const selectedTrack = tracks.find(t => t.track_id === selectedTrackId);
    if (selectedTrack) {
      return (
        <ViTrackDashboard 
          trackData={selectedTrack} 
          onBack={() => setSelectedTrackId(null)} 
        />
      );
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-400 px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between z-10 relative">
        <div className="flex items-center">
          <img 
            src="/Vi_TRACK_LOGO.png" 
            alt="Vi Track Logo" 
            className="h-10 object-contain"
            // If the image doesn't load immediately, fallback to stylized text
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
          <div className="hidden ml-2 flex items-center">
             <div className="flex space-x-1">
                <div className="w-5 h-5 bg-emerald-500 rounded-tl-full opacity-70"></div>
                <div className="w-5 h-5 bg-teal-800 rounded-br-full opacity-90"></div>
             </div>
             <span className="ml-2 text-xl font-bold text-teal-900 tracking-tight">Vi - Track</span>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600">
          <a href="#" className="hover:text-emerald-600">Home</a>
          <a href="#" className="hover:text-emerald-600">Vi Learn</a>
          <a href="#" className="hover:text-emerald-600">Vi Connect</a>
          <div className="px-4 py-1.5 bg-gray-100/80 rounded-md border border-gray-200 text-gray-900 font-bold">Vi Track</div>
          <a href="#" className="hover:text-emerald-600">Contact Us</a>
          <div className="w-px h-5 bg-gray-300 mx-2"></div>
          <a href="#" className="hover:text-emerald-600">Dashboard</a>
          <a href="#" className="hover:text-emerald-600">Log Out</a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-white to-emerald-50/60 border-b border-gray-400 pt-16 pb-14 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-gray-900">
          Manage Your <br className="hidden sm:block" />
          <span className="text-emerald-600 drop-shadow-sm">Care Pathways</span>
        </h1>
        <p className="text-lg text-gray-600 font-medium max-w-2xl mx-auto mb-8">
          Coordinate care, track vitals, and generate clinical summaries with an interactive timeline.
        </p>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center px-8 py-3.5 bg-emerald-600 text-white font-bold text-lg rounded-xl shadow-[0_4px_14px_0_rgba(5,150,105,0.39)] hover:bg-emerald-700 hover:shadow-[0_6px_20px_rgba(5,150,105,0.23)] hover:-translate-y-0.5 transition-all duration-200"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="w-6 h-6 mr-2 animate-spin" />
          ) : (
            <Plus className="w-6 h-6 mr-2" />
          )}
          Add New Pathway
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {error && (
          <div className="mb-8 p-4 bg-red-50 text-red-700 rounded-xl border border-red-200">
            <strong>Database Error:</strong> {error}
            <p className="text-sm mt-1">Make sure you have configured your environment variables and Supabase is running.</p>
          </div>
        )}
        {/* Global Alerts / Recent Activity */}
      <section className="mb-12">
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <Activity className="w-5 h-5 mr-2 text-emerald-600" />
          Recent Activity & Alerts
        </h2>
        {upcomingTasks.length > 0 ? (
          <div className="bg-white border text-sm border-orange-100 shadow-sm rounded-2xl overflow-hidden divide-y divide-gray-100">
            {upcomingTasks.map(task => (
              <div key={task.task_id} className="p-4 flex items-start space-x-3 hover:bg-orange-50/30 transition-colors">
                <Bell className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">{task.description}</p>
                  <p className="text-xs text-gray-500 mt-0.5">From: {task.trackTitle}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-50 border border-gray-100 rounded-2xl p-6 text-center text-gray-500 text-sm">
            Everything is up to date. No pending alerts.
          </div>
        )}
      </section>

      {/* Pathway Grid */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-4">Active Pathways</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracks.map(track => (
            <PathwaySummaryCard 
              key={track.track_id} 
              track={track} 
              onClick={setSelectedTrackId}
              onEditTitle={handleEditTitle}
            />
          ))}
        </div>
      </section>

      <AddPathwayModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddTrack}
      />
      </div>
    </div>
  );
}
