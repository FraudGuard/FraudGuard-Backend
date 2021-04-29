import { AdsFromEbayModel } from '../../models/adsFromEbay';

export const findByIdEbay = (id: string) =>
  AdsFromEbayModel.findById(id).exec();
