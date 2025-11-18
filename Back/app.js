import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index.js';
import babyRouter from './routes/babies.js';
import recordRouter from './routes/records.js'
// import errorHandler from './middleware/errorHandler';

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/', indexRouter);
app.use('/api/babies', babyRouter);
app.use('/api/records', recordRouter);

// app.use(errorHandler);

export default app;