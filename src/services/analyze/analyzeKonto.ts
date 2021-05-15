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
  const adsFromAccount = await getAllByAccount(
    ad['user-id']?.value?.toString(),
  ).catch(() => logger.info('noAccountFound'));

  const badgesMap: any = {};
  ad.userBadges[0]?.badges?.forEach((x) => (badgesMap[x.name] = x));

  // Anzahl der Kontobewertungen
  resultingAd.konto_bewertungen_anzahl = badgesMap?.rating?.level
    ? Number.parseInt(badgesMap.rating.level)
    : -1;

  // Anzahl der Follower
  resultingAd.konto_follower_anzahl =
    badgesMap?.followers?.value !== null &&
    badgesMap?.followers?.value !== undefined
      ? Number.parseInt(badgesMap.followers.value)
      : -1;

  // Konto Anwortzeit in Minuten
  resultingAd.konto_antwortzeit =
    badgesMap?.replySpeed?.value !== null &&
    badgesMap?.replySpeed?.value !== undefined
      ? Number.parseInt(badgesMap.replySpeed.value)
      : -1;

  // Konto Anwortrate
  resultingAd.konto_antwortrate =
    badgesMap?.replyRate?.value !== null &&
    badgesMap?.replyRate?.value !== undefined
      ? Number.parseInt(badgesMap.replyRate.value)
      : -1;

  // Konto Freundlichkeitsrate in Leveln
  resultingAd.konto_freundlichkeit =
    badgesMap?.friendliness?.level !== null &&
    badgesMap?.friendliness?.level !== undefined
      ? Number.parseInt(badgesMap.friendliness.level)
      : -1;

  // Konto Bewertung
  resultingAd.konto_bewertung = ad['user-rating']?.averageRating?.value
    ? Number.parseFloat(ad['user-rating']?.averageRating?.value)
    : -1;

  // Länge des Kontonamens
  resultingAd.konto_name_laenge = ad['contact-name']?.value?.length ?? -2;
  // langform
  // if(ad && ad['contact-name'] && ad['contact-name']?.value && ad['contact-name']?.value?.length){
  //   resultingAd.konto_name_laenge = ad['contact-name']?.value?.length;
  // }else{
  //   resultingAd.konto_name_laenge = undefined
  // }

  // prüfen ob Konto privat ist
  resultingAd.konto_privat =
    ad['seller-account-type'].value === 'PRIVATE' ? 1 : 0;
  // langform
  // if (ad['seller-account-type'].value === 'PRIVATE') {
  //   resultingAd.konto_privat = 1
  // } else {
  //   resultingAd.konto_privat = 0
  // }

  // prüfen ob Sonderzeichen im Namen enthalten sind
  const foundSpecialChars = ad['contact-name'].value.match(
    /[@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g,
  );
  resultingAd.konto_name_sonderzeichen_anzahl = foundSpecialChars?.length ?? 0;

  // Gibt die Millisekunden seit dem 1. Januar 1970 zurück
  resultingAd.konto_erstellt_zeit = new Date(
    ad['user-since-date-time'].value,
  ).getTime();

  // prüfen ob Kontoname natürlich
  resultingAd.ap_konto_name_natuerlich = firstNames.find((x) =>
    ad['contact-name'].value
      .toLocaleLowerCase()
      .includes(x.toLocaleLowerCase()),
  )
    ? 1
    : 0;

  // prüfen ob Kontoname ein unüblicher Name ist
  resultingAd.konto_name_enthaelt_unueblich = countries.find((x) =>
    ad['contact-name'].value
      .toLocaleLowerCase()
      .includes(x.name.toLocaleLowerCase()),
  )
    ? 1
    : 0;

  resultingAd.konto_anzeigen_anzahl = adsFromAccount
    ? adsFromAccount.length
    : 0;
  resultingAd.konto_anzeigen_ueber_100 =
    adsFromAccount instanceof Array
      ? adsFromAccount?.filter(
          (x) => Number.parseFloat(x.price?.amount?.value) > 100,
        ).length ?? 0
      : 0;

  resultingAd.konto_anzeigen_gleich = 0;
  if (adsFromAccount) {
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
