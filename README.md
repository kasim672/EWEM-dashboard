# RECLAIM — E-Waste Intelligence & Management Studio

> **RECLAIM MAGNUM** is an original, research-grade web application built to manage 14 Electronic Waste & Environmental Management (EW/EM) coursework assignments with uncompromised integrity, dual-truth status verification, and faculty presentation capability.

---

## Key Differentiators & Highlights

1. **Dual-Truth Status Architecture**:
   - Explicit separation between observed portal screenshots (13 green "Turned in" badges) and independently verified student submissions (0 verified initially).
   - Zero fabricated grades, pseudo-metrics, or artificial progress numbers.
2. **Authoritative 14-Assignment Seed**:
   - Ingests the exact 14 coursework assignments spanning July to October 2026 from `data/assignments.seed.json`.
   - Exact category breakdown: 4 Data Analytics, 3 Technical Recovery, 4 Research & Sustainability, 2 Innovation & Awareness, 1 Assessment/Administrative.
3. **Comprehensive 9-Route Experience**:
   - `/` — **Command Center**: Real-time KPI summaries, immediate action queue, category distribution.
   - `/assignments` — **Assignment Library**: Search, category filters, dual-truth status filters, and table/grid view toggle.
   - `/assignments/[id]` — **Assignment Workbench**: Deep coursework workbench with checklist tasks, notes, file linkages, and showcase toggle.
   - `/analytics` — **Research & Analytics Lab**: Modular environmental research lab with honest &ldquo;Awaiting Source Dataset&rdquo; states and provenance declarations.
   - `/timeline` — **Course Chronology**: Full July–October 2026 chronology with recorded activity dates and separate manual deadlines.
   - `/library` — **Secure Evidence Vault**: Assignment-linked upload interface with client-side sandbox validation and MIME detection.
   - `/showcase` — **Faculty Showcase**: Curated, read-only portfolio strictly displaying approved, published coursework items.
   - `/presentation` — **Faculty Presentation Mode**: Full-screen, projector-scale presenter view with keyboard navigation (`←`/`→`/`Esc`).
   - `/settings` — **Settings & Data Portability**: Theme switcher (Dark Graphite / Light Botanical), profile metadata, and schema-validated JSON backup export/import.
4. **Local-First Privacy & Data Portability**:
   - Operates with client-side local storage without requiring external cloud databases or paid infrastructure.
   - Complete JSON backup export and import round-trip with schema validation.

---

## Quickstart & Launch Guide

### 1. Requirements
- Node.js `v18+` (Tested on `v24.21.0`)
- npm `v10+` (Tested on `11.19.0`)

### 2. Installation
```bash
npm install
```

### 3. Verification Commands
```bash
# Strict TypeScript Typecheck (0 errors)
npm run typecheck

# Unit & Seed Integrity Tests (5/5 passed)
npm run test

# Production Build (11 static/dynamic pages)
npm run build
```

### 4. Run the Studio
```bash
# Start local development server
npm run dev

# Or run optimized production server
npm run build && npm run start
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Documentation
- [Capability Inventory & Census](file:///home/anonymous/EWEM-dashboard/RECLAIM/docs/CAPABILITIES.md)
- [Agent Execution Ledger](file:///home/anonymous/EWEM-dashboard/RECLAIM/docs/AGENT_LEDGER.md)
- [Architecture Decisions Record (ADR)](file:///home/anonymous/EWEM-dashboard/RECLAIM/docs/DECISIONS.md)
- [Comprehensive Test & Quality Report](file:///home/anonymous/EWEM-dashboard/RECLAIM/docs/TEST_REPORT.md)
- [Privacy, Threat Model & Limitations](file:///home/anonymous/EWEM-dashboard/RECLAIM/docs/PRIVACY_AND_LIMITATIONS.md)
- [Implementation Plan](file:///home/anonymous/EWEM-dashboard/RECLAIM/docs/IMPLEMENTATION_PLAN.md)
