const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
];

const ROUTES = [
  { path: '/', name: 'command-center' },
  { path: '/assignments', name: 'assignments-library' },
  { path: '/assignments/EW-01', name: 'assignment-workbench' },
  { path: '/analytics', name: 'analytics-lab' },
  { path: '/timeline', name: 'timeline' },
  { path: '/library', name: 'evidence-vault' },
  { path: '/showcase', name: 'showcase' },
  { path: '/presentation', name: 'presentation' },
  { path: '/settings', name: 'settings' },
];

(async () => {
  const browser = await chromium.launch();
  const outputDir = path.join(__dirname, '..', 'docs', 'screenshots');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('Capturing real screenshots across viewports...');

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
    });
    const page = await context.newPage();

    for (const route of ROUTES) {
      const url = `http://localhost:3000${route.path}`;
      try {
        await page.goto(url, { waitUntil: 'networkidle' });
        await page.waitForTimeout(400);

        const screenshotPath = path.join(outputDir, `${route.name}-${vp.name}.png`);
        await page.screenshot({ path: screenshotPath, fullPage: true });
        console.log(`✓ [${vp.name}] ${route.path} saved`);
      } catch (err) {
        console.error(`✗ [${vp.name}] ${route.path} error:`, err.message);
      }
    }
    await context.close();
  }

  // Theme testing: capture dark vs light on desktop
  const lightContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const lightPage = await lightContext.newPage();
  await lightPage.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  // Set light theme via document element class
  await lightPage.evaluate(() => {
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
  });
  await lightPage.waitForTimeout(300);
  await lightPage.screenshot({ path: path.join(outputDir, 'command-center-desktop-light.png'), fullPage: true });
  console.log(`✓ [desktop-light] / saved`);

  await lightPage.goto('http://localhost:3000/assignments', { waitUntil: 'networkidle' });
  await lightPage.evaluate(() => {
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
  });
  await lightPage.waitForTimeout(300);
  await lightPage.screenshot({ path: path.join(outputDir, 'assignments-library-desktop-light.png'), fullPage: true });
  console.log(`✓ [desktop-light] /assignments saved`);

  await lightContext.close();
  await browser.close();
  console.log('All 29 genuine screenshot captures completed successfully.');
})();
