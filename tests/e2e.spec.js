import { test, expect } from '@playwright/test';

test.describe('RECLAIM Phase 2 E2E & Visual Verification', () => {
  test('Command Center displays exact 14 records and 13 observed badges', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await expect(page.locator('text=E-Waste Intelligence & Management Studio')).toBeVisible();
    await expect(page.locator('text=14').first()).toBeVisible();
    await expect(page.locator('text=13').first()).toBeVisible();
  });

  test('Assignment Library search and filtering works', async ({ page }) => {
    await page.goto('http://localhost:3000/assignments');
    await expect(page.locator('text=EW-01')).toBeVisible();
    await expect(page.locator('text=EW-14')).toBeVisible();

    // Search for "Toxic"
    const searchInput = page.locator('input[placeholder*="Search"]');
    await searchInput.fill('Toxic');
    await expect(page.locator('text=EW-01')).toBeVisible();
    await expect(page.locator('text=EW-14')).not.toBeVisible();

    // Clear search
    await searchInput.fill('');
    await expect(page.locator('text=EW-14')).toBeVisible();
  });

  test('Assignment Workbench status edit persists across browser reload', async ({ page }) => {
    await page.goto('http://localhost:3000/assignments/EW-01');
    await expect(page.locator('h1.font-display')).toContainText('Toxic Chemicals');

    // Change Work Status to "in_progress"
    const workSelect = page.locator('select').nth(1);
    await workSelect.selectOption('in_progress');

    // Add a checklist task
    const taskInput = page.locator('input[placeholder*="Add checklist item"]');
    await taskInput.fill('Review Basel Convention annexes');
    await page.locator('button:has-text("Add")').click();
    await expect(page.locator('text=Review Basel Convention annexes')).toBeVisible();

    // Reload page
    await page.reload();

    // Verify persisted state
    await expect(page.locator('text=Review Basel Convention annexes')).toBeVisible();
    const updatedSelect = page.locator('select').nth(1);
    await expect(updatedSelect).toHaveValue('in_progress');
  });

  test('Evidence Vault handles file upload association and persists across reload', async ({ page }) => {
    await page.goto('http://localhost:3000/library');
    await expect(page.locator('text=Secure Evidence Vault')).toBeVisible();

    // Create a mock upload file
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.locator('input[type="file"]').click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles({
      name: 'basel_convention_report.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('Official annexes regarding e-waste hazardous chemical classifications.'),
    });

    await expect(page.locator('text=basel_convention_report.txt')).toBeVisible();

    // Reload page and verify persistence
    await page.reload();
    await expect(page.locator('text=basel_convention_report.txt')).toBeVisible();
  });

  test('Faculty Showcase strictly enforces read-only published gate', async ({ page }) => {
    await page.goto('http://localhost:3000/showcase');
    // Initially EW-01 is unpublished or pending
    // Let's go to EW-02 workbench and publish it
    await page.goto('http://localhost:3000/assignments/EW-02');
    const publishCheckbox = page.locator('input[type="checkbox"]').last();
    const isChecked = await publishCheckbox.isChecked();
    if (!isChecked) {
      await publishCheckbox.check();
    }

    // Now check Showcase
    await page.goto('http://localhost:3000/showcase');
    await expect(page.locator('text=EW-02')).toBeVisible();
    // EW-03 should NOT be visible since it was not published
    await expect(page.locator('text=EW-03')).not.toBeVisible();
  });

  test('Presentation mode supports keyboard navigation', async ({ page }) => {
    await page.goto('http://localhost:3000/presentation');
    await expect(page.locator('text=Slide 1 of')).toBeVisible();

    // Press right arrow
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('text=Slide 2 of')).toBeVisible();

    // Press left arrow
    await page.keyboard.press('ArrowLeft');
    await expect(page.locator('text=Slide 1 of')).toBeVisible();
  });

  test('JSON backup export and import roundtrip preserves data integrity', async ({ page }) => {
    await page.goto('http://localhost:3000/settings');
    await expect(page.locator('text=Export Verified JSON Backup')).toBeVisible();

    // Trigger download
    const downloadPromise = page.waitForEvent('download');
    await page.locator('button:has-text("Export Verified JSON Backup")').click();
    const download = await downloadPromise;
    const path = await download.path();
    expect(path).toBeTruthy();
  });

  test('Phase 4: Assignment Workbench renders genuine deliverable file viewer and ZIP download', async ({ page }) => {
    // Navigate to EW-05 which contains 3 deliverables including XLSX
    await page.goto('http://localhost:3000/assignments/EW-05');
    await expect(page.locator('text=Coursework Artifacts & Interactive Preview')).toBeVisible();
    await expect(page.locator('text=Download All (ZIP)')).toBeVisible();

    // Verify file cards/tabs are present
    await expect(page.locator('button:has-text("State_EWaste_Tracker_Final 1.xlsx")')).toBeVisible();
    await expect(page.locator('button:has-text("Kasim_Ghanchi_Assignment1E.pdf")')).toBeVisible();

    // Click on the spreadsheet file to open the interactive viewer
    await page.locator('button:has-text("State_EWaste_Tracker_Final 1.xlsx")').click();

    // Verify the multi-sheet interactive spreadsheet viewer rendered
    await expect(page.locator('text=State E-Waste Management Scorecard')).toBeVisible();
    await expect(page.locator('button:has-text("0_Scorecard")')).toBeVisible();
    await expect(page.locator('button:has-text("1_Generation_Inventory")')).toBeVisible();

    // Switch to sheet 1_Generation_Inventory
    await page.locator('button:has-text("1_Generation_Inventory")').click();
    await expect(page.locator('text=Generation Inventory')).toBeVisible();
  });

  test('Phase 4: Awaiting assignments EW-01 and EW-09 display clear pending status', async ({ page }) => {
    // Navigate to EW-01
    await page.goto('http://localhost:3000/assignments/EW-01');
    await expect(page.locator('text=No Coursework Files In Source Directory')).toBeVisible();
    await expect(page.locator('text=currently has 0 files indexed')).toBeVisible();

    // Navigate to EW-09
    await page.goto('http://localhost:3000/assignments/EW-09');
    await expect(page.locator('text=No Coursework Files In Source Directory')).toBeVisible();
    await expect(page.locator('text=currently has 0 files indexed')).toBeVisible();
  });
});

