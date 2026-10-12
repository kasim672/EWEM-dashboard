'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  FolderKanban,
  CalendarDays,
  FileText,
  Download,
  Layers,
  FileCheck2,
  Clock,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { useStorage } from '@/lib/storage/StorageContext';
import { Card, Button, StatusBadge } from '@/components/ui/primitives';

export default function HomePage() {
  const { assignments, isLoaded } = useStorage();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="flex items-center gap-3 text-text-muted font-mono text-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-accent animate-ping" />
          Loading RECLAIM academic portfolio...
        </div>
      </div>
    );
  }

  // Exact metrics
  const totalAssignments = assignments.length; // Exactly 14
  const assignmentsWithFiles = assignments.filter((a) => a.files && a.files.length > 0).length; // Exactly 12
  const assignmentsAwaitingFiles = totalAssignments - assignmentsWithFiles; // Exactly 2 (EW-01 & EW-09)

  // Featured Coursework Deliverables (representing core technical, analytics, and policy work)
  const featuredAssignments = assignments.filter((a) =>
    ['EW-05', 'EW-10', 'EW-14'].includes(a.id)
  );

  return (
    <div className="space-y-12 animate-fadeIn pb-8">
      {/* Editorial Academic Hero Section */}
      <div className="relative rounded-2xl border border-border bg-gradient-to-br from-surface via-surface to-surface-raised p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl">
        {/* Subtle accent glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-accent/30 bg-emerald-accent/10 text-emerald-accent text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Academic Coursework Portfolio &bull; EW/EM</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-text font-display leading-[1.1]">
            RECLAIM <br />
            <span className="text-emerald-accent">
              E-Waste & Environmental Management
            </span>
          </h1>

          <p className="text-base sm:text-lg text-text-muted leading-relaxed font-sans max-w-2xl">
            A comprehensive, viewer-only academic repository curating 14 coursework deliverables. Explore research reports, elemental recovery workflows, compliance analytics, interactive spreadsheets, slide decks, and environmental posters with genuine interactive document previews and original file downloads.
          </p>

          {/* Prominent Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link href="/assignments">
              <Button size="lg" className="gap-2.5 px-6 font-semibold shadow-lg shadow-emerald-accent/10">
                <FolderKanban className="w-5 h-5" />
                <span>View Assignments ({totalAssignments})</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>

            <Link href="/timeline">
              <Button size="lg" variant="outline" className="gap-2.5 px-6 font-semibold">
                <CalendarDays className="w-5 h-5 text-cyan-accent" />
                <span>Explore Timeline</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Truthful Academic Portfolio Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="border-border p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-text-muted">
              Coursework Curriculum
            </span>
            <FileText className="w-5 h-5 text-emerald-accent" />
          </div>
          <div>
            <div className="text-4xl font-extrabold font-mono text-text">
              {totalAssignments}
            </div>
            <div className="text-xs text-text-muted mt-1 font-sans">
              Total coursework assignments registered
            </div>
          </div>
        </Card>

        <Card className="border-border p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-text-muted">
              Downloadable Deliverables
            </span>
            <FileCheck2 className="w-5 h-5 text-emerald-accent" />
          </div>
          <div>
            <div className="text-4xl font-extrabold font-mono text-emerald-accent">
              {assignmentsWithFiles}{' '}
              <span className="text-sm font-normal text-text-muted">/ 14</span>
            </div>
            <div className="text-xs text-text-muted mt-1 font-sans">
              Assignments with genuine verified files (19 deliverables)
            </div>
          </div>
        </Card>

        <Card className="border-border p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-text-muted">
              Pending Coursework
            </span>
            <Clock className="w-5 h-5 text-amber-accent" />
          </div>
          <div>
            <div className="text-4xl font-extrabold font-mono text-amber-accent">
              {assignmentsAwaitingFiles}{' '}
              <span className="text-sm font-normal text-text-muted">/ 14</span>
            </div>
            <div className="text-xs text-text-muted mt-1 font-sans">
              Awaiting source files (EW-01 & EW-09 marked pending)
            </div>
          </div>
        </Card>
      </div>

      {/* Featured Assignments Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-text flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-accent" />
              <span>Featured Academic Coursework</span>
            </h2>
            <p className="text-xs sm:text-sm text-text-muted mt-1">
              Representative assignments featuring interactive spreadsheets, legal reviews, and pitch case studies.
            </p>
          </div>
          <Link
            href="/assignments"
            className="text-xs sm:text-sm font-mono text-emerald-accent hover:underline flex items-center gap-1"
          >
            <span>Browse All 14</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredAssignments.map((assignment) => (
            <Card
              key={assignment.id}
              className="p-6 hover:border-emerald-accent/50 transition-all flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-emerald-accent px-2.5 py-1 rounded-md bg-emerald-accent/10 border border-emerald-accent/20">
                    {assignment.id}
                  </span>
                  <span className="text-xs font-mono text-text-muted">
                    {assignment.portalActivityDate}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-bold text-base text-text leading-snug">
                    {assignment.displayTitle}
                  </h3>
                  <p className="text-xs text-text-muted font-mono line-clamp-1">
                    {assignment.portalTitle}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  <StatusBadge type="category" value={assignment.category} />
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface-raised border border-border text-text-muted">
                    {assignment.files.length} file{assignment.files.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>

              <div className="border-t border-border pt-4 flex items-center justify-between">
                <Link href={`/assignments/${assignment.id}`} className="w-full">
                  <Button size="sm" variant="outline" className="w-full gap-2 justify-center">
                    <span>View Assignment</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
