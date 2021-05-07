import { AdsFromEbayModel, AdsFromEbaySchema } from '../../api/models';
import { ebayHeaders } from './ebay';
import { logger } from '../../shared';
import axios, { AxiosRequestConfig } from 'axios';

export const getAllByAccount = (
  accountId: string,
): Promise<AdsFromEbaySchema[]> =>
  new Promise((resolve, reject) => {
    const config: AxiosRequestConfig = {
      method: 'get',
      url: `https://api.ebay-kleinanzeigen.de/api/ads.json?histograms=CATEGORY&limitTotalResultCount=true&locationId=0&userIds=${accountId}&size=200`,
      headers: ebayHeaders,
    };

    axios(config)
      .then((response: any) => {
        resolve(
          response.data[
            '{http://www.ebayclassifiedsgroup.com/schema/ad/v1}ads'
          ].value.ad?.map((x: any) => new AdsFromEbayModel(x)),
        );
      })
      .catch((error: any) => {
        logger.error(error.body);
        reject(error);
      });
  });
