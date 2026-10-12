'use client';

import React, { useState } from 'react';
import {
  FileText,
  Download,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  FileSpreadsheet,
  Presentation,
  FileCode,
  Image as ImageIcon,
  ZoomIn,
  ZoomOut,
  X,
} from 'lucide-react';
import { FileRecord } from '@/types/domain';
import { Button } from '@/components/ui/primitives';

interface UniversalFileViewerProps {
  file: FileRecord;
  onClose?: () => void;
}

export function UniversalFileViewer({ file, onClose }: UniversalFileViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);

  const slides = file.slideImages || [];
  const hasSlides = slides.length > 0;
  const targetDownloadUrl = file.publicUrl || file.contentUrl || '#';

  return (
    <div
      className={`flex flex-col bg-surface border border-border rounded-xl overflow-hidden transition-all duration-300 ${
        isFullscreen ? 'fixed inset-4 z-50 shadow-2xl bg-canvas' : 'w-full min-h-[520px]'
      }`}
    >
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between p-3.5 bg-surface-raised border-b border-border">
        <div className="flex items-center gap-2.5 truncate max-w-md">
          <span className="p-1.5 rounded-lg bg-emerald-accent/10 border border-emerald-accent/20 text-emerald-accent">
            {file.previewType === 'pdf' && <FileText className="w-4 h-4" />}
            {file.previewType === 'presentation' && <Presentation className="w-4 h-4" />}
            {file.previewType === 'spreadsheet' && <FileSpreadsheet className="w-4 h-4" />}
            {file.previewType === 'html' && <FileCode className="w-4 h-4" />}
            {file.previewType === 'image' && <ImageIcon className="w-4 h-4" />}
            {file.previewType === 'document' && <FileText className="w-4 h-4" />}
          </span>
          <div className="truncate">
            <h4 className="text-xs font-bold text-text truncate" title={file.name}>
              {file.name}
            </h4>
            <span className="text-[10px] font-mono text-text-muted">
              {(file.size / 1024).toFixed(1)} KB • <span className="uppercase">{file.previewType}</span>
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Zoom controls for images */}
          {file.previewType === 'image' && (
            <div className="flex items-center gap-1 mr-2 bg-surface border border-border rounded-lg p-0.5">
              <button
                onClick={() => setZoomLevel((z) => Math.max(0.5, z - 0.25))}
                className="p-1 text-text-muted hover:text-text rounded"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] font-mono px-1.5 text-text-muted">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.25))}
                className="p-1 text-text-muted hover:text-text rounded"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Fullscreen Toggle */}
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="h-8 px-2.5 text-xs gap-1"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen View'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isFullscreen ? 'Exit' : 'Expand'}</span>
          </Button>

          {/* Download Original File */}
          <a href={targetDownloadUrl} download={file.name} target="_blank" rel="noopener noreferrer">
            <Button size="sm" variant="default" className="h-8 px-2.5 text-xs gap-1.5 font-semibold">
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download</span>
            </Button>
          </a>

          {/* Close button if modal */}
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-text-muted hover:text-text hover:bg-surface ml-1"
              title="Close Viewer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Preview Rendering Area */}
      <div className="flex-1 bg-canvas/60 overflow-auto relative flex items-center justify-center p-2 min-h-[460px]">
        {/* 1. PDF Preview */}
        {file.previewType === 'pdf' && (
          <iframe
            src={`${file.publicUrl}#toolbar=1&navpanes=0`}
            title={file.name}
            className="w-full h-full min-h-[500px] border-0 rounded-lg bg-surface"
          />
        )}

        {/* 2. Presentation Deck (PPT/PPTX) with Slide Navigation */}
        {file.previewType === 'presentation' && (
          <div className="w-full h-full flex flex-col justify-between items-center p-4 space-y-4">
            {hasSlides ? (
              <div className="w-full flex-1 flex flex-col items-center justify-center">
                <div className="relative max-w-4xl w-full aspect-video bg-black rounded-xl overflow-hidden shadow-xl border border-border flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={slides[slideIndex]}
                    alt={`Slide ${slideIndex + 1} of ${slides.length}`}
                    className="max-h-full max-w-full object-contain"
                  />
                  <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/70 backdrop-blur-sm text-white text-[11px] font-mono border border-white/10">
                    Slide {slideIndex + 1} / {slides.length}
                  </div>
                </div>

                {/* Slide controls */}
                <div className="flex items-center gap-3 pt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={slideIndex === 0}
                    onClick={() => setSlideIndex((i) => Math.max(0, i - 1))}
                    className="gap-1 text-xs"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Previous</span>
                  </Button>
                  <span className="text-xs font-mono text-text-muted px-2">
                    {slideIndex + 1} of {slides.length}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={slideIndex === slides.length - 1}
                    onClick={() => setSlideIndex((i) => Math.min(slides.length - 1, i + 1))}
                    className="gap-1 text-xs"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ) : file.pdfPreviewUrl ? (
              <iframe
                src={`${file.pdfPreviewUrl}#toolbar=1`}
                title={file.name}
                className="w-full h-full min-h-[500px] border-0 rounded-lg bg-surface"
              />
            ) : (
              <div className="text-center p-8 space-y-3">
                <Presentation className="w-12 h-12 text-emerald-accent mx-auto" />
                <h4 className="text-sm font-bold text-text">{file.name}</h4>
                <p className="text-xs text-text-muted max-w-sm mx-auto">
                  PowerPoint presentation ready for inspection. Download original presentation or open in system slide viewer.
                </p>
                <a href={targetDownloadUrl} download={file.name}>
                  <Button size="sm" className="gap-2">
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PPTX ({ (file.size / 1024).toFixed(1) } KB)</span>
                  </Button>
                </a>
              </div>
            )}
          </div>
        )}

        {/* 3. Word Document Preview (DOC/DOCX) */}
        {file.previewType === 'document' && (
          <div className="w-full h-full">
            {file.pdfPreviewUrl ? (
              <iframe
                src={`${file.pdfPreviewUrl}#toolbar=1`}
                title={file.name}
                className="w-full h-full min-h-[500px] border-0 rounded-lg bg-surface"
              />
            ) : (
              <div className="text-center p-8 space-y-3">
                <FileText className="w-12 h-12 text-cyan-accent mx-auto" />
                <h4 className="text-sm font-bold text-text">{file.name}</h4>
                <p className="text-xs text-text-muted max-w-sm mx-auto">
                  Word document indexed with verified SHA-256 integrity. Download original docx to review text and formatted tables.
                </p>
                <a href={targetDownloadUrl} download={file.name}>
                  <Button size="sm" className="gap-2">
                    <Download className="w-3.5 h-3.5" />
                    <span>Download DOCX</span>
                  </Button>
                </a>
              </div>
            )}
          </div>
        )}

        {/* 4. Excel & Spreadsheets (XLSX / CSV) */}
        {file.previewType === 'spreadsheet' && (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-accent/10 border border-cyan-accent/20 flex items-center justify-center text-cyan-accent">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-bold text-text">{file.name}</h4>
              <p className="text-xs text-text-muted font-mono">
                State E-Waste Data Workbook • Size: {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>
            <p className="text-xs text-text-muted max-w-md leading-relaxed">
              Contains multi-sheet state-by-state e-waste generation, authorized recyclers, and target tracking matrices.
            </p>
            <div className="flex gap-3">
              <a href={targetDownloadUrl} download={file.name}>
                <Button size="sm" className="gap-2">
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Original XLSX</span>
                </Button>
              </a>
            </div>
          </div>
        )}

        {/* 5. Sandboxed HTML Coursework Apps */}
        {file.previewType === 'html' && (
          <div className="w-full h-full flex flex-col">
            <div className="bg-surface-raised px-4 py-2 border-b border-border flex items-center justify-between text-xs font-mono">
              <span className="flex items-center gap-1.5 text-emerald-accent text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5" />
                Isolated Iframe Sandbox • Safe Execution
              </span>
              <a
                href={file.publicUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-text flex items-center gap-1 text-[11px]"
              >
                <span>Open in Tab</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <iframe
              src={file.publicUrl}
              sandbox="allow-scripts allow-forms"
              title={file.name}
              className="w-full flex-1 min-h-[500px] border-0 bg-white"
            />
          </div>
        )}

        {/* 6. Image Viewer */}
        {file.previewType === 'image' && (
          <div className="w-full h-full flex items-center justify-center overflow-auto p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={file.publicUrl || file.contentUrl}
              alt={file.name}
              style={{ transform: `scale(${zoomLevel})` }}
              className="max-h-[70vh] max-w-full object-contain rounded-lg shadow-lg border border-border transition-transform duration-200"
            />
          </div>
        )}

        {/* 7. Fallback Binary / Download Only */}
        {(file.previewType === 'binary' || file.previewType === 'download_only') && (
          <div className="text-center p-8 space-y-3">
            <AlertCircle className="w-10 h-10 text-amber-accent mx-auto" />
            <h4 className="text-sm font-bold text-text">{file.name}</h4>
            <p className="text-xs text-text-muted max-w-sm mx-auto">
              This file format does not support in-browser rendering. The original artifact is verified and ready for secure download.
            </p>
            <a href={targetDownloadUrl} download={file.name}>
              <Button size="sm" className="gap-2">
                <Download className="w-3.5 h-3.5" />
                <span>Download Original Deliverable</span>
              </Button>
            </a>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="px-4 py-2.5 bg-surface border-t border-border flex flex-wrap items-center justify-between text-[11px] font-mono text-text-muted">
        <span>Assignment Link: <strong className="text-emerald-accent">{file.assignmentId}</strong></span>
        {file.sha256 && (
          <span className="truncate max-w-xs" title={`SHA-256: ${file.sha256}`}>
            SHA: {file.sha256.substring(0, 16)}...
          </span>
        )}
      </div>
    </div>
  );
}
