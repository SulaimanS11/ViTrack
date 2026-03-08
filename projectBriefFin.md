I have gone through it line-by-line. To guarantee absolutely zero hallucination and zero summarization, I have taken your exact text, character for character, and cleanly appended the missing pieces (Invitation Logic, PDF Formatting, and Privacy/Security) at the very end as Sections 8, 9, and 10.

Here is the finalized, agent-ready brief:

Project Brief: The Vivirion Ecosystem & Vi Track

The Vision & Goal
Vivirion is a Canadian Health-Tech platform designed to bridge the gap between healthcare education and real-world care management. We are building a "Caregiver's Co-Pilot" that helps families manage complex health journeys (e.g., Dementia, Palliative Care, Chronic Illness).

The Current Ecosystem:

Vi Learn: An educational portal providing micro-credentials for healthcare professionals (e.g., Foot Care, Dementia Support).

Vi Connect: A provider directory to search, compare, and book verified Canadian healthcare professionals.

Vi Nav: An AI-powered navigation engine. Users describe a situation, and it generates a 3-step structured "Care Roadmap" with verified resources.

The New Mission: Vi Track
Vi Track is the "Execution Layer." It is a collaborative dashboard that turns the static roadmaps from Vi Nav into an interactive, time-bound project management tool for families.

The Goal
Convert a "Roadmap" (unstructured AI text) into an actionable "Track" (structured dashboard) where multiple family members can coordinate care and log patient vitals.

Functional Requirements for Antigravity
A. Roadmap-to-Task Parser (The "Input" Logic)
Task: Create a service that takes a text-based roadmap from Vi Nav and uses an LLM (Gemini 3 Pro) to output a structured JSON object.

Requirement: Identify Milestones, Tasks, Due Dates (relative), and Resource URLs.

Antigravity Instruction: "Use the Editor and Terminal to set up a Node/Python backend service that parses text into our 'Track' schema."

B. Collaborative Dashboard (The "Interface")
Layout: A Kanban or Checklist view grouped by roadmap steps.

Features:

Status Toggles: Mark tasks as "To-Do," "In-Progress," or "Complete."

The Circle of Care: A multi-user sync feature where siblings can see updates in real-time.

Resource Pins: Direct links back to Vi Connect or Vi Learn for specific tasks.

Antigravity Instruction: "Generate a React/Next.js frontend. Prioritize high-level UI/UX—it must feel professional and empathetic, not clinical and cold."

C. The "Pulse" Logger (The "Action" Logic)
Feature: A daily 30-second check-in for caregivers to log mood, medication adherence, or safety issues.

The Output: A "Generate Clinical Summary" button that compiles these logs into a PDF for doctors.

Technical Stack & Implementation Guide
Frontend: React/Next.js (Modular components).

Backend: Firebase or Supabase (for real-time "Circle of Care" updates).

