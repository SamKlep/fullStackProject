const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const models = require('./models');
const passport = require('passport');
const session = require('express-session');
const flash = require('express-flash');
const promise = require('bluebird');
// const passportSetup = require('./config/passport-setup');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const routes = require('./routes/indexRoutes');
const keys = require('./config/keys');
const pbkdf2 = require('pbkdf2');
require('dotenv').config();

var salt = process.env.SALT_KEY;

app.use(session({
    secret: 'redwine',
    resave: false,
    saveUninitialized: false
}));

function encryptionPassword(password) {
    var key = pbkdf2.pbkdf2Sync(
        password, salt, 36000, 256, 'sha256'
    );
    console.log(key)
    var hash = key.toString('hex');
    return hash;
}

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
app.use(express.urlencoded({ extended: false }))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(routes);

app.set('view engine', 'ejs');
app.set("views", __dirname + "/views");

passport.serializeUser((user, done) => {
    console.log("serialize user")
    done(null, user.id);
});
  
passport.deserializeUser((id, done) => {
    console.log("deseralize user")
    models.user.findByPk(id).then((user) => {
      done(null, user.id);
    });
});

/////////////////LOGIN PAGE///////////////////

app.get('/index', (req, res) => {
    res.render('index.ejs')
});

// LOCAL LOGIN

passport.use(new LocalStrategy (
    (username, password, done) =>{
      models.user.findOne({
        where: {
            username: username,
        },
      }).then((user) =>{
        if (!user) {
        console.log("one")
          return done(null, false);
        }
        if (user.password != encryptionPassword(password)) {
        console.log("two")
          return done(null, false);
        }
        console.log("three")
        return done(null, user);
      }).catch((error)=> {
          console.log("four")
        return done(error);
      });
    }
));

app.post('/index',
  passport.authenticate('local', { failureRedirect: '/error' }),
  function(req, res) {
    res.redirect('/welcome');

});

// GOOGLE LOGIN

passport.use(new GoogleStrategy({
    //options for google strategy
    callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
  }, (accessToken, refreshToken, profile, done) => {
    //checks if user already exists in db
    console.log(profile)
    models.user.findOne({
      where: {
        googleId: profile.id
      }
    }).then((currentUser) => {
      if (currentUser) {
        //already have user in db
        console.log("the user exists in db as: " + profile.displayName);
        done(null, currentUser);
      } else {
        models.user.create({
          username: profile.displayName,
          googleId: profile.id,
          nickname: profile.name.givenName
        }).then((newUser) => {
          console.log("New User created: " + newUser);
          done(null, newUser);
        });
      }
    });
  }));
  

// /////////////////REGISTER PAGE///////////////////

app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.post('/register', function (req, res) {
    models.user.create({
        password: encryptionPassword(req.body.password),
        username: req.body.username,
        nickname: req.body.nickname
    })
    .then(function (user) {
        res.redirect("index")
        // console.log(user)
    });
});

//////////Express Routes////////////////////////

app.get('/', (req, res) => {
    res.redirect('index');
});

app.get("/wine", function (req, res) {
    console.log('wines for you')
    res.render('wine');
})

app.get("/", function(req, res) { 
    res.render('beer');
})

app.get("/", function(req, res) { 
    res.render('liquor');
})

app.get("/error", function(req,res) {
    console.log("five")
    res.render('error');

})

app.post('/index', passport.authenticate('local', {
    successRedirect: '/welcome',
    failureRedirect: '/index'
}));

////////////////SHOULD DIRECT TO HOMEPAGE AFTER LOGIN////////////////////

app.get("/welcome", checkAuthenticated, function (req, response) {
    response.render("welcome"),
    {users: req.user};
});

app.post("/welcome",
    passport.authenticate('local', { failureRedirect: '/error'}), 
    function (req, res) {
        res.render("welcome")
});

////////////////SHOULD DIRECT TO REGISTRATION PAGE////////////////////

app.get("/register", checkNotAuthenticated, function (req, response) {
    response.send("new item");
    res.render('register')
});

////////////////LOG OUT REDIRECT//////////////////////

app.delete('/logout', (req, res) => {
    req.logOut();
    res.redirect('/welcome')
})

//////////////Sequelize////////////////////
////////////Actions///////////////////////
//////////////////////////////////////////

app.post("/wine", function (req, response){
    models.wine.create({ 
      name: req.body.name, 
      type: req.body.type,
      date: req.body.date,
      description: req.body.description,
      rating: req.body.rating
    })
      .then(function () {
        response.render('wine');
      });
  });

app.post("/beer", function (req, response) {
    models.beer.create({ 
      name: req.body.name, 
      type: req.body.type,
      date: req.body.date,
      description: req.body.description,
      rating: req.body.rating
    })
      .then(function () {
        response.render('beer');
      });
  });

// app.post("/beer", function (req, response) {
//     console.log('Creating Entry');
//     console.log(req.body);
//     models.beer.create({ name: 'Hopadillo', type: 'IPA', date: '2020/01/10', description: 'Bold, refreshing', rating: '8' })
//         .then(function (beer) {
//             console.log(beer);
//             response.send("new beer entry created with id: " + beer.id);
//         });
// });

app.post("/liquor", function (req, response) {
    models.liquor.create({ 
      name: req.body.name, 
      type: req.body.type,
      date: req.body.date,
      description: req.body.description,
      rating: req.body.rating
    })
      .then(function () {
        response.render('liquor');
      });
  });


////////////////////////////////////////////
// THIS FUNCTION CHECKS FOR AUTHENTICATION//
////////////////////////////////////////////

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/welcome')
}

///////////////////////////////////////////////////////
///THIS FUNCTION KEEPS AUTHENTICATED USERS FROM GOING/////TO PAGES THEY DONT NEED TO//////////////////////////

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    return res.redirect('/index')
}

app.use(function(req,res){
    res.status(404).render('error');
});

app.listen(8080, function () {
    console.log('Tasting Board app listening on port 8080!');
})