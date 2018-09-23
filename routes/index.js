var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json({result: true});
});

router.put('/', function(req, res, next) {
  res.send(req.body);
});

router.delete('/', function(req, res, next) {
  console.log(req.query);
  res.send(req.query);
});
module.exports = router;
