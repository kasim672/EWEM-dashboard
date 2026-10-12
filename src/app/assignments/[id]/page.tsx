'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Calendar,
  ShieldCheck,
  CheckSquare,
  FileText,
  Upload,
  Globe,
  Save,
  Trash2,
  Plus,
  AlertCircle,
  Download,
  Eye,
  FileArchive,
  Layers,
} from 'lucide-react';
import { useStorage } from '@/lib/storage/StorageContext';
import { Card, Button, StatusBadge } from '@/components/ui/primitives';
import { UniversalFileViewer } from '@/components/viewer/UniversalFileViewer';
import { ActualSubmissionStatus, WorkStatus, QualityStatus, FileRecord } from '@/types/domain';

export default function AssignmentWorkbenchPage() {
  const params = useParams();
  const { assignments, updateAssignment, isLoaded } = useStorage();

  const id = params?.id as string;
  const assignment = assignments.find((a) => a.id === id);

  const [activeFile, setActiveFile] = useState<FileRecord | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [saveToast, setSaveToast] = useState(false);

  if (!isLoaded) {
    return <div className="p-8 text-center font-mono text-sm text-text-muted">Loading assignment workbench...</div>;
  }

  if (!assignment) {
    return (
      <Card className="p-12 text-center space-y-4">
        <h2 className="text-xl font-bold text-text">Assignment Not Found</h2>
        <p className="text-sm text-text-muted">
          No record found for ID: {id}. Authoritative IDs are EW-01 through EW-14.
        </p>
        <Link href="/assignments">
          <Button variant="outline">Return to Library</Button>
        </Link>
      </Card>
    );
  }

  const handleUpdate = (updates: any) => {
    updateAssignment(assignment.id, updates);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  const addTask = () => {
    if (!newTaskTitle.trim()) return;
    const newTask = {
      id: `task-${Date.now()}`,
      title: newTaskTitle.trim(),
      completed: false,
    };
    handleUpdate({ tasks: [...assignment.tasks, newTask] });
    setNewTaskTitle('');
  };

  const toggleTask = (taskId: string) => {
    const updatedTasks = assignment.tasks.map((t) =>
      t.id === taskId ? { ...t, completed: !t.completed } : t
    );
    handleUpdate({ tasks: updatedTasks });
  };

  const deleteTask = (taskId: string) => {
    const updatedTasks = assignment.tasks.filter((t) => t.id !== taskId);
    handleUpdate({ tasks: updatedTasks });
  };

  const selectedViewerFile = activeFile || (assignment.files.length > 0 ? assignment.files[0] : null);

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Navigation & Feedback */}
      <div className="flex items-center justify-between">
        <Link
          href="/assignments"
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Library</span>
        </Link>
        {saveToast && (
          <span className="text-xs font-mono text-emerald-accent flex items-center gap-1.5 animate-fadeIn">
            <Save className="w-3.5 h-3.5" />
            Saved to local storage
          </span>
        )}
      </div>

      {/* Hero Workbench Header */}
      <div className="border border-border rounded-xl bg-surface p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono font-bold px-2.5 py-1 rounded-md bg-emerald-accent/10 border border-emerald-accent/20 text-emerald-accent">
              {assignment.id}
            </span>
            <StatusBadge type="category" value={assignment.category} />
            <StatusBadge type="portal" value={assignment.portalBadgeObserved} />
          </div>
          <div className="flex items-center gap-3 text-xs font-mono text-text-muted">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-cyan-accent" />
              <span>Portal Date: {assignment.portalActivityDate}</span>
            </div>
            {assignment.files.length > 0 && (
              <a
                href={`/api/download/${assignment.id}`}
                download
                className="inline-flex items-center gap-1 text-emerald-accent hover:underline font-semibold"
                title="Download all deliverables for this assignment as a ZIP archive"
              >
                <FileArchive className="w-3.5 h-3.5" />
                <span>Download All (ZIP)</span>
              </a>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-text font-display">
            {assignment.displayTitle}
          </h1>
          <p className="text-xs font-mono text-text-muted">
            Portal Exact Title: <span className="text-text">{assignment.portalTitle}</span>
          </p>
        </div>
      </div>

      {/* Actual Deliverables Document Viewer Area */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-text flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-accent" />
            Coursework Artifacts & Interactive Preview ({assignment.files.length})
          </h2>
          {assignment.files.length > 0 && (
            <span className="text-xs font-mono text-text-muted">
              Select an item below to preview
            </span>
          )}
        </div>

        {/* File Tabs Selector if multiple files */}
        {assignment.files.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {assignment.files.map((file) => {
              const isSelected = selectedViewerFile?.id === file.id;
              return (
                <button
                  key={file.id}
                  onClick={() => setActiveFile(file)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-colors shrink-0 flex items-center gap-2 ${
                    isSelected
                      ? 'bg-surface-raised border-emerald-accent text-emerald-accent font-semibold'
                      : 'bg-surface border-border text-text-muted hover:text-text'
                  }`}
                >
                  <Eye className="w-3 h-3" />
                  <span className="truncate max-w-[200px]">{file.name}</span>
                  <span className="text-[10px] text-text-muted">({(file.size / 1024).toFixed(0)} KB)</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Universal File Viewer Mount */}
        {selectedViewerFile ? (
          <UniversalFileViewer file={selectedViewerFile} />
        ) : (
          <Card className="p-10 text-center space-y-3 border-dashed">
            <div className="w-10 h-10 rounded-full bg-surface-raised flex items-center justify-center mx-auto text-text-muted">
              <Upload className="w-5 h-5 text-amber-accent" />
            </div>
            <h4 className="text-sm font-semibold text-text">No Coursework Files In Source Directory</h4>
            <p className="text-xs text-text-muted max-w-md mx-auto">
              This assignment ({assignment.id}) currently has 0 files indexed in the local source directory. You can upload verified materials below or in the Evidence Vault.
            </p>
          </Card>
        )}
      </div>

      {/* Main Grid: Left Controls, Right Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Content, Tasks & Requirements */}
        <div className="lg:col-span-2 space-y-6">
          {/* Dual-Truth Status Engine Card */}
          <Card className="p-5 space-y-4">
            <h2 className="text-base font-bold text-text flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-accent" />
              Dual-Truth Verification Controls
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-text-muted font-medium">Actual Submission</label>
                <select
                  value={assignment.actualSubmissionStatus}
                  onChange={(e) =>
                    handleUpdate({
                      actualSubmissionStatus: e.target.value as ActualSubmissionStatus,
                    })
                  }
                  className="w-full p-2 rounded-lg bg-surface-raised border border-border text-text font-mono focus:border-emerald-accent"
                >
                  <option value="unverified">Unverified</option>
                  <option value="submitted">Verified Submitted</option>
                  <option value="not_submitted">Not Submitted</option>
                  <option value="resubmission_needed">Resubmission Needed</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-text-muted font-medium">Work Readiness</label>
                <select
                  value={assignment.workStatus}
                  onChange={(e) =>
                    handleUpdate({ workStatus: e.target.value as WorkStatus })
                  }
                  className="w-full p-2 rounded-lg bg-surface-raised border border-border text-text font-mono focus:border-emerald-accent"
                >
                  <option value="not_reviewed">Not Reviewed</option>
                  <option value="planned">Planned</option>
                  <option value="in_progress">In Progress</option>
                  <option value="ready_for_review">Ready for Review</option>
                  <option value="verified_complete">Verified Complete</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-text-muted font-medium">Quality Assessment</label>
                <select
                  value={assignment.qualityStatus}
                  onChange={(e) =>
                    handleUpdate({ qualityStatus: e.target.value as QualityStatus })
                  }
                  className="w-full p-2 rounded-lg bg-surface-raised border border-border text-text font-mono focus:border-emerald-accent"
                >
                  <option value="not_assessed">Not Assessed</option>
                  <option value="needs_improvement">Needs Improvement</option>
                  <option value="meets_requirements">Meets Requirements</option>
                  <option value="polished">Polished</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Checklist & Action Items */}
          <Card className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-text flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-cyan-accent" />
                Coursework Action Checklist
              </h2>
              <span className="text-xs font-mono text-text-muted">
                {assignment.tasks.filter((t) => t.completed).length} / {assignment.tasks.length} done
              </span>
            </div>

            <div className="space-y-2">
              {assignment.tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-surface-raised border border-border/50 text-sm"
                >
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="flex items-center gap-2.5 text-left flex-1"
                  >
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => {}}
                      className="rounded border-border text-emerald-accent focus:ring-emerald-accent"
                    />
                    <span
                      className={
                        task.completed
                          ? 'line-through text-text-muted'
                          : 'text-text font-medium'
                      }
                    >
                      {task.title}
                    </span>
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-1 text-text-muted hover:text-danger-accent"
                    aria-label="Delete task"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}

              {assignment.tasks.length === 0 && (
                <p className="text-xs text-text-muted py-2">
                  No tasks recorded yet. Add action items below to prepare this coursework.
                </p>
              )}
            </div>

            <div className="flex gap-2 pt-2">
              <input
                type="text"
                placeholder="Add checklist item..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addTask()}
                className="flex-1 px-3 py-2 text-sm bg-surface-raised border border-border rounded-lg text-text focus:outline-none focus:border-emerald-accent"
              />
              <Button size="sm" onClick={addTask} className="gap-1">
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </Button>
            </div>
          </Card>

          {/* Research & Student Notes */}
          <Card className="p-5 space-y-3">
            <h2 className="text-base font-bold text-text flex items-center gap-2">
              <FileText className="w-4 h-4 text-lime-accent" />
              Work Notes & Technical Reflections
            </h2>
            <textarea
              rows={4}
              placeholder="Record assignment findings, experimental observations, or faculty feedback notes..."
              value={assignment.notes}
              onChange={(e) => handleUpdate({ notes: e.target.value })}
              className="w-full p-3 rounded-lg bg-surface-raised border border-border text-sm text-text placeholder-text-muted focus:outline-none focus:border-emerald-accent font-sans"
            />
          </Card>
        </div>

        {/* Right Col: Showcase Publishing & Deliverable Actions */}
        <div className="space-y-6">
          {/* Faculty Showcase Publishing Toggle */}
          <Card className="p-5 space-y-4">
            <h3 className="font-bold text-sm text-text flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-accent" />
              Faculty Showcase Publishing
            </h3>
            <div className="p-3 rounded-lg bg-surface-raised border border-border space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-text">
                  Publish to Showcase
                </span>
                <input
                  type="checkbox"
                  checked={assignment.published}
                  onChange={(e) => handleUpdate({ published: e.target.checked })}
                  className="rounded border-border text-emerald-accent focus:ring-emerald-accent w-4 h-4 cursor-pointer"
                />
              </div>
              <p className="text-[11px] text-text-muted leading-relaxed">
                When enabled, this assignment and its associated original deliverables become available in the read-only Faculty Showcase.
              </p>
            </div>
          </Card>

          {/* Academic Integrity Notice */}
          <div className="p-4 rounded-xl border border-border bg-surface text-xs space-y-2 text-text-muted">
            <div className="flex items-center gap-2 font-semibold text-text">
              <AlertCircle className="w-4 h-4 text-amber-accent" />
              <span>Deliverable Integrity Guardrail</span>
            </div>
            <p className="leading-relaxed text-[11px]">
              Files shown are original student deliverables indexed with cryptographic SHA-256 validation. Downloads reflect exact original files without modification.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
