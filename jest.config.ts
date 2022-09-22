const esModules = ['@angular', 'rxjs', 'firebase', '@firebase'];

module.exports = {
  preset: 'jest-preset-angular',
  extensionsToTreatAsEsm: ['.ts'],
  globals: {
    'ts-jest': {
      useESM: true,
      stringifyContentPathRegex: '\\.(html|svg)$',
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  moduleFileExtensions: ['ts', 'js', 'html', 'svg', 'json', 'mjs'],
  moduleNameMapper: { '^(\\.{1,2}/.*)\\.js$': '$1' },
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  transform: { '^.+\\.(ts|tsx|js|html|svg|mjs)$': 'jest-preset-angular' },
  transformIgnorePatterns: [
    `<rootDir>/node_modules/(?!.*\\.mjs$|${esModules.join('|')})`,
  ],
};
