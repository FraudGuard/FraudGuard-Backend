import { AdsFromEbayModel, AdsModel, AdsSchema } from '../../models';
import { HttpStatus, logger } from '../../../shared';
import { Request, Response } from 'express';
import { UpdateQuery } from 'mongoose';
import { getSingleById } from '../../../services/ebay';

/**
 * Funktion zum Speichern von Feedback
 * @param {req} req - Express Request Objekt
 * @param {res} res - Express Response Objekt
 * @return {void}
 */
const saveComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;

    if (!id) {
      throw new Error('No valid id ');
    }
    if (!comment) {
      throw new Error('No valid comment ');
    }
    const update: UpdateQuery<AdsSchema> = {
      toReview: 1,
      comment,
    };

    const result = await getSingleById(id);
    if (result) {
      // await adsFromEbaySchema.add(result);
      result.toReview = true;
      result.comment = comment;
      AdsFromEbayModel.findOneAndUpdate({"_id": result.id}, result,{upsert:true}).then(() => {
        console.log('updated')
      })
    }

    console.log(comment);
    AdsModel.findByIdAndUpdate({ _id: id.toString() }, update).then((ad) => {
      logger.info('saved comment ', ad ? 'yes' : 'no');
      if (ad) {
        res.status(HttpStatus.OK).json({
          ad,
        });
      } else {
        res.status(HttpStatus.INTERNAL_ERROR).json({
          msg: 'Error while updating',
        });
      }
    });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_ERROR).json({ error: err });
    logger.error(err);
  }
};

export { saveComment };
