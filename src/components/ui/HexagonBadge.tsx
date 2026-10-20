'use client';

import React from 'react';
import {
  FileText,
  Cpu,
  BarChart3,
  Lightbulb,
  Award,
  Layers,
} from 'lucide-react';
import { cn } from '@/components/ui/primitives';

export function HexagonBadge({
  category,
  id,
  className,
}: {
  category: string;
  id?: string;
  className?: string;
}) {
  let badgeBg = 'bg-emerald-700 text-white';
  let Icon = FileText;

  if (category === 'Data Analytics & Tracking') {
    badgeBg = 'bg-blue-600 text-white';
    Icon = BarChart3;
  } else if (category === 'Technical & Recovery Processes') {
    badgeBg = 'bg-emerald-600 text-white';
    Icon = Cpu;
  } else if (category === 'Research, Policy & Sustainability') {
    badgeBg = 'bg-teal-700 text-white';
    Icon = FileText;
  } else if (category === 'Innovation & Awareness') {
    badgeBg = 'bg-amber-600 text-white';
    Icon = Lightbulb;
  } else if (category === 'Academic Research' || id === 'EW-15') {
    badgeBg = 'bg-slate-800 text-amber-300';
    Icon = Award;
  } else if (category === 'Assessment / Administrative') {
    badgeBg = 'bg-slate-600 text-white';
    Icon = Layers;
  }

  return (
    <div className={cn('relative w-11 h-11 shrink-0 flex items-center justify-center', className)}>
      {/* Rotated background tile giving hexagon/polygon emblem geometry */}
      <div className={cn('absolute inset-0.5 rounded-xl shadow-xs rotate-6 opacity-85', badgeBg)} />
      {/* Front tile with micro icon */}
      <div className={cn('relative w-8.5 h-8.5 rounded-lg flex items-center justify-center border border-white/25 shadow-xs', badgeBg)}>
        <Icon className="w-4.5 h-4.5" />
      </div>
    </div>
  );
}
