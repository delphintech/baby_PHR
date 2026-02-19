import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';

import express from 'express';
import babyController from './_controllers/babyController.js';
import recordController from './_controllers/recordController.js';
import vaccineController from './_controllers/vaccineController.js';

dotenv.config();
const app = express();

// Serverless 
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ========== Babies routes ==========

router.get('/', babyController.getAllBaby);
router.get('/:id', babyController.getBabybyId);

// router.post('/', babyController.createBaby);
// router.delete('/:id', babyController.deleteBaby);

router.get('/:id/records', recordController.getBabyRecords);
router.get('/:id/records/:metric', recordController.getBabyMetrics);
router.get('/:id/avgs', recordController.getBabyAvgs);

router.get('/:id/vaccines', vaccineController.getBabyVaccine);

// ========== Record routes ==========
router.post('/', recordController.createRecord);
router.delete('/:id', recordController.deleteRecord);
router.get('/:gender/avgs', recordController.getAvgGainByGender);
router.get('/:gender/:metric', recordController.getMetricsByGender);

// ========== Vaccine routes ==========
router.get('/', vaccineController.getAllVaccines);
router.put('/:id', vaccineController.updateVaccine);

// app.use(errorHandler);

export default app;