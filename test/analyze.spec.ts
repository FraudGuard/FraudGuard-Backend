import {
  // analyze,
  // analyzeBeschreibung,
  // analyzeKonto,
  analyzeMetadaten,
  // analyzePreis,
  // analyzeSonstiges,
  // analyzeTitel,
} from '../src/services/analyze';
import { afterAll, beforeAll, describe, test } from '@jest/globals';
import { createTestserver } from './testserver';
import { expect } from 'chai';
import { testAd } from './testData';
import { testResult } from './testResult';
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
    const result = analyzeMetadaten(testAd);

    expect((await result).metadata_longitude).to.be.equal(
      testResult.metadata_longitude,
    );
    expect((await result).metadata_latitude).to.be.equal(
      testResult.metadata_latitude,
    );
    expect((await result).metadata_category).to.be.equal(
      testResult.metadata_category,
    );
    expect((await result).metadata_amount_pictures).to.be.equal(
      testResult.metadata_amount_pictures,
    );
    expect((await result).metadata_phone).to.be.equal(
      testResult.metadata_phone,
    );
    expect((await result).metadata_startDateTime).to.be.equal(
      testResult.metadata_startDateTime,
    );
  });

  test('Analyze misc.', async () => {});

  test('Analyze all', async () => {});
});
