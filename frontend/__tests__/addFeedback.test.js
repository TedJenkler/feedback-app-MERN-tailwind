const puppeteer = require('puppeteer');

describe('AddFeedback Page Navigation', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('http://localhost:3000/feedback-app-tailwind-vite/');
  });

  afterAll(async () => {
    await browser.close();
  });

  test('should navigate to AddFeedback page when + Add Feedback button is clicked', async () => {
    try {
      // Wait for the link/button to appear with an increased timeout (e.g., 10 seconds)
      await page.waitForSelector('#add', { timeout: 10000 });

      // Click the link/button
      await page.click('#add');

      // Wait for navigation to complete
      await page.waitForNavigation({ waitUntil: 'domcontentloaded' });

      // Add a slight delay to stabilize the page
      await page.waitForTimeout(1000); // Adjust as necessary

      // Get the current URL after navigation
      const currentUrl = page.url();

      // Assert that the current URL matches the expected /addfeedback page URL
      expect(currentUrl).toBe('http://localhost:3000/addfeedback');
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  });
});