AI Engine: Gemini 3 Pro (via Antigravity's internal model access).

Design System: Clean, modern, accessible (Canadian AODA compliant). Use soft blues and greens to reduce user stress.

Immediate Tasks for the Antigravity Agent
Architecture: Create an Implementation Plan for the Vi Track database schema.

Scaffolding: Set up the file structure for a Vi-Track dashboard component.

UI Iteration: Use the Antigravity Browser to preview the dashboard and verify it matches the aesthetic of the existing Vi Learn site.

Integration: Define the API endpoint that accepts a Vi Nav roadmap and initializes a new Vi Track.

Data Schema & Validation (The "Vi Track" Blueprint)
To ensure the Vi Track dashboard functions correctly, the Roadmap-to-Task Parser MUST strictly adhere to the following JSON structure. This structure is the "Source of Truth" for all frontend rendering and database storage.

A. The Mandatory JSON Schema
JSON
{
"track_id": "string (uuid-v4)",
"title": "string (The Care Pathway Name)",
"description": "string (Brief overview of the situation)",
"category": "string (e.g., Dementia Care, Palliative, etc.)",
"created_at": "ISO-8601 Timestamp",
"overall_progress_percentage": "number (0-100)",
"milestones": [
{
"step_number": "number",
"milestone_title": "string",
"estimated_timeline": "string",
"summary": "string",
"status": "string (not_started | in_progress | completed)",
"tasks": [
{
"task_id": "string (unique within milestone)",
"description": "string",
"completed": "boolean",
"type": "string (action | research | contact)"
}
],
"resources": [
{
"resource_title": "string",
"url": "string (valid URL)",
"description": "string",
"type": "string (Nonprofit | Article | Provider)"
}
]
}
],
"daily_logs": []
}

B. Real-World Test Case (Vi Nav Output)
Antigravity Instruction: Use the following raw text output from Vi Nav as the primary test for the parser. The output of the parser must match the schema above using this data:

Input Situation: "My mom has dementia and lives alone"

Vi Nav Output:

Step 1: Assess Mom's Needs (1-2 weeks)
Determine the level of care your mom needs and identify her strengths and challenges.
Tips: Consider hiring a geriatric care manager; Assess your mom's daily routines and habits.
Resources: Caregiver Guide (Alzheimer Society) - https://alzheimer.ca/en/help-support/im-caring-person-living-dementia (Nonprofit)

Step 2: Explore Home Care Options (2-4 weeks)
Research and explore home care options, such as home health care, adult day programs, and respite care.
Tips: Contact your local home care agency; Ask about government-funded programs.
Resources: Understanding Home Care Options - https://www.canada.ca/en/health-canada/services/home-continuing-care/home-care.html (Article)

Step 3: Create a Support Network (1-2 weeks)
Build a support network of family, friends, and healthcare professionals to help care for your mom.
Tips: Identify potential caregivers; Create a care plan with your support network.
Resources: Caregiver Support (Alzheimer Society) - https://alzheimer.ca/en/help-support/caregiver-support (Nonprofit)

Integration Instructions for Antigravity
Schema Validation: Every JSON generated by the parser must be validated against the schema in Section 6A before being saved to the database.

Dashboard Rendering: The ViTrackDashboard component must be designed to dynamically map through the milestones and tasks arrays from this JSON.

Mock Data: Use the "Real-World Test Case" to populate the initial UI preview in the Antigravity Browser.

LLM Parsing Constraints & Prompt Engineering
To ensure 100% compatibility between the AI's output and the ViTrackDashboard component, the following constraints must be programmed into the parsing service.

A. The "Strict Parser" System Prompt
Antigravity Instruction: When configuring the Gemini 3 Pro service for the Roadmap-to-Task Parser, use the following System Message:

"You are a specialized Data Extraction Engine for the Vivirion Vi Track platform. Your sole task is to convert unstructured text roadmaps into a strictly valid JSON object.

CRITICAL CONSTRAINTS:

Zero Fluff: Do not include any preamble, conversational text, or markdown code blocks (e.g., no ```json). Output ONLY the raw JSON string.

Schema Fidelity: You must use the exact keys defined in the 'Vi Track Blueprint'. Do not invent new keys.

Task Atomicity: Every 'Tip' in the text must be converted into a separate object in the tasks array.

Resource Mapping: Ensure the URL and Resource Title are correctly paired.

Empty States: If a field (like category) is not explicitly mentioned, infer it logically from the title (e.g., 'Dementia Care')."

B. One-Shot Prompting Example (Enforcement Test)
To verify the parser is working, the agent should run a test where it takes the Real-World Test Case (Section 6B) and produces the following exact JSON structure:

JSON
{
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
}
]
}

C. Validation Logic
Antigravity Instruction: In the Node/Python backend, implement a validation check (using a library like ajv for JSON Schema or Zod for TypeScript) before the data is committed to the database. If the LLM output fails the schema check, the service must retry the prompt once before returning an error.

The "Circle of Care" Invitation Logic
D. Invitation Flow: Implement a "Generate Invite Link" service. This should create a unique, time-sensitive URL (e.g., vivirion.com/track/join/[token]). When a family member clicks it, they are added to the collaborators array in the Track JSON and granted write-access to the tasks and logs.

PDF Generation Logic (The "Clinical Export")
E. Clinical PDF Formatting: The "Generate Clinical Summary" feature must produce a one-page PDF using a library like react-pdf or jspdf. It must include:

Patient Context: The Roadmap title and current milestone.

Trend Analysis: A simple line chart or table showing "Mood Ratings" over the last 14 days.

Critical Notes: A bulleted list of all "Notes" logged in the daily_logs that were flagged as "High Importance."

Privacy & Data Handling (The "Trust" Layer)
F. Security Requirement: Ensure that daily_logs are stored in a way that is isolated from the general "Vi Learn" public data. In Supabase/Firebase, implement Row Level Security (RLS) so that only users present in the collaborators array can read or write to a specific track_id.