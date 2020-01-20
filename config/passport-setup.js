const passport = require('passport');
const googleStrategy = require('passport-google-oauth20');
const LocalStrategy = require('passport-local').Strategy;
const keys = require('./keys');
const models = require('../models');

passport.serializeUser((user, done) => {
    done(null, user.id);
});
  
passport.deserializeUser((id, done) => {
    models.user.findByPk(id).then((user) => {
      done(null, user);
    });
});

// passport.use(new googleStrategy({
//     //options for google strategy
//     callbackURL: '/auth/google/redirect',
//     clientID: keys.google.clientID,
//     clientSecret: keys.google.clientSecret
//   }, (accessToken, refreshToken, profile, done) => {
//     //check if user already exists in db
//     models.user.findOne({
//       where: {
//         g_email: email
//       }
//     }).then((currentUser) => {
//       if (currentUser) {
//         //already have user in db
//         console.log("the user exists in db as: " + email);
//         done(null, currentUser);
//       } else {
//         models.user.create({
//           g_email: email
//         }).then((newUser) => {
//           console.log("New User created: " + newUser);
//           done(null, newUser);
//         });
//       }
//     });
//   }));
  

// passport.use(
//     new googleStrategy({
//         callbackURL: '/auth/google/redirect',
//         clientID: keys.google.clientID,
//         clientSecret: keys.google.clientSecret
//     },
//     (accessToken, refreshToken, profile, done) => {
//     console.log(profile)
//     models.user.findOne({googleId:profile.id}).then((currentUser) => {
//         if(currentUser){
//             console.log('User is: ', currentUser);
//         } else {
//             new User({
//                 email: profile.email
//                 googleId: profile.id
//             })
//         }
//         }
//     })
    // models.user.findOrCreate ({
    //     where: {
    //         googleid: email,
    //         password: password,
//         }
//     })
// }));


// passport.use(
//     new LocalStrategy({
//     function (email, password, done) {
//         models.user.findOne({
//             where: {
//                 email: req.body.inputEmail
//             }
//         })
//         .then (function (email) {
//         if (!email) {
//             return done(null, false);
//             }
//         if (email.password != inputPassword) {
//             return done(null, false);
//             }
//             return done(null, email);
//         }
//         .catch(function (err) {
//             return done(err);
//         }));
// }};

passport.use(new LocalStrategy (
    (username, password, done) =>{
      models.user.findOne({
        where: {
            username: username
        }
      }).then((user) =>{
        if (!user) {
          return done(null, false);
        }
        if (user.password != encryptionPassword(password)) {
          return done(null, false);
        }
        return done(null, user);
      }).catch((err)=> {
        return done(err);
      });
    }
));

app.post('/',
  passport.authenticate('local', { failureRedirect: '/error' }),
  function(req, res) {
    res.redirect('/welcome');
  });
