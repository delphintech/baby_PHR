import express from 'express';
import recordController from '../controllers/recordController.js';

const router = express.Router();

router.post('/', recordController.createRecord);

router.delete('/:id', recordController.deleteRecord);

router.get('/:gender/avgs', recordController.getAvgGainByGender);

router.get('/:gender/:metric', recordController.getMetricsByGender);

export default router;
