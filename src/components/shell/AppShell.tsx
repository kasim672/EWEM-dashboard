'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FolderKanban,
  CalendarDays,
  Home,
  Sun,
  Moon,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react';
import { useStorage } from '@/lib/storage/StorageContext';
import { cn } from '@/components/ui/primitives';

const NAV_ITEMS = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Assignments', href: '/assignments', icon: FolderKanban },
  { label: 'Timeline', href: '/timeline', icon: CalendarDays },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme, setTheme } = useStorage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-canvas text-text">
      {/* Clean Top Navigation Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-surface/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <Link href="/" className="flex items-center gap-3 group">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-accent group-hover:scale-125 transition-transform" />
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-wider font-mono text-emerald-accent">
                RECLAIM
              </span>
              <span className="text-[10px] text-text-muted tracking-tight -mt-1 font-mono">
                E-Waste Portfolio
              </span>
            </div>
          </Link>

          {/* Desktop Primary Navigation: EXACTLY 3 ITEMS (Home | Assignments | Timeline) */}
          <nav className="hidden md:flex items-center gap-1">
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
                    'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                    isActive
                      ? 'bg-surface-raised text-emerald-accent font-semibold border border-emerald-accent/20'
                      : 'text-text-muted hover:text-text hover:bg-surface-raised/50'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Action Tools: Theme Toggle & Mobile Menu Trigger */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg border border-border hover:bg-surface-raised text-text-muted hover:text-text transition-colors"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
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
              className="md:hidden p-2 rounded-lg border border-border text-text hover:bg-surface-raised"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-border bg-surface px-4 py-3 space-y-1.5 animate-fadeIn">
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
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
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
          </div>
        )}
      </header>

      {/* Main Portfolio Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {children}
      </main>

      {/* Tasteful Professional Academic Portfolio Footer */}
      <footer className="border-t border-border bg-surface/50 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-text-muted">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-accent" />
            <span>RECLAIM — E-Waste & Environmental Management Coursework</span>
          </div>
          <div>
            14 Authoritative Coursework Deliverables &bull; Faculty & Peer Review Ready
          </div>
        </div>
      </footer>
    </div>
  );
}
