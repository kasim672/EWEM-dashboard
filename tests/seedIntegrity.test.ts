import { describe, it, expect } from 'vitest';
import rawSeed from '../data/assignments.seed.json';

describe('Authoritative 14-Assignment Seed Integrity', () => {
  it('contains exactly 14 assignment records', () => {
    expect(rawSeed.assignments).toHaveLength(14);
  });

  it('contains sequential IDs from EW-01 through EW-14', () => {
    const ids = rawSeed.assignments.map((a: any) => a.id);
    const expectedIds = Array.from({ length: 14 }, (_, i) => `EW-${String(i + 1).padStart(2, '0')}`);
    expect(ids).toEqual(expectedIds);
  });

  it('observes green badges on exactly 13 assignments (EW-02 to EW-14, false for EW-01)', () => {
    const ew01 = rawSeed.assignments.find((a: any) => a.id === 'EW-01');
    expect(ew01).toBeDefined();
    expect(ew01!.portalBadgeObserved).toBe(false);
    expect(ew01!.portalBadgeText).toBeNull();

    const others = rawSeed.assignments.filter((a: any) => a.id !== 'EW-01');
    expect(others).toHaveLength(13);
    others.forEach((a: any) => {
      expect(a.portalBadgeObserved).toBe(true);
      expect(a.portalBadgeText).toBe('Turned in');
    });
  });

  it('initializes actual submission and review states to unverified/not_reviewed', () => {
    rawSeed.assignments.forEach((a: any) => {
      expect(a.actualSubmissionStatus).toBe('unverified');
      expect(a.workStatus).toBe('not_reviewed');
      expect(a.qualityStatus).toBe('not_assessed');
      expect(a.grade).toBeNull();
      expect(a.dueDate).toBeNull();
      expect(a.published).toBe(false);
    });
  });

  it('matches exact category distribution: 4 Data, 3 Technical, 4 Research, 2 Innovation, 1 Admin', () => {
    const counts: Record<string, number> = {};
    rawSeed.assignments.forEach((a: any) => {
      counts[a.category] = (counts[a.category] || 0) + 1;
    });

    expect(counts['Data Analytics & Tracking']).toBe(4);
    expect(counts['Technical & Recovery Processes']).toBe(3);
    expect(counts['Research, Policy & Sustainability']).toBe(4);
    expect(counts['Innovation & Awareness']).toBe(2);
    expect(counts['Assessment / Administrative']).toBe(1);
  });
});
