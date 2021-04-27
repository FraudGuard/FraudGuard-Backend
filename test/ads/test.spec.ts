import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';

// Test-Suite
describe('Test', () => {
  beforeAll(async () => {});

  afterAll(() => {});

  test('Test if true is true', async () => {
    expect(true).toBeTruthy;
  });
});
