/**
 * RECLAIM — Domain Model Contract
 * 
 * Strict four-dimension truth model per AGENTS.md, DESIGN.md, and PROJECT_BRIEF.md.
 * Authoritative 14-assignment seed definitions.
 */

export type ActualSubmissionStatus =
  | 'unverified'
  | 'not_submitted'
  | 'submitted'
  | 'resubmission_needed';

export type WorkStatus =
  | 'not_reviewed'
  | 'planned'
  | 'in_progress'
  | 'ready_for_review'
  | 'verified_complete';

export type QualityStatus =
  | 'not_assessed'
  | 'needs_improvement'
  | 'meets_requirements'
  | 'polished';

export type AssignmentCategory =
  | 'Research, Policy & Sustainability'
  | 'Technical & Recovery Processes'
  | 'Assessment / Administrative'
  | 'Data Analytics & Tracking'
  | 'Innovation & Awareness';

export interface TaskItem {
  id: string;
  title: string;
  completed: boolean;
  notes?: string;
}

export interface FileRecord {
  id: string;
  name: string;
  size: number;
  mimeType: string;
  uploadedAt: string;
  assignmentId: string;
  previewType: 'image' | 'pdf' | 'text' | 'csv' | 'binary';
  contentUrl?: string; // base64 or blob URL
  verifiedSafe: boolean;
}

export interface SourceReference {
  id: string;
  title: string;
  url?: string;
  citation: string;
  verifiedDate?: string;
}

export interface Assignment {
  id: string; // "EW-01" to "EW-14"
  portalTitle: string; // Exact raw portal title from screenshots
  displayTitle: string; // Clean editorial display title
  portalActivityDate: string; // Portal activity date (YYYY-MM-DD), NOT due date
  category: AssignmentCategory;
  dueDate: string | null; // Confirmed due date, null until verified
  portalBadgeObserved: boolean; // Observed green badge in portal screenshots
  portalBadgeText: 'Turned in' | null;
  actualSubmissionStatus: ActualSubmissionStatus; // Dual-truth: actual submission state
  workStatus: WorkStatus; // Dual-truth: actual progress
  qualityStatus: QualityStatus; // Dual-truth: quality assessment
  grade: number | null; // Null until verified
  published: boolean; // Controls faculty showcase visibility
  tasks: TaskItem[];
  files: FileRecord[];
  sources: SourceReference[];
  notes: string;
  requirements?: string;
  lastModified?: string;
}

export interface AnalyticsMetric {
  id: string;
  title: string;
  category: AssignmentCategory;
  scope: string;
  metric: string;
  unit: string;
  period: string;
  source: string;
  method: string;
  provenance: 'user-provided' | 'observed' | 'calculated' | 'unverified';
  hasData: boolean;
  dataPoints?: Array<{ label: string; value: number }>;
}

export interface StudentProfile {
  studentName: string;
  studentId: string;
  courseName: string;
  institution: string;
  academicYear: string;
  lastBackupDate?: string;
}

export interface ReclaimBackupData {
  version: 1;
  exportedAt: string;
  profile: StudentProfile;
  assignments: Assignment[];
  analyticsMetrics: AnalyticsMetric[];
}
