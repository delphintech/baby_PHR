var express = require('express');

var router = express.Router();

router.get('/', function(req, res, next) {
  res.json({ status: 'ok', message: 'API endpoint is working!' });
});


module.exports = router;
