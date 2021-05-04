import { AdsSchema } from '../../api/models';
import { logger } from '../../shared';

export const analyzeTitel = (
  ad: any,
  resultingAd: AdsSchema,
): Promise<AdsSchema> =>
  new Promise((resolve, reject) => {
    try {
      logger.info('start analyze Titel');
      console.log(ad.title.value);

      const str = ad['title'].value.toLowerCase();

      // Muster
      // Merkmal neu
      const wordListNeu = [
        'new',
        'neu',
        'nie ausgepackt',
        'unbenutzt',
        'nicht benutzt',
        'nicht aufgebaut',
      ];
      const wordListNeu_gegenteil = [
        'not new',
        'nicht neu',
        'ausgepackt',
        'benutzt',
      ];

      resultingAd.titel_enthaelt_neu = 0;
      for (const w of wordListNeu) {
        for (const g of wordListNeu_gegenteil) {
          if (str.includes(w) && !str.includes(g)) {
            resultingAd.titel_enthaelt_neu = 1;
          }
        }
      }

      // Merkmal OVP
      const wordListOvp = [
        'ovp',
        'originalverpackt',
        'original',
        'originalverpackung',
      ];
      const wordListOvp_gegenteil = [
        'nicht ovp',
        'nicht originalverpackt',
        'nicht original',
        'nicht originalverpackt',
      ];

      resultingAd.titel_enthaelt_ovp = 0;
      for (const w1 of wordListOvp) {
        for (const g1 of wordListOvp_gegenteil) {
          if (str.includes(w1) && !str.includes(g1)) {
            resultingAd.titel_enthaelt_ovp = 1;
          }
        }
      }

      // Merkmal verschweißt
      const wordListVerschweißt = [
        'verschweißt',
        'versiegelt',
        'versiegelung',
        'siegel',
      ];
      const wordListVerschweißt_gegenteil = [
        'nicht verschweißt',
        'nicht versiegelt',
        'keine Versiegelung',
        'kein Siegel',
      ];
      resultingAd.titel_enthaelt_verschweißt = 0;
      for (const w2 of wordListVerschweißt) {
        for (const g2 of wordListVerschweißt_gegenteil) {
          if (str.includes(w2) && !str.includes(g2)) {
            resultingAd.titel_enthaelt_verschweißt = 1;
          }
        }
      }

      // Merkmal ungeöffnet
      const wordListUngeoeffnet = [
        'ungeöffnet',
        'ungeoeffnet',
        'nicht geöffnet',
      ];
      const wordListUngeoeffnet_gegenteil = ['geöffnet', 'geoeffnet'];

      resultingAd.titel_enthaelt_ungeoeffnet = 0;
      for (const w3 of wordListUngeoeffnet) {
        for (const g3 of wordListUngeoeffnet_gegenteil) {
          if (str.includes(w3) && !str.includes(g3)) {
            resultingAd.titel_enthaelt_ungeoeffnet = 1;
          }
        }
      }

      // Merkmal Zeichen
      const wordListZeichen = ['❤', '✅', '✔', '⭐', '!', '?', '*', '+'];

      resultingAd.titel_enthaelt_zeichen = 0;
      for (const w4 of wordListZeichen) {
        if (str.includes(w4)) {
          resultingAd.titel_enthaelt_zeichen = 1;
        }
      }

      // Antipattern
      // Merkmal gebraucht
      const wordListGebraucht = [
        'gebraucht',
        'wie neu',
        'neuwertig',
        'aufgebaut',
        'benutzt',
        'selten genutzt',
        'selten benutzt',
        'alt',
        'gebrauchsspuren',
      ];
      const wordListGebraucht_gegenteil = [
        'nicht gebraucht',
        'nicht aufgebaut',
        'nicht benutzt',
        'keine gebrauchsspuren',
      ];
      resultingAd.ap_titel_enthaelt_gebraucht = 0;
      for (const w5 of wordListGebraucht) {
        for (const g5 of wordListGebraucht_gegenteil) {
          if (str.includes(w5) && !str.includes(g5)) {
            resultingAd.ap_titel_enthaelt_gebraucht = 1;
          }
        }
      }

      // Merkmal tausche
      const wordListTausche = ['tausche', 'tauschangebot', 'tausch'];
      const wordListTausche_gegenteil = [
        'nicht tausche',
        'kein tauschangebot',
        'kein tausch',
      ];

      resultingAd.ap_titel_enthaelt_tausche = 0;
      for (const w6 of wordListTausche) {
        for (const g6 of wordListTausche_gegenteil) {
          if (str.includes(w6) && !str.includes(g6)) {
            resultingAd.ap_titel_enthaelt_tausche = 1;
          }
        }
      }

      // Merkmal Suche
      const wordListSuche = ['suche', 'suchanzeige', 'gesucht'];
      const wordListSuche_gegenteil = [
        'keine suche',
        'keine suchanzeige',
        'nicht gesucht',
      ];

      resultingAd.ap_titel_enthaelt_suche = 0;
      for (const w7 of wordListSuche) {
        for (const g7 of wordListSuche_gegenteil) {
          if (str.includes(w7) && !str.includes(g7)) {
            resultingAd.ap_sonstiges_anzeige_suche = 1;
          }
        }
      }

      // Merkmal kilo
      const wordListKilo = ['kg', 'kilo', 'kilogramm'];

      resultingAd.ap_titel_enthaelt_kilo = 0;
      for (const w8 of wordListKilo) {
        if (str.includes(w8)) {
          resultingAd.ap_titel_enthaelt_kilo = 1;
        }
      }

      // Merkmal Sammlung
      const wordListSammlung = [
        'sammlerauflösung',
        'sammlung',
        'sammlungsauflösung',
        'sammleraufloesung',
        'sammlungsaufloesung',
      ];
      const wordListSammlung_gegenteil = [
        'keine sammlerauflösung',
        'keine sammlung',
        'keine sammlungsauflösung',
        'keine sammleraufloesung',
        'keine sammlungsaufloesung',
      ];

      resultingAd.ap_titel_enthaelt_sammlung = 0;
      for (const w9 of wordListSammlung) {
        for (const g9 of wordListSammlung_gegenteil) {
          if (str.includes(w9) && !str.includes(g9)) {
            resultingAd.ap_titel_enthaelt_suche = 1;
          }
        }
      }

      resultingAd.title = ad.title.value;
      if (false) {
        reject(new Error('Some Error happened'));
      }
      resolve(resultingAd);
    } catch (e) {
      reject(e);
    }
  });
