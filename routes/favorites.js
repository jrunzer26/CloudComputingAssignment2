var express = require('express');
var router = express.Router();
var rp = require('request-promise');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('favorites', { title: 'Favorites' });
});

module.exports = router;
