import { AdsFromEbayModel, AdsFromEbaySchema } from '../../api/models';
import { ebayHeaders } from './ebay';
import axios, { AxiosRequestConfig } from 'axios';
import { logger } from '../../shared';

export const getAllByAccount = (
  accountId: string,
): Promise<AdsFromEbaySchema[]> =>
  new Promise(async (resolve, reject) => {
    logger.info('accountId', accountId);
    if (!accountId) {
      resolve([]);
      return;
    }
    try {
      const config: AxiosRequestConfig = {
        method: 'get',
        url: `https://api.ebay-kleinanzeigen.de/api/ads.json?histograms=CATEGORY&limitTotalResultCount=true&locationId=0&userIds=${accountId}&size=200`,
        headers: ebayHeaders,
      };
      const response = await axios(config).catch((err) => {
        if (err.response.status === 404) {
          throw new Error(`${err.config.url} not found`);
        }
        throw err;
      });
      if (
        response?.data['{http://www.ebayclassifiedsgroup.com/schema/ad/v1}ads']
          ?.value?.ad
      ) {
        resolve(
          response.data[
            '{http://www.ebayclassifiedsgroup.com/schema/ad/v1}ads'
          ].value.ad.map((x: any) => new AdsFromEbayModel(x)),
        );
      } else {
        resolve([]);
      }
    } catch (e) {
      reject(e);
    }
  });
