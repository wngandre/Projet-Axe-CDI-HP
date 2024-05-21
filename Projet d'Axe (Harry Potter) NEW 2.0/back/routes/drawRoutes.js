import express from 'express';
import { drawCards, lastDraw } from '../controllers/drawController.js';

const router = express.Router();
router.post('/:userId', lastDraw, drawCards); // Retirer le middleware `auth`

export default router;
