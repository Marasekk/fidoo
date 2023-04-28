const { test, expect, chromium } = require('@playwright/test');

test.describe('Fidoo Demo Application - FE Test', () => {

  test('Verify credit card ownership FRANTA UZIVATEL', async () => {
    const browser = await chromium.launch({ headless: false });
    let browserContext = await browser.newContext()
    await browserContext.clearCookies();
    let page = await browserContext.newPage();
    page.goto('https://demo.fidoo.com/app/login');
    await page.waitForLoadState('domcontentloaded');
    expect(page).toHaveURL('https://demo.fidoo.com/app/login');
    const emailSelector = '//input[contains(@name, "loginUsername")]'
    const passwordSelector = '//input[contains(@name, "loginPassword")]'
    await page.fill(emailSelector, 'marcel.sindler@fidoo-test.com');
    await page.fill(passwordSelector, 'nt3THZ');
    await page.click('button[type="submit"]'),
    await page.waitForLoadState('networkidle');
    expect(page.url()).toBe('https://demo.fidoo.com/app/company-finance/mvc');
    await page.click('a[href="/app/company-finance/cards"]');
    await page.waitForTimeout(1000);
    await page.waitForLoadState('networkidle');
    expect(page.url()).toBe('https://demo.fidoo.com/app/company-finance/cards/cards');
    await page.fill('//input', 'FRANTA UZIVATEL');
    await page.waitForLoadState('networkidle');
    await page.click('//div[contains(text(), "FRANTA UZIVATEL")]');
    await page.waitForLoadState('domcontentloaded');
    const headerTitle = await page.textContent('//h2[contains(text(), "FRANTA UZIVATEL")]');
    expect(headerTitle).toContain('FRANTA UZIVATEL');
    await browser.close();
  });
});

