// https://jestjs.io/docs/en/configuration
/* global module */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // https://github.com/facebook/jest/tree/master/packages/jest-circus :
  // "The next-gen test runner for Jest"
  testRunner: 'jest-circus/runner',

  bail: true,

  collectCoverageFrom: ['**/*.ts', '!src/index.ts'],
  // default: ["/node_modules/"]
  coveragePathIgnorePatterns: [
    '<rootDir>/.github/',
    '<rootDir>/.husky/',
    '<rootDir>/build/',
    '<rootDir>/coverage/',
    '<rootDir>/dist/',
    '<rootDir>/node_modules/',
    '<rootDir>/test/',
  ],
  coverageReporters: ['text-summary', 'html', 'clover'],
  errorOnDeprecated: true,
  testTimeout: 100000,
  verbose: true,
  collectCoverage: true,
};
