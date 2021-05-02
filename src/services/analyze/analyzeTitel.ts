import { AdsFromEbaySchema, AdsSchema } from '../../models';
import { logger } from '../../shared';

export const analyzeTitel = (ad: AdsFromEbaySchema, resultingAd: AdsSchema) =>
  new Promise((resolve, reject) => {
    try {
      logger.info('start analyze Titel');
      console.log(ad.title.value)

      const str = ad['title'].value.toLowerCase();
     
      // Muster
      // Merkmal neu
      const wordListNeu = ["new", "neu", "nie ausgepackt", "unbenutzt", "nicht benutzt"];

      
      resultingAd.titel_enthaelt_neu = 0
      for (const w of wordListNeu) {
        if (str.includes(w)) {
          resultingAd.titel_enthaelt_neu = 1
        }
      }

      // Merkmal OVP
      const wordListOvp = ["ovp", "originalverpackt", "original", "originalverpackung"];

      resultingAd.titel_enthaelt_ovp = 0
      for (const w1 of wordListOvp) {
        if (str.includes(w1)) {
          resultingAd.titel_enthaelt_ovp = 1
        }
      }

      // Merkmal verschweißt
      const wordListVerschweißt = ["verschweißt", "versiegelt", "versiegelung","siegel"];

      resultingAd.titel_enthaelt_verschweißt = 0
      for (const w2 of wordListVerschweißt){
        if (str.includes(w2)){
          resultingAd.titel_enthaelt_verschweißt = 1
        }
      }

      // Merkmal ungeöffnet
      const wordListUngeoeffnet = ["ungeöffnet", "ungeoeffnet", "nicht geöffnet"]

      resultingAd.titel_enthaelt_ungeoeffnet = 0
      for (const w3 of wordListUngeoeffnet) {
        if (str.includes(w3)){
          resultingAd.titel_enthaelt_ungeoeffnet = 1
        }
      }

      // Merkmal Zeichen
      const wordListZeichen = [ "❤", "✅", "✔", "⭐", "!", "?", "*", "+"]

      resultingAd.titel_enthaelt_zeichen = 0
      for (const w4 of wordListZeichen){
        if (str.includes(w4)){
          resultingAd.titel_enthaelt_zeichen = 1
        }
      }


      // Antipattern
      // Merkmal gebraucht
      const wordListGebraucht = ["gebraucht", "wie neu", "neuwertig", "aufgebaut","benutzt", 
                                "selten genutzt", "selten benutzt", "alt","gebrauchsspuren", "aufgebaut"]
      
      resultingAd.ap_titel_enthaelt_gebraucht = 0                          
      for (const w5 of wordListGebraucht){
        if (str.includes(w5)){
          resultingAd.ap_titel_enthaelt_gebraucht = 1
        }
      }

      // Merkmal tausche
      const wordListTausche = ["tausche","tauschangebot","tausch"]

      resultingAd.ap_titel_enthaelt_tausche = 0
      for (const w6 of wordListTausche){
        if (str.includes(w6)){
          resultingAd.ap_titel_enthaelt_tausche = 1
        }
      }

      // Merkmal Suche
      const wordListSuche = ["suche", "suchanzeige", "gesucht"]

      resultingAd.ap_titel_enthaelt_suche = 0
      for (const w7 of wordListSuche){
        if (str.includes(w7)){
          resultingAd.ap_sonstiges_anzeige_suche = 1
        }
      }

      // Merkmal kilo
      const wordListKilo = ["kg","kilo","kilogramm"]

      resultingAd.ap_titel_enthaelt_kilo = 0
      for (const w8 of wordListKilo){
        if (str.includes(w8)) {
          resultingAd.ap_titel_enthaelt_kilo = 1
        }
      }

      // Merkmal Sammlung
      const wordListSammlung = ["sammlerauflösung","sammlung","sammlungsauflösung","sammlerauflöesung",
                                "sammlungsaufloesung"]
      
      resultingAd.ap_titel_enthaelt_sammlung = 0
      for (const w9 of wordListSammlung){
        if (str.includes(w9)){
          resultingAd.ap_titel_enthaelt_suche = 1
        }
      }

      resultingAd.title = ad.title.value;
      if (false) {
        reject(new Error('Some Error happened'));
      }
      resolve(ad);
    } catch (e) {
      reject(e)
    }
  });
