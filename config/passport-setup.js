// const passport = require('passport');
// const googleStrategy = require('passport-google-oauth20');
// const express = require('express');
// const app = express();
// const keys = require('./keys');
// const models = require('../models');


// passport.use(new googleStrategy({
//     //options for google strategy
//     callbackURL: '/auth/google/redirect',
//     clientID: keys.google.clientID,
//     clientSecret: keys.google.clientSecret
//   }, (accessToken, refreshToken, profile, done) => {
//     //check if user already exists in db
//     models.user.findOne({
//       where: {
//         g_email: username
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
//     models.user.findOrCreate ({
//         where: {
//             googleid: username,
//             password: password,
//         }
//     })
// }));

// app.post('/',
//   passport.authenticate('local', { failureRedirect: '/error' }),
//   function(req, res) {
//     res.redirect('/welcome');
// });
