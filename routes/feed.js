var express = require('express');
var router = express.Router();
var rp = require('request-promise');
var util = require('../util.js');

/* GET home page. */
router.get('/', util.checkLogin, function(req, res, next) {
  console.log(req.user);
  res.render('feed', { title: 'Job Feed' });
});

router.post('/positions', util.checkLogin, function(req, res, next) {
  var jobs = [];
  //var des = req.body.des;
  //var locaiton = req.body.location;
  var options = {
    uri: 'https://jobs.github.com/positions.json?description=developer&location=mississauga',
    json: true
};
  rp(options).then(function(result) {
    return res.status(200).send(result);
  })
  .catch(function (err) {
    return res.status(407).send({err: "An internal error occured. Try again later."})
  });
});

module.exports = router;
