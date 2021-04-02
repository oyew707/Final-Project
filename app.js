const express = require('express');
//var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
//var router = express.Router();
var dbs = require("./database");

const app = express();
// app.set('view engine', 'ejs')
// app.set('views', path.join(__dirname, '../html'));

app.use(cookieParser("London is Blue"));

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
    res.sendFile(path.join(__dirname, '/html/game_page.html'))
})

app.get('/demo.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/html/demo.html'))
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
                res.cookie("access", username, {signed : true})
                res.redirect("/demo.html")
            }else{ // Incorect log in
                res.send("Incorrect log in credentials");
            }
        });
    } catch (err){
        res.send("Server Error ");
    }

})

// router.get("/loggingin/:username/:password",(req, res) =>{
//     var username = req.params("username");
//     var password = req.params("password");
//     var stored_password = dbs.retrieveUser(username);
//     if (stored_password === password){ // Correct log in
//         res.cookie("access", username, {signed : true})
//         res.redirect("/game_page.html")
//     }else{ // Incorect log in
//         res.send("Cannot sign in ")
//     }
// })

app.get("/signup",(req, res) =>{
    var username = req.query.username;
    var password = req.query.password;
    var name = req.query.firstName + " " + req.query.lastName;
    try{

        var inserted = "";
        dbs.signUp(username, name, password, async function(result){
            inserted = await result;
            if(inserted){
                res.cookie("access", username, {signed : true})
                res.redirect("/demo.html")
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
    res.render('error');
});

app.listen(15000, () => {
    console.log(`Example app listening at http://localhost:15000`)
})