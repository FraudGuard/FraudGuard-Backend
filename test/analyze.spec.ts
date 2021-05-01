/* eslint-disable no-unused-vars */
// import {
//   analyze,
//   analyzeBeschreibung,
//   analyzeKonto,
//   analyzeMetadaten,
//   analyzePreis,
//   analyzeSonstiges,
//   analyzeTitel,
// } from './api/services/analyze';
import { afterAll, beforeAll, describe, test } from '@jest/globals';
import { createTestserver } from './testserver';
// import { expect } from 'chai';
// import { testAd } from './testData';
import type { Server } from 'http';

let server: Server;

// Test-Suite
describe('Analyze Ads', () => {
  beforeAll(async () => {
    server = await createTestserver();
  });

  afterAll(() => {
    server.close();
  });

  test('Analyze titel', async () => {});

  test('Analyze description', async () => {});

  test('Analyze account', async () => {});

  test('Analyze price', async () => {});

  test('Analyze metadata', async () => {
    // // given
    // // when
    // const result = analyzeMetadaten(testAd, testResult);
    // // then
    // expect(result).to.be.equal()
  });

  test('Analyze misc.', async () => {});

  test('Analyze all', async () => {});
});
