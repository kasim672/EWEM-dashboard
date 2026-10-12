'use client';

import React from 'react';
import {
  LineChart as ChartIcon,
  FlaskConical,
  UploadCloud,
  FileSpreadsheet,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { useStorage } from '@/lib/storage/StorageContext';
import { Card, Button, StatusBadge } from '@/components/ui/primitives';

export default function AnalyticsLabPage() {
  const { analytics, isLoaded } = useStorage();

  if (!isLoaded) {
    return <div className="p-8 text-center font-mono text-sm text-text-muted">Loading Analytics Lab...</div>;
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border border-border rounded-xl bg-surface p-6 space-y-2">
        <div className="flex items-center gap-2">
          <FlaskConical className="w-5 h-5 text-cyan-accent" />
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text">
            Research & Analytics Lab
          </h1>
        </div>
        <p className="text-sm text-text-muted max-w-3xl leading-relaxed">
          Evidence-grounded environmental metrics pipeline. In accordance with strict academic integrity, zero synthetic or fabricated statistics are displayed. Modules maintain truthful &ldquo;Awaiting Source Dataset&rdquo; states until verified worksheets are supplied.
        </p>
      </div>

      {/* Analytics Modules Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {analytics.map((metric) => (
          <Card key={metric.id} className="p-6 space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="font-mono text-xs font-bold text-cyan-accent px-2 py-0.5 rounded bg-cyan-accent/10 border border-cyan-accent/20">
                  {metric.id}
                </span>
                <StatusBadge type="category" value={metric.category} />
              </div>

              <div>
                <h3 className="text-lg font-bold text-text leading-snug">
                  {metric.title}
                </h3>
                <p className="text-xs text-text-muted mt-0.5">{metric.scope}</p>
              </div>

              {/* Metric Metadata Specification */}
              <div className="grid grid-cols-2 gap-2 p-3 rounded-lg bg-surface-raised border border-border text-xs font-mono">
                <div>
                  <span className="text-text-muted block text-[10px]">TARGET METRIC</span>
                  <span className="text-text font-medium truncate block">{metric.metric}</span>
                </div>
                <div>
                  <span className="text-text-muted block text-[10px]">UNIT OF MEASURE</span>
                  <span className="text-text font-medium truncate block">{metric.unit}</span>
                </div>
                <div>
                  <span className="text-text-muted block text-[10px]">OBSERVATION PERIOD</span>
                  <span className="text-text font-medium truncate block">{metric.period}</span>
                </div>
                <div>
                  <span className="text-text-muted block text-[10px]">PROVENANCE</span>
                  <span className="text-amber-accent font-medium uppercase text-[10px]">
                    {metric.provenance}
                  </span>
                </div>
              </div>

              {/* Source & Calculation Method */}
              <div className="space-y-1 text-xs text-text-muted">
                <div className="flex items-start gap-1.5">
                  <Info className="w-3.5 h-3.5 text-cyan-accent shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-text">Source:</strong> {metric.source}
                  </span>
                </div>
              </div>
            </div>

            {/* Awaiting Data / Interactive State */}
            <div className="border border-dashed border-border rounded-xl p-6 bg-surface-raised/40 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-cyan-accent/10 border border-cyan-accent/20 flex items-center justify-center mx-auto text-cyan-accent">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-text">
                  Awaiting Source Dataset Upload
                </h4>
                <p className="text-xs text-text-muted max-w-sm mx-auto">
                  {metric.method}
                </p>
              </div>
              <Button size="sm" variant="outline" className="gap-2 text-xs">
                <UploadCloud className="w-3.5 h-3.5 text-cyan-accent" />
                <span>Upload Verified Dataset</span>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
