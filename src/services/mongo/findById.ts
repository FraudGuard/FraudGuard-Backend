import { AdsFromEbayModel } from '../../api/models';

export const findByIdEbay = (id: string) =>
  AdsFromEbayModel.findById(id).exec();
