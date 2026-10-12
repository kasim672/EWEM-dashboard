'use client';

import React from 'react';
import Link from 'next/link';
import {
  CalendarDays,
  Clock,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';
import { useStorage } from '@/lib/storage/StorageContext';
import { Card, Button, StatusBadge } from '@/components/ui/primitives';

export default function CourseTimelinePage() {
  const { assignments, isLoaded } = useStorage();

  if (!isLoaded) {
    return <div className="p-8 text-center font-mono text-sm text-text-muted">Loading timeline...</div>;
  }

  // Sort assignments strictly by portal activity date
  const timelineSorted = [...assignments].sort((a, b) => {
    const comp = a.portalActivityDate.localeCompare(b.portalActivityDate);
    if (comp !== 0) return comp;
    return a.id.localeCompare(b.id);
  });

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Header */}
      <div className="border border-border rounded-xl bg-surface p-6 space-y-2">
        <div className="flex items-center gap-2">
          <CalendarDays className="w-5 h-5 text-emerald-accent" />
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text">
            Course Chronology & Milestones
          </h1>
        </div>
        <p className="text-sm text-text-muted max-w-3xl leading-relaxed">
          Activity chronology across July–October 2026. Explicit distinction: recorded dates reflect portal activity observed in portal screenshots, not confirmed academic deadlines.
        </p>
      </div>

      {/* Distinction Callout */}
      <div className="p-4 rounded-xl border border-amber-accent/30 bg-amber-accent/5 flex items-start gap-3 text-xs text-text">
        <AlertCircle className="w-4 h-4 text-amber-accent shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold text-amber-accent">Integrity Note:</strong> Dates below represent observed portal activity stamps. Both same-day submissions on July 28, 2026 (EW-02 Map of E-Waste and EW-03 Elemental Recovery Process) are preserved independently in chronological order.
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-border/80 space-y-8 ml-2 sm:ml-4">
        {timelineSorted.map((assignment, index) => (
          <div key={assignment.id} className="relative group">
            {/* Timeline Marker Dot */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-surface border-2 border-emerald-accent group-hover:scale-125 transition-transform flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-accent" />
            </div>

            {/* Card Content */}
            <Card className="p-5 hover:border-emerald-accent/40 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold text-emerald-accent">
                      {assignment.id}
                    </span>
                    <span className="text-xs font-mono text-cyan-accent flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {assignment.portalActivityDate}
                    </span>
                    <StatusBadge type="category" value={assignment.category} />
                    <StatusBadge type="portal" value={assignment.portalBadgeObserved} />
                  </div>
                  <h3 className="text-base font-bold text-text">
                    {assignment.displayTitle}
                  </h3>
                  <p className="text-xs font-mono text-text-muted">
                    Raw Portal String: {assignment.portalTitle}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto">
                  <StatusBadge type="work" value={assignment.workStatus} />
                  <Link href={`/assignments/${assignment.id}`}>
                    <Button size="sm" variant="outline" className="gap-1 text-xs">
                      <span>Workbench</span>
                      <ArrowRight className="w-3 h-3" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
