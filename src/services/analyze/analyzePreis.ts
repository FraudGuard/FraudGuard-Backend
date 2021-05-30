import { AdsSchema, ProductModel } from '../../api/models';
import { logger } from '../../shared';

/**
 * Funktion welche die Anzeige auf Eigenschaften vom Typ Konto prüft
 * @param {ad} ad - Anzeige welche von der eBay-Kleinanzeigen Api kommt
 * @param {resultingAd} resultingAd - Transformierte eBay-Kleinanzeigen Anzeige
 * @return {Promise<AdsSchema>} Returned das resolved resultingAd
 */

export const analyzePreis = (
  ad: any,
  resultingAd: AdsSchema,
): Promise<AdsSchema> =>
  new Promise(async (resolve, reject) => {
    logger.info('start analyze Preis');

    const ad_preis = parseInt(ad.price?.amount?.value, 10);

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

    // Abgleich mit Marktwert 1 bedeutet geprüft und unter Marktwert / 2 bedeutet geprüft und nicht unter Marktwert
    if (marktwert != 0)
      resultingAd.preis_unter_marktwert = ad_preis < marktwert ? 1 : 2;
    // 0 bedeutet es wurde keine Prüfung durchgeführt, weil Produkt nicht in DB
    else resultingAd.preis_unter_marktwert = 0;

    // Prozentuale Abweichung vom Produktpreis und Marktwert
    if (marktwert != 0)
      resultingAd.preis_abweichung_marktwert = ad_preis / marktwert - 1;
    else resultingAd.preis_abweichung_marktwert = 0;

    // Prüfen der Währung in EUR
    resultingAd.preis_waehrung_eur =
      ad.price?.['currency-iso-code']?.value?.value == 'EUR' ? 1 : 0;

    // Prüfen, ob VB vorliegt
    resultingAd.preis_typ_vb =
      ad.price?.['price-type'].value == 'PLEASE_CONTACT' ? 1 : 0;

    // Prüfen, ob Preis vorhanden ist
    resultingAd.ap_preis_ist_leer = ad.price?.amount?.value == 0 ? 1 : 0;

    if (false) {
      reject(new Error('Some Error happened'));
    }
    resolve(resultingAd);
  });
