const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

// Load test data from the JSON file
const testDataPath = path.resolve(__dirname, '../testData.json');
const testData = JSON.parse(fs.readFileSync(testDataPath));

testData.forEach(({ app, task, status, tags }) => {
  test(`Verify task "${task}" in ${app} app`, async ({ page }) => {
    // Navigate to the demo app
    await page.goto('https://animated-gingersnap-8cf7f2.netlify.app/');

    // Login to the app
    await page.fill('#username', 'admin');  // Enter email
    await page.fill('#password', 'password123');  // Enter password
    await page.click('text="Sign in"'); // Click the submit button
    await page.waitForURL();  // Wait for successful login

    // Navigate to the specific app section (Web or Mobile Application)
    await page.click(`text=${app}`);

    // Verify that the task exists in the specified column
    const taskLocator = page.locator(`text=${task}`);
    await expect(taskLocator).toBeVisible();

    // Verify the task's status (e.g., "To Do", "In Progress", etc.)
    const statusColumn = await page.locator(`text=${status}`);
    await expect(statusColumn).toBeVisible();

    // Verify that each tag is visible (Feature, Design, Bug, etc.)
    for (const tag of tags) {
        const tagLocator = page.locator(`span:text("${tag}")`).first();  // Ensure it's the first occurrence
        await expect(tagLocator).toBeVisible(); // Check if the tag is visible
    };
  });
});