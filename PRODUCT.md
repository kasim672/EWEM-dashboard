# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary User:** Academic faculty, specifically **Prof. Aniket Kundu**, conducting coursework review, grading validation, and portfolio assessment.
- **Secondary Users:** Faculty members, student peers/classmates, academic evaluators, and public visitors exploring coursework deliverables and research publications.

## Product Purpose

A professional academic website prepared for **Prof. Aniket Kundu**, where faculty, classmates, and visitors can explore all 15 assignments, preview documents in-browser, download coursework deliverables, and trace course activity chronology across the Electronic Waste & Environmental Management (EW/EM) curriculum.

## Positioning

An authentic academic repository and environmental research observatory. Every deliverable is grounded in genuine student submissions across all 15 assignments (PDF, PPTX, XLSX, DOCX, interactive HTML, images) with verified cryptographic SHA-256 hashes, exact MIME types, and streaming ZIP downloads.

## Operating Context

- **Academic Context:** Semester 5 (Academic Year 2026–2027), Department of Computer Engineering.
- **Evaluation Rituals:** Fast 30-second inspection of student work, multi-sheet spreadsheet evaluation, in-browser slide presentations, full-text IEEE research paper inspection, and bulk ZIP archives.
- **Deployment Context:** Zero-configuration Vercel serverless deployment where static assets are bundled into `public/coursework/` and `public/research-paper/`.

## Capabilities and Constraints

- **Strictly Viewer-Only:** The website must remain completely read-only. No analytics dashboards, grading systems, verification checklists, administration panels, editing modes, or unnecessary feature bloat.
- **Navigation Structure:** Exactly three main navigation sections: **Home (`/`)**, **Assignments (`/assignments`)**, and **Timeline (`/timeline`)**.
- **Scope & Preservation:** Exactly 15 contiguous assignments (`EW-01` through `EW-15`) and the integrated IEEE research paper deliverable.
- **Integrity Boundary:** Never modify or rewrite original student coursework files.
- **Document Previews & Downloads:** In-browser inspection engine for PDF, PPTX slides, SheetJS spreadsheets, DOCX documents, sandboxed HTML, and image submissions, plus individual file and full assignment ZIP downloads.
- **Vercel Compatibility:** Fully operational on local development and Vercel serverless production runtimes.

## Brand Commitments

- **Name:** E-Waste
- **Academic Dedication:** "Prepared for Prof. Aniket Kundu &middot; E-Waste & Environmental Management &middot; Semester 5"
- **Author:** Kasim Ishaque Ghanchi
- **Visual Personality:** Premium botanical laboratory instrument with Swiss typography, emerald accents, and hairline borders. Preserve the established visual identity and avoid unnecessary redesigns.

## Evidence on Hand

- 24 authentic student deliverables across 15 assignments in `ewem/`, `coursework_vault/`, and `public/coursework/files/`.
- Cryptographically verified manifest in `src/data/courseworkManifest.json` and research manifest in `src/data/researchPaperManifest.json`.
- Full Playwright E2E (`tests/e2e.spec.js`) and Vitest (`tests/seedIntegrity.test.ts`) verification suites.

## Product Principles

1. **Viewer-Only Authenticity:** Present genuine coursework deliverables without fabricating grades, reviews, or administrative workflows.
2. **First-Class Document Inspection:** Enable direct in-browser inspection of native formats before requiring downloads.
3. **Restraint, Precision & Simplicity:** Maintain the established 3-tab architecture and avoid extraneous features or redesigns.
4. **Resilient Portability:** Guarantee all previews and downloads function identically on local dev and Vercel serverless runtimes.

## Accessibility & Inclusion

- Keyboard-navigable document viewers with Esc, Arrow keys for slides, and visible focus rings.
- WCAG 2.2 AA compliant contrast on both dark and light modes.
- Sandboxed iframe security with strict Content-Security-Policy headers for student-created HTML activities.
