'use strict';
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('./logs/server.log', log + '\n', (err) => {
        if(err) console.log(err);
    })
    next(); //without next, code will not go to the next line
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// })

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
    // return 'test';
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

// Route -- Root Route
app.get('/', (req, res) => {

    // res.send('<h1> Hello express!</h1>');
    // res.send({
    //     name : 'Raju Reddy',
    //     age : 39,
    //     likes : ['traveling', 'road trips']
    // })
    res.render('home.hbs', {
        pageTitle : 'Home',
        welcomeNote : `Welcome to reddy.io, current date and time is ${new Date()}`
    })
});

//about route
app.get('/about', (req, res) =>{
    // res.send('<h1> about page </h1>');
    res.render('about.hbs', {
        pageTitle : 'About Us',
        welcomeNote : `Welcome to reddy.io, current date and time is ${new Date()}`
    });
})

//bad route

app.get('/bad', (req, res) => {
    res.send({
        pageTitle : 'Help',
        errorCode : 100,
        errorMessage: `Bad request sent @${new Date()}`
    });
})


app.listen(3000, () =>{
    console.log(`Server is up on port 3000`);
});