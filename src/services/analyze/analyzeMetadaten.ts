import { AdsEbaySchema } from '../../api/models';
import { logger } from '../../shared';

export const analyzeMetadaten = async (ad: AdsEbaySchema) => {
  logger.info('analyze Metadaten');
  logger.info(ad['start-date-time'].value);
  logger.info('Date: ' + new Date(ad['start-date-time'].value).getTime());

  const metadata_latitude = ad['ad-address'].latitude.value;
  const metadata_longitude = ad['ad-address'].longitude.value;
  const metadata_category = ad.category.id;
  const metadata_amount_pictures = ad.pictures.picture.length;
  const metadata_phone = ad?.phone ? 1 : 0;
  const metadata_startDateTime = new Date(
    ad['start-date-time'].value,
  ).getTime();

  const resultingAd = {
    metadata_latitude,
    metadata_longitude,
    metadata_category,
    metadata_amount_pictures,
    metadata_phone,
    metadata_startDateTime,
  };

  return resultingAd;
};
