import express from 'express';

var router = express.Router();

router.get('/', function(req, res, next) {
  res.json({ status: 'ok', message: 'API endpoint is working!' });
});


export default router;
