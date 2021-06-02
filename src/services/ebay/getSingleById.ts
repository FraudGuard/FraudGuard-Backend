import { AdsFromEbayModel } from '../../api/models';
import { ebayHeaders } from './ebay';
import axios, { AxiosRequestConfig } from 'axios';

/**
 * Funktion zum abrufen einer Anzeige
 * @param {string} id - Id nach der gesucht werden soll
 * @return {Promise<AdsFromEbaySchema>} Gibt eine Anzeige zurück
 */
const getSingleById = (id: string): Promise<any> =>
  new Promise((resolve, reject) => {
    try {
      const config: AxiosRequestConfig = {
        method: 'get',
        url: `https://api.ebay-kleinanzeigen.de/api/ads/${id}.json`,
        headers: ebayHeaders,
      };

      axios(config)
        .then((response: any) => {
          const data: any =
            response.data[
              '{http://www.ebayclassifiedsgroup.com/schema/ad/v1}ad'
            ].value;
          resolve(new AdsFromEbayModel(data));
        })
        .catch((error: any) => {
          reject(error);
        });
    } catch (e) {
      reject(e);
    }
  });
export { getSingleById };
