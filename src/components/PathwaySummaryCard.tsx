import { ViTrackData } from "@/types";
import { CheckCircle, MoreVertical, Edit2 } from "lucide-react";

interface PathwaySummaryCardProps {
  track: ViTrackData;
  onClick: (id: string) => void;
  onEditTitle?: (id: string, newTitle: string) => void;
}

export default function PathwaySummaryCard({ track, onClick, onEditTitle }: PathwaySummaryCardProps) {
  return (
    <div 
      className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:border-emerald-300 hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden flex flex-col group relative"
      onClick={() => onClick(track.track_id)}
    >
      <div className="p-5 flex-1 relative">
        <div className="flex justify-between items-start mb-3">
          <div className="inline-flex items-center space-x-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md text-xs font-semibold">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>{track.category}</span>
          </div>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              const newTitle = prompt("Enter new pathway name:", track.title);
              if (newTitle && onEditTitle) {
                onEditTitle(track.track_id, newTitle);
              }
            }}
            className="text-gray-400 hover:text-emerald-600 p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
            title="Edit Title"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 pr-6">
          {track.title}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2">
          {track.description}
        </p>
      </div>

      <div className="px-5 py-4 bg-slate-50 border-t border-gray-100 mt-auto">
        <div className="flex justify-between items-end mb-2">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Overall Progress</span>
          <span className="text-sm font-bold text-emerald-600">{track.overall_progress_percentage}%</span>
        </div>
        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-emerald-500 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${track.overall_progress_percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
