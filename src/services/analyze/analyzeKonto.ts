import { AdsFromEbaySchema } from '../../api/models';
import { logger } from '../../shared';

export const analyzeKonto = async (ad: AdsFromEbaySchema) => {
  logger.info('analyze Konto');

  const badgesMap: any = {};
  ad.userBadges?.[0]?.badges?.forEach((x) => (badgesMap[x.name] = x));

  const konto_rating = badgesMap?.rating?.level
    ? Number.parseInt(badgesMap.rating.level)
    : -1;
  const konto_follower_anzahl = badgesMap?.followers?.value
    ? Number.parseInt(badgesMap.followers.value)
    : -1;
  const konto_antwortzeit = badgesMap?.replySpeed?.value
    ? Number.parseInt(badgesMap.replySpeed.value)
    : -1;
  const konto_antwortrate = badgesMap?.replyRate?.value
    ? Number.parseInt(badgesMap.replyRate.value)
    : -1;
  const konto_freundlichkeit = badgesMap?.replyRate?.value
    ? Number.parseInt(badgesMap.replyRate.value)
    : -1;
  const konto_bewertung = ad['user-rating']?.averageRating?.value;
  const konto_privat = ad['seller-account-type'].value === 'PRIVATE' ? 1 : 0;

  const resultingAd = {
    konto_rating,
    konto_follower_anzahl,
    konto_antwortzeit,
    konto_antwortrate,
    konto_freundlichkeit,
    konto_bewertung,
    konto_privat,
  };

  return resultingAd;

  // const konto_name_laenge = ad['contact-name']?.value?.length;
  // // langform
  // // if(ad && ad['contact-name'] && ad['contact-name']?.value && ad['contact-name']?.value?.length){
  // //   resultingAd.konto_name_laenge = ad['contact-name']?.value?.length;
  // // }else{
  // //   resultingAd.konto_name_laenge = undefined
  // // }

  // langform
  // if (ad['seller-account-type'].value === 'PRIVATE') {
  //   resultingAd.konto_privat = 1
  // } else {
  //   resultingAd.konto_privat = 0
  // }

  // Todo
  // resultingAd.konto_erstellt_timestamp = ad.
  // konto id resultingAd.konto_id = ad['user-id'].value;
  // resultingAd.konto_anzeigen_anzahl = ad.
  // resultingAd.konto_anzeigen_betrugsrate = ad.
  // resultingAd.konto_anzeigen_ueber_100 = ad.
  //   resultingAd.konto_anzeigen_gleich = ad.

  // resultingAd.konto_name_sonderzeichen_anzahl = ad.
  // resultingAd.konto_name_enthaelt_unueblich = ad.
  // resultingAd.konto_name_natuerlich = ad.
};
