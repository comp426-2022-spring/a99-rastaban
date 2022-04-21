const express = require('express')
const app = express()
const fs = require('fs')
const html = require('html')
const morgan = require('morgan')
const minimist = require('minimist')

// Require database SCRIPT file
const db = require("./database.js");
// Make Express use its own built-in body parser for both urlencoded and JSON body data.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//middleware for css to display
app.use(express.static('public'));
//app.use('/css', express.static(__dirname + 'public'));
//app.use('/img', express.static(__dirname + 'public'));


var HTTP_PORT = 3000

// Start an app server

const server = app.listen(HTTP_PORT, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',HTTP_PORT))
});

//var LoggedIn = false

// Setting Endpoints

//Main app screen
app.post('/main/', (req, res) => {

    //SIGN UP
    if(req.query.url == 'signup'){
        if(req.body.password[0] == req.body.password[1]){
            let data = {
                user: req.body.username,
                pass: req.body.password[0]
            }
            const stmt = db.prepare('INSERT INTO userInformation (username, password) VALUES (?, ?)')
            const info = stmt.run(data.user, data.pass)
            console.log(info)

            fs.readFile('./signin.html', null, function(err, data){
                if(err){
                    res.writeHead(404);
                    res.write('File not found.');
                }else{
                    res.write(data);
                }
                res.end();
            })
        }else{
            fs.readFile('./dontMatch.html', null, function(err, data){
                if(err){
                    res.writeHead(404);
                    res.write('File not found.');
                }else{
                    res.write(data);
                }
                res.end();
            })
        }
    }

    //SIGN IN
    if (req.query.url == 'signin'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        try {
            const stmt = db.prepare('SELECT * FROM userInformation WHERE username = ?').get(req.body.username);
            //console.log(stmt["password"])
            if(stmt["password"] != req.body.password){
                console.log("Passwords don't match, try again")
                fs.readFile('./signin.html', null, function(err, data){
                    if(err){
                        res.writeHead(404);
                        res.write('File not found.');
                    }else{
                        res.write(data);
                    }
                    res.end();
                })
            }else{
                fs.readFile('./dashboard.html', null, function(err, data){
                    if(err){
                        res.writeHead(404);
                        res.write('File not found.');
                    }else{
                        res.write(data);
                    }
                    res.end();
                })
            }
        } catch (e) {
            console.error(e)
        }
    }    

    //ADD ACCESSLOG

});

//Sign-in screen
app.get('/sign-in/', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile('./signin.html', null, function(err, data){
        if(err){
            res.writeHead(404);
            res.write('File not found.');
        }else{
            res.write(data);
        }
        res.end();
    })
});

//Sign-up screen
app.get('/sign-up/', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile('./signup.html', null, function(err, data){
        if(err){
            res.writeHead(404);
            res.write('File not found.');
        }else{
            res.write(data);
        }
        res.end();
    })
});

//Test (for development purposes)
app.post('/test', (req, res) => {
    res.status(200).type("text/json")
    res.send({Username: req.body.username, Password: req.body.password})
    console.log({Username: req.body.username, Password: req.body.password})
    console.log("brUh")
});


// CREATE a new user (HTTP method POST) at endpoint /app/new/
// Used for signing up a new user
app.post("/app/new/user", (req, res) => {
    let data = {
        user: req.body.username,
        pass: req.body.password[0]
    }
    const stmt = db.prepare('INSERT INTO userInformation (username, password) VALUES (?, ?)')
    const info = stmt.run(data.user, data.pass)
    res.status(200).json(data)
});

// READ a single user (HTTP method GET) at endpoint /app/user/:id
// Used for loggin in an existing user
// Return the users in the database with the username inputed
// Can check if the password is correct to see if the information is for an existing user
app.get("/app/user/:username", (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM userInformation WHERE username = ?').get(req.params.username);
        res.status(200).json(stmt)
    } catch (e) {
        console.error(e)
    }
});

// Default response for any other request
app.use(function(req, res){
    res.status(404).type("text/plain")
    res.send('404 NOT FOUND')    
});
