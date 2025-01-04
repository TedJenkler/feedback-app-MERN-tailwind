const puppeteer = require('puppeteer');

describe('AddNewFeedback Page', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('http://localhost:3000/addfeedback');
  });

  afterAll(async () => {
    await browser.close();
  });

  test('should render the AddNewFeedback page without errors', async () => {
    const pageTitle = await page.title();
    expect(pageTitle).toBe('Vite + React');
  });
});