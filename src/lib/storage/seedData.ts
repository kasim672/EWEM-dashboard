import { Assignment, StudentProfile, AnalyticsMetric } from '@/types/domain';
import rawSeed from '@/data/assignments.seed.json';

interface SeedItem {
  id: string;
  portalTitle: string;
  displayTitle: string;
  portalActivityDate: string;
  category: string;
  dueDate: string | null;
  portalBadgeObserved: boolean;
  portalBadgeText: string | null;
  actualSubmissionStatus: string;
  workStatus: string;
  qualityStatus: string;
  grade: number | null;
  published: boolean;
  tasks?: any[];
  files?: any[];
  sources?: any[];
  notes?: string;
}

export const INITIAL_ASSIGNMENTS: Assignment[] = (rawSeed.assignments as SeedItem[]).map((item) => ({
  id: item.id,
  portalTitle: item.portalTitle,
  displayTitle: item.displayTitle,
  portalActivityDate: item.portalActivityDate,
  category: item.category as Assignment['category'],
  dueDate: item.dueDate,
  portalBadgeObserved: item.portalBadgeObserved,
  portalBadgeText: item.portalBadgeText as 'Turned in' | null,
  actualSubmissionStatus: item.actualSubmissionStatus as Assignment['actualSubmissionStatus'],
  workStatus: item.workStatus as Assignment['workStatus'],
  qualityStatus: item.qualityStatus as Assignment['qualityStatus'],
  grade: item.grade,
  published: item.published,
  tasks: item.tasks || [],
  files: (item.files as any) || [],
  sources: item.sources || [],
  notes: item.notes || '',
  requirements: '',
  lastModified: new Date().toISOString(),
}));

export const INITIAL_PROFILE: StudentProfile = {
  studentName: 'Student Researcher',
  studentId: 'EW-EM-2026',
  courseName: 'Electronic Waste & Environmental Management (EW/EM)',
  institution: 'Department of Computer Engineering',
  academicYear: '2026–2027',
};

export const INITIAL_ANALYTICS: AnalyticsMetric[] = [
  {
    id: 'AN-01',
    title: 'E-Waste Generation: India vs Global Benchmark',
    category: 'Data Analytics & Tracking',
    scope: 'Comparative Global Assessment',
    metric: 'Annual E-Waste Per Capita & Total Mass',
    unit: 'Kilograms per capita / Million Metric Tons (Mt)',
    period: '2024–2026',
    source: 'Global E-Waste Monitor / CPCB India (Pending Local Worksheet Upload)',
    method: 'Awaiting raw dataset upload to compute verified comparison.',
    provenance: 'unverified',
    hasData: false,
  },
  {
    id: 'AN-02',
    title: 'State-Wise Collection & Dismantler Capacity',
    category: 'Data Analytics & Tracking',
    scope: 'National State-by-State Assessment',
    metric: 'Authorized Recyclers & Processing Volume',
    unit: 'Metric Tons per Annum (MTA)',
    period: '2025–2026',
    source: 'State Pollution Control Boards / State Tracker PPT (EW-08)',
    method: 'Awaiting state tracker dataset to render spatial distribution.',
    provenance: 'unverified',
    hasData: false,
  },
  {
    id: 'AN-03',
    title: 'Carbon Footprint & Lifecycle Assessment',
    category: 'Data Analytics & Tracking',
    scope: 'Device Lifecycle Emissions',
    metric: 'CO2 Equivalent Saved through Recovery',
    unit: 'kg CO2e / unit recovered',
    period: '2026 Activity',
    source: 'Carbon Footprint Excel Task (EW-07)',
    method: 'Awaiting Excel workbook upload to parse emission calculations.',
    provenance: 'unverified',
    hasData: false,
  },
  {
    id: 'AN-04',
    title: 'Hazardous Chemical Substance Distribution',
    category: 'Research, Policy & Sustainability',
    scope: 'Substance Toxicity Classification',
    metric: 'Hazard Index & Presence in Circuitry (Lead, Mercury, Cadmium, PBDE, BFR)',
    unit: 'PPM / Toxicity Category',
    period: 'July 2026',
    source: 'Toxic Chemicals Research Brief (EW-01)',
    method: 'Awaiting verified 5-chemical substance data sheet.',
    provenance: 'unverified',
    hasData: false,
  },
  {
    id: 'AN-05',
    title: 'Corporate Compliance: Indian E-Waste Rules',
    category: 'Research, Policy & Sustainability',
    scope: 'E-Waste Management Rules EPR Target Audit',
    metric: 'EPR Target Fulfillment Percentage',
    unit: 'Percentage (%) of EPR target achieved',
    period: '2025–2026',
    source: 'Comparative Company Study (EW-10)',
    method: 'Awaiting company comparison matrix to graph compliance rates.',
    provenance: 'unverified',
    hasData: false,
  },
];
