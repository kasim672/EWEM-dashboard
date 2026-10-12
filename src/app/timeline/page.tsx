'use client';

import React from 'react';
import Link from 'next/link';
import {
  CalendarDays,
  Clock,
  ArrowRight,
  AlertCircle,
  FolderKanban,
  FileText,
} from 'lucide-react';
import { useStorage } from '@/lib/storage/StorageContext';
import { Card, Button, StatusBadge } from '@/components/ui/primitives';

export default function CourseTimelinePage() {
  const { assignments, isLoaded } = useStorage();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="p-8 text-center font-mono text-sm text-text-muted">
          Loading course timeline...
        </div>
      </div>
    );
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
      <div className="border border-border rounded-xl bg-surface p-6 sm:p-8 space-y-3 shadow-lg">
        <div className="flex items-center gap-2.5">
          <CalendarDays className="w-6 h-6 text-emerald-accent" />
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-text font-display">
            Course Activity Chronology
          </h1>
        </div>
        <p className="text-sm text-text-muted max-w-3xl leading-relaxed">
          Coursework chronology spanning July to October 2026. Dates reflect recorded academic course activity milestones in sequential order.
        </p>
      </div>

      {/* Coursework Timeline Stream */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-border/80 space-y-8 ml-2 sm:ml-4">
        {timelineSorted.map((assignment) => {
          const hasFiles = assignment.files && assignment.files.length > 0;

          return (
            <div key={assignment.id} className="relative group">
              {/* Timeline Marker Dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-surface border-2 border-emerald-accent group-hover:scale-125 transition-transform flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-accent" />
              </div>

              {/* Timeline Card */}
              <Card className="p-5 sm:p-6 hover:border-emerald-accent/40 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-bold text-emerald-accent px-2 py-0.5 rounded bg-emerald-accent/10 border border-emerald-accent/20">
                        {assignment.id}
                      </span>
                      <span className="text-xs font-mono text-cyan-accent flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {assignment.portalActivityDate}
                      </span>
                      <StatusBadge type="category" value={assignment.category} />
                      {hasFiles ? (
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface-raised border border-border text-emerald-accent">
                          {assignment.files.length} file{assignment.files.length !== 1 ? 's' : ''}
                        </span>
                      ) : (
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-accent/10 text-amber-accent border border-amber-accent/30">
                          Awaiting files
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-text">
                      {assignment.displayTitle}
                    </h3>

                    <p className="text-xs font-mono text-text-muted">
                      Portal: {assignment.portalTitle}
                    </p>
                  </div>

                  <div className="shrink-0 self-start sm:self-auto">
                    <Link href={`/assignments/${assignment.id}`}>
                      <Button size="sm" variant="outline" className="gap-1.5 text-xs">
                        <span>View Assignment</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
