// CONFIGURATION FOR LOCAL LOG-IN/PASSPORT

const localStrategy = require('passport-local').Strategy
// THIS DETERMINES WHAT STRATEGY 

const bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail, getUserById) {
    const authenticateUser = async function (email, password, done) {
        const user = getUserByEmail(inputEmail)
        if (user == null) {
            return done(null, false, { message: 'No user with that email'})
        }

        try {
            if (await bycrypt.compare(password, user.password)) {
                return done(null, user)
        } else {
            return done(null, false, {message: 'Password incorrect. Please try again.'})
        }
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

module.export = initialize