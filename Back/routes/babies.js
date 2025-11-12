import express from 'express';
import babyController from '../controllers/babyController.js';

const router = express.Router();

router.get('/', babyController.getAllBaby);

router.get('/:id', babyController.getBabybyId);

router.post('/', babyController.createBaby);

router.delete('/:id', babyController.deleteBaby);

export default router;
