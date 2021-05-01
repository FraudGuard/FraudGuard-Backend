import { AdsFromEbaySchema, AdsSchema } from '../../models';
import { logger } from '../../shared';

export const analyzeKonto = async (
  ad: AdsFromEbaySchema,
  resultingAd: AdsSchema,
) => {
  logger.info('analyze Konto');

  const badgesMap: any = {};
  ad.userBadges?.[0]?.badges?.forEach((x) => (badgesMap[x.name] = x));

  resultingAd.konto_rating = badgesMap?.rating?.level
    ? Number.parseInt(badgesMap.rating.level)
    : -1;
  resultingAd.konto_follower_anzahl = badgesMap?.followers?.value
    ? Number.parseInt(badgesMap.followers.value)
    : -1;
  resultingAd.konto_antwortzeit = badgesMap?.replySpeed?.value
    ? Number.parseInt(badgesMap.replySpeed.value)
    : -1;
  resultingAd.konto_antwortrate = badgesMap?.replyRate?.value
    ? Number.parseInt(badgesMap.replyRate.value)
    : -1;
  resultingAd.konto_freundlichkeit = badgesMap?.replyRate?.value
    ? Number.parseInt(badgesMap.replyRate.value)
    : -1;
  resultingAd.konto_bewertung = ad['user-rating'].averageRating.value;
  resultingAd.konto_name_laenge = ad['contact-name']?.value?.length;
  resultingAd.konto_gewerblich =
    ad['seller-account-type'].value === 'PRIVATE' ? 0 : 1;
  resultingAd.konto_privat =
    ad['seller-account-type'].value === 'PRIVATE' ? 1 : 0;

  // resultingAd.konto_erstellt_timestamp = ad.

  // resultingAd.konto_anzeigen_anzahl = ad.
  // resultingAd.konto_anzeigen_betrugsrate = ad.
  // resultingAd.konto_anzeigen_ueber_100 = ad.
  //   resultingAd.konto_anzeigen_gleich = ad.

  // resultingAd.konto_name_sonderzeichen_anzahl = ad.
  // resultingAd.konto_name_enthaelt_unueblich = ad.
  // resultingAd.konto_name_natuerlich = ad.
};
