'use client';

import React from 'react';
import { FileText, CheckCircle2, Layers } from 'lucide-react';

export function VibrantStatBanner({
  totalAssignments = 15,
  assignmentsWithFiles = 15,
  assignmentsAwaitingFiles = 0,
  totalFiles = 24,
}: {
  totalAssignments?: number;
  assignmentsWithFiles?: number;
  assignmentsAwaitingFiles?: number;
  totalFiles?: number;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-8">
      {/* 1. Deep Amber Card: Coursework Curriculum (WCAG AA > 7:1 contrast) */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#853909] to-[#6a2905] p-5 sm:p-6 text-white shadow-md flex items-center justify-between transition-transform hover:-translate-y-0.5 border border-amber-900/40">
        <div className="space-y-1 z-10">
          <div className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight text-white tabular-nums">
            {totalAssignments}
          </div>
          <div className="text-sm font-semibold text-amber-50 tracking-wide">
            Coursework Curriculum
          </div>
          <div className="text-xs text-amber-200 font-mono">
            All {totalAssignments} assignments registered
          </div>
        </div>
        {/* Hexagonal icon emblem on right */}
        <div className="relative w-13 h-13 shrink-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-white/15 rounded-xl rotate-6 border border-white/20" />
          <div className="relative w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center border border-white/30">
            <Layers className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      {/* 2. Deep Blue Card: Downloadable Deliverables (WCAG AA > 7:1 contrast) */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1b438b] to-[#122e63] p-5 sm:p-6 text-white shadow-md flex items-center justify-between transition-transform hover:-translate-y-0.5 border border-blue-900/40">
        <div className="space-y-1 z-10">
          <div className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight text-white tabular-nums flex items-baseline gap-1.5">
            <span>{assignmentsWithFiles}</span>
            <span className="text-xl font-normal text-blue-200">/ {totalAssignments}</span>
          </div>
          <div className="text-sm font-semibold text-blue-50 tracking-wide">
            Downloadable Deliverables
          </div>
          <div className="text-xs text-blue-200 font-mono">
            {totalFiles} verified deliverables across portfolio
          </div>
        </div>
        {/* Hexagonal icon emblem on right */}
        <div className="relative w-13 h-13 shrink-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-white/15 rounded-xl -rotate-6 border border-white/20" />
          <div className="relative w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center border border-white/30">
            <FileText className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      {/* 3. Deep Emerald Card: Pending Coursework (WCAG AA > 7:1 contrast) */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a583e] to-[#043c29] p-5 sm:p-6 text-white shadow-md flex items-center justify-between transition-transform hover:-translate-y-0.5 border border-emerald-900/40">
        <div className="space-y-1 z-10">
          <div className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight text-white tabular-nums flex items-baseline gap-1.5">
            <span>{assignmentsAwaitingFiles}</span>
            <span className="text-xl font-normal text-emerald-200">/ {totalAssignments}</span>
          </div>
          <div className="text-sm font-semibold text-emerald-50 tracking-wide">
            Pending Coursework
          </div>
          <div className="text-xs text-emerald-200 font-mono">
            All {totalAssignments} deliverables ingested &amp; verified
          </div>
        </div>
        {/* Hexagonal icon emblem on right */}
        <div className="relative w-13 h-13 shrink-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-white/15 rounded-xl rotate-12 border border-white/20" />
          <div className="relative w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center border border-white/30">
            <CheckCircle2 className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
