var express = require('express');
var router = express.Router();
var rp = require('request-promise');
var util = require('../util.js');

/* GET home page. */
router.get('/', util.checkLogin, function(req, res, next) {
  res.render('favorites', { title: 'Favorites' });
});

module.exports = router;
