import { AdsFromEbaySchema, AdsSchema } from '../../models';
import { logger } from '../../shared';

export const analyzeTitel = (ad: AdsFromEbaySchema, resultingAd: AdsSchema) =>
  new Promise((resolve, reject) => {
    try {
      logger.info('start analyze Titel');
      const wordListNeu = ["new", "neu", "nie ausgepackt", "unbenutzt"];

      resultingAd.titel_enthaelt_neu = 0
      const str = ad['title'].value.toLowerCase();
      for (const w of wordListNeu) {
        if (str.includes(w)) {
          resultingAd.titel_enthaelt_neu = 1
        }
      }




      resultingAd.titel_enthaelt_ovp; {
        const str = ad['title'].value.toLowerCase();

        if (str.includes("ovp" || "originalverpackt" || "original" || "originalverpackung")) {
          resultingAd.titel_enthaelt_ovp = 1
        }
        else {
          resultingAd.titel_enthaelt_ovp = 0
        }
      }
      /*
      resultingAd.titel_enthaelt_ungeoeffnet =
      resultingAd.titel_enthaelt_verschweißt =
      resultingAd.titel_enthaelt_zeichen =
      resultingAd.ap_titel_enthaelt_gebraucht =
      resultingAd.ap_titel_enthaelt_tausche =
      resultingAd.ap_titel_enthaelt_suche =
      resultingAd.ap_titel_enthaelt_sammlung =
      resultingAd.ap_titel_enthaelt_kilo =
          */

      resultingAd.title = ad.title.value;
      if (false) {
        reject(new Error('Some Error happened'));
      }
      resolve(ad);
    } catch (e) {
      reject(e)
    }
  });
