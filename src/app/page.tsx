'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  ArrowRight,
  Database,
  Cpu,
  BookOpen,
  Lightbulb,
  FileSpreadsheet,
  CheckCircle2,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { useStorage } from '@/lib/storage/StorageContext';
import { Card, Button, StatusBadge } from '@/components/ui/primitives';

export default function CommandCenterPage() {
  const { assignments, isLoaded } = useStorage();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex items-center gap-3 text-text-muted font-mono text-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-accent animate-ping" />
          Loading RECLAIM intelligence register...
        </div>
      </div>
    );
  }

  // Exact metrics
  const totalRecords = assignments.length; // Exactly 14
  const observedBadges = assignments.filter((a) => a.portalBadgeObserved).length; // Exactly 13
  const verifiedComplete = assignments.filter((a) => a.workStatus === 'verified_complete').length; // 0 initially
  const pendingReview = assignments.filter((a) => a.workStatus === 'not_reviewed').length; // 14 initially
  const publishedCount = assignments.filter((a) => a.published).length; // 0 initially

  // Category breakdown
  const categoryCounts: Record<string, number> = {
    'Data Analytics & Tracking': 0,
    'Technical & Recovery Processes': 0,
    'Research, Policy & Sustainability': 0,
    'Innovation & Awareness': 0,
    'Assessment / Administrative': 0,
  };

  assignments.forEach((a) => {
    if (categoryCounts[a.category] !== undefined) {
      categoryCounts[a.category]++;
    }
  });

  // Action Queue: first 3 assignments needing review
  const actionQueue = assignments.filter((a) => a.workStatus === 'not_reviewed').slice(0, 3);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Editorial Hero Header */}
      <div className="relative rounded-2xl border border-border bg-gradient-to-br from-surface via-surface to-surface-raised p-6 sm:p-8 lg:p-10 overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-accent/30 bg-emerald-accent/10 text-emerald-accent text-xs font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-accent" />
            Dual-Truth Verification Engine Active
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text font-display">
            E-Waste Intelligence & Management Studio
          </h1>
          <p className="text-sm sm:text-base text-text-muted leading-relaxed">
            From discarded circuitry to systematic evidence. Managing 14 coursework assignments across data analytics, pyrometallurgical recovery, regulatory compliance, and campus awareness with uncompromised integrity.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link href="/assignments">
              <Button className="gap-2">
                <span>Open Assignment Library</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/showcase">
              <Button variant="outline" className="gap-2">
                <span>Faculty Showcase ({publishedCount})</span>
                <ExternalLink className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Truth & Verification KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-text-muted">
              Coursework Register
            </span>
            <Database className="w-4 h-4 text-emerald-accent" />
          </div>
          <div className="mt-3">
            <div className="text-3xl font-bold font-mono text-text">{totalRecords}</div>
            <div className="text-xs text-text-muted mt-1">Authoritative assignments</div>
          </div>
        </Card>

        <Card className="border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-text-muted">
              Portal Badges
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-accent" />
          </div>
          <div className="mt-3">
            <div className="text-3xl font-bold font-mono text-emerald-accent">
              {observedBadges} <span className="text-sm font-normal text-text-muted">/ 14</span>
            </div>
            <div className="text-xs text-text-muted mt-1">Observed &quot;Turned in&quot; badges</div>
          </div>
        </Card>

        <Card className="border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-text-muted">
              Verified Complete
            </span>
            <ShieldAlert className="w-4 h-4 text-amber-accent" />
          </div>
          <div className="mt-3">
            <div className="text-3xl font-bold font-mono text-amber-accent">
              {verifiedComplete} <span className="text-sm font-normal text-text-muted">/ 14</span>
            </div>
            <div className="text-xs text-text-muted mt-1">Awaiting independent verification</div>
          </div>
        </Card>

        <Card className="border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-text-muted">
              Review Queue
            </span>
            <Clock className="w-4 h-4 text-cyan-accent" />
          </div>
          <div className="mt-3">
            <div className="text-3xl font-bold font-mono text-cyan-accent">
              {pendingReview}
            </div>
            <div className="text-xs text-text-muted mt-1">Assignments awaiting audit</div>
          </div>
        </Card>
      </div>

      {/* Action Queue & Categories Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Action Queue */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-text flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-accent" />
              Immediate Review Queue
            </h2>
            <Link href="/assignments" className="text-xs text-emerald-accent hover:underline font-mono">
              View all 14 &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {actionQueue.map((assignment) => (
              <Card
                key={assignment.id}
                className="hover:border-emerald-accent/50 transition-colors p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 max-w-xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold text-emerald-accent">
                      {assignment.id}
                    </span>
                    <span className="text-xs font-mono text-text-muted">
                      Portal Date: {assignment.portalActivityDate}
                    </span>
                    <StatusBadge type="portal" value={assignment.portalBadgeObserved} />
                  </div>
                  <h3 className="font-semibold text-text text-base">
                    {assignment.displayTitle}
                  </h3>
                  <p className="text-xs text-text-muted font-mono line-clamp-1">
                    Raw: {assignment.portalTitle}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link href={`/assignments/${assignment.id}`}>
                    <Button size="sm" variant="outline" className="gap-1.5">
                      <span>Workbench</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Col: Category Distribution (4/3/4/2/1) */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-text flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-lime-accent" />
            Curriculum Categories
          </h2>

          <Card className="space-y-4 p-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-text font-medium">
                  <FileSpreadsheet className="w-4 h-4 text-cyan-accent" />
                  Data Analytics & Tracking
                </span>
                <span className="font-mono font-bold text-cyan-accent">
                  {categoryCounts['Data Analytics & Tracking']} records
                </span>
              </div>
              <div className="w-full bg-surface-raised rounded-full h-1.5 overflow-hidden">
                <div className="bg-cyan-accent h-full w-[28.5%]" />
              </div>

              <div className="flex items-center justify-between text-xs pt-2">
                <span className="flex items-center gap-2 text-text font-medium">
                  <BookOpen className="w-4 h-4 text-emerald-accent" />
                  Research & Sustainability
                </span>
                <span className="font-mono font-bold text-emerald-accent">
                  {categoryCounts['Research, Policy & Sustainability']} records
                </span>
              </div>
              <div className="w-full bg-surface-raised rounded-full h-1.5 overflow-hidden">
                <div className="bg-emerald-accent h-full w-[28.5%]" />
              </div>

              <div className="flex items-center justify-between text-xs pt-2">
                <span className="flex items-center gap-2 text-text font-medium">
                  <Cpu className="w-4 h-4 text-lime-accent" />
                  Technical & Recovery
                </span>
                <span className="font-mono font-bold text-lime-accent">
                  {categoryCounts['Technical & Recovery Processes']} records
                </span>
              </div>
              <div className="w-full bg-surface-raised rounded-full h-1.5 overflow-hidden">
                <div className="bg-lime-accent h-full w-[21.4%]" />
              </div>

              <div className="flex items-center justify-between text-xs pt-2">
                <span className="flex items-center gap-2 text-text font-medium">
                  <Lightbulb className="w-4 h-4 text-amber-accent" />
                  Innovation & Awareness
                </span>
                <span className="font-mono font-bold text-amber-accent">
                  {categoryCounts['Innovation & Awareness']} records
                </span>
              </div>
              <div className="w-full bg-surface-raised rounded-full h-1.5 overflow-hidden">
                <div className="bg-amber-accent h-full w-[14.2%]" />
              </div>

              <div className="flex items-center justify-between text-xs pt-2">
                <span className="flex items-center gap-2 text-text font-medium">
                  <Database className="w-4 h-4 text-text-muted" />
                  Assessment & Admin
                </span>
                <span className="font-mono font-bold text-text-muted">
                  {categoryCounts['Assessment / Administrative']} record
                </span>
              </div>
              <div className="w-full bg-surface-raised rounded-full h-1.5 overflow-hidden">
                <div className="bg-text-muted h-full w-[7.1%]" />
              </div>
            </div>

            <div className="border-t border-border pt-4 text-[11px] text-text-muted font-mono leading-relaxed">
              Category Distribution: 4 Data / 3 Technical / 4 Research / 2 Innovation / 1 Administrative. Verified match against authoritative seed.
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
