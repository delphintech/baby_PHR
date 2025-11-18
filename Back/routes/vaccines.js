import express from 'express';
import vaccineController from '../controllers/vaccineController.js';

const router = express.Router();

router.get('/', vaccineController.getAllVaccines);

router.put('/:id', vaccineController.updateVaccine);

export default router;