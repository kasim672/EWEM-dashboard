'use client';

import React, { useState } from 'react';
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
} from 'lucide-react';
import { useStorage } from '@/lib/storage/StorageContext';
import { Card, Button, StatusBadge } from '@/components/ui/primitives';
import { UniversalFileViewer } from '@/components/viewer/UniversalFileViewer';
import { FileRecord } from '@/types/domain';

export default function AssignmentDetailPage() {
  const params = useParams();
  const { assignments, isLoaded } = useStorage();

  const id = params?.id as string;
  const assignment = assignments.find((a) => a.id === id);

  const [activeFile, setActiveFile] = useState<FileRecord | null>(null);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="p-8 text-center font-mono text-sm text-text-muted">
          Loading assignment coursework...
        </div>
      </div>
    );
  }

  if (!assignment) {
    return (
      <Card className="p-12 text-center space-y-4">
        <h2 className="text-xl font-bold text-text">Assignment Not Found</h2>
        <p className="text-sm text-text-muted">
          No record found for ID: {id}. Authoritative IDs are EW-01 through EW-14.
        </p>
        <Link href="/assignments">
          <Button variant="outline">Return to Assignment Gallery</Button>
        </Link>
      </Card>
    );
  }

  const hasFiles = assignment.files && assignment.files.length > 0;
  const selectedViewerFile = activeFile || (hasFiles ? assignment.files[0] : null);

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/assignments"
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Assignments Gallery</span>
        </Link>
        <div className="text-xs font-mono text-text-muted">
          Assignment ID: <span className="text-emerald-accent font-bold">{assignment.id}</span>
        </div>
      </div>

      {/* Hero Assignment Header */}
      <div className="border border-border rounded-xl bg-surface p-6 sm:p-8 space-y-4 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="text-sm font-mono font-bold px-3 py-1 rounded-md bg-emerald-accent/10 border border-emerald-accent/20 text-emerald-accent">
              {assignment.id}
            </span>
            <StatusBadge type="category" value={assignment.category} />
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-text-muted">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-cyan-accent" />
              <span>Activity Date: {assignment.portalActivityDate}</span>
            </div>

            {hasFiles && (
              <a
                href={`/api/download/${assignment.id}`}
                download
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-accent/10 border border-emerald-accent/20 text-emerald-accent hover:bg-emerald-accent/20 transition-colors font-semibold"
                title="Download all deliverables for this assignment as a ZIP archive"
              >
                <FileArchive className="w-4 h-4" />
                <span>Download All (ZIP)</span>
              </a>
            )}
          </div>
        </div>

        <div className="space-y-1.5 pt-1">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text font-display">
            {assignment.displayTitle}
          </h1>
          <p className="text-xs sm:text-sm font-mono text-text-muted">
            Portal Exact Title: <span className="text-text">{assignment.portalTitle}</span>
          </p>
        </div>
      </div>

      {/* Deliverable Document Viewer Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-text flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-accent" />
            <span>Coursework Deliverables & Interactive Preview ({assignment.files.length})</span>
          </h2>
          {hasFiles && (
            <span className="text-xs font-mono text-text-muted hidden sm:inline">
              Select any deliverable below to preview
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
                  className={`px-3.5 py-2 rounded-lg text-xs font-mono border transition-all shrink-0 flex items-center gap-2 ${
                    isSelected
                      ? 'bg-surface-raised border-emerald-accent text-emerald-accent font-semibold shadow-sm'
                      : 'bg-surface border-border text-text-muted hover:text-text hover:bg-surface-raised'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span className="truncate max-w-[220px]">{file.name}</span>
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
          <Card className="p-12 text-center space-y-4 border-dashed">
            <div className="w-12 h-12 rounded-full bg-surface-raised flex items-center justify-center mx-auto text-amber-accent">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-bold text-text">Files Not Available Yet</h4>
              <p className="text-xs text-text-muted max-w-md mx-auto leading-relaxed">
                No coursework deliverables are currently registered for assignment {assignment.id}. Real student materials will appear here once provided.
              </p>
            </div>
          </Card>
        )}
      </div>

      {/* Assignment Overview & Metadata Card */}
      <Card className="p-6 space-y-3 bg-surface/60">
        <div className="flex items-center gap-2 text-sm font-bold text-text">
          <FileText className="w-4 h-4 text-emerald-accent" />
          <span>Academic Description & Scope</span>
        </div>
        <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-sans">
          This coursework item is part of the <span className="text-text font-medium">{assignment.category}</span> curriculum for the E-Waste and Environmental Management academic module. All documents and artifacts are presented in their original form for academic review.
        </p>
      </Card>
    </div>
  );
}
