import { AdsFromEbayModel, AdsSchema } from '../../api/models';
import { logger, skipDB } from '../../shared';

const analyzeSonstiges = (
  ad: any,
  resultingAd: AdsSchema,
): Promise<AdsSchema> =>
  new Promise(async (resolve, _reject) => {
    logger.info('start analyze Sonstiges');

    const res = skipDB
      ? false
      : await AdsFromEbayModel.find({
          'title.value': ad.title.value,
          'description.value': ad.description.value,
        });

    // Anzeige kopiert
    if (res) {
      resultingAd.sonstiges_anzeige_kopiert = res.length > 1 ? 1 : 0;
    }

    // Kategorie passt nicht zur Anzeige
    const ad_kategorie = ad.category.id;
    const kategorienDyson = [
      '176', // Haushaltsgeräte
      '224', // Beauty & Gesundheit
      '168', // weitere Elektronik - Sonstiges
      '91', // Badezimmer
      '82', // Lampen - Licht
      '313', // Zubehör
      '155', // Sonstiges - Weiteres Mode & Beauty
      '175', // TV_Video wegen Dyson TV
    ];
    const kategorienLego = [
      '23', // Spielzeug
      '249', // Modellbau
      '234', // Sammeln
      '76', // Zeitschriften
      '187', // Freizeitaktivitäten
      '227', // PC_Videospiele
      '279', // Konsolen
      '313', // Zubehör
      '242', // Sonstige - Weiteres Freizeit, Hobby & Nachbarschaft
      '75', // Sonstiges - weitere Musik, Filme & Bücher
      '240', // Kunst & Antiquitäten
    ];
    const ad_title = ad.title?.value?.toLowerCase();
    const ad_beschreibung = ad['description']?.value?.toLowerCase();
    const lego = 'lego';
    const dyson = 'dyson';

    resultingAd.sonstiges_kategorie_unpassend = 0;

    // Abgleich bei Lego Anzeigen auf denkbare Kategorien
    if (ad_title.includes(lego) || ad_beschreibung.includes(lego)) {
      resultingAd.sonstiges_kategorie_unpassend = 1;
      for (const k of kategorienLego) {
        if (k == ad_kategorie) {
          resultingAd.sonstiges_kategorie_unpassend = 0;
          break;
        }
      }
    }

    // Abgleich bei Dyson Anzeigen auf denkbare Kategorien
    if (ad_title.includes(dyson) || ad_beschreibung.includes(dyson)) {
      resultingAd.sonstiges_kategorie_unpassend = 1;
      for (const k of kategorienDyson) {
        if (k == ad_kategorie) {
          resultingAd.sonstiges_kategorie_unpassend = 0;
          break;
        }
      }
    }

    // Antipattern: Anzeige länger als einen Tag online
    resultingAd.ap_sonstiges_anzeige_zeit_tag = 0;
    const yesterday = new Date().getTime() - 24 * 60 * 60 * 1000;
    const start = new Date(ad['start-date-time'].value).getTime();
    if (yesterday > start) {
      resultingAd.ap_sonstiges_anzeige_zeit_tag = 1;
    }

    // Antipaatern: Nur Abholung in der Detailangabe
    if (ad.attributes?.[0]) {
      resultingAd.ap_sonstiges_anzeige_nur_abholung = 0;
      for (const a of ad.attributes[0].attribute) {
        if (a['localized-label'] == 'Versand') {
          if (a.value[0]['localized-label'] == 'Nur Abholung') {
            resultingAd.ap_sonstiges_anzeige_nur_abholung = 1;
          }
        }
      }
    }

    // Antipattern: Anzeige ist eine Suchanzeige
    resultingAd.ap_sonstiges_anzeige_suche =
      ad['ad-type'].value === 'WANTED' ? 1 : 0;

    resolve(resultingAd);
  });
export { analyzeSonstiges };
