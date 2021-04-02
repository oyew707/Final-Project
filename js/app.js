const express = require('express')
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');


const app = express()

app.get('/', (req, res) => {
    res.redirect(`/login.html`)
})

app.get('/login.html', (req, res) => {
    res.sendFile("../login.html")
})

app.get('/signup.html', (req, res) => {
    res.sendFile("../signup.html")
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