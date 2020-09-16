var express = require('express');
var router = express.Router();

/* GET API explorer page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'IVR Admin API Explorer' });
});

module.exports = router;
