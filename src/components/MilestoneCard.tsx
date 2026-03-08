import { Milestone } from "@/types";
import TaskItem from "./TaskItem";
import ResourcePin from "./ResourcePin";
import { Clock } from "lucide-react";

export default function MilestoneCard({ milestone, onToggleTask }: { milestone: Milestone, onToggleTask?: (taskId: string) => void }) {
  // Simple check for progress
  const completedTasks = milestone.tasks.filter(t => t.completed).length;
  const progressPercent = milestone.tasks.length === 0 ? 0 : Math.round((completedTasks / milestone.tasks.length) * 100);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-5 border-b border-gray-100 bg-slate-50/50">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center space-x-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
              {milestone.step_number}
            </span>
            <h3 className="text-lg font-bold text-gray-900">{milestone.milestone_title}</h3>
          </div>
          <div className="flex items-center text-xs font-medium text-gray-500 bg-white px-2 py-1 rounded-full border border-gray-200 shadow-sm">
            <Clock className="w-3.5 h-3.5 mr-1" />
            {milestone.estimated_timeline}
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-2">{milestone.summary}</p>
        
        {/* Progress bar */}
        <div className="mt-4 flex items-center space-x-3">
          <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-500 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs font-medium text-gray-500">{progressPercent}%</span>
        </div>
      </div>

      {/* Body: Tasks & Resources */}
      <div className="p-5 flex-1 flex flex-col space-y-6">
        
        {/* Tasks Section */}
        <div>
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Action Items</h4>
          <div className="space-y-1">
            {milestone.tasks.map(task => (
              <TaskItem key={task.task_id} task={task} onToggle={onToggleTask} />
            ))}
          </div>
        </div>

        {/* Resources Section */}
        {milestone.resources.length > 0 && (
          <div className="pt-4 border-t border-gray-100 mt-auto">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Verified Resources</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {milestone.resources.map((resource, idx) => (
                <ResourcePin key={idx} resource={resource} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
