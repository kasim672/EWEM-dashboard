'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FolderKanban,
  CalendarDays,
  Home,
  User,
  Sun,
  Moon,
  Menu,
  X,
} from 'lucide-react';
import { useStorage } from '@/lib/storage/StorageContext';
import { cn } from '@/components/ui/primitives';

const NAV_ITEMS = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Assignments', href: '/assignments', icon: FolderKanban },
  { label: 'Timeline', href: '/timeline', icon: CalendarDays },
  { label: 'About', href: '/about', icon: User },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme, setTheme } = useStorage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile drawer on Escape key press
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Close mobile drawer when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-canvas text-text">
      {/* Sleek Frosted Glass Header with Soft Hairline Border */}
      <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-surface/75 dark:bg-neutral-950/75 backdrop-blur-xl transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Circular Frosted Glass Logo & Brandmark */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-accent rounded-full py-1 px-1 transition-colors"
            aria-label="E-Waste Academic Portfolio Home"
            title="E-Waste | Academic Portfolio"
          >
            <div className="w-9 h-9 rounded-full bg-surface-raised/80 dark:bg-white/[0.06] border border-border/80 dark:border-white/15 flex items-center justify-center p-1.5 backdrop-blur-md shadow-xs shrink-0 overflow-hidden group-hover:border-emerald-accent/50 transition-colors">
              <img
                src="/icon.png"
                alt="E-Waste Logo"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-sans text-base font-semibold tracking-wide text-text">
                E-Waste
              </span>
              <span className="hidden sm:inline font-mono text-[11px] text-text-muted border-l border-border/80 pl-2.5">
                EW/EM Studio
              </span>
            </div>
          </Link>

          {/* Centered Segmented Glass Pill Navigation Bar (Inspired by User Reference) */}
          <nav aria-label="Primary navigation" className="hidden md:flex items-center">
            <div className="flex items-center gap-1 rounded-full p-1 bg-surface-raised/80 dark:bg-white/[0.05] border border-border/80 dark:border-white/10 backdrop-blur-2xl shadow-sm">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (Boolean(pathname) && item.href !== '/' && pathname!.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-1.5 px-4 sm:px-5 py-1.5 rounded-full text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-accent',
                      isActive
                        ? 'bg-neutral-900 text-white dark:bg-white/[0.14] dark:text-white dark:border dark:border-white/15 shadow-sm font-semibold'
                        : 'text-text-muted hover:text-text hover:bg-surface-raised/80 dark:hover:bg-white/[0.06]'
                    )}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Action Tools: Student Author Badge, Circular Frosted Glass Theme Toggle & Mobile Menu Trigger */}
          <div className="flex items-center gap-2.5">
            {/* Student Author Identification */}
            <Link
              href="/about"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/80 dark:border-white/10 bg-surface/60 dark:bg-white/[0.05] hover:bg-surface-raised dark:hover:bg-white/[0.10] text-xs font-mono transition-all backdrop-blur-md shadow-xs group"
              title="Student Author: Kasim Ghanchi · 24102C0015"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-accent shrink-0 group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-text group-hover:text-emerald-accent transition-colors">
                Kasim Ghanchi
              </span>
              <span className="hidden sm:inline text-text-muted border-l border-border/60 dark:border-white/10 pl-2">
                24102C0015
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="flex items-center justify-center w-9 h-9 rounded-full border border-border/70 dark:border-white/10 bg-surface/60 dark:bg-white/[0.05] hover:bg-surface-raised dark:hover:bg-white/[0.10] active:translate-y-px text-text-muted hover:text-text transition-all backdrop-blur-md shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-accent"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-accent" aria-hidden="true" />
              ) : (
                <Moon className="w-4 h-4 text-cyan-accent" aria-hidden="true" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full border border-border/70 dark:border-white/10 bg-surface/60 dark:bg-white/[0.05] hover:bg-surface-raised dark:hover:bg-white/[0.10] active:translate-y-px text-text transition-all backdrop-blur-md shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-accent"
              aria-label={mobileMenuOpen ? 'Close navigation drawer' : 'Open navigation drawer'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4" aria-hidden="true" />
              ) : (
                <Menu className="w-4 h-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Responsive Mobile Drawer with Glass Backdrop */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation"
            className="md:hidden border-b border-border/60 bg-surface/90 dark:bg-neutral-950/90 backdrop-blur-2xl px-4 py-3 space-y-2 animate-fadeIn"
          >
            <nav aria-label="Mobile navigation" className="space-y-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (Boolean(pathname) && item.href !== '/' && pathname!.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-2.5 rounded-full text-sm font-medium transition-all',
                      isActive
                        ? 'bg-neutral-900 text-white dark:bg-white/[0.14] dark:text-white dark:border dark:border-white/15 shadow-sm font-semibold'
                        : 'text-text-muted hover:text-text hover:bg-surface-raised/80 dark:hover:bg-white/[0.06]'
                    )}
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="pt-2 mt-2 border-t border-border/60 flex items-center justify-between text-[11px] font-mono text-text-muted px-2">
              <span>15 Deliverables</span>
              <span>TE CMPN &bull; EW/EM</span>
            </div>
          </div>
        )}
      </header>

      {/* Main Portfolio Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {children}
      </main>

      {/* Minimalist, Human-First Academic Footer */}
      <footer className="border-t border-border bg-surface py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-text-muted">
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-sm bg-emerald-accent" aria-hidden="true" />
              <span className="text-text font-semibold tracking-wider">E-Waste</span>
              <span className="text-border">/</span>
              <span>Environmental Management</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span>15 Authoritative Coursework Deliverables</span>
              <span className="text-border" aria-hidden="true">&bull;</span>
              <span>Faculty &amp; Peer Review Ready</span>
              <span className="text-border" aria-hidden="true">&bull;</span>
              <span>Dual-Truth Verification</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
