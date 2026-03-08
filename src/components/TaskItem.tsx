import { CheckCircle2, Circle } from "lucide-react";
import { Task } from "@/types";

interface TaskItemProps {
  task: Task;
  onToggle?: (id: string) => void;
}

export default function TaskItem({ task, onToggle }: TaskItemProps) {
  return (
    <div 
      className="flex items-start space-x-3 py-3 border-b border-gray-100 last:border-0 hover:bg-slate-50 transition-colors px-2 rounded-lg cursor-pointer"
      onClick={() => onToggle?.(task.task_id)}
    >
      <div className="flex-shrink-0 mt-0.5">
        {task.completed ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
        ) : (
          <Circle className="w-5 h-5 text-gray-300 hover:text-emerald-500 transition-colors" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm ${task.completed ? 'text-gray-400 line-through' : 'text-gray-700 font-medium'}`}>
          {task.description}
        </p>
        <div className="mt-1 flex items-center">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600 capitalize">
            {task.type}
          </span>
        </div>
      </div>
    </div>
  );
}
