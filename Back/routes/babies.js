import express from 'express';
import babyController from '../controllers/babyController.js';
import recordController from '../controllers/recordController.js';

const router = express.Router();

router.get('/', babyController.getAllBaby);

router.get('/:id', babyController.getBabybyId);

router.post('/', babyController.createBaby);

router.delete('/:id', babyController.deleteBaby);

router.get('/:id/records', recordController.getBabyRecords);

export default router;
