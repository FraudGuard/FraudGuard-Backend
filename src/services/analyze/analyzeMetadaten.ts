import { AdsSchema } from '../../api/models';
import { logger } from '../../shared';

export const analyzeMetadaten = (
  ad: any,
  resultingAd: AdsSchema,
): Promise<AdsSchema> =>
  new Promise((resolve, reject) => {
    logger.info('start analyze Metadaten');

    resultingAd.metadata_latitude = parseFloat(ad['ad-address'].latitude.value);

    resultingAd.metadata_longitude = parseFloat(
      ad['ad-address'].longitude.value,
    );
    resultingAd.metadata_category = parseInt(ad.category.id, 10);
    resultingAd.metadata_amount_pictures = ad.pictures.picture.length;
    resultingAd.metadata_phone = ad?.phone.value ? 1 : 0;
    resultingAd.metadata_startDateTime = new Date(
      ad['start-date-time'].value,
    ).getTime();

    if (false) {
      reject(new Error('Some Error happened'));
    }
    resolve(resultingAd);
  });
