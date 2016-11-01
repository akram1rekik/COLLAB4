
socket = io.connect("http://localhost:8080");


socket.emit("connection", {"connection" : "connection"});

socket.on("request auth", function(){ alert("authentification necessaire");
    var i = document.getElementById('magic').innerHTML;
    console.log(i);
    if(i==="") {
        document.getElementById('magic').innerHTML += ('<form >');
        document.getElementById('magic').innerHTML += (' nom d\'utilisatuer<input type="text" placeholder="nom d\'utilisatuer" id="user"/><br>');
        document.getElementById('magic').innerHTML += (' mot de passe<input type="password" placeholder="mot de passe" id="pass" /><br>');
        document.getElementById('magic').innerHTML += ('<input type="button"  id="button" value="check"/>');
        document.getElementById('magic').innerHTML += ('</form>');
    }

    var b = document.getElementById('button');
    b.onclick = function cliqued(){
        console.log("finished :p");
        var name = document.getElementById('user').value;
        var pass = document.getElementById('pass').value;
        if (name !=undefined && name !='' && pass !=undefined && pass!=''){
            var auth = {};
            // auth.push({'name': name});
            //auth.push({'pass': pass});
            auth['name']=name;  auth['pass']=pass;
            //console.log(auth['name']);
            //console.log(auth['pass']);
            var auth1={'auth': auth};
            console.log(auth1.auth['name']);
            console.log(auth1.auth['pass']);
            //  auth.serializeArray();
            socket.emit('auth', JSON.stringify(auth)); //console.log( 'no no nn no');
            $('#magic').empty();


        }
    };
    socket.on('error auth', function(){
        alert ("error authentication");
    });
    socket.on('auth succ', function(){
        $('#magic').empty();
        var link='<a href="./client"><button>type to be redirected</button></a>';
        $('#magic').html(link);
    })
});
