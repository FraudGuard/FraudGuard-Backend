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
    '<rootDir>/build/',
    '<rootDir>/coverage/',
    '<rootDir>/dist/',
    '<rootDir>/node_modules/',
    '<rootDir>/scripts/',
    '<rootDir>/.husky/',
    '<rootDir>/.github/',
    '<rootDir>/test/',
  ],
  coverageReporters: ['text-summary', 'html'],
  errorOnDeprecated: true,
  testTimeout: 10000,
  verbose: true,
};
