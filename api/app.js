import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';

import babyController from './_controllers/babyController.js';
import recordController from './_controllers/recordController.js';
import vaccineController from './_controllers/vaccineController.js';

dotenv.config();
const app = express();

// Serverless for Vercel
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

app.get('/api/babies', babyController.getAllBaby);
app.get('/api/babies/:id', babyController.getBabybyId);

app.post('/api/babies', babyController.createBaby);
app.delete('/api/babies/:id', babyController.deleteBaby);

app.get('/api/babies/:id/records', recordController.getBabyRecords);
app.get('/api/babies/:id/records/:metric', recordController.getBabyMetrics);
app.get('/api/babies/:id/avgs', recordController.getBabyAvgs);

app.get('/api/babies/:id/vaccines', vaccineController.getBabyVaccine);

// ========== Record routes ==========
app.post('/api/records', recordController.createRecord);
app.delete('/api/records/:id', recordController.deleteRecord);
app.get('/api/records/:gender/avgs', recordController.getAvgGainByGender);
app.get('/api/records/:gender/:metric', recordController.getMetricsByGender);

// ========== Vaccine routes ==========
app.get('/api/vaccines', vaccineController.getAllVaccines);
app.put('/api/vaccines/:id', vaccineController.updateVaccine);

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

export default app;