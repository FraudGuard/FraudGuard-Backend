import { AdsFromEbayModel, AdsSchema } from '../../api/models';
import { logger } from '../../shared';

export const analyzeSonstiges = (
  ad: any,
  resultingAd: AdsSchema,
): Promise<AdsSchema> =>
  new Promise(async (resolve, reject) => {
    logger.info('start analyze Sonstiges');

    const res = await AdsFromEbayModel.find({
      'title.value': ad.title.value,
      'description.value': ad.description.value,
    });

    // Anzeige kopiert
    if (res) {
      resultingAd.sonstiges_anzeige_kopiert = res.length > 1 ? 1 : 0;
    }

    // Antipattern: Anzeige länger als einen Tag online
    resultingAd.ap_sonstiges_anzeige_zeit_tag = 0;
    const yesterday = new Date().getTime() - 24 * 60 * 60 * 1000;
    const start = new Date(ad['start-date-time'].value).getTime();
    if (yesterday > start) {
      resultingAd.ap_sonstiges_anzeige_zeit_tag = 1;
    }

    // Antipaatern: Nur Abholung in der Detailangabe
    resultingAd.ap_sonstiges_anzeige_nur_abholung = 0;
    for (const a of ad.attributes[0].attribute) {
      if (a['localized-label'] == 'Versand') {
        if (a.value[0]['localized-label'] == 'Nur Abholung') {
          resultingAd.ap_sonstiges_anzeige_nur_abholung = 1;
        }
      }
    }

    // Antipattern: Anzeige ist eine Suchanzeige
    resultingAd.ap_sonstiges_anzeige_suche =
      ad['ad-type'].value === 'WANTED' ? 1 : 0;

    if (false) {
      reject(new Error('Some Error happened'));
    }
    resolve(resultingAd);
  });
