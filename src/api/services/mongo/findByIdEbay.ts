import { AdsModel } from "../../models/ads";

export const findById = (id: string) => AdsModel.findById(id)
    .select('scam')
    .exec()