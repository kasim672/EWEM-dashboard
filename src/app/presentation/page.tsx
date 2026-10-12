'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Presentation as PresentationIcon,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { useStorage } from '@/lib/storage/StorageContext';
import { Button, StatusBadge } from '@/components/ui/primitives';

export default function PresentationModePage() {
  const { assignments, isLoaded } = useStorage();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slides consist of introduction + published coursework items (or placeholders)
  const publishedAssignments = assignments.filter((a) => a.published);

  const slides = [
    {
      type: 'intro',
      title: 'RECLAIM — E-Waste Intelligence Studio',
      subtitle: 'Coursework Portfolio & Research Methodology',
      body: 'Welcome, Faculty Committee. RECLAIM presents a verified, evidence-backed evaluation of 14 electronic waste management assignments covering lifecycle metrics, pyrometallurgical recovery, regulatory compliance, and campus awareness initiatives.',
      badge: 'Academic Defense',
    },
    ...publishedAssignments.map((a) => ({
      type: 'assignment',
      title: `${a.id}: ${a.displayTitle}`,
      subtitle: a.category,
      body: a.notes || 'No detailed reflections recorded yet for this coursework module.',
      badge: a.qualityStatus,
      rawTitle: a.portalTitle,
      date: a.portalActivityDate,
    })),
  ];

  // If no assignments are published yet, add informative placeholder slide
  if (publishedAssignments.length === 0) {
    slides.push({
      type: 'empty',
      title: 'Coursework Pending Publication',
      subtitle: 'Private Workbench Active',
      body: 'Currently, all 14 assignments are maintained in the private operating workbench for iterative verification. Once audited and published, coursework modules automatically populate this presentation sequence.',
      badge: 'Curated Gate',
    });
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides.length]);

  if (!isLoaded) {
    return <div className="p-8 text-center font-mono text-sm text-text-muted">Loading Presentation Mode...</div>;
  }

  const slide = slides[currentSlide];

  return (
    <div className="fixed inset-0 z-50 bg-canvas flex flex-col justify-between p-6 sm:p-12 text-text select-none animate-fadeIn">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <PresentationIcon className="w-5 h-5 text-emerald-accent" />
          <span className="font-mono text-xs font-bold tracking-wider text-emerald-accent">
            RECLAIM // FACULTY PRESENTATION
          </span>
          <span className="px-2 py-0.5 rounded-full bg-surface-raised border border-border text-[11px] font-mono text-text-muted">
            Slide {currentSlide + 1} of {slides.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/">
            <Button size="sm" variant="ghost" className="gap-1.5 text-xs">
              <X className="w-4 h-4" />
              <span>Exit (Esc)</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Slide Body */}
      <div className="max-w-4xl mx-auto w-full my-auto space-y-6 text-center sm:text-left py-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-accent/30 bg-emerald-accent/10 text-emerald-accent text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          {slide.badge}
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-text leading-tight">
          {slide.title}
        </h1>

        <p className="text-lg sm:text-xl text-emerald-accent font-medium font-sans">
          {slide.subtitle}
        </p>

        <p className="text-sm sm:text-base text-text-muted leading-relaxed max-w-2xl font-sans pt-2">
          {slide.body}
        </p>

        {slide.type === 'assignment' && (
          <div className="pt-4 border-t border-border flex flex-wrap gap-4 text-xs font-mono text-text-muted">
            <span>Portal Activity: {(slide as any).date}</span>
            <span>Raw: {(slide as any).rawTitle}</span>
          </div>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="flex items-center justify-between border-t border-border pt-4">
        <div className="text-xs font-mono text-text-muted">
          Use <kbd className="px-1.5 py-0.5 rounded bg-surface-raised border border-border">←</kbd> and{' '}
          <kbd className="px-1.5 py-0.5 rounded bg-surface-raised border border-border">→</kbd> to navigate
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            disabled={currentSlide === 0}
            onClick={() => setCurrentSlide((prev) => Math.max(prev - 1, 0))}
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="default"
            disabled={currentSlide === slides.length - 1}
            onClick={() => setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1))}
            aria-label="Next Slide"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
