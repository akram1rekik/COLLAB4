var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    sess=req.session;

    // console.log(sess.name);
    //console.log("done :3");


    if(sess.name!=undefined && sess.name!="")  {
        //  var p= JSON.stringify({sessch:sess.ch});
        //var obj={sessname : sess.name , sessgrname : sess.grname};
        //obj.push(p);
        //var i;
        //for (i in obj) console.log(i);
        console.log(sess.ch);
        res.render('chat', {sessname : sess.name , sessgrname : sess.grname, sessch : sess.ch, sesschi: sess.chi });

    }

    else res.render('index');
    res.render('chat');
});
module.exports = router;
