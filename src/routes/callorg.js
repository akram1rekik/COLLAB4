var express = require('express');
var router = express.Router();
var sess;
var mysql = require('mysql');

router.post('/', function(req, res, next) {
    sess = req.session;

     var channel = req.body.nb;
     sess.cho= channel;
     sess.save();
    var mySqlClient = mysql.createConnection({
        host     : "localhost",
        user     : "root",
        password : "",
        database : "pcd"
    });
    //mySqlClient.connect();
        console.log("******");
        console.log(channel);
        console.log(sess.id);
        console.log("******");

   // mySqlClient.query('INSERT into  callorg  set ? and ?', [{ idc : 2 },{ idu : 1 }]);


    console.log("here3");
    res.end("done");

});
module.exports = router;
