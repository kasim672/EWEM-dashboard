# RECLAIM — Academic Coursework Portfolio (EW/EM)

> **RECLAIM: E-Waste & Environmental Management** is a minimal, premium, viewer-only academic portfolio built for faculty, classmate, and visitor review. Deployed with Next.js App Router and optimized for Vercel.

---

## 1. Project Overview

RECLAIM curates **14 official coursework assignments** for the Electronic Waste and Environmental Management curriculum. The application is strictly **read-only**, designed to showcase research deliverables with genuine interactive document previews and original file downloads without any management overhead or administrative bloat.

### Main Navigation (Exactly 3 Sections)
1. **Home (`/`)**: Academic hero introduction, verified curriculum metrics, and featured coursework cards.
2. **Assignments (`/assignments`)**: Gallery of all 14 assignments with real-time search, category filtering, availability filtering, and format tags.
   - **Assignment Detail (`/assignments/[id]`)**: Full-screen interactive viewer supporting real previews for PDF, PowerPoint (PPTX slides), Word (DOCX), Excel (multi-sheet XLSX), HTML projects (sandboxed), and diagrams, plus original downloads and assignment ZIP archives.
3. **Timeline (`/timeline`)**: Sequential course activity chronology from July to October 2026.

---

## 2. Technical Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (Strict mode enabled)
- **Styling:** Tailwind CSS with dark graphite, emerald, and electric lime design system
- **Components:** Accessible Radix & Tailwind UI primitives
- **Icons:** Lucide React
- **Document Previews:**
  - **PDFs:** Native embedded viewer with zooming, page navigation, and download links
  - **PowerPoint PPTX:** Slide renderer with thumbnail navigation and slide count matching
  - **Excel XLSX:** Interactive multi-sheet table viewer parsing real sheets, columns, and rows via SheetJS
  - **HTML:** Isolated sandbox (`<iframe sandbox="allow-scripts">`) with strict CSP
  - **Images:** High-resolution zoom and full dimension preview
- **Archives:** Streaming ZIP generation via JSZip
- **Testing:** Playwright E2E and Vitest unit testing suites

---

## 3. Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run TypeScript typecheck
npm run typecheck

# Run unit and integration tests
npm test

# Run Playwright browser E2E tests
npm run test:e2e

# Create production build
npm run build

# Start production server locally
npm start
```

---

## 4. Vercel Deployment Instructions

RECLAIM is configured for direct zero-config deployment on Vercel:

1. **Deploying via Vercel CLI:**
   ```bash
   npm i -g vercel
   vercel
   ```
2. **Deploying via GitHub / Git Repository:**
   - Push this repository to GitHub or GitLab.
   - Import the repository in the [Vercel Dashboard](https://vercel.com/new).
   - Framework Preset: **Next.js**.
   - Root Directory: `./` (or repository root).
   - Build Command: `npm run build` (default).
   - Output Directory: `.next` (default).
   - Node.js Version: `20.x` or `22.x`.
   - Click **Deploy**.

### Production Asset Architecture for Vercel
- All 19 approved coursework deliverables and pre-rendered presentation slides are packaged into `public/coursework/files/` and `public/coursework/previews/`.
- Download endpoints (`/api/coursework/file/[fileId]`, `/api/download/[id]`, etc.) check both server directories and `public/coursework/` as fallbacks, ensuring 100% operational fidelity in Vercel's serverless runtime.
