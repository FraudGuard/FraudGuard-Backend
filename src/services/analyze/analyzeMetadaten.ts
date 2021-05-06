import { AdsSchema } from '../../api/models';
import { logger } from '../../shared';

export const analyzeMetadaten = (
  ad: any,
  resultingAd: AdsSchema,
): Promise<AdsSchema> =>
  new Promise((resolve, reject) => {
    logger.info('start analyze Metadaten');

    resultingAd.metadata_latitude = parseInt(ad['ad-address'].latitude, 10);
    console.log(resultingAd.metadata_latitude);

    resultingAd.metadata_longitude = parseInt(ad['ad-address'].longitude, 10);
    resultingAd.metadata_category = parseInt(ad.category.id, 10);
    resultingAd.metadata_amount_pictures = ad.pictures.picture.length;
    resultingAd.metadata_phone = ad?.phone ? 1 : 0;
    resultingAd.metadata_startDateTime = new Date(
      ad['start-date-time'].value,
    ).getTime();

    if (false) {
      reject(new Error('Some Error happened'));
    }
    resolve(resultingAd);
  });
