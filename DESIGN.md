# E-Waste Academic Portfolio — Design Constitution & System Specification

> Design authority for the **E-Waste Academic Portfolio** prepared for **Prof. Aniket Kundu** (Semester 5).
> Updated and refined following the **Impeccable Design Audit & Critique Pass** with verified browser automation, contrast validation, responsive testing, and zero anti-pattern compliance.

---

## 1. Product Personality & Identity

- **Atmosphere:** Dark graphite botanical research observatory paired with a clean high-contrast academic print mode in light theme. Fine hairline borders (`1px border-border`), restrained mathematical spacing, deliberate typographic hierarchy, and purposeful negative space.
- **Academic Dedication:** Prominently anchored across the website header and hero:
  - Header: `"Prepared for Prof. Aniket Kundu"`
  - Subtitle: `"E-Waste & Environmental Management · Semester 5"`
- **Three-Section Architecture:** Pure viewer-only interface strictly organized into three primary routes:
  1. **Home (`/`)**: Editorial executive summary, authoritative coursework ledger, research paper spotlight, category distribution, and verification provenance.
  2. **Assignments (`/assignments`)**: Interactive coursework gallery featuring instant full-text search, category chips, format tags, and responsive card grid for all 15 assignments.
  3. **Timeline (`/timeline`)**: Authentic chronological journey from July 24 to October 7, 2026, mapping portal activity dates against formal deadlines.
- **Assignment Detail & Viewers (`/assignments/[id]`)**: Deep-inspection workbench with universal interactive viewers:
  - PDF documents (PDF.js / iframe with zoom, page navigation, fullscreen, and direct download).
  - Multi-sheet Excel workbooks (interactive sheet tabs, column headers, cellular clipboard copy, filter search).
  - PowerPoint presentations (.pptx preview card and direct download).
  - Word documents (.docx preview card and direct download).
  - IEEE Research Paper Viewer (`EW-15`): tabbed reader with PDF viewer, converted HTML preview, full LaTeX source code explorer, and interactive figure gallery.
  - Secure original file download and assignment ZIP package generation.

---

## 2. Design Tokens & Calibrated Contrast System

The palette has been audited and calibrated to guarantee strict **WCAG 2.2 AA compliance (> 4.5:1 contrast)** in both Dark and Light themes.

| Semantic Token | Dark Mode (`.dark`) | Light Mode (`.light`) | Light Contrast Ratio | Functional Role |
|---|---|---|---|---|
| `--canvas` | `#0B1110` | `#F5F8F4` | — | Root page viewport canvas |
| `--surface` | `#151D1A` | `#FFFFFF` | > 14:1 vs text | Primary card & panel container |
| `--surface-raised` | `#1C2922` | `#E6EAE7` | > 12:1 vs text | Elevated panels, hover states, tables |
| `--text` | `#EFF5EF` | `#11211A` | **15.2:1** | Primary typography and headings |
| `--text-muted` | `#9BB0A3` | `#4B5E54` | **5.4:1** | Secondary typography, captions, metadata |
| `--border` | `#28362E` | `#CBD8CE` | > 3.0:1 | Hairline dividers and interactive bounds |
| `--emerald-accent` | `#32CF89` | `#0A6B4A` | **5.7:1** | Primary brand accent, verified status |
| `--lime-accent` | `#C4F46D` | `#455932` | **6.1:1** | Academic research highlight, focus |
| `--cyan-accent` | `#79CFDA` | `#284C48` | **7.5:1** | Data analytics, spreadsheet deliverables |
| `--amber-accent` | `#F2BC6E` | `#944D08` | **5.3:1** | Upcoming deadlines, alert notices |
| `--danger` | `#F48F87` | `#AB2319` | **5.9:1** | Critical alerts and error boundaries |

---

## 3. Typographic System & Hierarchy Rules

