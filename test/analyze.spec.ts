import { AdsModel } from './../src/api/models/ads';
/* eslint-disable no-unused-vars */
import {
  // analyze,
  // analyzeBeschreibung,
  // analyzeKonto,
  analyzeMetadaten,
  // analyzePreis,
  analyzeSonstiges,
  // analyzeTitel,
} from '../src/services/analyze';
import { afterAll, beforeAll, describe, test } from '@jest/globals';
import { createTestserver } from './testserver';
import { expect } from 'chai';
import { testAd } from './testAd';
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
    const result = await analyzeMetadaten(testAd, new AdsModel());

    expect(result.metadata_latitude).to.be.equal(9.3557);
    expect(result.metadata_longitude).to.be.equal(48.64);
    expect(result.metadata_category).to.be.equal(23);
    expect(result.metadata_amount_pictures).to.be.equal(6);
    expect(result.metadata_phone).to.be.equal(1);
    expect(result.metadata_startDateTime).to.be.equal(1614434831000);
  });

  test('Analyze misc.', async () => {
    const result = await analyzeSonstiges(testAd, new AdsModel());

    expect(result.sonstiges_anzeige_kopiert).to.be.equal('1');
    expect(result.ap_sonstiges_anzeige_nur_abholung).to.be.equal('1');
    expect(result.ap_sonstiges_anzeige_suche).to.be.equal('1');
    expect(result.ap_sonstiges_anzeige_zeit_tag).to.be.equal('1');
  });

  test('Analyze all', async () => {});
});
