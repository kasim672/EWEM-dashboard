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
} from 'lucide-react';
import { useStorage } from '@/lib/storage/StorageContext';
import { Card, Button, StatusBadge } from '@/components/ui/primitives';
import { AssignmentCategory, WorkStatus } from '@/types/domain';

export default function AssignmentLibraryPage() {
  const { assignments, isLoaded } = useStorage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-sm font-mono text-text-muted">Loading assignments...</div>
      </div>
    );
  }

  // Filter and sort
  const filteredAssignments = assignments
    .filter((a) => {
      const matchesSearch =
        a.displayTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.portalTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || a.category === selectedCategory;
      const matchesStatus =
        selectedStatus === 'all' || a.workStatus === selectedStatus;
      return matchesSearch && matchesCategory && matchesStatus;
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

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text">
            Assignment Library
          </h1>
          <p className="text-sm text-text-muted mt-1">
            Browse, search, and audit all 14 EW/EM assignments with dual-truth statuses.
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Search title, ID, keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-surface-raised border border-border rounded-lg text-sm text-text placeholder-text-muted focus:outline-none focus:border-emerald-accent"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 bg-surface-raised border border-border rounded-lg text-sm text-text focus:outline-none focus:border-emerald-accent"
            >
              <option value="all">All Categories ({assignments.length})</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Work Status Filter */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 bg-surface-raised border border-border rounded-lg text-sm text-text focus:outline-none focus:border-emerald-accent"
            >
              <option value="all">All Work Statuses</option>
              <option value="not_reviewed">Not Reviewed</option>
              <option value="planned">Planned</option>
              <option value="in_progress">In Progress</option>
              <option value="ready_for_review">Ready for Review</option>
              <option value="verified_complete">Verified Complete</option>
            </select>
          </div>

          {/* Sort Order */}
          <Button
            variant="outline"
            className="w-full justify-between"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          >
            <span className="flex items-center gap-2 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5" />
              Date: {sortOrder === 'asc' ? 'Oldest First' : 'Newest First'}
            </span>
            <span className="font-mono text-xs">{filteredAssignments.length} found</span>
          </Button>
        </div>
      </Card>

      {/* Grid Mode */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAssignments.map((assignment) => (
            <Card
              key={assignment.id}
              className="hover:border-emerald-accent/50 transition-all flex flex-col justify-between p-5 space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-emerald-accent px-2 py-0.5 rounded bg-emerald-accent/10 border border-emerald-accent/20">
                    {assignment.id}
                  </span>
                  <span className="text-xs font-mono text-text-muted">
                    {assignment.portalActivityDate}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-bold text-base text-text leading-snug">
                    {assignment.displayTitle}
                  </h3>
                  <p className="text-xs font-mono text-text-muted line-clamp-2">
                    Raw: {assignment.portalTitle}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  <StatusBadge type="category" value={assignment.category} />
                  <StatusBadge type="portal" value={assignment.portalBadgeObserved} />
                </div>
              </div>

              <div className="border-t border-border pt-4 flex items-center justify-between">
                <StatusBadge type="work" value={assignment.workStatus} />
                <Link href={`/assignments/${assignment.id}`}>
                  <Button size="sm" variant="ghost" className="gap-1.5 text-xs">
                    <span>Open Workbench</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Table Mode */}
      {viewMode === 'table' && (
        <div className="border border-border rounded-xl bg-surface overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-raised font-mono text-xs text-text-muted">
                <th className="p-3.5">ID</th>
                <th className="p-3.5">Title</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Portal Date</th>
                <th className="p-3.5">Observed Badge</th>
                <th className="p-3.5">Work Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border font-sans">
              {filteredAssignments.map((assignment) => (
                <tr key={assignment.id} className="hover:bg-surface-raised/50 transition-colors">
                  <td className="p-3.5 font-mono text-xs font-bold text-emerald-accent">
                    {assignment.id}
                  </td>
                  <td className="p-3.5 max-w-xs">
                    <div className="font-semibold text-text">{assignment.displayTitle}</div>
                    <div className="text-xs text-text-muted font-mono truncate">
                      {assignment.portalTitle}
                    </div>
                  </td>
                  <td className="p-3.5">
                    <StatusBadge type="category" value={assignment.category} />
                  </td>
                  <td className="p-3.5 font-mono text-xs text-text-muted">
                    {assignment.portalActivityDate}
                  </td>
                  <td className="p-3.5">
                    <StatusBadge type="portal" value={assignment.portalBadgeObserved} />
                  </td>
                  <td className="p-3.5">
                    <StatusBadge type="work" value={assignment.workStatus} />
                  </td>
                  <td className="p-3.5 text-right">
                    <Link href={`/assignments/${assignment.id}`}>
                      <Button size="sm" variant="outline">
                        Workbench
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filteredAssignments.length === 0 && (
        <Card className="p-12 text-center space-y-3">
          <p className="text-text-muted text-sm">
            No assignments match the selected filters or search query.
          </p>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedStatus('all');
            }}
          >
            Clear all filters
          </Button>
        </Card>
      )}
    </div>
  );
}
