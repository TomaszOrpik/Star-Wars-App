import chalk from 'chalk';

export const displayError = (error: string) => {
  console.log(chalk.red(error));
};

export const displayPassTest = (message: string) => {
  console.log(chalk.green('PASS') + ' ' + chalk.white(message));
};

export const displayFailTest = (message: string) => {
  console.log(chalk.red('FAIL' + ' ' + chalk.white(message)));
};

export const displayResult = (pass: number, fail: number) => {
  console.log(`Total: ${pass + fail}`);
  console.log(chalk.red(`Failed: ${fail}`));
  console.log(chalk.green(`Passed: ${pass}`));
};

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export enum Result {
  Pass,
  Fail,
}
