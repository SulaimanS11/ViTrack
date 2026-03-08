'use client';

import { useState } from 'react';
import { Share2, FileText, CheckCircle, ArrowLeft } from 'lucide-react';
import { ViTrackData, Milestone, Task } from '@/types';
import { useViTrack } from '@/hooks/useViTrack';
import MilestoneCard from './MilestoneCard';

interface ViTrackDashboardProps {
  trackData: ViTrackData;
  onBack: () => void;
}

export default function ViTrackDashboard({ trackData: initialTrackData, onBack }: ViTrackDashboardProps) {
  const [trackData, setTrackData] = useState<ViTrackData>(initialTrackData);
  const { updateTrackProgress } = useViTrack();

  const calculateOverallProgress = (milestones: Milestone[]) => {
    let totalTasks = 0;
    let completedTasks = 0;
    milestones.forEach(m => {
      totalTasks += m.tasks.length;
      completedTasks += m.tasks.filter(t => t.completed).length;
    });
    return totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
  };

  const toggleTaskCompletion = async (milestoneIndex: number, taskId: string) => {
    // Optimistic UI update
    const updatedMilestones = [...trackData.milestones];
    const taskIndex = updatedMilestones[milestoneIndex].tasks.findIndex(t => t.task_id === taskId);
    
    if (taskIndex !== -1) {
      updatedMilestones[milestoneIndex].tasks[taskIndex].completed = 
        !updatedMilestones[milestoneIndex].tasks[taskIndex].completed;
        
      const newProgress = calculateOverallProgress(updatedMilestones);
      
      const updatedTrack = {
        ...trackData,
        overall_progress_percentage: newProgress,
        milestones: updatedMilestones
      };
      
      setTrackData(updatedTrack);

      // Async DB update to Supabase
      await updateTrackProgress(trackData.track_id, { milestones: updatedMilestones }, newProgress);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 font-sans pb-16">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="mt-6 mb-2 inline-flex items-center text-sm font-medium text-gray-500 hover:text-emerald-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Hub
      </button>

      {/* Dashboard Header */}
      <header className="mb-10 pt-4">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold mb-3">
              <CheckCircle className="w-4 h-4" />
              <span>{trackData.category}</span>
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-2">
              {trackData.title}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              {trackData.description}
            </p>
          </div>
          <div className="flex items-center space-x-3 mt-2 md:mt-0">
            <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
              <Share2 className="w-4 h-4 mr-2" />
              Circle of Care
            </button>
            <button className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg shadow-sm hover:bg-emerald-700 transition-colors">
              <FileText className="w-4 h-4 mr-2" />
              Clinical Sync
            </button>
          </div>
        </div>
      </header>

      {/* Progress Overview */}
      <div className="bg-white border border-emerald-100 p-6 rounded-2xl shadow-sm mb-10 flex items-center justify-between">
        <div className="flex-1 mr-6">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Overall Pathway Progress</h2>
          <div className="flex items-center space-x-4">
            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 rounded-full transition-all duration-1000 ease-in-out" 
                style={{ width: `${trackData.overall_progress_percentage}%` }}
              />
            </div>
            <span className="text-xl font-bold text-emerald-600">
              {trackData.overall_progress_percentage}%
            </span>
          </div>
        </div>
      </div>

      {/* Milestones / Checklists */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Care Steps</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 items-start">
          {trackData.milestones.map((milestone, idx) => (
            <MilestoneCard 
              key={milestone.step_number} 
              milestone={milestone} 
              onToggleTask={(taskId) => toggleTaskCompletion(idx, taskId)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
