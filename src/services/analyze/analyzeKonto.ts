import { AdsFromEbaySchema, AdsSchema } from '../../api/models';
import { logger } from '../../shared';
import { getAllByAccount } from '../ebay/getAllByAccount';
import firstNames from '../../assets/data/firstNames.json';
import countries from '../../assets/data/world.json';
import cities from '../../assets/data/cities.json';
import { analyze } from './analyze';

/**
 * Funktion welche die Anzeige auf Eigenschaften vom Typ Konto prüft
 * @param {ad} ad - Anzeige welche von der eBay-Kleinanzeigen Api kommt
 * @param {resultingAd} resultingAd - Transformierte eBay-Kleinanzeigen Anzeige
 * @return {Promise<AdsSchema>} Returned das resolved resultingAd
 */
export const analyzeKonto = async (
  ad: AdsFromEbaySchema,
  resultingAd: AdsSchema,
) => {
  logger.info('analyze Konto');
  // console.log(ad['user-id'])
  const adsFromAccount = await getAllByAccount(ad['user-id']?.value).catch(() =>
    logger.info('noAccountFound'),
  );

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

  // Kontoname enthält GmbH
  resultingAd.konto_name_enthaelt_gmbh =
    ad['contact-name']?.value?.toLowerCase()?.indexOf('gmbh') > -1 ? 1 : 0;

  // prüfen ob Konto privat ist
  resultingAd.konto_privat =
    ad['seller-account-type'].value === 'PRIVATE' ? 1 : 0;

  // prüfen ob Sonderzeichen im Namen enthalten sind
  const foundSpecialChars = ad['contact-name'].value.match(
    /[@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]/g,
  );
  resultingAd.konto_name_sonderzeichen_anzahl = foundSpecialChars?.length ?? 0;

  // Gibt die Millisekunden seit dem 1. Januar 1970 zurück
  resultingAd.konto_erstellt_zeit = new Date(
    ad['user-since-date-time'].value,
  ).getTime();

  // prüfen ob Kontoname natürlich
  resultingAd.ap_konto_name_natuerlich = 0;
  const str1 = ad['contact-name'].value.toLowerCase();
  for (const f of firstNames) {
    if (str1.includes(f.toLowerCase())) {
      resultingAd.ap_konto_name_natuerlich = 1;
    }
  }

  // prüfen ob Kontoname ein unüblicher Name ist
  const zahlen = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  resultingAd.konto_name_enthaelt_unueblich = 0;
  const str = ad['contact-name'].value.toLowerCase();
  for (const z of zahlen) {
    if (str.includes(z)) {
      resultingAd.konto_name_enthaelt_unueblich = 1;
    }
  }
  for (const c of countries) {
    if (str.includes(c.name)) {
      resultingAd.konto_name_enthaelt_unueblich = 1;
    }
  }
  for (const s of cities) {
    if (str.includes(s.name)) {
      resultingAd.konto_name_enthaelt_unueblich = 1;
    }
  }

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
  let betrugsrate_summe = 0;
  const verschiedene_orte_anzeigen:any = {
    [ad['ad-address']['zip-code'].value]: true
  };
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

      if (adFromAccount['ad-address']['zip-code'].value) {
        verschiedene_orte_anzeigen[adFromAccount['ad-address']['zip-code'].value] = true;
      }

      const analyzeResult = await analyze(adFromAccount, true);
      if (analyzeResult) {
        betrugsrate_summe += analyzeResult.fraud_score;
      }
    }

    // berechnen der durchschnittlichen Betrugsrate
    resultingAd.konto_anzeigen_betrugsrate =
      betrugsrate_summe / resultingAd.konto_anzeigen_anzahl;

    // eintragen der Anzahl der verschiedenen Orte
    resultingAd.konto_anzeigen_verschiedene_orte = Object.keys(verschiedene_orte_anzeigen).length - 1
  }

  return resultingAd;
};
