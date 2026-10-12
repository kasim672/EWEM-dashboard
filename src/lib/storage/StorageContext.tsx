'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Assignment, StudentProfile, AnalyticsMetric, ReclaimBackupData, FileRecord } from '@/types/domain';
import { INITIAL_ASSIGNMENTS, INITIAL_PROFILE, INITIAL_ANALYTICS } from './seedData';

interface StorageContextType {
  assignments: Assignment[];
  profile: StudentProfile;
  analytics: AnalyticsMetric[];
  files: FileRecord[];
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  updateAssignment: (id: string, updates: Partial<Assignment>) => void;
  updateProfile: (profile: StudentProfile) => void;
  addFile: (file: FileRecord) => void;
  deleteFile: (id: string) => void;
  exportBackup: () => string;
  importBackup: (jsonString: string) => { success: boolean; message: string };
  resetToSeed: () => void;
  isLoaded: boolean;
}

const STORAGE_KEYS = {
  ASSIGNMENTS: 'reclaim_assignments_v1',
  PROFILE: 'reclaim_profile_v1',
  ANALYTICS: 'reclaim_analytics_v1',
  FILES: 'reclaim_files_v1',
  THEME: 'reclaim_theme_v1',
};

const StorageContext = createContext<StorageContextType | undefined>(undefined);

export function StorageProvider({ children }: { children: React.ReactNode }) {
  const [assignments, setAssignments] = useState<Assignment[]>(INITIAL_ASSIGNMENTS);
  const [profile, setProfile] = useState<StudentProfile>(INITIAL_PROFILE);
  const [analytics, setAnalytics] = useState<AnalyticsMetric[]>(INITIAL_ANALYTICS);
  const [files, setFiles] = useState<FileRecord[]>([]);
  const [theme, setThemeState] = useState<'dark' | 'light'>('dark');
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const storedAssignments = localStorage.getItem(STORAGE_KEYS.ASSIGNMENTS);
      const storedProfile = localStorage.getItem(STORAGE_KEYS.PROFILE);
      const storedAnalytics = localStorage.getItem(STORAGE_KEYS.ANALYTICS);
      const storedFiles = localStorage.getItem(STORAGE_KEYS.FILES);
      const storedTheme = localStorage.getItem(STORAGE_KEYS.THEME) as 'dark' | 'light' | null;

      if (storedAssignments) {
        setAssignments(JSON.parse(storedAssignments));
      }
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      }
      if (storedAnalytics) {
        setAnalytics(JSON.parse(storedAnalytics));
      }
      if (storedFiles) {
        setFiles(JSON.parse(storedFiles));
      }
      if (storedTheme) {
        setThemeState(storedTheme);
        document.documentElement.classList.toggle('light', storedTheme === 'light');
      }
    } catch (e) {
      console.error('Failed to load local storage state:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const setTheme = (newTheme: 'dark' | 'light') => {
    setThemeState(newTheme);
    localStorage.setItem(STORAGE_KEYS.THEME, newTheme);
    document.documentElement.classList.toggle('light', newTheme === 'light');
  };

  const updateAssignment = (id: string, updates: Partial<Assignment>) => {
    setAssignments((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, ...updates, lastModified: new Date().toISOString() } : item
      );
      localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(updated));
      return updated;
    });
  };

  const updateProfile = (newProfile: StudentProfile) => {
    setProfile(newProfile);
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(newProfile));
  };

  const addFile = (file: FileRecord) => {
    setFiles((prev) => {
      const updated = [file, ...prev];
      localStorage.setItem(STORAGE_KEYS.FILES, JSON.stringify(updated));
      return updated;
    });
    // Associate with assignment
    updateAssignment(file.assignmentId, {
      files: [...(assignments.find((a) => a.id === file.assignmentId)?.files || []), file],
    });
  };

  const deleteFile = (id: string) => {
    setFiles((prev) => {
      const updated = prev.filter((f) => f.id !== id);
      localStorage.setItem(STORAGE_KEYS.FILES, JSON.stringify(updated));
      return updated;
    });
  };

  const exportBackup = (): string => {
    const backup: ReclaimBackupData = {
      version: 1,
      exportedAt: new Date().toISOString(),
      profile,
      assignments,
      analyticsMetrics: analytics,
    };
    return JSON.stringify(backup, null, 2);
  };

  const importBackup = (jsonString: string): { success: boolean; message: string } => {
    try {
      const data: ReclaimBackupData = JSON.parse(jsonString);
      if (!data.version || !Array.isArray(data.assignments)) {
        return { success: false, message: 'Invalid backup file format: missing required assignment array.' };
      }
      if (data.assignments.length !== 14) {
        return {
          success: false,
          message: `Backup integrity check failed: expected exactly 14 assignments, found ${data.assignments.length}.`,
        };
      }
      setAssignments(data.assignments);
      localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(data.assignments));
      if (data.profile) {
        setProfile(data.profile);
        localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(data.profile));
      }
      return { success: true, message: 'Backup imported successfully with all 14 assignments restored.' };
    } catch (e) {
      return { success: false, message: 'JSON parse error: file is corrupted or not a valid JSON document.' };
    }
  };

  const resetToSeed = () => {
    setAssignments(INITIAL_ASSIGNMENTS);
    setProfile(INITIAL_PROFILE);
    setAnalytics(INITIAL_ANALYTICS);
    setFiles([]);
    localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(INITIAL_ASSIGNMENTS));
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(INITIAL_PROFILE));
    localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(INITIAL_ANALYTICS));
    localStorage.removeItem(STORAGE_KEYS.FILES);
  };

  return (
    <StorageContext.Provider
      value={{
        assignments,
        profile,
        analytics,
        files,
        theme,
        setTheme,
        updateAssignment,
        updateProfile,
        addFile,
        deleteFile,
        exportBackup,
        importBackup,
        resetToSeed,
        isLoaded,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
}

export function useStorage() {
  const context = useContext(StorageContext);
  if (!context) {
    throw new Error('useStorage must be used within a StorageProvider');
  }
  return context;
}
