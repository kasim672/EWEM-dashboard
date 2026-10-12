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
  ArrowUpRight,
} from 'lucide-react';
import { useStorage } from '@/lib/storage/StorageContext';
import { Card, Button, StatusBadge } from '@/components/ui/primitives';

export default function HomePage() {
  const { assignments, isLoaded } = useStorage();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="flex items-center gap-3 text-text-muted font-mono text-xs uppercase tracking-tech">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-accent" />
          Loading RECLAIM academic register...
        </div>
      </div>
    );
  }

  // Exact metrics
  const totalAssignments = assignments.length; // Exactly 14
  const assignmentsWithFiles = assignments.filter((a) => a.files && a.files.length > 0).length; // Exactly 12
  const assignmentsAwaitingFiles = totalAssignments - assignmentsWithFiles; // Exactly 2 (EW-01 & EW-09)

  // Featured Coursework Deliverables
  const featuredAssignments = assignments.filter((a) =>
    ['EW-05', 'EW-10', 'EW-14'].includes(a.id)
  );

  return (
    <div className="space-y-16 animate-fadeIn pb-12">
      {/* Asymmetric Editorial Hero Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Bold Typographic Statement & Purpose (8 cols) */}
        <div className="lg:col-span-8 space-y-8 pr-0 lg:pr-6">
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded bg-surface border border-border text-xs font-mono text-emerald-accent uppercase tracking-tech">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-accent" />
            <span>EW/EM Academic Portfolio &bull; 2026 Archive</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-display-hero font-extrabold text-text font-display tracking-tightest">
              RECLAIM
            </h1>
            <p className="text-xl sm:text-2xl font-light text-text-muted tracking-tight max-w-2xl font-sans">
              E-Waste & Environmental Management Coursework
            </p>
          </div>

          <p className="text-base text-text-muted leading-relaxed font-sans max-w-2xl">
            A viewer-only academic repository curating 14 coursework assignments across electronics circularity, elemental recovery, compliance analytics, and institutional audits. Every deliverable is preserved in its authentic student format with interactive document inspection and cryptographic hash fidelity.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link href="/assignments">
              <Button size="lg" className="gap-2.5 px-6 font-semibold">
                <FolderKanban className="w-4 h-4" />
                <span>View Assignments ({totalAssignments})</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>

            <Link href="/timeline">
              <Button size="lg" variant="outline" className="gap-2.5 px-6 font-semibold">
                <CalendarDays className="w-4 h-4 text-cyan-accent" />
                <span>Explore Timeline</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Column: Physical Ledger Instrument Index (4 cols) */}
        <div className="lg:col-span-4 space-y-4 pt-2">
          <div className="border border-border bg-surface p-6 rounded-xl space-y-6 shadow-tactile">
            <div className="border-b border-border pb-3 flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-tech text-text-muted">
                Curriculum Ledger
              </span>
              <span className="text-[10px] font-mono text-emerald-accent px-1.5 py-0.5 rounded bg-emerald-accent/10 border border-emerald-accent/20">
                VERIFIED
              </span>
            </div>

            {/* Metric 1 */}
            <div className="space-y-1">
              <div className="text-xs font-mono text-text-muted uppercase tracking-tech">
                Coursework Curriculum
              </div>
              <div className="text-4xl font-extrabold font-mono text-text tabular-nums tracking-tight">
                {totalAssignments}
              </div>
              <p className="text-xs text-text-muted">
                Total coursework assignments registered
              </p>
            </div>

            <div className="border-t border-border/60 pt-4 space-y-1">
              <div className="text-xs font-mono text-text-muted uppercase tracking-tech">
                Downloadable Deliverables
              </div>
              <div className="text-4xl font-extrabold font-mono text-emerald-accent tabular-nums tracking-tight">
                {assignmentsWithFiles} <span className="text-lg font-normal text-text-muted">/ 14</span>
              </div>
              <p className="text-xs text-text-muted">
                19 verified original student deliverables
              </p>
            </div>

            <div className="border-t border-border/60 pt-4 space-y-1">
              <div className="text-xs font-mono text-text-muted uppercase tracking-tech">
                Pending Coursework
              </div>
              <div className="text-4xl font-extrabold font-mono text-amber-accent tabular-nums tracking-tight">
                {assignmentsAwaitingFiles} <span className="text-lg font-normal text-text-muted">/ 14</span>
              </div>
              <p className="text-xs text-text-muted">
                EW-01 & EW-09 marked awaiting source files
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Assignments: Asymmetric Editorial Gallery Layout */}
      <div className="space-y-6 pt-4 border-t border-border/80">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-mono uppercase tracking-tech text-emerald-accent">
              Selected Studies
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-text font-display tracking-tight">
              Featured Academic Coursework
            </h2>
          </div>
          <Link
            href="/assignments"
            className="text-xs font-mono text-emerald-accent hover:underline flex items-center gap-1.5 shrink-0"
          >
            <span>Browse All 14 Assignments</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Varied Asymmetric Bento Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Primary Lead Feature (col-span-7) */}
          {featuredAssignments[0] && (
            <div className="lg:col-span-7 border border-border bg-surface p-7 rounded-xl flex flex-col justify-between space-y-6 shadow-tactile hover:border-emerald-accent/50 transition-colors">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-emerald-accent px-2.5 py-1 rounded bg-surface-raised border border-border">
                    {featuredAssignments[0].id}
                  </span>
                  <span className="text-xs font-mono text-text-muted">
                    {featuredAssignments[0].portalActivityDate}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-text font-display leading-tight">
                    {featuredAssignments[0].displayTitle}
                  </h3>
                  <p className="text-xs font-mono text-text-muted">
                    {featuredAssignments[0].portalTitle}
                  </p>
                </div>

                <p className="text-sm text-text-muted leading-relaxed font-sans">
                  Comprehensive multi-sheet state-level electronic waste generation tracker and district collection scorecard containing real CPCB inventory data, authorized recyclers, and river basin environmental monitoring.
                </p>

                <div className="flex items-center gap-2 flex-wrap pt-2">
                  <StatusBadge type="category" value={featuredAssignments[0].category} />
                  <span className="text-xs font-mono text-text-muted px-2 py-0.5 rounded bg-surface-raised border border-border">
                    {featuredAssignments[0].files.length} deliverables (XLSX, PDF)
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between">
                <Link href={`/assignments/${featuredAssignments[0].id}`} className="w-full sm:w-auto">
                  <Button size="sm" variant="default" className="gap-2 w-full sm:w-auto">
                    <span>View Assignment & Interactive Sheets</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* Secondary Features Stack (col-span-5) */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            {featuredAssignments.slice(1).map((assignment) => (
              <div
                key={assignment.id}
                className="border border-border bg-surface p-6 rounded-xl flex flex-col justify-between space-y-4 shadow-tactile hover:border-emerald-accent/50 transition-colors flex-1"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-emerald-accent px-2 py-0.5 rounded bg-surface-raised border border-border">
                      {assignment.id}
                    </span>
                    <span className="text-xs font-mono text-text-muted">
                      {assignment.portalActivityDate}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-text font-display leading-snug">
                      {assignment.displayTitle}
                    </h3>
                    <p className="text-xs font-mono text-text-muted line-clamp-1">
                      {assignment.portalTitle}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <StatusBadge type="category" value={assignment.category} />
                    <span className="text-xs font-mono text-text-muted">
                      {assignment.files.length} files
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-border flex items-center justify-between">
                  <Link href={`/assignments/${assignment.id}`} className="w-full">
                    <Button size="sm" variant="outline" className="gap-2 w-full justify-center text-xs">
                      <span>View Assignment</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
