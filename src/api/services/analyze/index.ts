import { AdsFromEbaySchema } from "../../models/schemas/adsFromEbay"
import { logger } from "../../../shared"
import { analyzeBeschreibung } from "./analyzeBeschreibung"
import { analyzeKonto } from "./analyzeKonto"
import { analyzeMetadaten } from "./analyzeMetadaten"
import { analyzePreis } from "./analyzePreis"
import { analyzeSonstiges } from "./analyzeSonstiges"
import { analyzeTitel } from "./analyzeTitel"
import { AdsModel } from "../../models/ads"
import { AdsSchema } from "../../models/schemas/ads"


export const analyze = (ad: AdsFromEbaySchema): Promise<AdsSchema> => new Promise((resolve, reject) => {
    logger.info('start analyze')
    const resultingAd = new AdsModel()
    resultingAd.scam = 0
    Promise.all([
        analyzeBeschreibung(ad, resultingAd),
        analyzeKonto(ad, resultingAd),
        analyzeMetadaten(ad, resultingAd),
        analyzePreis(ad, resultingAd),
        analyzeSonstiges(ad, resultingAd),
        analyzeTitel(ad, resultingAd),
    ]).then(_res => {
        logger.info('all analyze done')
        resolve(resultingAd);
    }).catch(error => {
        logger.error('error in analyze')
        logger.error(error)
        reject(error)
    })
})