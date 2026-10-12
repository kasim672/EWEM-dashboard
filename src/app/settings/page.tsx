'use client';

import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  HardDrive,
  Download,
  Upload,
  RefreshCw,
  Sun,
  Moon,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { useStorage } from '@/lib/storage/StorageContext';
import { Card, Button } from '@/components/ui/primitives';

export default function SettingsPortabilityPage() {
  const {
    profile,
    updateProfile,
    theme,
    setTheme,
    exportBackup,
    importBackup,
    resetToSeed,
    isLoaded,
  } = useStorage();

  const [importStatus, setImportStatus] = useState<{
    success?: boolean;
    message?: string;
  } | null>(null);

  if (!isLoaded) {
    return <div className="p-8 text-center font-mono text-sm text-text-muted">Loading settings...</div>;
  }

  const handleDownloadBackup = () => {
    const jsonStr = exportBackup();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reclaim-magnum-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImportStatus(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = importBackup(content);
      setImportStatus(res);
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Header */}
      <div className="border border-border rounded-xl bg-surface p-6 space-y-2">
        <div className="flex items-center gap-2">
          <SettingsIcon className="w-5 h-5 text-emerald-accent" />
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text">
            Settings & Data Portability
          </h1>
        </div>
        <p className="text-sm text-text-muted max-w-3xl leading-relaxed">
          Manage local display preferences, researcher metadata, schema-validated JSON backup portability, and client-side device storage.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visual Appearance & Theme */}
        <Card className="p-6 space-y-4">
          <h2 className="text-base font-bold text-text flex items-center gap-2">
            <Sun className="w-4 h-4 text-amber-accent" />
            Theme & Visual Direction
          </h2>
          <p className="text-xs text-text-muted leading-relaxed">
            RECLAIM features an editorial dark graphite aesthetic with high-contrast emerald and cyan cues, as well as an accessible daytime light mode.
          </p>

          <div className="flex gap-3 pt-2">
            <Button
              variant={theme === 'dark' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTheme('dark')}
              className="gap-2 flex-1"
            >
              <Moon className="w-4 h-4" />
              <span>Dark Graphite</span>
            </Button>
            <Button
              variant={theme === 'light' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTheme('light')}
              className="gap-2 flex-1"
            >
              <Sun className="w-4 h-4" />
              <span>Light Botanical</span>
            </Button>
          </div>
        </Card>

        {/* Student Profile Placeholders */}
        <Card className="p-6 space-y-4">
          <h2 className="text-base font-bold text-text flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-cyan-accent" />
            Researcher & Course Profile
          </h2>
          <div className="space-y-3 text-xs">
            <div>
              <label className="text-text-muted font-medium block mb-1">Student / Researcher Name</label>
              <input
                type="text"
                value={profile.studentName}
                onChange={(e) => updateProfile({ ...profile, studentName: e.target.value })}
                className="w-full p-2 bg-surface-raised border border-border rounded-lg text-text focus:border-emerald-accent"
              />
            </div>
            <div>
              <label className="text-text-muted font-medium block mb-1">Course Name</label>
              <input
                type="text"
                value={profile.courseName}
                onChange={(e) => updateProfile({ ...profile, courseName: e.target.value })}
                className="w-full p-2 bg-surface-raised border border-border rounded-lg text-text focus:border-emerald-accent"
              />
            </div>
          </div>
        </Card>

        {/* Data Portability (Export & Import) */}
        <Card className="p-6 space-y-4 lg:col-span-2">
          <h2 className="text-base font-bold text-text flex items-center gap-2">
            <Download className="w-4 h-4 text-emerald-accent" />
            JSON Backup Export & Import
          </h2>
          <p className="text-xs text-text-muted leading-relaxed">
            All 14 assignments, review statuses, notes, and checklist items can be exported to a single schema-compliant JSON file. You can import this backup on any device to restore your workspace.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button size="sm" onClick={handleDownloadBackup} className="gap-2">
              <Download className="w-4 h-4" />
              <span>Export Verified JSON Backup</span>
            </Button>

            <label className="cursor-pointer">
              <span className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg border border-border bg-surface text-text hover:bg-surface-raised">
                <Upload className="w-4 h-4 text-cyan-accent" />
                <span>Import JSON Backup</span>
              </span>
              <input
                type="file"
                accept=".json"
                onChange={handleFileImport}
                className="hidden"
              />
            </label>

            <Button
              size="sm"
              variant="danger"
              onClick={() => {
                if (confirm('Reset workspace to original 14-assignment seed state? All unexported edits will be replaced.')) {
                  resetToSeed();
                }
              }}
              className="gap-2 text-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset to Factory Seed</span>
            </Button>
          </div>

          {importStatus && (
            <div
              className={`p-3 rounded-lg border text-xs flex items-center gap-2 ${
                importStatus.success
                  ? 'bg-emerald-accent/10 border-emerald-accent/30 text-emerald-accent'
                  : 'bg-danger-accent/10 border-danger-accent/30 text-danger-accent'
              }`}
            >
              {importStatus.success ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <AlertTriangle className="w-4 h-4" />
              )}
              <span>{importStatus.message}</span>
            </div>
          )}
        </Card>

        {/* Local-First Storage Transparency Callout */}
        <div className="p-4 rounded-xl border border-border bg-surface text-xs space-y-2 text-text-muted lg:col-span-2">
          <div className="flex items-center gap-2 font-semibold text-text">
            <ShieldAlert className="w-4 h-4 text-cyan-accent" />
            <span>Local Storage Transparency & Device Privacy</span>
          </div>
          <p className="leading-relaxed text-[11px]">
            RECLAIM operates with local-first browser storage (`localStorage`). Changes made in this session are stored on this device only. Clearing browser storage will reset data unless an exported JSON backup is preserved.
          </p>
        </div>
      </div>
    </div>
  );
}
