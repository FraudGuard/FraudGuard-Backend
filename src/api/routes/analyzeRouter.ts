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
   * /api/analyze/:id:
   *   get:
   *     tags:
   *       - Analyze
   *     summary: Analysiert eine Ad aus der ebay-Kleinanzeigen API.
   *     parameters:
   *       - name: id
   *         description: Id der angefragten Anzeige.
   *         in: 'path'
   *     responses:
   *       '200':
   *         description: Die Analysierte Anzeige.
   *         content:
   *       '404':
   *         description: Es konnte kein Ad-Objekt mit der Id gefunden werden.
   */ .get(analyzeFromApi);
analyzeRouter
  .route('/fromDb/:id')
  /**
   * @swagger
   * /api/analyze/fromDb/:id:
   *   get:
   *     tags:
   *       - Analyze
   *     summary: Analysiert eine Ad aus unsere Datenbank.
   *     parameters:
   *       - name: id
   *         description: Id der angefragten Anzeige.
   *         in: 'path'
   *     responses:
   *       '200':
   *         description: Die Analysierte Anzeige.
   *         content:
   *           application/json:
   *             schema:
   *               type: adsSchema
   *       '404':
   *         description: Es konnte kein Ad-Objekt mit der Id gefunden werden.
   */ .get(analyzeFromDb);
analyzeRouter
  .route('/:id/comment')
  /**
   * @swagger
   * /api/:id/comment:
   *   patch:
   *     tags:
   *       - Analyze
   *     summary: Fügt dem Comment Attribut einen String hinzu.
   *     parameters:
   *       - name: id
   *         description: Id der angefragten Anzeige.
   *         in: 'path'
   *     responses:
   *       '200':
   *         description: Der Kommentar wurde hinzugefügt.
   *         content:
   *           application/json:
   *             schema:
   *               type: string
   *       '404':
   *         description: Es konnte kein Ad-Objekt mit der Id gefunden werden.
   */ .patch(saveComment);

export { analyzeRouter };
