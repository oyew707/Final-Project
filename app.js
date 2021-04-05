const express = require('express');
//var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require('cors')
var dbs = require("./database");
const {spawn} = require('child_process');

const app = express();

app.use(cookieParser("London is Blue"));
app.use(cors());

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    if(!req.signedCookies["usertic"]) {
        res.redirect('/login.html');
    }else{
        res.sendFile(path.join(__dirname, '/html/demo.html'));
    }
})

app.get('/login.html', (req, res) => {
    if(!req.signedCookies["usertic"]) {
        res.sendFile(path.join(__dirname, '/html/login.html'))
    }else{
        res.sendFile(path.join(__dirname, '/html/demo.html'));
    }
})

app.get('/signup.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/html/signup.html'))
})

app.get('/game_page.html', (req, res) => {
    if(req.signedCookies["usertic"]){
        var room_id = req.query.room;
        console.log(room_id);
        dbs.retrieveRooms(room_id,function (result){
            if (result.length >=2 ){
                res.send("Room already in use");
            }else{
                dbs.addRoom("username", room_id, function (result_1){
                    if (result_1){

                        res.sendFile(path.join(__dirname, '/html/game_page.html'));
                    }else{
                        res.send("Error could not add you to room");
                    }
                })

            }
        });
    }else{
        res.redirect("/login.html")
    }
})

app.get('/demo.html', (req, res) => {
    if(req.signedCookies["usertic"]){
        console.log(req.signedCookies["usertic"]);
        res.sendFile(path.join(__dirname, '/html/demo.html'));
    }else{
        console.log("Redirecting");
        res.redirect("/login.html");
    }
})

app.get('/game_dave1.html', (req, res) => {

    if(req.signedCookies["usertic"]){
        res.sendFile(path.join(__dirname, '/html/game_dave1.html'));
    }else{
        res.redirect("/login.html");
    }
})

app.get('/game_dave2.html', (req, res) => {

    if(req.signedCookies["usertic"]){
        res.sendFile(path.join(__dirname, '/html/game_dave2.html'));
    }else{
        res.redirect("/login.html");
    }
})

app.get('/loggingin', (req, res) => {

    var username = req.query.username;
    var password = req.query.password;
    console.log("here");
    console.log(username);
    console.log(password);
    try{
        var stored_password = "";
        dbs.retrieveUser(username, async function(result){
            stored_password = await result;
            console.log("Retrieved pass"+stored_password);
            if (stored_password === password){ // Correct log in
                res.cookie( "usertic", username, {signed : true, maxAge: 18000000});
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
                // res.cookie("usertic", username, {signed : true, maxAge: 18000000});
                res.redirect("/login.html");
            }else{
                res.send("Error cannot sign up, Try different Authentication");
            }
        });

    }catch (err){
        res.send("Server Error ");
    }

})

app.get("/rundavescript",function(req, res){
    console.log("are you here");
    var alg = req.query.alg;
    console.log(alg);
    var board = req.query.board;
    console.log("text here");
    console.log(board);
    board = board.split("_").join("/");
    var symbol = "y";
    console.log(board);
    var dataToSend;

    if(board === "n/n/n/n/n/n/n/n/n" && alg === "minimax"){
        res.send("[1, 1]");
    }else{
        // spawn new child process to call the python script
        const python = spawn('python3', ['python/dave.py', alg, symbol, board]);
        // collect data from script
        python.stdout.on('data', async function (data) {
        console.log('Pipe data from python script ...');
        dataToSend = await data.toString();
        console.log(dataToSend);
        res.send(dataToSend);
        });
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

app.listen(80, () => {
    console.log(`Example app listening at http://localhost:80`)
})


try{
    dbs.deleteRooms();
}catch(err){
    console.log(err);
}
setInterval(function(){
    try{
        dbs.deleteRooms();
    }catch(err){
        console.log(err);
    }

}, 18000000);

