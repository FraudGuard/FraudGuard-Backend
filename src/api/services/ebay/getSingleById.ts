import axios, { AxiosRequestConfig } from 'axios';
import { AdsFromEbayModel } from '../../models/adsFromEbay';
import { logger } from '../../../shared';
import { ebayHeaders } from './ebay';

export const getSingleById = (id: string): Promise<any> =>
  new Promise((resolve, reject) => {
    const config: AxiosRequestConfig = {
      method: 'get',
      url: `https://api.ebay-kleinanzeigen.de/api/ads/${id}.json`,
      headers: ebayHeaders,
    };

    axios(config)
      .then((response: any) => {
        const data: any =
          response.data['{http://www.ebayclassifiedsgroup.com/schema/ad/v1}ad']
            .value;
        resolve(new AdsFromEbayModel(data));
      })
      .catch((error: any) => {
        logger.log(error.body);
        reject(error);
      });
  });
