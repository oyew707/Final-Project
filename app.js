const express = require('express');
//var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
//var router = express.Router();
var dbs = require("./database");

const app = express();

app.use(cookieParser("London is Blue"));

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.redirect(`/login.html`)
})

app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/html/login.html'))
})

app.get('/signup.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/html/signup.html'))
})

app.get('/game_page.html', (req, res) => {
    if(req.signedCookies){
        res.sendFile(path.join(__dirname, '/html/game_page.html'))
    }else{
        res.redirect("/login.html")
    }
})

app.get('/demo.html', (req, res) => {

    if(req.signedCookies){
        res.sendFile(path.join(__dirname, '/html/demo.html'))
    }else{
        console.log("Redirecting");
        res.redirect("/login.html")
    }
})

app.get('/game_dave1.html', (req, res) => {

    if(req.signedCookies){
        res.sendFile(path.join(__dirname, '/html/game_dave1.html'))
    }else{
        res.redirect("/login.html")
    }
})

app.get('/game_dave2.html', (req, res) => {

    if(req.signedCookies){
        res.sendFile(path.join(__dirname, '/html/game_dave2.html'))
    }else{
        res.redirect("/login.html")
    }
})

app.get('/loggingin', (req, res) => {
    var username = req.query.username;
    var password = req.query.password;
    console.log(username);
    console.log(password);
    try{
        var stored_password = "";
        dbs.retrieveUser(username, async function(result){
            stored_password = await result;
            console.log("Retrieved pass"+stored_password);
            if (stored_password === password){ // Correct log in
                res.cookie( "user"+username, password, {signed : true, maxAge: 25000});
                res.redirect("/demo.html");
            }else{ // Incorect log in
                res.send("Incorrect log in credentials");
            }
        });
    } catch (err){
        res.send("Server Error ");
    }

})

app.get("/signup",(req, res) =>{
    var username = req.query.username;
    var password = req.query.password;
    var name = req.query.firstName + " " + req.query.lastName;
    try{

        var inserted = "";
        dbs.signUp(username, name, password, async function(result){
            inserted = await result;
            if(inserted){

                res.cookie("user"+username, password, {signed : true, maxAge: 25000});
                res.redirect("/demo.html");
            }else{
                res.send("Error cannot sign up, Try different Authentication");
            }
        });

    }catch (err){
        res.send("Server Error ");
    }

})

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send('error');
});

app.listen(15000, () => {
    console.log(`Example app listening at http://localhost:15000`)
})