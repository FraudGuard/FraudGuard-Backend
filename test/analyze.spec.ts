import { AdsModel } from './../src/api/models/ads';
/* eslint-disable no-unused-vars */
import {
  analyzeMetadaten,
  analyzeBeschreibung,
  analyzePreis,
  analyzeSonstiges,
  analyzeTitel,
  analyzeKonto,
  analyze,
} from '../src/services/analyze';
import { afterAll, beforeAll, describe, test } from '@jest/globals';
import { createTestserver } from './testserver';
import { expect } from 'chai';
import { Ad1, Ad2, Ad3 } from './testAds';
import type { Server } from 'http';
// import { evaluate } from './services/evaluate';

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
    // Titel - keine Merkmale enthalten
    const result1 = await analyzeTitel(Ad1, new AdsModel());

    // Titel Merkmale
    expect(result1.titel_enthaelt_neu).to.be.equal(0);
    expect(result1.titel_enthaelt_ovp).to.be.equal(0);
    expect(result1.titel_enthaelt_verschweißt).to.be.equal(0);
    expect(result1.titel_enthaelt_ungeoeffnet).to.be.equal(0);
    expect(result1.titel_enthaelt_zeichen).to.be.equal(0);

    // Titel Antipattern
    expect(result1.ap_titel_enthaelt_gebraucht).to.be.equal(0);
    expect(result1.ap_titel_enthaelt_suche).to.be.equal(0);
    expect(result1.ap_titel_enthaelt_tausche).to.be.equal(0);
    expect(result1.ap_titel_enthaelt_sammlung).to.be.equal(0);
    expect(result1.ap_titel_enthaelt_kilo).to.be.equal(0);

    // Titel - Betrugsmerkmale enthalten
    const result2 = await analyzeTitel(Ad2, new AdsModel());

    // Titel Merkmale
    expect(result2.titel_enthaelt_neu).to.be.equal(1);
    expect(result2.titel_enthaelt_ovp).to.be.equal(1);
    expect(result2.titel_enthaelt_verschweißt).to.be.equal(1);
    expect(result2.titel_enthaelt_ungeoeffnet).to.be.equal(1);
    expect(result2.titel_enthaelt_zeichen).to.be.equal(1);

    // Titel Anitpattern
    expect(result2.ap_titel_enthaelt_gebraucht).to.be.equal(0);
    expect(result2.ap_titel_enthaelt_suche).to.be.equal(0);
    expect(result2.ap_titel_enthaelt_tausche).to.be.equal(0);
    expect(result2.ap_titel_enthaelt_sammlung).to.be.equal(0);
    expect(result2.ap_titel_enthaelt_kilo).to.be.equal(0);

    // Titel - Antipattern enthalten
    const result3 = await analyzeTitel(Ad3, new AdsModel());

    // Titel Merkmale
    expect(result3.titel_enthaelt_neu).to.be.equal(0);
    expect(result3.titel_enthaelt_ovp).to.be.equal(0);
    expect(result3.titel_enthaelt_verschweißt).to.be.equal(0);
    expect(result3.titel_enthaelt_ungeoeffnet).to.be.equal(0);
    expect(result3.titel_enthaelt_zeichen).to.be.equal(0);

    // Titel - Anitpattern
    expect(result3.ap_titel_enthaelt_gebraucht).to.be.equal(1);
    expect(result3.ap_titel_enthaelt_suche).to.be.equal(1);
    expect(result3.ap_titel_enthaelt_tausche).to.be.equal(1);
    expect(result3.ap_titel_enthaelt_sammlung).to.be.equal(1);
    expect(result3.ap_titel_enthaelt_kilo).to.be.equal(1);
  });

  test('Analyze description', async () => {
    const result1 = await analyzeBeschreibung(Ad1, new AdsModel());

    expect(result1.beschreibung_enthaelt_sepa).to.be.equal(1);
    expect(result1.beschreibung_enthaelt_ueberweisung).to.be.equal(0);
    expect(result1.beschreibung_enthaelt_versand).to.be.equal(1);
    expect(result1.beschreibung_enthaelt_neu).to.be.equal(0);
    expect(result1.beschreibung_enthaelt_ovp).to.be.equal(0);
    expect(result1.beschreibung_enthaelt_versiegelt).to.be.equal(0);
    expect(result1.beschreibung_enthaelt_whatsapp).to.be.equal(0);
    expect(result1.beschreibung_ist_kopiert_anzeige).to.be.equal(0);
    expect(result1.beschreibung_ist_kopiert_unternehmen).to.be.equal(0);
    expect(result1.ap_beschreibung_enthaelt_barzahlung).to.be.equal(0);
    expect(result1.ap_beschreibung_enthaelt_gebraucht).to.be.equal(1);
    expect(result1.ap_beschreibung_enthaelt_tausch).to.be.equal(0);
    expect(result1.ap_beschreibung_enthaelt_abholung).to.be.equal(1);
    expect(result1.ap_beschreibung_enthaelt_suche).to.be.equal(0);
    expect(result1.ap_beschreibung_enthaelt_sammleraufloesung).to.be.equal(1);
    expect(result1.ap_beschreibung_enthaelt_kilo).to.be.equal(0);

    const result2 = await analyzeBeschreibung(Ad2, new AdsModel());

    expect(result2.beschreibung_enthaelt_sepa).to.be.equal(0);
    expect(result2.beschreibung_enthaelt_ueberweisung).to.be.equal(1);
    expect(result2.beschreibung_enthaelt_versand).to.be.equal(0);
    expect(result2.beschreibung_enthaelt_neu).to.be.equal(0);
    expect(result2.beschreibung_enthaelt_ovp).to.be.equal(1);
    expect(result2.beschreibung_enthaelt_versiegelt).to.be.equal(1);
    expect(result2.beschreibung_enthaelt_whatsapp).to.be.equal(1);
    expect(result2.beschreibung_ist_kopiert_anzeige).to.be.equal(0);
    expect(result2.beschreibung_ist_kopiert_unternehmen).to.be.equal(1);
    expect(result2.ap_beschreibung_enthaelt_barzahlung).to.be.equal(0);
    expect(result2.ap_beschreibung_enthaelt_gebraucht).to.be.equal(0);
    expect(result2.ap_beschreibung_enthaelt_tausch).to.be.equal(0);
    expect(result2.ap_beschreibung_enthaelt_abholung).to.be.equal(0);
    expect(result2.ap_beschreibung_enthaelt_suche).to.be.equal(0);
    expect(result2.ap_beschreibung_enthaelt_sammleraufloesung).to.be.equal(0);
    expect(result2.ap_beschreibung_enthaelt_kilo).to.be.equal(0);

    const result3 = await analyzeBeschreibung(Ad3, new AdsModel());

    expect(result3.beschreibung_enthaelt_sepa).to.be.equal(0);
    expect(result3.beschreibung_enthaelt_ueberweisung).to.be.equal(0);
    expect(result3.beschreibung_enthaelt_versand).to.be.equal(0);
    expect(result3.beschreibung_enthaelt_neu).to.be.equal(0);
    expect(result3.beschreibung_enthaelt_ovp).to.be.equal(0);
    expect(result3.beschreibung_enthaelt_versiegelt).to.be.equal(0);
    expect(result3.beschreibung_enthaelt_whatsapp).to.be.equal(0);
    expect(result3.beschreibung_ist_kopiert_anzeige).to.be.equal(1);
    expect(result3.beschreibung_ist_kopiert_unternehmen).to.be.equal(0);
    expect(result3.ap_beschreibung_enthaelt_barzahlung).to.be.equal(0);
    expect(result3.ap_beschreibung_enthaelt_gebraucht).to.be.equal(0);
    expect(result3.ap_beschreibung_enthaelt_tausch).to.be.equal(0);
    expect(result3.ap_beschreibung_enthaelt_abholung).to.be.equal(0);
    expect(result3.ap_beschreibung_enthaelt_suche).to.be.equal(0);
    expect(result3.ap_beschreibung_enthaelt_sammleraufloesung).to.be.equal(0);
    expect(result3.ap_beschreibung_enthaelt_kilo).to.be.equal(0);
  });

  test('Analyze account', async () => {
    const result1 = await analyzeKonto(Ad1, new AdsModel());
    const result2 = await analyzeKonto(Ad2, new AdsModel());
    const result3 = await analyzeKonto(Ad3, new AdsModel());

    expect(result1.konto_antwortzeit).to.be.equal(3);
    // expect(result1.konto_anzeigen_anzahl).to.be.equal(0);
    // expect(result1.konto_anzeigen_betrugsrate).to.be.equal(0);
    // expect(result1.konto_anzeigen_gleich).to.be.equal(0);
    // expect(result1.konto_anzeigen_ueber_100).to.be.equal(0);
    // expect(result1.konto_anzeigen_verschiedene_orte).to.be.equal(0);
    expect(result1.konto_bewertung).to.be.equal(0.875);
    expect(result1.konto_erstellt_zeit).to.be.equal(1478358074000);
    expect(result1.konto_follower_anzahl).to.be.equal(-1);
    expect(result1.konto_freundlichkeit).to.be.equal(1);
    expect(result1.konto_name_enthaelt_unueblich).to.be.equal(0);
    expect(result1.konto_name_enthaelt_gmbh).to.be.equal(0);
    expect(result1.konto_name_laenge).to.be.equal(14);
    expect(result1.ap_konto_name_natuerlich).to.be.equal(1);
    expect(result1.konto_name_sonderzeichen_anzahl).to.be.equal(0);
    expect(result1.konto_privat).to.be.equal(1);
    expect(result1.konto_bewertungen_anzahl).to.be.equal(2);

    expect(result2.konto_antwortzeit).to.be.equal(3);
    // expect(result2.konto_anzeigen_anzahl).to.be.equal(0);
    // expect(result2.konto_anzeigen_betrugsrate).to.be.equal(0);
    // expect(result2.konto_anzeigen_gleich).to.be.equal(0);
    // expect(result2.konto_anzeigen_ueber_100).to.be.equal(0);
    // expect(result2.konto_anzeigen_verschiedene_orte).to.be.equal(0);
    expect(result2.konto_bewertung).to.be.equal(0.875);
    expect(result2.konto_erstellt_zeit).to.be.equal(1478358074000);
    expect(result2.konto_follower_anzahl).to.be.equal(-1);
    expect(result2.konto_freundlichkeit).to.be.equal(1);
    expect(result2.konto_name_enthaelt_unueblich).to.be.equal(1);
    expect(result2.konto_name_laenge).to.be.equal(8);
    expect(result2.konto_name_enthaelt_gmbh).to.be.equal(0);
    expect(result2.ap_konto_name_natuerlich).to.be.equal(0);
    expect(result2.konto_name_sonderzeichen_anzahl).to.be.equal(0);
    expect(result2.konto_privat).to.be.equal(1);
    expect(result2.konto_bewertungen_anzahl).to.be.equal(2);

    expect(result3.konto_antwortzeit).to.be.equal(3);
    // expect(result3.konto_anzeigen_anzahl).to.be.equal(0);
    // expect(result3.konto_anzeigen_betrugsrate).to.be.equal(0);
    // expect(result3.konto_anzeigen_gleich).to.be.equal(0);
    // expect(result3.konto_anzeigen_ueber_100).to.be.equal(0);
    // expect(result1.konto_anzeigen_verschiedene_orte).to.be.equal(0);
    expect(result3.konto_bewertung).to.be.equal(0.875);
    expect(result3.konto_erstellt_zeit).to.be.equal(1478358074000);
    expect(result3.konto_follower_anzahl).to.be.equal(-1);
    expect(result3.konto_freundlichkeit).to.be.equal(1);
    expect(result3.konto_name_enthaelt_unueblich).to.be.equal(0);
    expect(result3.konto_name_laenge).to.be.equal(19);
    expect(result3.konto_name_enthaelt_gmbh).to.be.equal(1);
    expect(result3.ap_konto_name_natuerlich).to.be.equal(1);
    expect(result3.konto_name_sonderzeichen_anzahl).to.be.equal(0);
    expect(result3.konto_privat).to.be.equal(1);
    expect(result3.konto_bewertungen_anzahl).to.be.equal(2);
  });

  test('Analyze price', async () => {
    // Preis - keine Merkmale enthalten
    const result1 = await analyzePreis(Ad1, new AdsModel());
    expect(result1.preis_unter_marktwert).to.be.equal(2);
    expect(result1.preis_abweichung_marktwert).to.be.equal(0);
    expect(result1.preis_waehrung_eur).to.be.equal(0);
    expect(result1.preis_typ_vb).to.be.equal(0);
    expect(result1.ap_preis_ist_leer).to.be.equal(0);

    // Preis - Merkmale enthalten
    const result2 = await analyzePreis(Ad2, new AdsModel());
    expect(result2.preis_unter_marktwert).to.be.equal(1);
    expect(result2.preis_abweichung_marktwert).to.be.equal(-0.5);
    expect(result2.preis_waehrung_eur).to.be.equal(1);
    expect(result2.preis_typ_vb).to.be.equal(1);
    expect(result2.ap_preis_ist_leer).to.be.equal(0);

    // Preis - Antipattern enthalten
    const result3 = await analyzePreis(Ad3, new AdsModel());
    expect(result3.preis_unter_marktwert).to.be.equal(0);
    expect(result3.preis_abweichung_marktwert).to.be.equal(0);
    expect(result3.preis_waehrung_eur).to.be.equal(1);
    expect(result3.preis_typ_vb).to.be.equal(0);
    expect(result3.ap_preis_ist_leer).to.be.equal(1);
  });

  test('Analyze metadaten', async () => {
    const result1 = await analyzeMetadaten(Ad1, new AdsModel());

    expect(result1.metadaten_breitengrad).to.be.equal(48.64);
    expect(result1.metadaten_laengengrad).to.be.equal(9.3557);
    expect(result1.metadaten_kategorie).to.be.equal(23);
    expect(result1.metadaten_anzahl_bilder).to.be.equal(1);
    expect(result1.metadaten_telefonnummer).to.be.equal(1);
    expect(result1.metadaten_anzeige_zeit).to.be.equal(1614434831000);

    const result2 = await analyzeMetadaten(Ad2, new AdsModel());

    expect(result2.metadaten_breitengrad).to.be.equal(4.664);
    expect(result2.metadaten_laengengrad).to.be.equal(79.557);
    expect(result2.metadaten_kategorie).to.be.equal(44);
    expect(result2.metadaten_anzahl_bilder).to.be.equal(1);
    expect(result2.metadaten_telefonnummer).to.be.equal(0);
    expect(result2.metadaten_anzeige_zeit).to.be.equal(1614434831000);

    const result3 = await analyzeMetadaten(Ad3, new AdsModel());

    expect(result3.metadaten_breitengrad).to.be.equal(55.23);
    expect(result3.metadaten_laengengrad).to.be.equal(15.328);
    expect(result3.metadaten_kategorie).to.be.equal(176);
    expect(result3.metadaten_anzahl_bilder).to.be.equal(1);
    expect(result3.metadaten_telefonnummer).to.be.equal(1);
    expect(result3.metadaten_anzeige_zeit).to.be.equal(1614434831000);
  });

  test('Analyze misc.', async () => {
    const result1 = await analyzeSonstiges(Ad1, new AdsModel());

    expect(result1.sonstiges_anzeige_kopiert).to.be.equal(0);
    // expect(result1.ap_sonstiges_anzeige_nur_abholung).to.be.equal(1);
    expect(result1.ap_sonstiges_anzeige_suche).to.be.equal(0);
    expect(result1.ap_sonstiges_anzeige_zeit_tag).to.be.equal(1);
    expect(result1.sonstiges_kategorie_unpassend).to.be.equal(0);

    const result2 = await analyzeSonstiges(Ad2, new AdsModel());

    expect(result2.sonstiges_anzeige_kopiert).to.be.equal(0);
    // expect(result2.ap_sonstiges_anzeige_nur_abholung).to.be.equal(0);
    expect(result2.ap_sonstiges_anzeige_suche).to.be.equal(1);
    expect(result2.ap_sonstiges_anzeige_zeit_tag).to.be.equal(1);
    expect(result2.sonstiges_kategorie_unpassend).to.be.equal(1);

    const result3 = await analyzeSonstiges(Ad3, new AdsModel());

    expect(result3.sonstiges_anzeige_kopiert).to.be.equal(1);
    // expect(result3.ap_sonstiges_anzeige_nur_abholung).to.be.equal(1);
    expect(result3.ap_sonstiges_anzeige_suche).to.be.equal(1);
    expect(result3.ap_sonstiges_anzeige_zeit_tag).to.be.equal(1);
    expect(result3.sonstiges_kategorie_unpassend).to.be.equal(1);
  });

  test('Evaluate', async () => {
    // Ad 1
    const result1 = await analyze(Ad1);
    expect(result1.fraud_score).to.be.equal(-20.28);
    expect(result1.pattern_anzahl_gesamt).to.be.equal(44);
    expect(result1.pattern_anzahl_zutreffend).to.be.equal(2);
    expect(result1.pattern_score).to.be.equal(7);
    expect(result1.pattern_gesamtscore).to.be.equal(141);
    expect(result1.antipattern_anzahl_gesamt).to.be.equal(24);
    expect(result1.antipattern_anzahl_zutreffend).to.be.equal(7);
    expect(result1.antipattern_score).to.be.equal(26);
    expect(result1.antipattern_gesamtscore).to.be.equal(103);
    // Ad 2
    const result2 = await analyze(Ad2);
    // expect(result2.fraud_score).to.be.equal(43.48); ohne Ausschlusskriterien
    expect(result2.fraud_score).to.be.equal(-100);
    expect(result2.pattern_anzahl_gesamt).to.be.equal(44);
    expect(result2.pattern_anzahl_zutreffend).to.be.equal(23);
    expect(result2.pattern_score).to.be.equal(75);
    expect(result2.pattern_gesamtscore).to.be.equal(141);
    expect(result2.antipattern_anzahl_gesamt).to.be.equal(24);
    expect(result2.antipattern_anzahl_zutreffend).to.be.equal(2);
    expect(result2.antipattern_score).to.be.equal(10);
    expect(result2.antipattern_gesamtscore).to.be.equal(103);
    // Ad 3
    const result3 = await analyze(Ad3);
    // expect(result3.fraud_score).to.be.equal(-29.69); ohne Ausschlusskriterien
    expect(result3.fraud_score).to.be.equal(-100); 
    expect(result3.pattern_anzahl_gesamt).to.be.equal(44);
    expect(result3.pattern_anzahl_zutreffend).to.be.equal(4);
    expect(result3.pattern_score).to.be.equal(17);
    expect(result3.pattern_gesamtscore).to.be.equal(141);
    expect(result3.antipattern_anzahl_gesamt).to.be.equal(24);
    expect(result3.antipattern_anzahl_zutreffend).to.be.equal(10);
    expect(result3.antipattern_score).to.be.equal(43);
    expect(result3.antipattern_gesamtscore).to.be.equal(103);
  });

  test('Analyze all', async () => {}, 1000000);
});
