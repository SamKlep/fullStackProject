const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const models = require('./models');
const passport = require('passport');
const session = require('express-session');
const flash = require('express-flash');
const promise = require('bluebird');
const bcrypt = require('bcrypt');
const passportSetup = require('./config/passport-setup');
const routes = require('./routes/indexRoutes');
const keys = require('./config/keys')

app.use(session({
    secret: 'redwine',
    resave: false,
    saveUninitialized: false
}));

// PG-PROMISE INIT OPTIONS
const initOptions = {
    promiseLib: promise,
};

// CONNECTING TO LOCAL DATABASE
const config = {
    host: 'localhost',
    port: 5432,
    database: 'tastingBoard',
    user: 'postgres',
    username: 'postgres',
    password: 'admin'
};

const pgp = require('pg-promise')(initOptions);
const db = pgp(config);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(routes);

app.set('view engine', 'ejs');
app.set("views", __dirname + "/views");

// HOMEROUTE

app.get('/', (req, res) => {
    res.render('index');
});

/////////////////LOGIN PAGE///////////////////

app.get('/index', (req, res) => {
    res.render('index.ejs')
});

// try {
//     if (await bcrypt.compare(req.body.inputEmail, user.email))
//     const hashedPassword = await bcrypt.hash(req.body.inputPassword, 10);
//     users.push({
//         email: req.body.inputEmail,
//         password: hashedPassword
//     })
//     res.redirect('/login')
// } 
// catch {
//     res.redirect('/register')

/////////////////REGISTER PAGE///////////////////

app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.post('/register', function (req, res) {
    console.log("This post thing is working")
    console.log(req.body)
    models.user.create({
        email: req.body.inputEmail,
        password: req.body.inputPassword
    })
    .then(function (user) {
        res.redirect("index")
        // console.log(user)
    });
});

//////////Express Routes////////////////////////

app.get("/", function(req, res) { 
  res.render('index');
})

app.get("/", function(req, res) { 
    res.render('wine');
})

app.get("/", function(req, res) { 
    res.render('beer');
})

app.get("/", function(req, res) { 
    res.render('liquor');
})

app.post('/index', passport.authenticate('local', {
    successRedirect: '/welcome',
    failureRedirect: '/index'
}));

// THIS IS A TEST
const initalizePassport = require('./passport-config')
initalizePassport (
    passport,
    email =>
        users.find(user => users.email === inputEmail),
    id => 
        users.find(user => users.password === inputPassword)
);

////////////////SHOULD DIRECT TO HOMEPAGE AFTER LOGIN////////////////////

app.get("/welcome", checkAuthenticated, function (req, response) {
    console.log('Im here');
    response.render("welcome");
});

app.post("/logIn",
    passport.authenticate('local', { failureRedirect: '/error'}), 
    function (req, response) {
        console.log('Im here @ log in');
        res.send("I am here now.")
});

////////////////SHOULD DIRECT TO REGISTRATION PAGE////////////////////

app.get("/register", checkNotAuthenticated, function (req, response) {
    console.log('Im here');
    response.send("new item");
    res.render('register') 
});

////////////////LOG OUT REDIRECT//////////////////////

app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
})

//////////////////////////////////////

app.post("/wine", function (req, response) {
    console.log('Im here');
    response.send("another item");
});

app.post("/beer", function (req, response) {
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
    res.redirect('/welcome')
}

// THIS FUNCTION KEEPS AUTHENTICATED USERS FROM GOING TO PAGES THEY DONT NEED TO
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    return res.redirect('/index')
}

app.listen(8080, function () {
    console.log('Tasting Board app listening on port 8080!');
})