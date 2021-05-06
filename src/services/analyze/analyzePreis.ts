import { AdsSchema, ProductModel } from '../../api/models';
import { logger } from '../../shared';

export const analyzePreis = (
  ad: any,
  resultingAd: AdsSchema,
): Promise<AdsSchema> =>
  new Promise(async (resolve, reject) => {
    logger.info('start analyze Preis');
    resultingAd.fraud_score += 0.1;

    const ad_preis = ad.price?.amount?.value;

    // Preisabgleich mit hinterlegten Preisen aus DB
    let marktwert = 0;
    const ad_title = ad.title?.value?.toLowerCase();
    // alles aus Titel entfernen außer Ziffern (für Lego Produktnummer)
    const num = ad_title.replace(/^\D+|\D+$/g, '');
    // alle Produkte aus der product collection in ein Array
    const produkte = await ProductModel.find({});

    for (const produkt of produkte) {
      if (ad_title.includes(produkt.produktname.toLowerCase())) {
        marktwert = produkt.preis;
      }
      if (produkt.produktname.toLowerCase().includes(num))
        marktwert = produkt.preis;
    }
    console.log(marktwert);
    console.log(ad_preis);
    resultingAd.preis_unter_marktwert = ad_preis < marktwert ? 1 : 0;

    // Prozentuale Abweichung vom Produktpreis und Marktwert
    if (marktwert != 0)
      resultingAd.preis_abweichung_marktwert = ad_preis / marktwert - 1;
    else resultingAd.preis_abweichung_marktwert = 0;

    // Prüfen der Währung in EUR
    resultingAd.preis_waehrung_eur =
      ad.price['currency-iso-code'].value === 'EUR' ? 0 : 1;

    // Prüfen, ob VB vorliegt
    resultingAd.preis_typ_vb =
      ad.price['price-type'].value === 'PLEASE_CONTACT' ? 0 : 1;

    // Prüfen, ob Preis vorhanden ist
    resultingAd.ap_preis_ist_leer = ad.price?.amount?.value === 0 ? 1 : 0;

    if (false) {
      reject(new Error('Some Error happened'));
    }
    resolve(ad);
  });
