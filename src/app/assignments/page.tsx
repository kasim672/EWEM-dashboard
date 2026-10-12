'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Filter,
  ArrowUpDown,
  LayoutGrid,
  List as ListIcon,
  ArrowRight,
  FileText,
  Download,
  Calendar,
  Layers,
  FileArchive,
  AlertCircle,
} from 'lucide-react';
import { useStorage } from '@/lib/storage/StorageContext';
import { Card, Button, StatusBadge } from '@/components/ui/primitives';
import { AssignmentCategory } from '@/types/domain';

export default function AssignmentLibraryPage() {
  const { assignments, isLoaded } = useStorage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-sm font-mono text-text-muted">Loading assignments...</div>
      </div>
    );
  }

  // Filter and sort assignments
  const filteredAssignments = assignments
    .filter((a) => {
      const matchesSearch =
        a.displayTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.portalTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || a.category === selectedCategory;
      const matchesAvailability =
        availabilityFilter === 'all' ||
        (availabilityFilter === 'has_files' && a.files.length > 0) ||
        (availabilityFilter === 'no_files' && a.files.length === 0);
      return matchesSearch && matchesCategory && matchesAvailability;
    })
    .sort((a, b) => {
      const comp = a.portalActivityDate.localeCompare(b.portalActivityDate);
      return sortOrder === 'asc' ? comp : -comp;
    });

  const categories: AssignmentCategory[] = [
    'Data Analytics & Tracking',
    'Technical & Recovery Processes',
    'Research, Policy & Sustainability',
    'Innovation & Awareness',
    'Assessment / Administrative',
  ];

  // Helper to get formatted unique extensions for an assignment
  const getFileExtensions = (files: any[]) => {
    if (!files || files.length === 0) return [];
    return [...new Set(files.map((f) => {
      const ext = f.ext || (f.name ? f.name.slice(f.name.lastIndexOf('.')) : '');
      return ext.toUpperCase().replace('.', '');
    }))];
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-text font-display">
            Academic Coursework Gallery
          </h1>
          <p className="text-sm text-text-muted mt-1">
            Explore and inspect all 14 official EW/EM assignments with real document previews and original file downloads.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
            aria-label="Grid view"
          >
            <LayoutGrid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'table' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('table')}
            aria-label="Table view"
          >
            <ListIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <Card className="p-4 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Search title, ID, topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg bg-surface-raised border border-border text-text placeholder-text-muted focus:outline-none focus:border-emerald-accent transition-colors"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg bg-surface-raised border border-border text-text focus:outline-none focus:border-emerald-accent transition-colors font-sans"
            >
              <option value="all">All Categories ({assignments.length})</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Availability Filter */}
          <div className="relative">
            <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg bg-surface-raised border border-border text-text focus:outline-none focus:border-emerald-accent transition-colors font-sans"
            >
              <option value="all">All Deliverables</option>
              <option value="has_files">With Available Files (12)</option>
              <option value="no_files">Awaiting Files (2)</option>
            </select>
          </div>
        </div>

        {/* Active Filter Count & Reset */}
        <div className="flex items-center justify-between text-xs font-mono text-text-muted pt-2 border-t border-border/50">
          <div>
            Showing <span className="font-bold text-text">{filteredAssignments.length}</span> of {assignments.length} assignments
          </div>
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="flex items-center gap-1 hover:text-text transition-colors"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-cyan-accent" />
            <span>Chronology: {sortOrder === 'asc' ? 'Earliest First' : 'Latest First'}</span>
          </button>
        </div>
      </Card>

      {/* Grid Mode */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssignments.map((assignment) => {
            const hasFiles = assignment.files && assignment.files.length > 0;
            const exts = getFileExtensions(assignment.files);

            return (
              <Card
                key={assignment.id}
                className="hover:border-emerald-accent/50 transition-all flex flex-col justify-between p-6 space-y-5"
              >
                <div className="space-y-4">
                  {/* Top Bar: Assignment ID + Portal Date */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-emerald-accent px-2.5 py-1 rounded-md bg-emerald-accent/10 border border-emerald-accent/20">
                      {assignment.id}
                    </span>
                    <span className="text-xs font-mono text-text-muted flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-cyan-accent" />
                      {assignment.portalActivityDate}
                    </span>
                  </div>

                  {/* Title & Portal Raw String */}
                  <div className="space-y-1.5">
                    <h3 className="font-bold text-base text-text leading-snug">
                      {assignment.displayTitle}
                    </h3>
                    <p className="text-xs font-mono text-text-muted line-clamp-1">
                      Portal: {assignment.portalTitle}
                    </p>
                  </div>

                  {/* Category Badge & Formats */}
                  <div className="space-y-2">
                    <StatusBadge type="category" value={assignment.category} />

                    <div className="flex items-center gap-1.5 flex-wrap pt-1">
                      {hasFiles ? (
                        <>
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface-raised border border-border text-emerald-accent font-semibold">
                            {assignment.files.length} file{assignment.files.length !== 1 ? 's' : ''}
                          </span>
                          {exts.map((ext) => (
                            <span
                              key={ext}
                              className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-surface-raised border border-border/80 text-text-muted"
                            >
                              {ext}
                            </span>
                          ))}
                        </>
                      ) : (
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-accent/10 border border-amber-accent/30 text-amber-accent flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          Files not available yet
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Actions: View Assignment & Download All */}
                <div className="border-t border-border pt-4 flex items-center justify-between gap-2">
                  <Link href={`/assignments/${assignment.id}`} className="flex-1">
                    <Button size="sm" variant="default" className="w-full gap-1.5 justify-center text-xs">
                      <span>View Assignment</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>

                  {hasFiles && (
                    <a
                      href={`/api/download/${assignment.id}`}
                      download
                      className="p-2 rounded-lg border border-border hover:border-emerald-accent/50 text-text-muted hover:text-emerald-accent hover:bg-surface-raised transition-colors shrink-0"
                      title="Download Assignment Files (ZIP)"
                      aria-label={`Download ${assignment.id} files as ZIP`}
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Table Mode */}
      {viewMode === 'table' && (
        <div className="border border-border rounded-xl bg-surface overflow-x-auto shadow-md">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-raised font-mono text-xs text-text-muted">
                <th className="p-4">ID</th>
                <th className="p-4">Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Date</th>
                <th className="p-4">Files</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border font-sans">
              {filteredAssignments.map((assignment) => {
                const hasFiles = assignment.files && assignment.files.length > 0;
                const exts = getFileExtensions(assignment.files);

                return (
                  <tr key={assignment.id} className="hover:bg-surface-raised/50 transition-colors">
                    <td className="p-4 font-mono text-xs font-bold text-emerald-accent">
                      {assignment.id}
                    </td>
                    <td className="p-4 max-w-sm">
                      <div className="font-semibold text-text">{assignment.displayTitle}</div>
                      <div className="text-xs text-text-muted font-mono truncate">
                        {assignment.portalTitle}
                      </div>
                    </td>
                    <td className="p-4">
                      <StatusBadge type="category" value={assignment.category} />
                    </td>
                    <td className="p-4 font-mono text-xs text-text-muted">
                      {assignment.portalActivityDate}
                    </td>
                    <td className="p-4">
                      {hasFiles ? (
                        <div className="flex items-center gap-1.5 flex-wrap font-mono text-xs text-emerald-accent">
                          <span>{assignment.files.length} file{assignment.files.length !== 1 ? 's' : ''}</span>
                          <span className="text-[10px] text-text-muted">({exts.join(', ')})</span>
                        </div>
                      ) : (
                        <span className="text-xs font-mono text-amber-accent">
                          Not available
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <Link href={`/assignments/${assignment.id}`}>
                          <Button size="sm" variant="outline" className="text-xs">
                            View
                          </Button>
                        </Link>
                        {hasFiles && (
                          <a
                            href={`/api/download/${assignment.id}`}
                            download
                            className="p-2 rounded-lg border border-border hover:text-emerald-accent hover:border-emerald-accent transition-colors"
                            title="Download ZIP"
                            aria-label={`Download ${assignment.id} ZIP`}
                          >
                            <Download className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
