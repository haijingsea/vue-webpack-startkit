/**
 * Created by languid on 2016/8/28.
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(111111111);
    res.render('index', { title: 'Express' });
});

module.exports = router;