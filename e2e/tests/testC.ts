import * as puppeteer from 'puppeteer';
import { delay, displayError, Result } from '../utils';

export async function testC(
  port: string,
  options: puppeteer.LaunchOptions
): Promise<Result> {
  let isFailed = false;
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
    await page.waitForSelector('#movie_card1');
    await delay(1000);
    await page.click('#movie_card_btn1');
    await delay(200);
    await page.click('#movie_card_btn1');
    ///safe delay to handle slow api responses
    await delay(2000);
    await page.waitForSelector('#movie_opening');
    await page.click('#movie_details_planet_btn_Tatooine');
    await delay(1000);
    await page.waitForSelector('#planet_details_rotation_period');
    await browser.close();
  } catch (e) {
    displayError(e as string);
    isFailed = true;
  } finally {
    if (isFailed) return Result.Fail;
    else return Result.Pass;
  }
}
