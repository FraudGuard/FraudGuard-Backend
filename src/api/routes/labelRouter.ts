import express, { Router } from 'express';
import { countToLabel } from '../controllers/label/countToLabel';
import { findOneForLabel } from '../controllers/label/findOneForLabel';
import { findOneToReview } from '../controllers/label/findOneForReview';
import { updateAd } from '../controllers/ads/updateAd';

// eslint-disable-next-line new-cap
const labelRouter: Router = express.Router();

labelRouter
  .route('/get')
  /**
   * @swagger
   * /api/label/get/:
   *   get:
   *     tags:
   *       - findOneForLabel
   *     description: Liefert eine Anzeige welche in review ist
   *     responses:
   *       '200':
   *         description: blabla
   *         content:
   *           application/json:
   *             schema:
   *               type: adsSchema
   *       '404':
   *         description: blabla
   *         content:
   *           application/json:
   *             schema:
   *               type: string
   */ .get(findOneForLabel);
labelRouter
  .route('/getToReview')
  /**
   * @swagger
   * /api/label/getToReview/:
   *   get:
   *     tags:
   *       - findOneToReview
   *     description: blabla
   *     responses:
   *       '200':
   *         description: blabla
   *         content:
   *           application/json:
   *             schema:
   *               type: adsSchema
   *       '404':
   *         description: blabla
   *         content:
   *           application/json
   */ .get(findOneToReview);
labelRouter
  .route('/count')
  /**
   * @swagger
   * /api/label/count/:
   *   get:
   *     tags:
   *       - countToLabel
   *     description: blabla
   *     responses:
   *       '200':
   *         description: blabla
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: blabla
   *       '404':
   *         description: blabla
   *           application/json:
   *             schema:
   *               type: string
   */ .get(countToLabel);
labelRouter
  .route('/update')
  /**
   * @swagger
   * /api/label/update/:
   *   get:
   *     tags:
   *       - updateAd
   *     description: blabla
   *     responses:
   *       '200':
   *         description: blabla
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: Lecture
   *       '404':
   *         description: blabla
   *         content:
   *           application/json:
   *             schema:
   *               type: string
   */ .post(updateAd);

export { labelRouter };
