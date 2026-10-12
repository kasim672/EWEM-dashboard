'use client';

import React, { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Calendar,
  Layers,
  FileArchive,
  Download,
  AlertCircle,
  Eye,
  FileText,
  FileSpreadsheet,
  Presentation,
  FileCode,
  Image as ImageIcon,
  CheckCircle2,
  Circle,
  Plus,
  ShieldCheck,
  ShieldAlert,
  Info,
  Clock,
} from 'lucide-react';
import { useStorage } from '@/lib/storage/StorageContext';
import { Card, Button, StatusBadge, cn } from '@/components/ui/primitives';
import { UniversalFileViewer } from '@/components/viewer/UniversalFileViewer';
import {
  FileRecord,
  TaskItem,
  WorkStatus,
  QualityStatus,
  ActualSubmissionStatus,
} from '@/types/domain';

export default function AssignmentDetailPage() {
  const params = useParams();
  const { assignments, isLoaded, updateAssignment } = useStorage();

  const id = params?.id as string;
  const assignment = useMemo(() => assignments.find((a) => a.id === id), [assignments, id]);

  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="p-8 text-center font-mono text-xs tracking-wider text-text-muted">
          INITIALIZING WORKBENCH ENVIRONMENT...
        </div>
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="max-w-2xl mx-auto my-12 p-8 border border-border bg-surface rounded-lg text-center space-y-4">
        <div className="w-10 h-10 mx-auto rounded border border-border flex items-center justify-center text-amber-accent font-mono">
          404
        </div>
        <h2 className="text-xl font-bold font-display text-text">Coursework Record Not Found</h2>
        <p className="text-xs font-mono text-text-muted">
          No authoritative assignment matches identifier: <span className="text-emerald-accent">{id}</span>.
          Valid coursework identifiers are EW-01 through EW-14.
        </p>
        <Link href="/assignments" className="inline-block pt-2">
          <Button variant="outline" size="sm">
            Return to Coursework Gallery
          </Button>
        </Link>
      </div>
    );
  }

  const hasFiles = assignment.files && assignment.files.length > 0;
  const activeFile = hasFiles
    ? assignment.files.find((f) => f.id === activeFileId) || assignment.files[0]
    : null;

  // --- Task item manipulation with NON-OVERLAP GUARDRAIL ---
  // Guardrail: Never modify portalBadgeObserved or portalBadgeText when tasks toggle
  const defaultTasks: TaskItem[] = useMemo(() => {
    if (assignment.tasks && assignment.tasks.length > 0) {
      return assignment.tasks;
    }
    // Contextual milestone defaults based on assignment nature
    if (assignment.id === 'EW-01') {
      return [
        { id: 't-1', title: 'Identify 5 hazardous chemicals in WEEE circuitry', completed: false },
        { id: 't-2', title: 'Document RoHS threshold limits and toxicological pathways', completed: false },
        { id: 't-3', title: 'Compile industrial substitution case studies', completed: false },
      ];
    }
    if (assignment.id === 'EW-09') {
      return [
        { id: 't-1', title: 'Formulate patentable hydrometallurgical recovery step', completed: false },
        { id: 't-2', title: 'Draft novelty and non-obviousness process claim', completed: false },
        { id: 't-3', title: 'Assemble schematic flow sheet and patent brief', completed: false },
      ];
    }
    return [
      { id: 't-1', title: 'Coursework artifact intake & checksum validation', completed: hasFiles },
      { id: 't-2', title: 'Scientific & analytical methodology verification', completed: false },
      { id: 't-3', title: 'Faculty review readiness & showcase assessment', completed: false },
    ];
  }, [assignment.id, assignment.tasks, hasFiles]);

  const handleToggleTask = (taskId: string) => {
    const currentTasks = assignment.tasks && assignment.tasks.length > 0 ? assignment.tasks : defaultTasks;
    const updated = currentTasks.map((t) =>
      t.id === taskId ? { ...t, completed: !t.completed } : t
    );
    // NON-OVERLAP GUARDRAIL: Only updates tasks field, preserving portalBadgeObserved intact
    updateAssignment(assignment.id, { tasks: updated });
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const currentTasks = assignment.tasks && assignment.tasks.length > 0 ? assignment.tasks : defaultTasks;
    const newTask: TaskItem = {
      id: `task-${Date.now()}`,
      title: newTaskTitle.trim(),
      completed: false,
    };
    // NON-OVERLAP GUARDRAIL: Only updates tasks field
    updateAssignment(assignment.id, { tasks: [...currentTasks, newTask] });
    setNewTaskTitle('');
  };

  const handleWorkStatusChange = (status: WorkStatus) => {
    updateAssignment(assignment.id, { workStatus: status });
  };

  const handleQualityStatusChange = (status: QualityStatus) => {
    updateAssignment(assignment.id, { qualityStatus: status });
  };

  const handleSubmissionStatusChange = (status: ActualSubmissionStatus) => {
    updateAssignment(assignment.id, { actualSubmissionStatus: status });
  };

  const handlePublishToggle = () => {
    updateAssignment(assignment.id, { published: !assignment.published });
  };

  // Helper for format icons in selector
  const getFileIcon = (previewType: FileRecord['previewType']) => {
    switch (previewType) {
      case 'spreadsheet':
        return <FileSpreadsheet className="w-3.5 h-3.5 text-cyan-accent" />;
      case 'presentation':
        return <Presentation className="w-3.5 h-3.5 text-lime-accent" />;
      case 'pdf':
        return <FileText className="w-3.5 h-3.5 text-emerald-accent" />;
      case 'html':
        return <FileCode className="w-3.5 h-3.5 text-amber-accent" />;
      case 'image':
        return <ImageIcon className="w-3.5 h-3.5 text-cyan-accent" />;
      default:
        return <FileText className="w-3.5 h-3.5 text-text-muted" />;
    }
  };

  return (
    <div className="space-y-6 pb-16 animate-fadeIn">
      {/* Breadcrumb Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
        <Link
          href="/assignments"
          className="inline-flex items-center gap-2 text-xs font-mono text-text-muted hover:text-emerald-accent transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>COURSEWORK GALLERY</span>
        </Link>

        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="text-text-muted">CHRONOLOGICAL IDENTIFIER:</span>
          <span className="font-bold text-emerald-accent px-2 py-0.5 rounded bg-surface-raised border border-border">
            {assignment.id}
          </span>
        </div>
      </div>

      {/* Hero Assignment Title & Editorial Header */}
      <div className="border border-border bg-surface p-6 sm:p-8 rounded-lg space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-0.5 rounded bg-emerald-accent/10 border border-emerald-accent/30 text-emerald-accent font-bold">
              {assignment.id}
            </span>
            <StatusBadge type="category" value={assignment.category} />
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-text-muted">
            <div className="flex items-center gap-1.5" title="Date portal activity was observed">
              <Calendar className="w-3.5 h-3.5 text-cyan-accent" />
              <span>Portal Activity: <strong className="text-text">{assignment.portalActivityDate}</strong></span>
            </div>
            <div className="flex items-center gap-1.5" title="Official institutional due date">
              <Clock className="w-3.5 h-3.5 text-amber-accent" />
              <span>Due Date: <strong className="text-text-muted">{assignment.dueDate || 'Unconfirmed'}</strong></span>
            </div>
          </div>
        </div>

        <div className="space-y-2 pt-1 border-t border-border/50">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text font-display tracking-tight">
            {assignment.displayTitle}
          </h1>

          <div className="flex items-start gap-2 pt-0.5">
            <span className="text-[11px] font-mono text-text-muted uppercase tracking-wider shrink-0 mt-0.5">
              Portal Exact Record:
            </span>
            <span className="text-xs font-mono text-text bg-surface-raised px-2 py-0.5 rounded border border-border/60 break-all">
              {assignment.portalTitle}
            </span>
          </div>
        </div>
      </div>

      {/* Asymmetric Inspection Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] xl:grid-cols-[380px_1fr] gap-6 items-start">
        {/* LEFT VERTICAL RAIL: Document Selector, Forensic Provenance & Quality Controls */}
        <aside className="space-y-6">
          {/* Deliverables Selector Card */}
          <div className="border border-border bg-surface rounded-lg p-4 space-y-3.5">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-text flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-accent" />
                <span>Coursework Deliverables & Interactive Preview</span>
              </h2>
              <span className="text-[11px] font-mono text-emerald-accent bg-emerald-accent/10 px-1.5 py-0.5 rounded border border-emerald-accent/20">
                {assignment.files.length}
              </span>
            </div>

            {hasFiles ? (
              <div className="space-y-2">
                <div className="text-[11px] text-text-muted font-mono">
                  Select a document below to inspect in reading canvas:
                </div>

                <div className="space-y-1.5">
                  {assignment.files.map((file) => {
                    const isSelected = activeFile?.id === file.id;
                    const downloadUrl = file.publicUrl || file.contentUrl || '#';

                    return (
                      <div
                        key={file.id}
                        className={cn(
                          'group flex items-center justify-between p-2.5 rounded border transition-all text-left',
                          isSelected
                            ? 'bg-surface-raised border-emerald-accent/80 shadow-sm'
                            : 'bg-surface hover:bg-surface-raised border-border'
                        )}
                      >
                        <button
                          type="button"
                          onClick={() => setActiveFileId(file.id)}
                          className="flex items-center gap-2.5 flex-1 min-w-0 pr-2 text-left"
                          title={`Inspect ${file.name}`}
                        >
                          <span className="shrink-0">{getFileIcon(file.previewType)}</span>
                          <div className="min-w-0 flex-1">
                            <div
                              className={cn(
                                'text-xs font-mono truncate',
                                isSelected ? 'text-emerald-accent font-semibold' : 'text-text group-hover:text-emerald-accent'
                              )}
                              title={file.name}
                            >
                              {file.name}
                            </div>
                            <div className="text-[10px] font-mono text-text-muted flex items-center gap-2 pt-0.5">
                              <span>{(file.size / 1024).toFixed(1)} KB</span>
                              <span>•</span>
                              <span className="uppercase">{file.previewType}</span>
                              {file.sha256 && (
                                <>
                                  <span>•</span>
                                  <span title={`SHA-256: ${file.sha256}`}>
                                    {file.sha256.substring(0, 6)}...
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </button>

                        <a
                          href={downloadUrl}
                          download={file.name}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-text-muted hover:text-emerald-accent rounded hover:bg-surface border border-transparent hover:border-border transition-colors shrink-0"
                          title={`Download ${file.name}`}
                          aria-label={`Download ${file.name}`}
                        >
                          <Download className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    );
                  })}
                </div>

                {/* Assignment Archive Action */}
                <div className="pt-2 border-t border-border/60">
                  <a
                    href={`/api/download/${assignment.id}`}
                    download
                    className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded bg-emerald-accent/10 hover:bg-emerald-accent/20 border border-emerald-accent/30 text-emerald-accent font-mono text-xs font-semibold transition-colors"
                  >
                    <FileArchive className="w-3.5 h-3.5" />
                    <span>Download All (ZIP)</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-surface-raised rounded border border-border/80 text-[11px] font-mono text-text-muted space-y-1">
                <div className="flex items-center gap-1.5 text-amber-accent font-semibold">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>No Deliverables Deposited</span>
                </div>
                <p className="text-text-muted leading-relaxed">
                  Artifacts for {assignment.id} have not yet been placed into the repository vault.
                </p>
              </div>
            )}
          </div>

          {/* Dual-Truth Status Engine & Quality Controls */}
          <div className="border border-border bg-surface rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-text flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-accent" />
                <span>Verification & Quality States</span>
              </h3>
              <span className="text-[10px] font-mono text-text-muted">DUAL-TRUTH</span>
            </div>

            {/* Dimension 1: Portal Badge Observation (Read-Only) */}
            <div className="space-y-1.5 text-xs font-mono">
              <div className="text-[11px] text-text-muted flex items-center justify-between">
                <span>1. PORTAL OBSERVATION:</span>
                <span className="text-[10px] text-text-muted italic">Read-only capture</span>
              </div>
              <div className="p-2 rounded bg-surface-raised border border-border flex items-center justify-between">
                <span className="text-text">Turned-in Screenshot:</span>
                {assignment.portalBadgeObserved ? (
                  <span className="px-2 py-0.5 rounded bg-emerald-accent/10 border border-emerald-accent/30 text-emerald-accent font-semibold text-[11px]">
                    Turned in (Observed)
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded bg-surface border border-border text-text-muted text-[11px]">
                    Not Observed
                  </span>
                )}
              </div>
              <p className="text-[10px] text-text-muted leading-relaxed">
                Represents photographic record of portal state. Never altered by task completion.
              </p>
            </div>

            {/* Dimension 2: Actual Submission Status */}
            <div className="space-y-1.5 text-xs font-mono">
              <label htmlFor="actual-submission-select" className="text-[11px] text-text-muted block">
                2. ACTUAL SUBMISSION STATUS:
              </label>
              <select
                id="actual-submission-select"
                value={assignment.actualSubmissionStatus}
                onChange={(e) => handleSubmissionStatusChange(e.target.value as ActualSubmissionStatus)}
                className="w-full p-2 text-xs font-mono rounded bg-surface-raised border border-border text-text focus:border-emerald-accent focus:outline-none"
              >
                <option value="unverified">Unverified (Pending confirmation)</option>
                <option value="submitted">Verified Submitted</option>
                <option value="not_submitted">Not Submitted</option>
                <option value="resubmission_needed">Resubmission Needed</option>
              </select>
            </div>

            {/* Dimension 3: Work Execution Status */}
            <div className="space-y-1.5 text-xs font-mono">
              <label htmlFor="work-status-select" className="text-[11px] text-text-muted block">
                3. WORK REVIEW PROGRESS:
              </label>
              <select
                id="work-status-select"
                value={assignment.workStatus}
                onChange={(e) => handleWorkStatusChange(e.target.value as WorkStatus)}
                className="w-full p-2 text-xs font-mono rounded bg-surface-raised border border-border text-text focus:border-emerald-accent focus:outline-none"
              >
                <option value="not_reviewed">Not Reviewed</option>
                <option value="planned">Planned</option>
                <option value="in_progress">In Progress</option>
                <option value="ready_for_review">Ready for Review</option>
                <option value="verified_complete">Verified Complete</option>
              </select>
            </div>

            {/* Dimension 4: Quality Assessment */}
            <div className="space-y-1.5 text-xs font-mono">
              <label htmlFor="quality-status-select" className="text-[11px] text-text-muted block">
                4. QUALITY ASSESSMENT:
              </label>
              <select
                id="quality-status-select"
                value={assignment.qualityStatus}
                onChange={(e) => handleQualityStatusChange(e.target.value as QualityStatus)}
                className="w-full p-2 text-xs font-mono rounded bg-surface-raised border border-border text-text focus:border-emerald-accent focus:outline-none"
              >
                <option value="not_assessed">Not Assessed</option>
                <option value="needs_improvement">Needs Improvement</option>
                <option value="meets_requirements">Meets Requirements</option>
                <option value="polished">Polished (Showcase Grade)</option>
              </select>
            </div>

            {/* Showcase Publication Gate */}
            <div className="pt-2 border-t border-border/60 flex items-center justify-between">
              <div className="text-xs font-mono">
                <div className="font-semibold text-text">Faculty Showcase</div>
                <div className="text-[10px] text-text-muted">
                  {assignment.published ? 'Visible to Faculty' : 'Private / Unpublished'}
                </div>
              </div>
              <button
                type="button"
                onClick={handlePublishToggle}
                className={cn(
                  'px-2.5 py-1 text-xs font-mono rounded border transition-colors',
                  assignment.published
                    ? 'bg-emerald-accent/20 border-emerald-accent text-emerald-accent font-semibold'
                    : 'bg-surface-raised border-border text-text-muted hover:text-text'
                )}
              >
                {assignment.published ? 'Published' : 'Draft Only'}
              </button>
            </div>
          </div>

          {/* Academic Tasks & Milestones Checklist */}
          <div className="border border-border bg-surface rounded-lg p-4 space-y-3.5">
            <div className="flex items-center justify-between border-b border-border/60 pb-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-text flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-accent" />
                <span>Verification Checklist</span>
              </h3>
              <span className="text-[10px] font-mono text-text-muted">
                {(assignment.tasks?.length ? assignment.tasks : defaultTasks).filter((t) => t.completed).length} /{' '}
                {(assignment.tasks?.length ? assignment.tasks : defaultTasks).length}
              </span>
            </div>

            <div className="space-y-2">
              {(assignment.tasks && assignment.tasks.length > 0 ? assignment.tasks : defaultTasks).map((task) => (
                <div
                  key={task.id}
                  onClick={() => handleToggleTask(task.id)}
                  className="flex items-start gap-2.5 p-2 rounded hover:bg-surface-raised cursor-pointer transition-colors group"
                >
                  <button
                    type="button"
                    className="mt-0.5 text-text-muted group-hover:text-emerald-accent transition-colors"
                    aria-label={`Toggle task: ${task.title}`}
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-accent" />
                    ) : (
                      <Circle className="w-4 h-4 text-border group-hover:border-emerald-accent" />
                    )}
                  </button>
                  <span
                    className={cn(
                      'text-xs font-sans leading-snug select-none flex-1',
                      task.completed ? 'line-through text-text-muted' : 'text-text'
                    )}
                  >
                    {task.title}
                  </span>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddTask} className="pt-2 border-t border-border/60 flex items-center gap-2">
              <input
                type="text"
                placeholder="Add milestone item..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="flex-1 px-2.5 py-1.5 text-xs font-sans rounded bg-surface-raised border border-border text-text placeholder-text-muted focus:border-emerald-accent focus:outline-none"
              />
              <Button type="submit" size="sm" variant="outline" className="h-8 px-2.5 text-xs shrink-0">
                <Plus className="w-3.5 h-3.5" />
              </Button>
            </form>
          </div>
        </aside>

        {/* RIGHT FULL-WIDTH READING CANVAS: Dedicated Preview & Document Inspection */}
        <main className="space-y-4 min-w-0">
          {/* Top Canvas Action Bar */}
          <div className="border border-border bg-surface px-4 py-3 rounded-lg flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 truncate">
              <span className="text-text-muted">INSPECTING:</span>
              {activeFile ? (
                <span className="font-bold text-text truncate max-w-xs sm:max-w-md">
                  {activeFile.name}
                </span>
              ) : (
                <span className="text-amber-accent font-semibold">Awaiting Deliverables</span>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {activeFile && (
                <a
                  href={activeFile.publicUrl || activeFile.contentUrl || '#'}
                  download={activeFile.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-surface-raised hover:bg-surface border border-border hover:border-emerald-accent/50 text-text transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-accent" />
                  <span>Download File</span>
                </a>
              )}

              {hasFiles && (
                <a
                  href={`/api/download/${assignment.id}`}
                  download
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-accent/10 hover:bg-emerald-accent/20 border border-emerald-accent/30 text-emerald-accent font-semibold transition-colors"
                >
                  <FileArchive className="w-3.5 h-3.5" />
                  <span>ZIP Archive</span>
                </a>
              )}
            </div>
          </div>

          {/* Universal Document Viewer or Honest Empty State */}
          {activeFile ? (
            <UniversalFileViewer file={activeFile} />
          ) : (
            /* Dignified, Honest Empty State for EW-01, EW-09 and unpopulated records */
            <div className="border border-border bg-surface rounded-lg p-8 sm:p-12 text-center space-y-6">
              <div className="w-12 h-12 rounded border border-border bg-surface-raised flex items-center justify-center mx-auto text-amber-accent">
                <AlertCircle className="w-6 h-6" />
              </div>

              <div className="space-y-2 max-w-xl mx-auto">
                <h4 className="text-lg font-bold font-display text-text">Files Not Available Yet</h4>
                <p className="text-xs sm:text-sm font-sans text-text-muted leading-relaxed">
                  No coursework deliverables are currently registered for assignment {assignment.id}. Real student materials will appear here once provided.
                </p>
              </div>

              {/* Assignment-Specific Forensic Note (EW-01 / EW-09) */}
              <div className="max-w-xl mx-auto border border-border/80 bg-surface-raised/60 p-4 rounded text-left space-y-2 text-xs font-mono">
                <div className="flex items-center gap-2 text-emerald-accent font-bold">
                  <Info className="w-4 h-4" />
                  <span>Academic Forensic Record: {assignment.id}</span>
                </div>

                {assignment.id === 'EW-01' ? (
                  <div className="space-y-1.5 text-text-muted leading-relaxed font-sans">
                    <p>
                      <strong>Activity:</strong> Recorded on portal as <em>&quot;Toxic Chemicals_Any 5&quot;</em> on <strong>2026-07-24</strong>.
                    </p>
                    <p>
                      <strong>Portal Badge:</strong> <span className="text-amber-accent font-mono">Not Observed</span> in provided screenshot captures.
                    </p>
                    <p>
                      <strong>Zero Synthetic Data Guarantee:</strong> No fictional research brief or artificial PDF has been generated. This slot awaits authentic student document submission.
                    </p>
                  </div>
                ) : assignment.id === 'EW-09' ? (
                  <div className="space-y-1.5 text-text-muted leading-relaxed font-sans">
                    <p>
                      <strong>Activity:</strong> Recorded as <em>&quot;E Waste Recovery Process_Modification for Design Patent&quot;</em> on <strong>2026-08-19</strong>.
                    </p>
                    <p>
                      <strong>Portal Badge:</strong> <span className="text-emerald-accent font-mono">Turned in (Observed)</span> in portal capture.
                    </p>
                    <p>
                      <strong>Status:</strong> The student indicated submission on portal, but the original patent report artifact has not yet been deposited into the local studio repository.
                    </p>
                  </div>
                ) : (
                  <p className="text-text-muted leading-relaxed font-sans">
                    Coursework materials for {assignment.id} will be mounted automatically upon repository deposit.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Academic Scope & Requirements Information Card */}
          <div className="border border-border bg-surface p-6 rounded-lg space-y-3">
            <div className="flex items-center justify-between border-b border-border/60 pb-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-text">
                <FileText className="w-4 h-4 text-emerald-accent" />
                <span>Academic Scope & Curriculum Context</span>
              </div>
              <span className="text-[11px] font-mono text-text-muted">{assignment.category}</span>
            </div>

            <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-sans">
              This coursework deliverable is cataloged under the{' '}
              <strong className="text-text font-medium">{assignment.category}</strong> curriculum module
              for Electronic Waste &amp; Environmental Management (EW/EM). All artifacts undergo sha256 checksum
              verification prior to presentation for academic assessment and faculty review.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
