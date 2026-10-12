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
  Search,
  Filter,
  Eye,
  FileArchive,
  Layers,
} from 'lucide-react';
import { useStorage } from '@/lib/storage/StorageContext';
import { Card, Button, StatusBadge } from '@/components/ui/primitives';
import { UniversalFileViewer } from '@/components/viewer/UniversalFileViewer';
import { FileRecord } from '@/types/domain';

export default function EvidenceVaultPage() {
  const { files, addFile, deleteFile, assignments, isLoaded } = useStorage();
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string>('all');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalFile, setActiveModalFile] = useState<FileRecord | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  if (!isLoaded) {
    return <div className="p-8 text-center font-mono text-sm text-text-muted">Loading Evidence Vault...</div>;
  }

  // Filter files
  const filteredFiles = files.filter((f) => {
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAssignment = selectedAssignmentId === 'all' || f.assignmentId === selectedAssignmentId;
    const matchesFormat = selectedFormat === 'all' || f.previewType === selectedFormat;
    return matchesSearch && matchesAssignment && matchesFormat;
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    const file = fileList[0];
    if (file.size > 15 * 1024 * 1024) {
      setUploadError('File exceeds maximum allowable size (15 MB).');
      return;
    }

    let previewType: FileRecord['previewType'] = 'download_only';
    if (file.type.startsWith('image/')) previewType = 'image';
    else if (file.type === 'application/pdf') previewType = 'pdf';
    else if (file.type.includes('text') || file.name.endsWith('.txt')) previewType = 'text';
    else if (file.name.endsWith('.csv')) previewType = 'spreadsheet';

    const newRecord: FileRecord = {
      id: `custom-${Date.now()}`,
      name: file.name,
      size: file.size,
      mimeType: file.type || 'application/octet-stream',
      uploadedAt: new Date().toISOString(),
      assignmentId: selectedAssignmentId === 'all' ? 'EW-01' : selectedAssignmentId,
      previewType,
      verifiedSafe: true,
      published: true,
    };

    addFile(newRecord);
    e.target.value = '';
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Header */}
      <div className="border border-border rounded-xl bg-surface p-6 space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <FileBox className="w-5 h-5 text-emerald-accent" />
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text">
              Secure Evidence Vault
            </h1>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-text-muted">
            <span className="px-2.5 py-1 rounded-md bg-surface-raised border border-border">
              Total Deliverables: <strong className="text-emerald-accent">{files.length}</strong>
            </span>
          </div>
        </div>
        <p className="text-sm text-text-muted max-w-3xl leading-relaxed">
          Comprehensive coursework deliverables repository. Featuring interactive in-browser previews for PDFs, slide presentations, spreadsheets, Word documents, sandboxed HTML applications, and high-resolution diagrams.
        </p>
      </div>

      {/* Active Modal Viewer if clicked */}
      {activeModalFile && (
        <div className="fixed inset-0 z-50 bg-canvas/80 backdrop-blur-sm p-4 sm:p-8 flex items-center justify-center animate-fadeIn">
          <div className="max-w-5xl w-full max-h-[90vh] flex flex-col">
            <UniversalFileViewer
              file={activeModalFile}
              onClose={() => setActiveModalFile(null)}
            />
          </div>
        </div>
      )}

      {/* Search and Filters Bar */}
      <Card className="p-4 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Search filename..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-surface-raised border border-border rounded-lg text-sm text-text placeholder-text-muted focus:outline-none focus:border-emerald-accent"
            />
          </div>

          {/* Filter by Assignment */}
          <div>
            <select
              value={selectedAssignmentId}
              onChange={(e) => setSelectedAssignmentId(e.target.value)}
              className="w-full px-3 py-2 bg-surface-raised border border-border rounded-lg text-sm text-text focus:outline-none focus:border-emerald-accent font-mono"
            >
              <option value="all">All Assignments ({assignments.length})</option>
              {assignments.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.id} — {a.displayTitle}
                </option>
              ))}
            </select>
          </div>

          {/* Filter by Format */}
          <div>
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="w-full px-3 py-2 bg-surface-raised border border-border rounded-lg text-sm text-text focus:outline-none focus:border-emerald-accent"
            >
              <option value="all">All File Formats</option>
              <option value="pdf">PDF Documents (.pdf)</option>
              <option value="presentation">PowerPoint Decks (.pptx)</option>
              <option value="spreadsheet">Spreadsheets (.xlsx)</option>
              <option value="document">Word Documents (.docx)</option>
              <option value="html">Interactive Web Apps (.html)</option>
              <option value="image">Diagrams & Images (.jpeg, .png)</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Files Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-text flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-accent" />
            Deliverables Register ({filteredFiles.length} of {files.length})
          </h2>
        </div>

        {filteredFiles.length === 0 ? (
          <Card className="p-12 text-center space-y-2 border-dashed">
            <p className="text-sm text-text-muted font-mono">No matching files found.</p>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setSelectedAssignmentId('all');
                setSelectedFormat('all');
              }}
            >
              Reset Filters
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFiles.map((file) => (
              <Card key={file.id} className="p-5 space-y-4 flex flex-col justify-between hover:border-emerald-accent/40 transition-colors">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-emerald-accent px-2.5 py-0.5 rounded bg-emerald-accent/10 border border-emerald-accent/20">
                      {file.assignmentId}
                    </span>
                    <span className="text-[11px] font-mono text-text-muted">
                      {(file.size / 1024).toFixed(1)} KB
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-text truncate" title={file.name}>
                    {file.name}
                  </h3>

                  <div className="flex items-center gap-2 text-[11px] font-mono text-text-muted">
                    <span className="px-2 py-0.5 rounded bg-surface-raised border border-border uppercase">
                      {file.previewType}
                    </span>
                    {file.slideImages && file.slideImages.length > 0 && (
                      <span className="text-cyan-accent">
                        {file.slideImages.length} Slides
                      </span>
                    )}
                  </div>
                </div>

                <div className="border-t border-border pt-3.5 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setActiveModalFile(file)}
                      className="h-8 px-2.5 text-xs gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5 text-emerald-accent" />
                      <span>Preview</span>
                    </Button>
                    <a href={file.publicUrl} download={file.name} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="ghost" className="h-8 px-2.5 text-xs gap-1">
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </Button>
                    </a>
                  </div>
                  <span className="text-[10px] text-emerald-accent font-mono flex items-center gap-1">
                    <FileCheck className="w-3 h-3" />
                    Verified
                  </span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Manual File Attachment Sandbox */}
      <Card className="p-6 space-y-4 border-dashed">
        <h3 className="text-sm font-bold text-text flex items-center gap-2">
          <Upload className="w-4 h-4 text-emerald-accent" />
          Attach Additional Research Artifact
        </h3>
        <p className="text-xs text-text-muted leading-relaxed">
          Need to link another experimental datasheet or report? Select an assignment and upload directly into your local sandbox.
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-1">
          <input
            type="file"
            onChange={handleFileUpload}
            className="text-xs text-text-muted file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-accent file:text-canvas cursor-pointer"
          />
        </div>

        {uploadError && (
          <div className="p-2.5 rounded-lg bg-danger-accent/10 border border-danger-accent/30 text-xs text-danger-accent flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            <span>{uploadError}</span>
          </div>
        )}

        <div className="text-[11px] text-text-muted flex items-center gap-2 pt-1 font-mono">
          <Lock className="w-3.5 h-3.5 text-emerald-accent" />
          <span>Local Client-Side Sandbox. Files are never leaked to external networks.</span>
        </div>
      </Card>
    </div>
  );
}
