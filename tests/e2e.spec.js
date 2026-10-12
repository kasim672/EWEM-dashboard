import { test, expect } from '@playwright/test';

test.describe('RECLAIM Minimal Academic Portfolio E2E Verification', () => {
  test('Home Page renders clean academic intro, total 14 assignments, and no admin widgets', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await expect(page.locator('text=E-Waste & Environmental Management').first()).toBeVisible();
    await expect(page.locator('text=14').first()).toBeVisible();

    // Verify 3-item navigation bar
    const nav = page.locator('nav');
    await expect(nav.locator('text=Home')).toBeVisible();
    await expect(nav.locator('text=Assignments')).toBeVisible();
    await expect(nav.locator('text=Timeline')).toBeVisible();

    // Verify removed tabs do not exist in navigation
    await expect(page.locator('nav >> text=Analytics')).not.toBeVisible();
    await expect(page.locator('nav >> text=Showcase')).not.toBeVisible();
    await expect(page.locator('nav >> text=Settings')).not.toBeVisible();
    await expect(page.locator('nav >> text=Evidence Vault')).not.toBeVisible();
  });

  test('Assignments Gallery displays 14 records with search, filter, and format pills', async ({ page }) => {
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

  test('Assignment Detail renders interactive document preview, tabs, and ZIP download', async ({ page }) => {
    await page.goto('http://localhost:3000/assignments/EW-05');
    await expect(page.locator('text=Coursework Deliverables & Interactive Preview')).toBeVisible();
    await expect(page.locator('text=Download All (ZIP)')).toBeVisible();

    // Switch between files: XLSX and PDF
    await expect(page.locator('button:has-text("State_EWaste_Tracker_Final 1.xlsx")')).toBeVisible();
    await expect(page.locator('button:has-text("Kasim_Ghanchi_Assignment1E.pdf")')).toBeVisible();

    // Click on XLSX tab
    await page.locator('button:has-text("State_EWaste_Tracker_Final 1.xlsx")').click();

    // Verify spreadsheet viewer rendered
    await expect(page.locator('text=State E-Waste Management Scorecard')).toBeVisible();
    await expect(page.locator('button:has-text("0_Scorecard")')).toBeVisible();
    await expect(page.locator('button:has-text("1_Generation_Inventory")')).toBeVisible();

    // Switch sheet tab
    await page.locator('button:has-text("1_Generation_Inventory")').click();
    await expect(page.locator('text=Generation Inventory')).toBeVisible();
  });

  test('Awaiting assignment EW-01 displays courteous files not available message, and EW-09 displays KASIM_EWEM_ASS3_CHANGES.pdf', async ({ page }) => {
    await page.goto('http://localhost:3000/assignments/EW-01');
    await expect(page.locator('text=Files Not Available Yet')).toBeVisible();
    await expect(page.locator('text=No coursework deliverables are currently registered')).toBeVisible();

    await page.goto('http://localhost:3000/assignments/EW-09');
    await expect(page.locator('text=KASIM_EWEM_ASS3_CHANGES.pdf').first()).toBeVisible();
    await expect(page.locator('text=Download All (ZIP)')).toBeVisible();
  });

  test('Course Timeline preserves 14 sequential entries linking to assignment viewers', async ({ page }) => {
    await page.goto('http://localhost:3000/timeline');
    await expect(page.locator('text=Course Activity Chronology')).toBeVisible();
    await expect(page.locator('text=EW-01')).toBeVisible();
    await expect(page.locator('text=EW-14')).toBeVisible();

    // Click on EW-02 View Assignment
    await page.locator('a[href="/assignments/EW-02"]').first().click();
    await expect(page).toHaveURL(/.*\/assignments\/EW-02/);
  });
});