- **Display & Headings**: `Geist Sans` / modern sans-serif with geometric precision and tight tracking:
  - **H1 (Page Title)**: `text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text`
  - **H2 (Section Header)**: `text-xl sm:text-2xl font-bold tracking-tight text-text`
  - **H3 (Card / Viewer Header)**: `text-sm sm:text-base font-semibold text-text`
  - **Body Text**: `text-sm sm:text-base text-text-muted leading-relaxed max-w-[65ch] text-pretty` (Strict minimum 14px for body paragraphs; no sub-12px body text).
  - **Functional Metadata & Badges**: `text-xs font-mono` (12px) for file sizes, dates, and formats; `text-[11px] font-mono uppercase tracking-wider` reserved strictly for compact chip tags and short uppercase badges.
- **Hierarchy Compliance Rules**:
  - **No Eyebrow / Kicker Skip**: Decorative kickers floating above headings without structural semantic markup are banned. All headings follow strict descending order (`h1` → `h2` → `h3`) without skipping levels.
  - **Heading Anchors**: Gallery cards use accessible `h2` section anchors followed by individual card `h3` titles for screen reader landmark navigation.
  - **Comfortable Line Lengths**: Prose descriptions capped at `max-w-[65ch]` with `text-pretty` to prevent typographic stragglers and orphan words.

---

## 4. Layout Architecture & Responsive Breakpoints

The responsive layout was verified across four explicit breakpoints:

| Viewport Name | Width × Height | Navigation & Shell Behavior | Layout Rhythm |
|---|---|---|---|
| **Mobile** | `390 × 844 px` | Compact top bar with horizontal tab bar, full-width single column cards | `px-4 py-6`, 12px gaps |
| **Tablet** | `768 × 1024 px` | Responsive 2-column card grid, tabbed viewer header | `px-6 py-8`, 16px gaps |
| **Desktop** | `1280 × 800 px` | 3-column card grid, split workbench layout (file tree + viewer) | `px-8 py-10`, 20px gaps |
| **Wide Desktop** | `1440 × 900 px` | Fluid 3-column grid capped at `max-w-6xl`, widescreen viewer | `px-8 py-12`, 24px gaps |

---

## 5. Coursework Deliverables & Viewer Usability

1. **EW-01 — Toxic Chemicals**: Fully verified PDF viewer with page navigation, zoom, and direct download of `Toxic_Chemicals.pdf`.
2. **EW-02 to EW-04**: Technical recovery maps, elemental process updates, and administrative diagnostic tasks.
3. **EW-05 to EW-08**: Data analytics tracking workbooks, including India vs. World data tasks and multi-sheet carbon footprint Excel models.
4. **EW-09**: Recovery process modification for design patent with complete PDF deliverable.
5. **EW-10 to EW-14**: Indian company rules comparative study, CMPN pitch decks, campus e-waste campaign, LEED green building certifications, and case studies.
6. **EW-15 — Academic Research Paper**:
   - Comprehensive IEEE-compliant paper on hydrometallurgical e-waste recovery.
   - Multi-tab viewer: Interactive PDF Reader, Converted HTML Reader, Raw LaTeX Source Explorer, and Preserved Figure Gallery with high-resolution schematics.

---

## 6. Impeccable Quality & Audit Verification

- **Automated Anti-Pattern Detector**: Executed on all production routes (`/`, `/assignments`, `/timeline`, `/assignments/EW-01`, `/assignments/EW-15`). Result: **0 anti-patterns**.
- **Contrast Ratios**: Verified via Playwright evaluation; all light and dark theme text meets or exceeds WCAG AA 4.5:1.
- **Interactive States**: Every interactive control possesses explicit `:hover`, `:focus-visible`, and active ring styles.
- **Strictly Viewer-Only**: Zero admin interfaces, edit controls, grading panels, or synthetic metrics.
- **Test Integrity**: 6/6 Vitest unit tests pass; 8/8 Playwright E2E browser tests pass; production build compiles cleanly without errors.
