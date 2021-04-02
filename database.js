var mysql = require('mysql');
/// const { connect } = require('node:http2');
exports.newDatabase = function(){
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        port: 55011,
        password: "root"
    });


    con.connect(function(err){
        if (err) throw err;
        console.log("Connected!")

        connect.query("CREATE DATABASE CP476_Project", function(err, result){
            if (err) throw err;
            console.log("Database Created");
        });
        var sql = "USE CP476_Project; CREATE TABLE users (username VARCHAR(255), name VARCHAR(255), password VARCHAR(255))";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table created");
        });

    });

}


exports.signUp = function (username, name, password){
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        port: 55011,
        password: "root",
        database: "CP476_Project"
    });

    con.connect(function(err){
        if(err) throw err;
        console.log("Conected!")

        var sql = "INSERT INTO users (username, name, password) VALUES ('"+ username +"', '"+ name +"', '"+ password +"')";
        con.query(sql, function (err, result) {
            if (err) return false;
            return true;
            console.log("1 record inserted");
        });

        con.end(function (err) {
            if (err) console.log(err.message);
            console.log("Disconnected");
        });

    });


}

exports.retrieveUser = function(name, callback){
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        port: 55011,
        password: "root",
        database: "CP476_Project"
    });
    con.connect(function(err){
        if(err) throw err;
        res = con.query("SELECT * from users where username ='"+name+"' ", function(err, result){
            if (err) throw err;
            var rows = JSON.parse(JSON.stringify(result[0]));
            console.log(rows);
            return callback(rows.password);
        });

    });
}


exports.setCookie = function(name, value, exp_days){
    var d = new Date();
    d.setTime(d.getTime() + (exp_days*24*60*60*1000));
    var expires ="expires=" + d.toGMTString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/"
}

exports.getCookie = function (name){
    var cname = name + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i =0; i < ca.length; i++){
        var c = ca[i];
        while(c.charAt(0) == ' '){
            c = c.substring(1);
        }
        if(c.indexOf(cname) == 0){
            return c.substring(cname.length, c.length);
        }
    }
    return ""
}


var checkCookie = function(){
    var user = getCookie("username");
    if( user != ""){
        alert("Welcome again "+ user);
    }
    else{
        user = prompt("Enter your name:", "");
        if (user != "" && user != null){
            setCookie("username", user, 30);
        }
    }
}