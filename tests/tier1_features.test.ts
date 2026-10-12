import { describe, it, expect, beforeEach, vi } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import rawSeed from '../data/assignments.seed.json';
import { INITIAL_ASSIGNMENTS, INITIAL_PROFILE, INITIAL_ANALYTICS } from '@/lib/storage/seedData';
import { StorageProvider } from '@/lib/storage/StorageContext';
import CommandCenterPage from '@/app/page';
import AssignmentLibraryPage from '@/app/assignments/page';
import AssignmentWorkbenchPage from '@/app/assignments/[id]/page';
import AnalyticsLabPage from '@/app/analytics/page';
import CourseTimelinePage from '@/app/timeline/page';
import EvidenceVaultPage from '@/app/library/page';
import FacultyShowcasePage from '@/app/showcase/page';
import PresentationModePage from '@/app/presentation/page';
import SettingsPortabilityPage from '@/app/settings/page';

// Mock next/navigation
let mockParams = { id: 'EW-01' };
let mockPathname = '/';

vi.mock('next/navigation', () => ({
  useParams: () => mockParams,
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => mockPathname,
}));

// Helper to render inside StorageProvider without JSX syntax in pure .ts files
function renderInProvider(component: React.ComponentType) {
  return render(
    React.createElement(StorageProvider, null, React.createElement(component, null))
  );
}

