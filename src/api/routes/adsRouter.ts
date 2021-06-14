import { findById } from '../controllers';
import express, { Router } from 'express';
import { transform } from '../controllers/ads/transform';
import { transformEvaluate } from '../controllers/ads/transformEvaluate';

// eslint-disable-next-line new-cap
const adsRouter: Router = express.Router();

adsRouter
  .route('/transform/evaluate')
  /**
   * @swagger
   * /api/ads/transform/evaluate/:
   *   get:
   *     tags:
   *       - Ads
   *     summary: Transformiert alle Ads und wertet sie neu aus.
   *     responses:
   *       '200':
   *         description: Liefert wenn alles vollständig transformiert wurde ein result mit einem bool
   *         content:
   *       '500':
   *         description: Internal Error
   *         content:
   *           application/json
   */ .get(transformEvaluate);
adsRouter
  .route('/transform')
  /**
   * @swagger
   * /api/ads/transform/:
   *   get:
   *     tags:
   *       - Ads
   *     summary: Transformiert alle Ads.
   *     responses:
   *       '200':
   *         description: Liefert wenn alles vollständig transformiert wurde ein result mit einem bool
   *         content:
   *       '500':
   *         description: Internal Error
   *         content:
   *           application/json
   */ .get(transform);
adsRouter
  .route('/:id')
  /**
   * @swagger
   * /api/ads/:id/:
   *   get:
   *     tags:
   *       - Ads
   *     summary: Liefert ein Ad mit der Id
   *     parameters:
   *       - name: id
   *         description: Id der angefragten Anzeige
   *         in: 'path'
   *     responses:
   *       '200':
   *         description: Die angefragte Anzeige
   *         content:
   *       '400':
   *         description: Bad request
   */ .get(findById);

export { adsRouter };
