var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  var data = {
  	title: 'ExpressVids - The top NodeJS and Express Tutorial'
  }

  res.render('index', data);
});

module.exports = router;
