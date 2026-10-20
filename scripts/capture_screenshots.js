const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
];

(async () => {
  const browser = await chromium.launch();
  const docsImagesDir = path.join(__dirname, '..', 'docs', 'images');
  const docsScreenshotsDir = path.join(__dirname, '..', 'docs', 'screenshots');

  if (!fs.existsSync(docsImagesDir)) fs.mkdirSync(docsImagesDir, { recursive: true });
  if (!fs.existsSync(docsScreenshotsDir)) fs.mkdirSync(docsScreenshotsDir, { recursive: true });

  console.log('Capturing responsive screenshots for Impeccable review verification...');

  // 1. Capture primary README & documentation images (Dark mode desktop 1440px)
  const desktopCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const desktopPage = await desktopCtx.newPage();

  // Homepage
  await desktopPage.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(400);
  await desktopPage.screenshot({ path: path.join(docsImagesDir, 'homepage.png') });
  await desktopPage.screenshot({ path: path.join(docsScreenshotsDir, 'home-desktop-dark.png'), fullPage: true });
  console.log('✓ docs/images/homepage.png captured');

  // Assignments Gallery
  await desktopPage.goto('http://localhost:3000/assignments', { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(400);
  await desktopPage.screenshot({ path: path.join(docsImagesDir, 'assignments.png') });
  await desktopPage.screenshot({ path: path.join(docsScreenshotsDir, 'assignments-desktop-dark.png'), fullPage: true });
  console.log('✓ docs/images/assignments.png captured');

  // Assignment Viewer (EW-01 Toxic Chemicals)
  await desktopPage.goto('http://localhost:3000/assignments/EW-01', { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(500);
  await desktopPage.screenshot({ path: path.join(docsImagesDir, 'assignment-viewer.png') });
  await desktopPage.screenshot({ path: path.join(docsScreenshotsDir, 'assignment-ew01-desktop-dark.png'), fullPage: true });
  console.log('✓ docs/images/assignment-viewer.png captured');

  // Research Paper Viewer (EW-15)
  await desktopPage.goto('http://localhost:3000/assignments/EW-15', { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(500);
  await desktopPage.screenshot({ path: path.join(docsImagesDir, 'research-paper.png') });
  await desktopPage.screenshot({ path: path.join(docsScreenshotsDir, 'assignment-ew15-desktop-dark.png'), fullPage: true });
  console.log('✓ docs/images/research-paper.png captured');

  // Timeline
  await desktopPage.goto('http://localhost:3000/timeline', { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(400);
  await desktopPage.screenshot({ path: path.join(docsImagesDir, 'timeline.png') });
  await desktopPage.screenshot({ path: path.join(docsScreenshotsDir, 'timeline-desktop-dark.png'), fullPage: true });
  console.log('✓ docs/images/timeline.png captured');

  await desktopCtx.close();

  // 2. Mobile (390px)
  const mobileCtx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mobilePage = await mobileCtx.newPage();
  await mobilePage.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(400);
  await mobilePage.screenshot({ path: path.join(docsImagesDir, 'mobile.png') });
  await mobilePage.screenshot({ path: path.join(docsScreenshotsDir, 'home-mobile-dark.png'), fullPage: true });

  await mobilePage.goto('http://localhost:3000/assignments', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(400);
  await mobilePage.screenshot({ path: path.join(docsScreenshotsDir, 'assignments-mobile-dark.png'), fullPage: true });

  await mobilePage.goto('http://localhost:3000/assignments/EW-15', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(500);
  await mobilePage.screenshot({ path: path.join(docsScreenshotsDir, 'assignment-ew15-mobile-dark.png'), fullPage: true });

  await mobileCtx.close();
  console.log('✓ docs/images/mobile.png and mobile screens captured');

  // 3. Tablet (768px)
  const tabletCtx = await browser.newContext({ viewport: { width: 768, height: 1024 } });
  const tabletPage = await tabletCtx.newPage();
  await tabletPage.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await tabletPage.waitForTimeout(400);
  await tabletPage.screenshot({ path: path.join(docsScreenshotsDir, 'home-tablet-dark.png'), fullPage: true });

  await tabletPage.goto('http://localhost:3000/assignments', { waitUntil: 'networkidle' });
  await tabletPage.waitForTimeout(400);
  await tabletPage.screenshot({ path: path.join(docsScreenshotsDir, 'assignments-tablet-dark.png'), fullPage: true });

  await tabletCtx.close();
  console.log('✓ Tablet screens captured');

  // 4. Light Mode Desktop (1440px)
  const lightCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const lightPage = await lightCtx.newPage();
  await lightPage.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await lightPage.evaluate(() => {
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
  });
  await lightPage.waitForTimeout(300);
  await lightPage.screenshot({ path: path.join(docsScreenshotsDir, 'home-desktop-light.png'), fullPage: true });

  await lightPage.goto('http://localhost:3000/assignments', { waitUntil: 'networkidle' });
  await lightPage.evaluate(() => {
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
  });
  await lightPage.waitForTimeout(300);
  await lightPage.screenshot({ path: path.join(docsScreenshotsDir, 'assignments-desktop-light.png'), fullPage: true });

  await lightPage.goto('http://localhost:3000/timeline', { waitUntil: 'networkidle' });
  await lightPage.evaluate(() => {
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
  });
  await lightPage.waitForTimeout(300);
  await lightPage.screenshot({ path: path.join(docsScreenshotsDir, 'timeline-desktop-light.png'), fullPage: true });

  await lightCtx.close();
  console.log('✓ Light mode screens captured');

  await browser.close();
  console.log('All authentic responsive screenshots successfully captured!');
})();
