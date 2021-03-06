var mysql = require('mysql');
/// const { connect } = require('node:http2');
exports.newDatabase = function(){
    var con = mysql.createConnection({
        host: "database-2.cyrxons3vtyp.ca-central-1.rds.amazonaws.com",
        user: "admin",
        password: "pressure"
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


exports.signUp = function (username, name, password, callback){
    var con = mysql.createConnection({
        host: "database-2.cyrxons3vtyp.ca-central-1.rds.amazonaws.com",
        user: "admin",
        password: "pressure",
        database: "CP476_Project"
    });

    con.connect(function(err){
        if(err) throw err;
        console.log("Connected!")

        var sql = "INSERT INTO users (username, name, password) VALUES ('"+ username +"', '"+ name +"', '"+ password +"')";
        con.query(sql, function (err, result) {
            if (err) return callback(false);
            return callback(true);
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
        host: "database-2.cyrxons3vtyp.ca-central-1.rds.amazonaws.com",
        user: "admin",
        password: "pressure",
        database: "CP476_Project"
    });
    con.connect(function(err){
        if(err) throw err;
        res = con.query("SELECT * from users where username ='"+name+"' ", function(err, result){
            if (err) throw err;
            if (result.length > 0) {
                var rows = JSON.parse(JSON.stringify(result[0]));
                console.log(rows);
                return callback(rows.password);
            }
            else{
                return callback("");
            }
        });

    });
}

exports.addRoom = function(username, room, callback){
    var con = mysql.createConnection({
        host: "database-2.cyrxons3vtyp.ca-central-1.rds.amazonaws.com",
        user: "admin",
        password: "pressure",
        database: "CP476_Project"
    });

    con.connect(function(err){
        if(err) throw err;
        console.log("Conected!")

        var sql = "INSERT INTO active_users (username, room_id) VALUES ('"+ username +"', '"+ room +"')";
        con.query(sql, function (err, result) {
            if (err) return callback(false);
            else
                return callback(true);
            console.log("1 record inserted");
        });

        con.end(function (err) {
            if (err) console.log(err.message);
            console.log("Disconnected");
        });

    });

}

exports.retrieveRooms = function(room_id, callback){
    var con = mysql.createConnection({
        host: "database-2.cyrxons3vtyp.ca-central-1.rds.amazonaws.com",
        user: "admin",
        password: "pressure",
        database: "CP476_Project"
    });
    con.connect(function(err){
        if(err) throw err;
        res = con.query("SELECT * from active_users where room_id ='"+room_id+"' ", function(err, result){
            if (err) throw err;
            var rows = [];
            for (var i = 0; i < result.length; i++) {
                rows.push(JSON.parse(JSON.stringify(result[i])));
            }
            return callback(rows);
        });

    });
}

exports.deleteRooms = function (){
    var con = mysql.createConnection({
        host: "database-2.cyrxons3vtyp.ca-central-1.rds.amazonaws.com",
        user: "admin",
        password: "pressure",
        database: "CP476_Project"
    });
    con.connect(function(err){
        if(err) throw err;
        res = con.query("DELETE FROM active_users WHERE timestamp < (select now() - INTERVAL 30 MINUTE )", function(err, result){
            if (err) throw err;
            console.log("deleted");
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