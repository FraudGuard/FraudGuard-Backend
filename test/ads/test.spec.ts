import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';

const noop = (_: Error) => {};

// Test-Suite
describe('Test', () => {
  beforeAll(async () => {
    noop;
  });

  afterAll(() => {
    noop;
  });

  test('Test if true is true', async () => {
    expect(true).toBeTruthy;
  });
});
