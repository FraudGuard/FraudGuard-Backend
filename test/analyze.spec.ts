import { AdsModel } from './../src/api/models/ads';
/* eslint-disable no-unused-vars */
import {
  // analyze,
  // analyzeBeschreibung,
  // analyzeKonto,
  analyzeMetadaten,
  // analyzePreis,
  analyzeSonstiges,
  analyzeTitel,
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

  test('Analyze titel', async () => {
    const result = await analyzeTitel(testAd, new AdsModel());

    // Titel enthählt neu
    expect(result.titel_enthaelt_neu).to.be.equal(0);
    expect(result.titel_enthaelt_neu).to.be.not.equal(1);

    // Titel enthält ovp
    expect(result.titel_enthaelt_ovp).to.be.equal(0);
    expect(result.titel_enthaelt_ovp).to.be.not.equal(1);

    // Titel enthält verschweißt
    expect(result.titel_enthaelt_verschweißt).to.be.equal(0);
    expect(result.titel_enthaelt_verschweißt).to.be.not.equal(1);

    // Titel enthält ungeöffnet
    expect(result.titel_enthaelt_ungeoeffnet).to.be.equal(0);
    expect(result.titel_enthaelt_ungeoeffnet).to.be.not.equal(1);

    // Titel enthält Zeichen
    expect(result.titel_enthaelt_zeichen).to.be.equal(0);
    expect(result.titel_enthaelt_zeichen).to.be.not.equal(1);

    // Anitpattern: Titel enthält gebraucht
    expect(result.ap_titel_enthaelt_gebraucht).to.be.equal(0);
    expect(result.ap_titel_enthaelt_gebraucht).to.be.not.equal(1);

    // Antipattern: Titel enthält suche
    expect(result.ap_titel_enthaelt_suche).to.be.equal(0);
    expect(result.ap_titel_enthaelt_suche).to.be.not.equal(1);

    // Antipattern: Titel enthält tausche
    expect(result.ap_titel_enthaelt_tausche).to.be.equal(0);
    expect(result.ap_titel_enthaelt_tausche).to.be.not.equal(1);

    // Antipattern: Titel enthält Sammlung
    expect(result.ap_titel_enthaelt_sammlung).to.be.equal(0);
    expect(result.ap_titel_enthaelt_sammlung).to.be.not.equal(1);

    // Antipattern: Titel enthält Kilo
    expect(result.ap_titel_enthaelt_kilo).to.be.equal(0);
    expect(result.ap_titel_enthaelt_kilo).to.be.not.equal(1);
  });

  test('Analyze description', async () => {});

  test('Analyze account', async () => {});

  test('Analyze price', async () => {});

  test('Analyze metadata', async () => {
    const result = await analyzeMetadaten(testAd, new AdsModel());

    expect(result.metadata_category).to.be.equal(testAd.category.id);
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
