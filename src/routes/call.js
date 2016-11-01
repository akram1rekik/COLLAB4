/**
 * Created by mohamed on 05/04/2015.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('caller');
});
module.exports = router;
