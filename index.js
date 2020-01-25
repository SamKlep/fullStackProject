const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const models = require('./models');
const passport = require('passport');
const session = require('express-session');
const flash = require('express-flash');
const promise = require('bluebird');
const passportSetup = require('./config/passport-setup')
const routes = require('./routes/indexRoutes')


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
initalizePassport(
    passport,
    email =>
        users.find(user => users.email === inputEmail),
    id =>
        users.find(user => users.password === inputPassword)
);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(routes);

app.use(session({
    secret: 'redwine',
    resave: false,
    saveUninitialized: false
}));

app.set('view engine', 'ejs');
app.set("views", __dirname + "/views");


// HOMEROUTE

app.get('/', (req, res) => {
    console.log("hello");
    res.render('index');
})




/////////////////LOGIN PAGE///////////////////

// passport.use(new LocalStrategy(
//     function (email, password, done) {
//       models.user.findOne({
//         where: {
//           email: req.body.inputEmail
//         }
//       }).then(function (email) {
//         if (!email) {
//           return done(null, false);
//         }

//         if (email.password != inputPassword) {
//           return done(null, false);
//         }
//         return done(null, email);
//       }).catch(function (err) {
//         return done(err);
//       });
//     }
//   ));

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

////////////////////////////////////////////
//////////Express Routes////////////////////
////////////////////////////////////////////
app.get('/index', (req, res) => {
    res.render('index')
})

app.get("/wine", function (req, res) {
    console.log('wines for you')
    res.render('wine');
})

app.get("/beer", function (req, res) {
    console.log('im beer');
    res.render('beer');
})

app.get("/liquor", function (req, res) {
    console.log('im fancy liquor');
    res.render('liquor');
})


app.get('/myboard', function (req, res) {
    models.beer.findAll()
    res.render('myboard', {
})
  });


app.get('/beers', function (req, res) {
    models.beer.findAll()
    .then((results) => {
        res.json(results)
        // console.log(results)
    })
})

app.get('/wines', function (req, res) {
    models.beer.findAll()
    .then((results) => {
        res.json(results)
        // console.log(results)
    })
})

app.get('/liquors', function (req, res) {
    models.beer.findAll()
    .then((results) => {
        res.json(results)
        // console.log(results)
    })
})



app.post('/index', passport.authenticate('local', {
    successRedirect: '/welcome',
    failureRedirect: '/index'
}));

////////////////SHOULD DIRECT TO HOMEPAGE AFTER LOGIN////////////////////

app.get("/welcome", function (req, response) {
    console.log('Im here');
    response.render("welcome");

});

// app.get("/welcome", checkAuthenticated, function (req, response) {
//     console.log('Im here');
//     response.render("welcome");

// });

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

//////////////Sequelize////////////////////
////////////Actions///////////////////////
//////////////////////////////////////////

//////////////wine////////////////////////

//////////////Add entry to Database////////

app.post("/wine", function (req, response) {
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


// DELETE /wine/:id//////////////////////////////

app.delete("/wine:id", function (req, response) {
    models.wine.delete({ name: req.body.name,
        type: req.body.type,
        date: req.body.date,
        description: req.body.description,
        rating: req.body.rating
     })
        .then(function (wine) {
            console.log(wine);
            response.send("new wine entry deleted with id: " + wine.id);
        });
});

//////////////edit database entry///////////

app.put("/wine/id:", function (req, response) {
    console.log('updating wine entry: ' + req.params.id);
    let updateValues = {};
  
    if(req.body.wine) {
      updateValues.wine = req.body.wine;
    }
  
    console.log(updateValues);
  
    models.wine.update(updateValues, { where: { id: req.params.id } })
    .then(function (updated) {
      console.log('updated success');
      console.log(updated);
      response.send(updated);
    });
  });

////////////////fetch from database////////////

  app.get("/wine", function (req, response) {
    console.log('wine');
    models.wine.findAll().then(function (wine){
      console.log(wine);
      response.send(wine);
    });
  });

//////////////beer////////////////////////

//////////////Add entry to Database////////

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

/////////////get beer from database////////////

app.get("/beer", function (req, response) {
    console.log('beer');
    models.beer.findAll().then(function (beer){
      console.log('beer');
      response.render('beer', {

      });
    });
  });

//// DELETE /beer/:id ////////////////////////////
app.delete("/beer:id", function (req, response) {
    models.beer.delete({ name: req.body.name,
        type: req.body.type,
        date: req.body.date,
        description: req.body.description,
        rating: req.body.rating 
    })
        .then(function (beer) {
            console.log(beer);
            response.send("new beer entry deleted with id: " + beer.id);
        });
});

//////////////edit database entry///////////

app.put("/beer/id:", function (req, response) {
    console.log('updating beer entry: ' + req.params.id);
    let updateValues = {};
  
    if(req.body.beer) {
      updateValues.beer = req.body.beer;
    }
  
    console.log(updateValues);
  
    models.beer.update(updateValues, { where: { id: req.params.id } })
    .then(function (updated) {
      console.log('updated success');
      console.log(updated);
      response.send(updated);
    });
  });

  ////////////////fetch from database////////////

  app.get("/beer", function (req, response) {
    console.log('beer');
    models.beer.findAll().then(function (beer){
      console.log(beer);
      response.send(beer);
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

//////////////liquor////////////////////////

//////////////Add entry to Database////////

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

// DELETE /liquor/:id
app.delete("/liquor:id", function (req, response) {
    models.liquor.delete({ name: req.body.name,
        type: req.body.type,
        date: req.body.date,
        description: req.body.description,
        rating: req.body.rating })
        .then(function (liquor) {
            console.log(liquor);
            response.send("new liquor entry deleted with id: " + liquor.id);
        });
});

//////////////edit database entry///////////

app.put("/liquor/id:", function (req, response) {
    console.log('updating liquor entry: ' + req.params.id);
    let updateValues = {};
  
    if(req.body.liquor) {
      updateValues.liquor = req.body.liquor;
    }
  
    console.log(updateValues);
  
    models.liquor.update(updateValues, { where: { id: req.params.id } })
    .then(function (updated) {
      console.log('updated success');
      console.log(updated);
      response.send(updated);
    });
  });

  ////////////////fetch from database////////////

  app.get("/liquor", function (req, response) {
    console.log('liquor');
    models.liquor.findAll().then(function (liquor){
      console.log(liquor);
      response.send(liquor);
    });
  });

////////////////////////////////////////////
// THIS FUNCTION CHECKS FOR AUTHENTICATION//
////////////////////////////////////////////

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

///////////////////////////////////////////////////////
///THIS FUNCTION KEEPS AUTHENTICATED USERS FROM GOING/////TO PAGES THEY DONT NEED TO//////////////////////////

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    return res.redirect('/')
}

app.listen(8080, function () {
    console.log('Tasting Board app listening on port 8080!');
})