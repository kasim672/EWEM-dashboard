'use client';

import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Award,
  BookOpen,
  FolderKanban,
  Calendar,
  Building2,
  FileCheck2,
  Cpu,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/primitives';

export default function AboutPage() {
  return (
    <div className="space-y-12 animate-fadeIn pb-16 max-w-5xl mx-auto">
      {/* Top Academic Breadcrumb & Title */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-surface border border-border text-xs font-mono text-emerald-accent uppercase tracking-tech">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-accent" />
          <span>Academic Researcher &bull; Student Author Profile</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-text font-display">
            About the Researcher
          </h1>
          <p className="text-lg text-text-muted font-sans font-light max-w-[65ch]">
            Electronic Waste &amp; Environmental Management (EW/EM) Coursework Portfolio
          </p>
        </div>
      </div>

      {/* Primary Author Profile Section (Flattened Hierarchy) */}
      <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-surface p-6 sm:p-10 shadow-lg space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Avatar / Monogram */}
          <div className="md:col-span-4 flex flex-col items-center sm:items-start space-y-4">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-br from-emerald-500/30 to-blue-500/20 border border-emerald-accent/40 shadow-md flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-surface-raised flex items-center justify-center text-3xl font-extrabold font-mono text-emerald-accent shadow-inner">
                KG
              </div>
            </div>

            <div className="space-y-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-accent/10 border border-emerald-accent/30 text-[11px] font-mono text-emerald-accent font-semibold">
                <FileCheck2 className="w-3 h-3" />
                <span>Verified Author</span>
              </div>
            </div>
          </div>

          {/* Student & Institutional Metadata (Clean Typography, No Nested Cards) */}
          <div className="md:col-span-8 space-y-6">
            <div className="space-y-1.5">
              <h2 className="text-2xl sm:text-3xl font-bold text-text font-display tracking-tight">
                Kasim Ishaque Ghanchi
              </h2>
              <p className="text-sm font-mono text-emerald-accent font-semibold tracking-wide">
                Roll Number: 24102C0015
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 pt-2 border-t border-border/60">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-mono text-text-muted">
                  <Building2 className="w-3.5 h-3.5 text-cyan-accent" />
                  <span>Institution</span>
                </div>
                <div className="text-sm font-semibold text-text">
                  Vidyalankar Institute of Technology
                </div>
                <div className="text-xs text-text-muted">
                  Wadala, Mumbai &middot; Affiliated to University of Mumbai
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-mono text-text-muted">
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-accent" />
                  <span>Department &amp; Class</span>
                </div>
                <div className="text-sm font-semibold text-text">
                  Computer Engineering (CMPN)
                </div>
                <div className="text-xs font-mono text-emerald-accent font-semibold">
                  Division C (CMPN-C)
                </div>
              </div>

              <div className="space-y-1 pt-2 sm:pt-0">
                <div className="flex items-center gap-1.5 text-xs font-mono text-text-muted">
                  <Award className="w-3.5 h-3.5 text-amber-accent" />
                  <span>Academic Course</span>
                </div>
                <div className="text-sm font-semibold text-text">
                  E-Waste &amp; Environmental Management (EW/EM)
                </div>
                <div className="text-xs text-text-muted">
                  Semester 5 &middot; Academic Year 2026–2027
                </div>
              </div>

              <div className="space-y-1 pt-2 sm:pt-0">
                <div className="flex items-center gap-1.5 text-xs font-mono text-text-muted">
                  <BookOpen className="w-3.5 h-3.5 text-lime-accent" />
                  <span>Faculty Mentorship</span>
                </div>
                <div className="text-sm font-semibold text-text">
                  Prof. Aniket Kundu
                </div>
                <div className="text-xs text-text-muted">
                  Course Coordinator &amp; Academic Mentor
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Narrative Bio & Academic Philosophy */}
        <div className="pt-6 border-t border-border/80 space-y-3">
          <h3 className="text-base font-semibold text-text font-display">
            Academic Scope &amp; Research Focus
          </h3>
          <p className="text-sm text-text-muted leading-relaxed font-sans max-w-[68ch]">
            This repository documents comprehensive undergraduate coursework in electronic waste circularity, environmental impact assessment, and technical material recovery. Completed as part of the Department of Computer Engineering curriculum at Vidyalankar Institute of Technology, Mumbai, under the guidance of Prof. Aniket Kundu.
          </p>
          <p className="text-sm text-text-muted leading-relaxed font-sans max-w-[68ch]">
            The coursework spans 15 modular submissions ranging from chemical toxicity analyses and state-level CPCB generation trackers, to patent-modified recycling equipment and an IEEE conference research submission exploring model reliability and dataset shift.
          </p>
        </div>
      </div>

      {/* Coursework Portfolio Highlights Bento */}
      <div className="space-y-5">
        <h2 className="text-xl sm:text-2xl font-bold text-text font-display tracking-tight">
          Curriculum Portfolio Structure
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {/* Bento Column 1 */}
          <div className="border border-border/80 bg-surface p-5 sm:p-6 rounded-2xl space-y-3 shadow-xs flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Cpu className="w-4.5 h-4.5" />
              </div>
              <h3 className="text-base font-semibold text-text font-display">
                Technical Recovery &amp; Patents
              </h3>
              <p className="text-xs text-text-muted leading-relaxed max-w-[40ch]">
                Elemental recovery processes, circuit board pyrometallurgy, and specialized design patent modifications (EW-02, EW-03, EW-09).
              </p>
            </div>
            <div className="text-xs font-mono text-emerald-accent">
              3 Verified Deliverables
            </div>
          </div>

          {/* Bento Column 2 */}
          <div className="border border-border/80 bg-surface p-5 sm:p-6 rounded-2xl space-y-3 shadow-xs flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Layers className="w-4.5 h-4.5" />
              </div>
              <h3 className="text-base font-semibold text-text font-display">
                Data Analytics &amp; CPCB Trackers
              </h3>
              <p className="text-xs text-text-muted leading-relaxed max-w-[40ch]">
                State-level collection scorecards, national e-waste inventory models, and carbon footprint lifecycle assessments (EW-05, EW-06, EW-07, EW-08).
              </p>
            </div>
            <div className="text-xs font-mono text-emerald-accent">
              4 Verified Deliverables
            </div>
          </div>

          {/* Bento Column 3 */}
          <div className="border border-border/80 bg-surface p-5 sm:p-6 rounded-2xl space-y-3 shadow-xs flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Award className="w-4.5 h-4.5" />
              </div>
              <h3 className="text-base font-semibold text-text font-display">
                IEEE Academic Research (EW-15)
              </h3>
              <p className="text-xs text-text-muted leading-relaxed max-w-[40ch]">
                Full-length research paper exploring explanation reliability and failure detection in classification under distribution shift with LaTeX and DOCX deliverables.
              </p>
            </div>
            <div className="text-xs font-mono text-emerald-accent">
              Conference Manuscript Ingested
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Actions */}
      <div className="pt-4 flex flex-wrap items-center gap-4">
        <Link href="/assignments">
          <Button size="lg" className="gap-2.5 px-7 font-semibold">
            <FolderKanban className="w-4 h-4" />
            <span>Explore All 15 Assignments</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>

        <Link href="/assignments/EW-15">
          <Button size="lg" variant="outline" className="gap-2.5 px-7 font-semibold">
            <BookOpen className="w-4 h-4 text-emerald-accent" />
            <span>Read Research Paper (EW-15)</span>
          </Button>
        </Link>

        <Link href="/timeline">
          <Button size="lg" variant="outline" className="gap-2.5 px-7 font-semibold">
            <Calendar className="w-4 h-4 text-cyan-accent" />
            <span>View Timeline</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
