import { ViTrackData } from "../types";

export const mockViTrackData: ViTrackData = {
  "track_id": "auto-gen-uuid",
  "title": "Care for Mom with Dementia",
  "description": "Get support and resources for a mom with dementia living alone.",
  "category": "Dementia Care",
  "created_at": "2026-03-07T19:00:00Z",
  "overall_progress_percentage": 0,
  "milestones": [
    {
      "step_number": 1,
      "milestone_title": "Assess Mom's Needs",
      "estimated_timeline": "1-2 weeks",
      "summary": "Determine the level of care your mom needs and identify her strengths and challenges.",
      "status": "not_started",
      "tasks": [
        { "task_id": "m1-t1", "description": "Consider hiring a geriatric care manager", "completed": false, "type": "contact" },
        { "task_id": "m1-t2", "description": "Assess your mom's daily routines and habits", "completed": false, "type": "action" }
      ],
      "resources": [
        {
          "resource_title": "Caregiver Guide (Alzheimer Society)",
          "url": "https://alzheimer.ca/en/help-support/im-caring-person-living-dementia",
          "description": "Get a comprehensive guide to caring for a loved one with dementia.",
          "type": "Nonprofit"
        }
      ]
    },
    {
      "step_number": 2,
      "milestone_title": "Explore Home Care Options",
      "estimated_timeline": "2-4 weeks",
      "summary": "Research and explore home care options, such as home health care, adult day programs, and respite care.",
      "status": "not_started",
      "tasks": [
        { "task_id": "m2-t1", "description": "Contact your local home care agency", "completed": false, "type": "contact" },
        { "task_id": "m2-t2", "description": "Ask about government-funded programs", "completed": false, "type": "research" }
      ],
      "resources": [
        {
          "resource_title": "Understanding Home Care Options",
          "url": "https://www.canada.ca/en/health-canada/services/home-continuing-care/home-care.html",
          "description": "Information on government-funded home care resources.",
          "type": "Article"
        }
      ]
    },
    {
      "step_number": 3,
      "milestone_title": "Create a Support Network",
      "estimated_timeline": "1-2 weeks",
      "summary": "Build a support network of family, friends, and healthcare professionals to help care for your mom.",
      "status": "not_started",
      "tasks": [
        { "task_id": "m3-t1", "description": "Identify potential caregivers", "completed": false, "type": "action" },
        { "task_id": "m3-t2", "description": "Create a care plan with your support network", "completed": false, "type": "action" }
      ],
      "resources": [
        {
          "resource_title": "Caregiver Support (Alzheimer Society)",
          "url": "https://alzheimer.ca/en/help-support/caregiver-support",
          "description": "Resources and support groups for Alzheimer's caregivers.",
          "type": "Nonprofit"
        }
      ]
    }
  ],
  "daily_logs": []
};
