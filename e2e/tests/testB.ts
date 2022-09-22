import * as puppeteer from 'puppeteer';
import { delay, displayError, Result } from '../utils';

export async function testB(
  port: string,
  options: puppeteer.LaunchOptions
): Promise<Result> {
  let isFailed = false;
  let movieCount = 0;
  try {
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });
    await page.goto(`http://localhost:${port}`, { waitUntil: 'networkidle0' });
    await page.waitForSelector('#email');
    await page.focus('#email');
    await page.keyboard.type('test1@test.com');
    await page.waitForSelector('#password');
    await page.focus('#password');
    await page.keyboard.type('testtest');
    await delay(500);
    await page.click('#submitBtn');
    const cardGroup = await page.waitForSelector('.card-group');
    movieCount = cardGroup
      ? await cardGroup.$eval('.row', (el) => el.children.length)
      : 0;
    await browser.close();
  } catch (e) {
    displayError(e as string);
    isFailed = true;
  } finally {
    if (isFailed || movieCount !== 6) return Result.Fail;
    else return Result.Pass;
  }
}
