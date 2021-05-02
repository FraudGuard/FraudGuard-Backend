import { AdsFromEbaySchema, AdsSchema } from '../../models';
import { logger } from '../../shared';

export const analyzeBeschreibung = (
  ad: AdsFromEbaySchema,
  resultingAd: AdsSchema,
) =>
  new Promise((resolve, reject) => {
    logger.info('start analyze Beschreibung');

   /* var ueberweisung_signalwoerter = ["überweisung", "ueberweisung", "sepa-überweisung", "sepa-ueberwesiung", "überweisen", "ueberweisen","sepa" ];

    var enthaelt_signalwort = 0
    for ( var signalwort of ueberweisung_signalwoerter){
        var x = ad['description']?.value?.toLowerCase()
        if (x.includes(signalwort) ){ enthaelt_signalwort = 1}
    }
    resultingAd.beschreibung_enthaelt_ueberweisung = enthaelt_signalwort*/


    resultingAd.fraud_score += 0.1;
    if (false) {
      reject(new Error('Some Error happened'));
    }
    resolve(ad);
  });
