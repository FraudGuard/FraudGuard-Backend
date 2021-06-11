import express, { Router } from 'express';
import { saveComment } from '../controllers/ads/saveComment';
import { analyzeFromApi } from '../controllers/analyze/analyzeFromApi';
import { analyzeFromDb } from '../controllers/analyze/analyzeFromDb';

// eslint-disable-next-line new-cap
const analyzeRouter: Router = express.Router();

analyzeRouter
  .route('/:id')
  /**
   * @swagger
   * /:id/:
   *   get:
   *     tags:
   *       - analyzeFromApi
   *     description: Analysiert eine Ad mit der ebay-Kleinanzeigen API
   *     responses:
   *       '200':
   *         description: Ein Ad-Objekt mit den Merkmalen
   *         content:
   *           application/json:
   *             schema:
   *               type: adsSchema
   *       '404':
   *         description: Es konnte kein Ad-Objekt mit der Id gefunden werden.
   *         content:
   *          application/json::
   *             schema:
   *               type: adsSchema
   */ .get(analyzeFromApi);
analyzeRouter
  .route('/fromDb/:id')
  /**
   * @swagger
   * /fromDb/:id/:
   *   get:
   *     tags:
   *       - analyzeFromDb
   *     description: Analysiert eine Ad aus unsere Datenbank
   *     responses:
   *       '200':
   *         description: Ein Ad-Objekt mit den Merkmalen
   *         content:
   *           application/json:
   *             schema:
   *               type: adsSchema
   *       '404':
   *         description: Es konnte kein Ad-Objekt mit der Id gefunden werden.
   *         content:
   *          application/json::
   *             schema:
   *               type: adsSchema
   */ .get(analyzeFromDb);
analyzeRouter
  .route('/:id/comment')
  /**
   * @swagger
   * /:id/:
   *   get:
   *     tags:
   *       - saveComment
   *     description: Fügt dem Comment Attribut einen String hinzu
   *     responses:
   *       '200':
   *         description: Der Kommentar wurde hinzugefügt
   *         content:
   *           application/json:
   *             schema:
   *               type: string
   *       '404':
   *         description: Es konnte kein Ad-Objekt mit der Id gefunden werden.
   *         content:
   *          application/json::
   *             schema:
   *               type: adsSchema
   */ .patch(saveComment);

export { analyzeRouter };
