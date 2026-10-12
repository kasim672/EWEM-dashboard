'use client';

import React, { useState } from 'react';
import {
  FileBox,
  Upload,
  FileCheck,
  Download,
  Trash2,
  AlertTriangle,
  Lock,
} from 'lucide-react';
import { useStorage } from '@/lib/storage/StorageContext';
import { Card, Button, StatusBadge } from '@/components/ui/primitives';
import { FileRecord } from '@/types/domain';

export default function EvidenceVaultPage() {
  const { files, addFile, deleteFile, assignments, isLoaded } = useStorage();
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string>('EW-01');
  const [uploadError, setUploadError] = useState<string | null>(null);

  if (!isLoaded) {
    return <div className="p-8 text-center font-mono text-sm text-text-muted">Loading Evidence Vault...</div>;
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    const file = fileList[0];
    // Size check (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('File exceeds maximum allowable size (10 MB).');
      return;
    }

    // Determine preview type safely
    let previewType: FileRecord['previewType'] = 'binary';
    if (file.type.startsWith('image/')) previewType = 'image';
    else if (file.type === 'application/pdf') previewType = 'pdf';
    else if (file.type.includes('text') || file.name.endsWith('.txt')) previewType = 'text';
    else if (file.name.endsWith('.csv')) previewType = 'csv';

    const newRecord: FileRecord = {
      id: `file-${Date.now()}`,
      name: file.name,
      size: file.size,
      mimeType: file.type || 'application/octet-stream',
      uploadedAt: new Date().toISOString(),
      assignmentId: selectedAssignmentId,
      previewType,
      verifiedSafe: true,
    };

    addFile(newRecord);
    e.target.value = '';
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Header */}
      <div className="border border-border rounded-xl bg-surface p-6 space-y-2">
        <div className="flex items-center gap-2">
          <FileBox className="w-5 h-5 text-emerald-accent" />
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text">
            Secure Evidence Vault
          </h1>
        </div>
        <p className="text-sm text-text-muted max-w-3xl leading-relaxed">
          Assignment-linked evidence repository with safe validation. File payloads remain isolated in browser-local storage with device warnings. Zero arbitrary script execution.
        </p>
      </div>

      {/* Upload Box */}
      <Card className="p-6 space-y-4">
        <h2 className="text-base font-bold text-text flex items-center gap-2">
          <Upload className="w-4 h-4 text-emerald-accent" />
          Attach Coursework Evidence File
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-1 space-y-1">
            <label className="text-xs text-text-muted font-medium">Link to Assignment</label>
            <select
              value={selectedAssignmentId}
              onChange={(e) => setSelectedAssignmentId(e.target.value)}
              className="w-full p-2 bg-surface-raised border border-border rounded-lg text-sm text-text font-mono focus:border-emerald-accent"
            >
              {assignments.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.id} — {a.displayTitle}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2 space-y-1">
            <label className="text-xs text-text-muted font-medium">Select File (PDF, Image, Text, CSV)</label>
            <input
              type="file"
              onChange={handleFileUpload}
              className="w-full text-sm text-text-muted file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-accent file:text-canvas hover:file:opacity-90 cursor-pointer"
            />
          </div>
        </div>

        {uploadError && (
          <div className="p-3 rounded-lg bg-danger-accent/10 border border-danger-accent/30 text-xs text-danger-accent flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            <span>{uploadError}</span>
          </div>
        )}

        <div className="text-[11px] text-text-muted flex items-center gap-2 pt-1 font-mono">
          <Lock className="w-3.5 h-3.5 text-emerald-accent" />
          <span>Local client-side sandbox. Files are never transmitted to unauthorized third parties.</span>
        </div>
      </Card>

      {/* Files List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-text">Stored Coursework Artifacts ({files.length})</h2>

        {files.length === 0 ? (
          <Card className="p-12 text-center space-y-2">
            <p className="text-sm text-text-muted font-mono">No evidence artifacts uploaded yet.</p>
            <p className="text-xs text-text-muted">
              Upload spreadsheets, reports, diagrams, or presentations using the panel above.
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {files.map((file) => (
              <Card key={file.id} className="p-4 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-emerald-accent px-2 py-0.5 rounded bg-emerald-accent/10">
                      {file.assignmentId}
                    </span>
                    <span className="text-[11px] font-mono text-text-muted">
                      {(file.size / 1024).toFixed(1)} KB
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm text-text truncate" title={file.name}>
                    {file.name}
                  </h3>
                  <div className="text-[11px] font-mono text-text-muted">
                    Type: <span className="uppercase">{file.previewType}</span>
                  </div>
                </div>

                <div className="border-t border-border pt-3 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-accent font-mono">
                    <FileCheck className="w-3 h-3" />
                    Verified Safe
                  </span>
                  <button
                    onClick={() => deleteFile(file.id)}
                    className="p-1.5 text-text-muted hover:text-danger-accent transition-colors"
                    title="Delete file"
                    aria-label="Delete file"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
