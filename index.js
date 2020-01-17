const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const models = require('./models');
const passport = require('passport');
const googleStrategy = require('passport-google-oauth');
const session = require('express-session');
const flash = require('express-flash');
const promise = require('bluebird');


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


// THIS IS A TEST

const initalizePassport = require('./passport-config')
initalizePassport (
    passport,
    email =>
        users.find(user => users.email === inputEmail),
    id => 
        users.find(user => users.password === inputPassword)
);

app.use(express.static('public'));

app.set('view-engine', 'ejs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(session({
    secret: 'redwine',
    resave: false,
    saveUninitialized: false
}));

app.set('view engine', 'ejs');
app.set("views", __dirname + "/views");

/////////////////LOGIN PAGE///////////////////

app.get('/index', (req, res) => {
    res.render('index.ejs')
})

passport.use(new LocalStrategy(
    function (email, password, done) {
      models.user.findOne({
        where: {
          email: req.body.inputEmail
        }
      }).then(function (email) {
        if (!email) {
          return done(null, false);
        }
        if (email.password != inputPassword) {
          return done(null, false);
        }
        return done(null, email);
      }).catch(function (err) {
        return done(err);
      });
    }
  ));

passport.use(
    new.googleStrategy({
        clientID:'1052851154794-b91odviv8dci62t22errbkmni69v09pe.apps.googleusercontent.com',
        clientSecret:'H1VE4WXwCOfZhV5K6kxV1V_7'
    }),
    () => {

    })
)

/////////////////REGISTER PAGE///////////////////

app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.post('/register', function (req, res) {
    models.user.create({
        email: req.body.inputEmail,
        password: req.body.inputPassword
    })
    .then(function (user) {
        console.log(user)
    });
});
    // try {
    //     const hashedPassword = await bcrypt.hash(req.body.inputPassword, 10)
    //     users.push({
    //         email: req.body.inputEmail,
    //         password: hashedPassword
    //     })
    //     res.redirect('/login')
    // } 
    // catch {
    //     res.redirect('/register')


//////////Express Routes////////////////////////

app.get("/", function(req, res) { 
  res.render('index');
})

app.post('/index', passport.authenticate('local', {
    successRedirect: '/welcome',
    failureRedirect: '/index'
}));

////////////////SHOULD DIRECT TO HOMEPAGE AFTER LOGIN////////////////////

app.get("/welcome", checkAuthenticated, function (req, response) {
    console.log('Im here');
    response.send("new item");

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
    console.log('Tasting Board app listening on port 8080!');
})