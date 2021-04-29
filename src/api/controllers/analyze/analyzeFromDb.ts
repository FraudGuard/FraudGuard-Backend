import { HttpStatus, logger } from '../../../shared';
import { Request, Response } from 'express';
import { analyze } from '../../services/analyze';
import { findByIdEbay } from '../../services/mongo';

export const analyzeFromDb = async (req: Request, res: Response) => {
  try {
    // TODO is it really a id?? validation, also sanitize input
    const { id } = req.params;
    logger.info(req.params);
    logger.info(id);
    findByIdEbay(id).then(ad => {
      if (!ad) {
        logger.info(`loaded ad not found: ${id}`)
        res.status(HttpStatus.NOT_FOUND).json({
          msg: 'ad not found',
        });
        return
      }
      logger.info('loaded ad from db')

      analyze(ad).then(result => {
        res.status(HttpStatus.OK).json(result);
      }).catch(error => {
        logger.error(error);
        res.status(HttpStatus.INTERNAL_ERROR).json({
          msg: 'Internal Error',
          error
        });
      })
    })
  } catch (err) {
    res.status(HttpStatus.INTERNAL_ERROR).json({ error: err });
    logger.error(err);
  }
};
