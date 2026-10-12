'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FolderKanban,
  LineChart,
  CalendarDays,
  FileBox,
  GraduationCap,
  Presentation,
  Settings,
  Sun,
  Moon,
  Menu,
  X,
  ShieldCheck,
  HardDrive,
} from 'lucide-react';
import { useStorage } from '@/lib/storage/StorageContext';
import { cn } from '@/components/ui/primitives';

const NAV_ITEMS = [
  { label: 'Command Center', href: '/', icon: LayoutDashboard },
  { label: 'Assignments', href: '/assignments', icon: FolderKanban },
  { label: 'Analytics Lab', href: '/analytics', icon: LineChart },
  { label: 'Course Timeline', href: '/timeline', icon: CalendarDays },
  { label: 'Evidence Vault', href: '/library', icon: FileBox },
  { label: 'Faculty Showcase', href: '/showcase', icon: GraduationCap },
  { label: 'Presentation', href: '/presentation', icon: Presentation },
  { label: 'Settings & Data', href: '/settings', icon: Settings },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme, setTheme, assignments } = useStorage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Compute published count
  const publishedCount = assignments.filter((a) => a.published).length;

  return (
    <div className="flex min-h-screen bg-canvas text-text">
      {/* Desktop Navigation Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-border bg-surface shrink-0 fixed inset-y-0 z-30">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-accent animate-pulse" />
              <h1 className="text-xl font-bold tracking-wider font-mono text-emerald-accent">
                RECLAIM
              </h1>
            </div>
            <p className="text-xs text-text-muted mt-0.5 tracking-tight">
              E-Waste Studio & Management
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
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
                  'flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-surface-raised text-emerald-accent font-semibold border-l-2 border-emerald-accent'
                    : 'text-text-muted hover:text-text hover:bg-surface-raised'
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </div>
                {item.href === '/showcase' && publishedCount > 0 && (
                  <span className="text-xs font-mono px-1.5 py-0.2 rounded-full bg-emerald-accent/20 text-emerald-accent">
                    {publishedCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Local Storage Indicator & Theme Toggle */}
        <div className="p-4 border-t border-border bg-canvas/40 space-y-3">
          <div className="flex items-center justify-between text-xs text-text-muted">
            <span className="flex items-center gap-1.5 font-mono">
              <HardDrive className="w-3.5 h-3.5 text-cyan-accent" />
              Local Device Only
            </span>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-1.5 rounded-md hover:bg-surface-raised text-text-muted hover:text-text transition-colors"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-accent" />
              ) : (
                <Moon className="w-4 h-4 text-cyan-accent" />
              )}
            </button>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-text-muted/70">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-accent" />
            <span>Dual-Truth Verified Scaffold</span>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 inset-x-0 z-40 bg-surface border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-accent" />
          <span className="font-mono font-bold tracking-wider text-emerald-accent">
            RECLAIM
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-1.5 rounded-md text-text-muted"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-accent" />
            ) : (
              <Moon className="w-4 h-4 text-cyan-accent" />
            )}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-md text-text"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-30 bg-canvas/80 backdrop-blur-sm pt-14">
          <nav className="p-4 space-y-1 bg-surface border-b border-border shadow-lg">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium',
                    isActive
                      ? 'bg-surface-raised text-emerald-accent font-semibold'
                      : 'text-text-muted hover:text-text'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 md:pl-64 flex flex-col min-h-screen pt-14 md:pt-0">
        <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
