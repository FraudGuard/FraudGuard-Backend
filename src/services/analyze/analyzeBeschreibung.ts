import { AdsFromEbaySchema } from '../../api/models';
import { logger } from '../../shared';

export const analyzeBeschreibung = async (ad: AdsFromEbaySchema) => {
  logger.info('analyze Beschreibung');

  const beschreibung_enthaelt_ueberweisung = ad;
  const beschreibung_enthaelt_versand = ad;
  const beschreibung_ist_kopiert_Unternehmen = ad;
  const beschreibung_enthaelt_ovp = ad;
  const beschreibung_ist_kopiert_anzeige = ad;
  const ap_beschreibung_enthaelt_barzahlung = ad;
  const ap_beschreibung_enthaelt_gebraucht = ad;
  const ap_beschreibung_enthaelt_tausch = ad;
  const ap_beschreibung_enthaelt_suche = ad;
  const ap_beschreibung_enthaelt_sammleraufloesung = ad;
  const beschreibung_enthaelt_whatsapp = ad;

  const resultingAd = {
    beschreibung_enthaelt_ueberweisung,
    beschreibung_enthaelt_versand,
    beschreibung_ist_kopiert_Unternehmen,
    beschreibung_enthaelt_ovp,
    beschreibung_ist_kopiert_anzeige,
    ap_beschreibung_enthaelt_barzahlung,
    ap_beschreibung_enthaelt_gebraucht,
    ap_beschreibung_enthaelt_tausch,
    ap_beschreibung_enthaelt_suche,
    ap_beschreibung_enthaelt_sammleraufloesung,
    beschreibung_enthaelt_whatsapp,
  };

  return resultingAd;
};
