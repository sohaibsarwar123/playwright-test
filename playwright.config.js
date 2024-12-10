// playwright.config.js
module.exports = {
    testDir: './tests',  // The directory where your tests are located
    timeout: 30000,      // Set a test timeout (30 seconds)
    retries: 1,          // Optional: retry failed tests
    headless: false,     // Ensure headless mode is enabled
    projects: [
      {
        name: 'firefox',
        use: { browserName: 'firefox' },
      },
    
      {
        name: 'chromium',  // This is the default, but you can make it explicit
        use: { browserName: 'chromium' },
      }
    ],
  };