describe('Tier 1: Canonical Feature & Contract Coverage', () => {
  beforeEach(() => {
    localStorage.clear();
    mockParams = { id: 'EW-01' };
    mockPathname = '/';
  });

  describe('1. Authoritative 14-Assignment Seed Ingestion', () => {
    it('ingests exactly 14 records with contiguous IDs EW-01 through EW-14', () => {
      expect(rawSeed.assignments).toHaveLength(14);
      expect(INITIAL_ASSIGNMENTS).toHaveLength(14);

      const ids = INITIAL_ASSIGNMENTS.map((a) => a.id);
      const expectedIds = Array.from({ length: 14 }, (_, i) => `EW-${String(i + 1).padStart(2, '0')}`);
      expect(ids).toEqual(expectedIds);
    });

    it('preserves exact verbatim portal titles for all 14 assignments', () => {
      const expectedPortalTitles: Record<string, string> = {
        'EW-01': 'Toxic Chemicals_Any 5',
        'EW-02': 'Assignment 2_Submit the Class Activity_Map of e waste',
        'EW-03': 'Assignment 3_Elemental Recovery Process Update',
        'EW-04': 'Assignment Zero_Check AAP',
        'EW-05': 'Assignment 1_E waste Traker',
        'EW-06': 'E waste India Vs World Data Task_Class Activity',
        'EW-07': 'Carbon Footprint Task_Excel activity Task',
        'EW-08': 'TE CMPN C PPT_State tracker submission Folder',
        'EW-09': 'E Waste Recovery Process_Modification for Design Patent',
        'EW-10': 'Indian Companies Following E waste Rules_Comparative Study',
        'EW-11': 'Novel Idea_E waste_Pitch Deck Submit Folder_CMPN C',
        'EW-12': 'Campaign For E Waste in Campus_Class Activity',
        'EW-13': 'LEED Certification of Green Buildings in India',
        'EW-14': 'Case Studies E waste',
      };

      INITIAL_ASSIGNMENTS.forEach((a) => {
        expect(a.portalTitle).toBe(expectedPortalTitles[a.id]);
        expect(a.displayTitle).toBeDefined();
        expect(a.displayTitle.length).toBeGreaterThan(0);
      });
    });

    it('formats portal activity dates as valid YYYY-MM-DD timestamps in 2026', () => {
      INITIAL_ASSIGNMENTS.forEach((a) => {
        expect(a.portalActivityDate).toMatch(/^2026-(07|08|09|10)-\d{2}$/);
      });
    });
  });

  describe('2. Four-Dimension Truth Model Contracts', () => {
    it('records portalBadgeObserved = false for EW-01 and true for EW-02..EW-14', () => {
      const ew01 = INITIAL_ASSIGNMENTS.find((a) => a.id === 'EW-01');
      expect(ew01).toBeDefined();
      expect(ew01?.portalBadgeObserved).toBe(false);
      expect(ew01?.portalBadgeText).toBeNull();

      const remaining13 = INITIAL_ASSIGNMENTS.filter((a) => a.id !== 'EW-01');
      expect(remaining13).toHaveLength(13);
      remaining13.forEach((a) => {
        expect(a.portalBadgeObserved).toBe(true);
        expect(a.portalBadgeText).toBe('Turned in');
      });
    });

    it('initializes actualSubmissionStatus to unverified for all 14 assignments', () => {
      INITIAL_ASSIGNMENTS.forEach((a) => {
        expect(a.actualSubmissionStatus).toBe('unverified');
      });
    });

    it('initializes workStatus to not_reviewed for all 14 assignments', () => {
      INITIAL_ASSIGNMENTS.forEach((a) => {
        expect(a.workStatus).toBe('not_reviewed');
      });
    });

    it('initializes qualityStatus to not_assessed for all 14 assignments', () => {
      INITIAL_ASSIGNMENTS.forEach((a) => {
        expect(a.qualityStatus).toBe('not_assessed');
      });
    });

    it('maintains strict zero-fabrication: null due dates, null grades, empty files, unpublished', () => {
      INITIAL_ASSIGNMENTS.forEach((a) => {
        expect(a.dueDate).toBeNull();
        expect(a.grade).toBeNull();
        expect(a.published).toBe(false);
        expect(a.files).toEqual([]);
        expect(a.tasks).toEqual([]);
      });
    });
  });

  describe('3. Category Distribution Compliance', () => {
    it('matches exact distribution: 4 Data, 3 Technical, 4 Research, 2 Innovation, 1 Admin', () => {
      const counts: Record<string, number> = {
        'Data Analytics & Tracking': 0,
        'Technical & Recovery Processes': 0,
        'Research, Policy & Sustainability': 0,
        'Innovation & Awareness': 0,
        'Assessment / Administrative': 0,
      };

      INITIAL_ASSIGNMENTS.forEach((a) => {
        counts[a.category] = (counts[a.category] || 0) + 1;
      });

      expect(counts['Data Analytics & Tracking']).toBe(4);
      expect(counts['Technical & Recovery Processes']).toBe(3);
      expect(counts['Research, Policy & Sustainability']).toBe(4);
      expect(counts['Innovation & Awareness']).toBe(2);
      expect(counts['Assessment / Administrative']).toBe(1);
      expect(Object.values(counts).reduce((a, b) => a + b, 0)).toBe(14);
    });
  });

  describe('4. Route Definitions & Page Rendering', () => {
    it('Route 1: renders Command Center (/) with truthful counters and review queue', () => {
      renderInProvider(CommandCenterPage);

      expect(screen.getByText('E-Waste Intelligence & Management Studio')).toBeDefined();
      expect(screen.getByText('Immediate Review Queue')).toBeDefined();
      expect(screen.getByText('Coursework Register')).toBeDefined();

      expect(screen.getByText('Data Analytics & Tracking')).toBeDefined();
      expect(screen.getByText('Technical & Recovery')).toBeDefined();
      expect(screen.getByText('Research & Sustainability')).toBeDefined();
      expect(screen.getByText(/Category Distribution: 4 Data \/ 3 Technical \/ 4 Research/i)).toBeDefined();
    });

    it('Route 2: renders Assignment Library (/assignments) with filter and search inputs', () => {
      renderInProvider(AssignmentLibraryPage);

      expect(screen.getByText('Assignment Library')).toBeDefined();
      expect(screen.getByPlaceholderText('Search title, ID, keyword...')).toBeDefined();
      expect(screen.getByText(/All Categories/i)).toBeDefined();
      expect(screen.getByText('All Work Statuses')).toBeDefined();
    });

    it('Route 3: renders Assignment Workbench (/assignments/[id]) for valid ID EW-01', () => {
      mockParams = { id: 'EW-01' };
      renderInProvider(AssignmentWorkbenchPage);

      expect(screen.getByText('Toxic Chemicals — Any Five')).toBeDefined();
      expect(screen.getByText('Toxic Chemicals_Any 5')).toBeDefined();
      expect(screen.getByText('Research, Policy & Sustainability')).toBeDefined();
      expect(screen.getByText('Dual-Truth Verification Controls')).toBeDefined();
    });

    it('Route 3 fallback: renders Assignment Not Found card for non-existent ID', () => {
      mockParams = { id: 'EW-99' };
      renderInProvider(AssignmentWorkbenchPage);

      expect(screen.getByText('Assignment Not Found')).toBeDefined();
      expect(screen.getByText(/No record found for ID: EW-99/)).toBeDefined();
    });

    it('Route 4: renders Analytics Lab (/analytics) in awaiting-data truthful state', () => {
      renderInProvider(AnalyticsLabPage);

      expect(screen.getByText('Research & Analytics Lab')).toBeDefined();
      expect(screen.getAllByText('Awaiting Source Dataset Upload')).toHaveLength(5);

      expect(INITIAL_ANALYTICS).toHaveLength(5);
      INITIAL_ANALYTICS.forEach((m) => {
        expect(m.hasData).toBe(false);
        expect(m.provenance).toBe('unverified');
        expect(screen.getByText(m.id)).toBeDefined();
      });
    });

    it('Route 5: renders Course Timeline (/timeline) with 14 sorted entries', () => {
      renderInProvider(CourseTimelinePage);

      expect(screen.getByText('Course Chronology & Milestones')).toBeDefined();
      expect(screen.getByText(/Integrity Note:/)).toBeDefined();
      expect(screen.getByText('EW-01')).toBeDefined();
      expect(screen.getByText('EW-14')).toBeDefined();
    });

    it('Route 6: renders Evidence Vault (/library) with upload controls and size policy', () => {
      renderInProvider(EvidenceVaultPage);

      expect(screen.getByText('Secure Evidence Vault')).toBeDefined();
      expect(screen.getByText('Attach Coursework Evidence File')).toBeDefined();
      expect(screen.getByText('Select File (PDF, Image, Text, CSV)')).toBeDefined();
    });

    it('Route 7: renders Faculty Showcase (/showcase) with read-only gating', () => {
      renderInProvider(FacultyShowcasePage);

      expect(screen.getByText('Faculty Showcase Portfolio')).toBeDefined();
      expect(screen.getByText('Faculty Read-Only Gate Active')).toBeDefined();
      expect(screen.getByText('No Coursework Published Yet')).toBeDefined();
    });

    it('Route 8: renders Faculty Presentation Mode (/presentation) with slide navigation', () => {
      renderInProvider(PresentationModePage);

      expect(screen.getByText('RECLAIM — E-Waste Intelligence Studio')).toBeDefined();
      expect(screen.getByText(/Welcome, Faculty Committee/)).toBeDefined();
    });

    it('Route 9: renders Settings & Data Management (/settings) with profile and backup controls', () => {
      renderInProvider(SettingsPortabilityPage);

      expect(screen.getByText('Settings & Data Portability')).toBeDefined();
      expect(screen.getByText('Researcher & Course Profile')).toBeDefined();
      expect(screen.getByText('Export Verified JSON Backup')).toBeDefined();
      expect(screen.getByText('Import JSON Backup')).toBeDefined();
    });
  });

  describe('5. Storage & Persistence Contracts', () => {
    it('initializes default student profile matching department standards', () => {
      expect(INITIAL_PROFILE.studentName).toBe('Student Researcher');
      expect(INITIAL_PROFILE.courseName).toBe('Electronic Waste & Environmental Management (EW/EM)');
      expect(INITIAL_PROFILE.institution).toBe('Department of Computer Engineering');
    });

    it('provides all 5 core analytics metrics unverified pending empirical data', () => {
      const metricIds = INITIAL_ANALYTICS.map((m) => m.id);
      expect(metricIds).toEqual(['AN-01', 'AN-02', 'AN-03', 'AN-04', 'AN-05']);
      INITIAL_ANALYTICS.forEach((m) => {
        expect(m.hasData).toBe(false);
        expect(m.method).toContain('Awaiting');
      });
    });
  });
});
