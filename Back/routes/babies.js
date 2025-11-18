import express from 'express';
import babyController from '../controllers/babyController.js';
import recordController from '../controllers/recordController.js';
import vaccineController from '../controllers/vaccineController.js';

const router = express.Router();

router.get('/', babyController.getAllBaby);

router.get('/:id', babyController.getBabybyId);

router.post('/', babyController.createBaby);

router.delete('/:id', babyController.deleteBaby);

router.get('/:id/records', recordController.getBabyRecords);

router.get('/:id/vaccines', vaccineController.getBabyVaccine);

export default router;
