var express = require('express');
var router = express.Router();
var sess;
var mysql = require('mysql');
//var wait= require('wait.for');
/* GET users listing. */
router.post('/', function(req, res, next) {
    sess=req.session;
    var name, pass;
    name=req.body.uname;
    //console.log(name);
    pass=req.body.pass;
    //console.log(sess.pass);
    var mySqlClient = mysql.createConnection({
        host     : "localhost",
        user     : "root",
        password : "",
        database : "pcd"
    });
    mySqlClient.connect();
    var query= "SELECT * from users";
    var sqlQuery = mySqlClient.query(query);
    sqlQuery.on("result", function(rows) {
        if (rows.name == name){
            if(rows.pass==pass){
                mySqlClient.pause();
               sess.name=name;
               sess.idg=rows.idg;
               sess.id=rows.id;
                //sess.save();
                mySqlClient.resume();
                var sqlinfo = mySqlClient.query('Select * from groupe where ?', [{id : sess.idg}]);
                sqlinfo.on("result", function(rowgr){
                    mySqlClient.pause();
                    sess.grname=rowgr.name;
                    sess.save();
                    //console.log(sess.grname);
                   mySqlClient.resume();

                });
                var sqlchannel= mySqlClient.query('Select * from channel where ?', [{idg : sess.idg}]);
                sess.ch=[];
                sess.chi=[];
                sqlchannel.on("result", function(rowch){
                    mySqlClient.pause();
                    //var i= 0;
                    //console.log(rowch.length);

                    console.log(rowch.name);
                    sess.ch.push(rowch.name);
                    sess.chi.push(rowch.id);
                    sess.save();
                    mySqlClient.resume();
                });
                sess.save();
               // console.log("welcome "+sess.name);
                /*for (i in sess.ch)
                    console.log(i);*/
             //   sess.save();
                mySqlClient.query('UPDATE users SET ? WHERE ?', [{ connected: 1 }, { name: name }]);
            }
        }});
         //mySqlClient.close();
   // console.log("here");
   // if (0 === --pending ) console.log("here1");
   // wait.data();
    res.end('done');
    //, {sessgrname: sess.grname});
});

module.exports = router;
