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
   *       - Label
   *     summary: Liefert eine Anzeige, welche noch nicht gelabelt wurde.
   *     responses:
   *       '200':
   *         description: Eine zufällige Anzeige, welche mit toReview markiert ist.
   *         content:
   *           application/json:
   *             schema:
   *               type: adsSchema
   *       '400':
   *         description: Bad Request
   */ .get(findOneForLabel);
labelRouter
  .route('/getToReview')
  /**
   * @swagger
   * /api/label/getToReview/:
   *   get:
   *     tags:
   *       - Label
   *     summary: Liefert eine Anzeige, welche mit toReview markiert ist.
   *     responses:
   *       '200':
   *         description: Eine zufällige Anzeige, welche mit toReview markiert ist.
   *         content:
   *           application/json:
   *             schema:
   *               type: adsSchema
   *       '400':
   *         description: Bad Request
   */ .get(findOneToReview);
labelRouter
  .route('/count')
  /**
   * @swagger
   * /api/label/count/:
   *   get:
   *     tags:
   *       - Label
   *     summary: Zählt die gelabelten Anzeigen. Jeder Request erhöht den Wert um 1.
   *     responses:
   *       '200':
   *         description: Der Wert wurde erfolgreich eins nach oben gezählt.
   *       '400':
   *         description: Bad Request
   */ .get(countToLabel);
labelRouter
  .route('/update')
  /**
   * @swagger
   * /api/label/update/:
   *   post:
   *     tags:
   *       - Label
   *     summary: Markiert eine Anzeige als gelabelt mit der getroffenen Entscheidung.
   *     responses:
   *       '200':
   *         description: Anzeige, welche geupdated wird
   *         content:
   *          application/json::
   *             schema:
   *               type: adsSchema
   *       '400':
   *         description: Bad Request
   */ .post(updateAd);

export { labelRouter };
