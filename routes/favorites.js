var express = require('express');
var router = express.Router();
var rp = require('request-promise');
var util = require('../util.js');
var pgp = require('pg-promise')();
var Users = require('../models/Users.js');

/* GET home page. */
router.get('/', util.checkLogin, function(req, res, next) {
  res.render('favorites', { title: 'Favorites' });
});

router.post('/getAll', util.checkLogin, function(req, res, next) {
  
});

module.exports = router;
