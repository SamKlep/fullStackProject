const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const models = require('./models');
const passport = require('passport');
const session = require('express-session');

const initalizePassport = require('./passport-config');
initalizePassport(passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view-engine', 'ejs')

app.use(express.static(__dirname + '/public'));
app.use(passport.initialize());
app.use(passport.session());
app.use(session({
    secret: 'redwine',
    resave: false;
    saveUninitialized: false;
}))

app.set('view engine', 'ejs')

////////////////////////////////////

app.get("/", function (req, response) {
    console.log('Im here');
    response.send("new item");
});

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


app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
})
