import { HttpStatus, logger } from '../../../shared';
import { Request, Response } from 'express';
import { getSingleById } from '../../services/ebay'
import { analyze } from '../../services/analyze';

export const analyzeFromApi = async (req: Request, res: Response) => {
  try {
    // TODO is it really a id?? validation, also sanitize input
    const { id } = req.params;
    logger.info(req.params);
    logger.info(id);
    getSingleById(id).then(ad => {
      logger.info('loaded ad from api')

      analyze(ad).then(result => {
        res.status(HttpStatus.OK).json(result);
      }).catch(error => {
        res.status(HttpStatus.NOT_FOUND).json({
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
