import { AdsFromEbaySchema, AdsSchema } from '../../models';
import { connectDB, logger } from '../../shared';

export const analyzePreis = (ad: AdsFromEbaySchema, resultingAd: AdsSchema) =>
  new Promise((resolve, reject) => {
    logger.info('start analyze Preis');
    resultingAd.fraud_score += 0.1;

    // Abgleich mit Durchschnittswert des Produkts auf eBay WIP
    // const produkt_aus_titel = ad.title.value;

    // if (produkt_aus_titel.includes('lego')){
    //const num = produkt_aus_titel.replace(/^\D+|\D+$/g, "");}

  

    resultingAd.preis_unter_marktwert = ad.price?.amount?.value;

    // Prozentwert der Abweichung von Amount und Marktwert WIP
    resultingAd.preis_abweichung_marktwert = ad.price?.amount?.value;
    
    resultingAd.preis_waehrung_eur = ad.price['currency-iso-code'].value === 'EUR' ? 0 : 1;
    resultingAd.preis_typ_vb = ad.price['price-type'].value === 'PLEASE_CONTACT' ? 0 : 1;
    resultingAd.ap_preis_ist_leer = ad.price?.amount?.value === 0 ? 0 : 1;

    if (false) {
      reject(new Error('Some Error happened'));
    }
    resolve(ad);
  });
