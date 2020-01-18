// CONFIGURATION FOR LOCAL LOG-IN/PASSPORT

const localStrategy = require('passport-local').Strategy
// THIS DETERMINES WHAT STRATEGY WE ARE USING

const bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail, getUserById) {
    const authenticateUser = async function (inputEmail, password, done) {
        const user = getUserByEmail(inputEmail)

        if (user == null) {
            return done(null, false, { message: 'No user with that email'})
        }
        // CHECKS TO MAKE SURE USER EXISTS
        try {
            if (await bycrypt.compare(password, user.inputPassword)) {
                return done(null, user)
        // TRIES TO AUTHENTICATE PASSWORD
        } else {
            return done(null, false, {message: 'Password incorrect. Please try again.'})
        }
        // IF PASSWORD INCORRECT RETURNS ERROR MESSAGE
    } catch(e) {
            return done(e)
        }
    }

passport.use(new localStrategy({
    usernameField: 'inputEmail'
},authenticateUser))
passport.serializeUser(function (user, done) {
    done (null, user.id)})
passport.deserializeUser(function (id, done) {
    done(null, getUserById(id))
})
}

module.exports = initialize

