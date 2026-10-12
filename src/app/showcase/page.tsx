'use client';

import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Globe,
  ArrowRight,
  ShieldCheck,
  Lock,
} from 'lucide-react';
import { useStorage } from '@/lib/storage/StorageContext';
import { Card, Button, StatusBadge } from '@/components/ui/primitives';

export default function FacultyShowcasePage() {
  const { assignments, isLoaded } = useStorage();

  if (!isLoaded) {
    return <div className="p-8 text-center font-mono text-sm text-text-muted">Loading Showcase...</div>;
  }

  // Filter ONLY published assignments
  const publishedAssignments = assignments.filter((a) => a.published);

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Header */}
      <div className="border border-border rounded-xl bg-surface p-6 sm:p-8 space-y-3">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-emerald-accent" />
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text font-display">
            Faculty Showcase Portfolio
          </h1>
        </div>
        <p className="text-sm text-text-muted max-w-3xl leading-relaxed">
          Curated, read-only academic portfolio for faculty inspection. Only assignments explicitly approved and flagged as <strong className="text-emerald-accent">Published</strong> in the student workbench appear here. Unverified drafts and private notes remain strictly confidential.
        </p>
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-accent pt-1">
          <ShieldCheck className="w-4 h-4" />
          <span>Faculty Read-Only Gate Active</span>
        </div>
      </div>

      {publishedAssignments.length === 0 ? (
        <Card className="p-12 text-center space-y-4 max-w-2xl mx-auto border-dashed">
          <div className="w-12 h-12 rounded-full bg-surface-raised flex items-center justify-center mx-auto text-text-muted">
            <Lock className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-text">No Coursework Published Yet</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Assignments must be audited, reviewed, and published from the Assignment Workbench before appearing in this faculty presentation space.
            </p>
          </div>
          <Link href="/assignments">
            <Button size="sm" variant="outline" className="gap-2">
              <span>Go to Assignment Workbench</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishedAssignments.map((assignment) => (
            <Card key={assignment.id} className="p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-emerald-accent px-2 py-0.5 rounded bg-emerald-accent/10">
                    {assignment.id}
                  </span>
                  <StatusBadge type="quality" value={assignment.qualityStatus} />
                </div>
                <h3 className="text-lg font-bold text-text leading-snug">
                  {assignment.displayTitle}
                </h3>
                <p className="text-xs font-mono text-text-muted">
                  Category: {assignment.category}
                </p>
                {assignment.notes && (
                  <p className="text-xs text-text-muted line-clamp-3 bg-surface-raised p-3 rounded-lg font-sans">
                    {assignment.notes}
                  </p>
                )}
              </div>

              <div className="border-t border-border pt-4 flex items-center justify-between">
                <span className="text-[11px] font-mono text-emerald-accent flex items-center gap-1">
                  <Globe className="w-3 h-3" />
                  Published
                </span>
                <Link href={`/assignments/${assignment.id}`}>
                  <Button size="sm" variant="outline" className="text-xs">
                    View Details
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
