export interface Task {
  task_id: string;
  description: string;
  completed: boolean;
  type: "action" | "research" | "contact";
}

export interface Resource {
  resource_title: string;
  url: string;
  description: string;
  type: "Nonprofit" | "Article" | "Provider";
}

export interface Milestone {
  step_number: number;
  milestone_title: string;
  estimated_timeline: string;
  summary: string;
  status: "not_started" | "in_progress" | "completed";
  tasks: Task[];
  resources: Resource[];
}

export interface ViTrackData {
  track_id: string;
  title: string;
  description: string;
  category: string;
  created_at: string;
  overall_progress_percentage: number;
  milestones: Milestone[];
  daily_logs: any[];
}
