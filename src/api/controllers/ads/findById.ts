import { findById as findByIdInMongo } from '../../../services/mongo';
import { HttpStatus, logger } from '../../../shared';
import { Request, Response } from 'express';

/**
 * Die Funktion findById() wird verwendet, um ein einzelnes Dokument anhand seines _id-Feldes zu finden.
 * @param {req} req - Das req-Objekt repräsentiert die HTTP-Anfrage und hat Eigenschaften für den Anfragestring, die Parameter, den Body, die HTTP-Header usw.
 * @param {res} res - Das res-Objekt stellt die HTTP-Antwort dar, die eine Express-App sendet, wenn sie eine HTTP-Anfrage erhält.
 */
const findById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    findByIdInMongo(id).then((ad: any) => {
      if (ad) {
        res.status(HttpStatus.OK).json({
          ad,
        });
      } else {
        res.status(HttpStatus.NOT_FOUND).json({
          msg: 'No valid entry found for provided ID',
        });
      }
    });
  } catch (err: any) {
    res.status(HttpStatus.INTERNAL_ERROR).json({ error: err });
    logger.error(err);
  }
};
export { findById };
