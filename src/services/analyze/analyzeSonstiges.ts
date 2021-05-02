import { AdsFromEbayModel, AdsFromEbaySchema, AdsSchema } from '../../models';
import { logger } from '../../shared';

export const analyzeSonstiges = (
  ad: AdsFromEbaySchema,
  resultingAd: AdsSchema,
) =>
  new Promise(async (resolve, reject) => {
    logger.info('start analyze Sonstiges');

    const res = await AdsFromEbayModel.find({ "title.value": ad.title.value, "description.value": ad.description.value })
    if (res) {
      resultingAd.sonstiges_anzeige_kopiert = res.length > 1 ? 1 : 0
    }

    resultingAd.ap_sonstiges_anzeige_zeit_tag = 0
    var yesterday = new Date().getTime() - (24 * 60 * 60 * 1000)
    var start = new Date(ad['start-date-time'].value).getTime()
    if (yesterday > start) {
      resultingAd.ap_sonstiges_anzeige_zeit_tag = 1
    }

    resultingAd.ap_sonstiges_anzeige_nur_abholung = 0
    for (const a of ad.attributes[0].attribute) {
      if (a['localized-label'] == "Versand") {
        if (a.value[0]['localized-label'] == 'Nur Abholung') {
          resultingAd.ap_sonstiges_anzeige_nur_abholung = 1;
        }
      }
    }

    resultingAd.ap_sonstiges_anzeige_suche = ad['ad-type'].value === 'WANTED' ? 1 : 0

    if (false) {
      reject(new Error('Some Error happened'));
    }
    resolve(ad);
  });
