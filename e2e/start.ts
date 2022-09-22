import { PuppeteerLaunchOptions } from 'puppeteer';
import { testA } from './tests/testA';
import { testB } from './tests/testB';
import { testC } from './tests/testC';
import { testD } from './tests/testD';
import { testE } from './tests/testE';
import {
  displayFailTest,
  displayPassTest,
  displayResult,
  Result,
} from './utils';

(async () => {
  const port = '4321';
  const options: PuppeteerLaunchOptions = {
    headless: true,
  };
  let passed: number = 0;
  let failed: number = 0;

  const describeA = 'Should register user and login';
  const resultA = await testA(port, options);
  if (resultA === Result.Pass) {
    passed = ++passed;
    displayPassTest(describeA);
  } else {
    failed = ++failed;
    displayFailTest(describeA);
  }

  const describeB = 'Should login and check movies count';
  const resultB = await testB(port, options);
  if (resultB === Result.Pass) {
    passed = ++passed;
    displayPassTest(describeB);
  } else {
    failed = ++failed;
    displayFailTest(describeB);
  }

  const describeC = 'Should login and search planet through movie';
  const resultC = await testC(port, options);
  if (resultC === Result.Pass) {
    passed = ++passed;
    displayPassTest(describeC);
  } else {
    failed = ++failed;
    displayFailTest(describeC);
  }

  const describeD = 'Should login and search planet through search bar';
  const resultD = await testD(port, options);
  if (resultD === Result.Pass) {
    passed = ++passed;
    displayPassTest(describeD);
  } else {
    failed = ++failed;
    displayFailTest(describeD);
  }

  const describeE = 'Should login and logout';
  const resultE = await testE(port, options);
  if (resultE === Result.Pass) {
    passed = ++passed;
    displayPassTest(describeE);
  } else {
    failed = ++failed;
    displayFailTest(describeE);
  }

  displayResult(passed, failed);
  process.exit(0);
})();
