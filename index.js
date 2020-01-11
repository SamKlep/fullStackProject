const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const models = require('./models');
const passport = require('passport');
const session = require('express-session');
const flash = require('express-flash');

const initalizePassport = require('./passport-config');
initalizePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(passport.initialize());
app.use(passport.session());
app,use(flash());

app.use(session({
    secret: 'redwine',
    resave: false,

    saveUninitialized: false

}))

app.set('view engine', 'ejs')

////////////////////////////////////

app.post('/index', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/index'
}));

////////////////SHOULD DIRECT TO HOMEPAGE AFTER LOGIN////////////////////

app.get("/", checkAuthenticated, function (req, response) {
    console.log('Im here');
    response.send("new item");
});

////////////////SHOULD DIRECT TO REGISTRATION PAGE////////////////////

app.get("/register", checkNotAuthenticated, function (req, response) {
    console.log('Im here');
    response.send("new item");
    res.render('register.html') 
    // INSERT REGISTER PAGE LINK ABOVE
});

////////////////LOG OUT REDIRECT//////////////////////

app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
})

//////////////////////////////////////

app.post("/drinks", function (req, response) {
    console.log('Im here');
    response.send("another item"); 
});

////////////////////////////////////////

app.put("/drinks", function (req, response) {
    console.log('Im here');
    response.send("a third item");
});

// DELETE single owner
app.delete("/drinks", function (req, response) {
    console.log('Im here');
    response.send("item deleted");
});


// THIS FUNCTION CHECKS FOR AUTHENTICATION
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

// THIS FUNCTION KEEPS AUTHENTICATED USERS FROM GOING TO PAGES THEY DONT NEED TO
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    return res.redirect('/')
}


app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
})