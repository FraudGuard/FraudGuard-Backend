import { AdsFromEbaySchema, AdsSchema } from '../../models';
import { logger } from '../../../shared';

export const analyzeMetadaten = (
  ad: AdsFromEbaySchema,
  resultingAd: AdsSchema,
) =>
  new Promise((resolve, reject) => {
    logger.info('start analyze Metadaten');

    resultingAd.metadata_latitude = ad['ad-address'].latitude;
    resultingAd.metadata_longitude = ad['ad-address'].longitude;
    resultingAd.metadata_category = ad.category.id;
    resultingAd.metadata_amount_pictures = ad.pictures.picture.length;
    resultingAd.metadata_phone = ad?.phone ? 1 : 0;
    resultingAd.metadata_startDateTime = new Date(
      ad['start-date-time'].value,
    ).getTime();

    if (false) {
      reject(new Error('Some Error happened'));
    }
    resolve(ad);
  });
