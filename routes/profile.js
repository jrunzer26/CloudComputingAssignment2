var express = require('express');
var router = express.Router();
var util = require('../util.js');

/* GET home page. */
router.get('/', util.checkLogin, function(req, res, next) {
  res.render('profile', { title: 'Profile', username: req.user.username });
});

module.exports = router;