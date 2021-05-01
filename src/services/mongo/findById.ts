import { AdsFromEbayModel } from '../../models';

export const findByIdEbay = (id: string) =>
  AdsFromEbayModel.findById(id).exec();
