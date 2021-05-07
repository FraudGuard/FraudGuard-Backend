import { AdsFromEbaySchema, AdsSchema } from '../../api/models';
import { logger } from '../../shared';
import { getAllByAccount } from '../ebay/getAllByAccount';
import firstNames from '../../assets/data/firstNames.json';
import countries from '../../assets/data/world.json';

export const analyzeKonto = async (
  ad: AdsFromEbaySchema,
  resultingAd: AdsSchema,
) => {
  logger.info('analyze Konto');
  const adsFromAccount = await getAllByAccount(ad['user-id'].value.toString());

  const badgesMap: any = {};
  ad.userBadges[0]?.badges?.forEach((x) => (badgesMap[x.name] = x));

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
    ? Number.parseInt(badgesMap.friendliness.level)
    : -1;

  resultingAd.konto_bewertung = ad['user-rating']?.averageRating?.value
    ? Number.parseFloat(ad['user-rating']?.averageRating?.value)
    : -1;

  resultingAd.konto_name_laenge = ad['contact-name']?.value?.length;
  // langform
  // if(ad && ad['contact-name'] && ad['contact-name']?.value && ad['contact-name']?.value?.length){
  //   resultingAd.konto_name_laenge = ad['contact-name']?.value?.length;
  // }else{
  //   resultingAd.konto_name_laenge = undefined
  // }

  resultingAd.konto_privat =
    ad['seller-account-type'].value === 'PRIVATE' ? 1 : 0;
  // langform
  // if (ad['seller-account-type'].value === 'PRIVATE') {
  //   resultingAd.konto_privat = 1
  // } else {
  //   resultingAd.konto_privat = 0
  // }
  const foundSpecialChars = ad['contact-name'].value.match(
    /[@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g,
  );
  resultingAd.konto_name_sonderzeichen_anzahl = foundSpecialChars?.length ?? 0;

  resultingAd.konto_erstellt_timestamp = new Date(
    ad['user-since-date-time'].value,
  ).getTime();

  resultingAd.konto_name_natuerlich = firstNames.find((x) =>
    ad['contact-name'].value
      .toLocaleLowerCase()
      .includes(x.toLocaleLowerCase()),
  )
    ? 1
    : 0;
  resultingAd.konto_name_enthaelt_unueblich = countries.find((x) =>
    ad['contact-name'].value
      .toLocaleLowerCase()
      .includes(x.name.toLocaleLowerCase()),
  )
    ? 1
    : 0;

  if (adsFromAccount) {
    resultingAd.konto_anzeigen_anzahl = adsFromAccount.length;
    resultingAd.konto_anzeigen_ueber_100 = adsFromAccount.filter(
      (x) => Number.parseFloat(x.price.amount.value) > 100,
    ).length;

    resultingAd.konto_anzeigen_gleich = 0;
    for (const adFromAccount of adsFromAccount) {
      if (
        adFromAccount.title.value.includes(
          ad.title.value.toLocaleLowerCase(),
        ) &&
        adFromAccount.description.value.includes(
          ad.description.value.toLocaleLowerCase(),
        )
      ) {
        ++resultingAd.konto_anzeigen_gleich;
      }
    }
  }

  // Todo
  // resultingAd.konto_anzeigen_betrugsrate = ad.

  return resultingAd;
};
