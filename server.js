const express = require('express')
const app = express()
const fs = require('fs')
const html = require('html')
const morgan = require('morgan')
const minimist = require('minimist')

var HTTP_PORT = 3000

// Start an app server

const server = app.listen(HTTP_PORT, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',HTTP_PORT))
});

//var LoggedIn = false

// Setting Endpoints

//Main app screen
app.get('/app/main/', (req, res) => {
    res.sendFile(__dirname + "/index.html");    
    res.status(200).type('text/json');
});

//Sign-in screen
app.get('/app/sign-in/', (req, res) => {
    res.sendFile(__dirname + "/signin.html");
    res.status(200).type('text/json');
});

//Sign-up screen
app.get('/app/sign-up/', (req, res) => {
    res.status(200).type('text/json');
    res.send("Sign-up")
});

//Test (for development purposes)
app.get('/test/', (req, res) => {
    res.sendFile(__dirname + "/test.html");
    res.status(200).type('text/json');
});

// Default response for any other request
app.use(function(req, res){
    res.status(404).type("text/plain")
    res.send('404 NOT FOUND')    
});