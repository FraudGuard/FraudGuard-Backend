import { AdsSchema } from '../../api/models';
import { logger } from '../../shared';

export const analyzeMetadaten = (
  ad: any,
  resultingAd: AdsSchema,
): Promise<AdsSchema> =>
  new Promise((resolve, reject) => {
    logger.info('start analyze Metadaten');

    resultingAd.metadaten_breitengrad = parseFloat(
      ad['ad-address'].latitude.value,
    );

    resultingAd.metadaten_laengengrad = parseFloat(
      ad['ad-address'].longitude.value,
    );
    resultingAd.metadaten_kategorie = parseInt(ad.category.id, 10);
    resultingAd.metadaten_anzahl_bilder = ad.pictures?.picture?.length ?? 0;
    resultingAd.metadaten_telefonnummer = ad?.phone?.value ? 1 : 0;
    resultingAd.metadaten_anzeige_zeit = new Date(
      ad['start-date-time'].value,
    ).getTime();

    if (false) {
      reject(new Error('Some Error happened'));
    }
    resolve(resultingAd);
  });
