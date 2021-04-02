var mysql = require('mysql');
/// const { connect } = require('node:http2');
function newDatabase(){
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: ""
    });
    
    
    con.connect(function(err){
        if (err) throw err;
        console.log("Connected!")
    
        connect.query("CREATE DATABASE CP476_Project", function(err, result){
            if (err) throw err;
            console.log("Database Created");
        });
        var sql = "CREATE TABLE users (username VARCHAR(255), name VARCHAR(255), password VARCHAR(255))";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table created");
        });
    
    });

}


function signUp(){
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "CP476_Project"
    });
    
    con.connect(function(err){
        if(err) throw err;
        console.log("Conected!")
    
         var sql = "INSERT INTO users (username, name, password, role) VALUES ('mjordan@gmail.com', 'Michael Jordan', 'bennyrox$23',)";
         con.query(sql, function (err, result) {
             if (err) throw err;
             console.log("1 record inserted");
         });
    
        con.end(function (err) {
            if (err) console.log(err.message);
            console.log("Disconnected");
        });
    
    });
    

}

function retrieveUser(){
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "CP476_Project"
    });
    con.connect(function(err){
        if(err) throw err;
        con.query("SELECT * from users where name ='' ", function(err, result){
            if (err) throw err;
            console.log(result);
         });
    });
}


function setCookie(name, value, exp_days){
    var d = new Date();
    d.setTime(d.getTime() + (exp_days*24*60*60*1000));
    var expires ="expires=" + d.toGMTString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/"
}

function getCookie(name){
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


function checkCookie(){
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