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
   *       - Evaluate
   *     description: Transformiert alle Ads und wertet sie neu aus.
   *     responses:
   *       '200':
   *         description: Liefert wenn alles vollständig transformiert wurde ein result mit einem bool
   *         content:
   *           application/json
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
   *       - Evaluate
   *     description: Transformiert alle Ads.
   *     responses:
   *       '200':
   *         description: Liefert wenn alles vollständig transformiert wurde ein result mit einem bool
   *         content:
   *           application/json
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
   *       - findById
   *     description: Liefert ein Ad mit der Id
   *     parameters:
   *       - name: id
   *         description: id einer Anzeige
   *         in: 'path'
   *     responses:
   *       '200':
   *         description: Liefert das angefragte Ad
   *         content:
   *           application/json:
   *             schema:
   *               type: AdsSchema
   *       '404':
   *         description: Falls die Id ungültig ist oder die Ad nicht existiert
   *         content:
   *           application/json:
   *             schema:
   *               type: string
   */ .get(findById);

export { adsRouter };
