var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var mySqlClient = mysql.createConnection({
    host     : "localhost",
    user     : "root",
    password : "",
    database : "pcd"
});
var sess;
/* GET home page. */
router.get('/', function(req, res, next) {
    sess=req.session;
       if(sess.name!=undefined && sess.name!="") {
           var sqlUpdate = mySqlClient.query('UPDATE users SET ? WHERE ?', [{ connected: 0 }, { name: sess.name }]);
           sess.destroy(function (err) {
           if (err) {
               console.log(err);
           }
       });
   }
   res.render('index', { title: 'Express' });
});

module.exports = router;
