const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
/*
function initialize(passport) {
    const authenticateUser = function (email, password, done) {
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
        
        catch {

        }

        
    }

passport.use(new localStrategy({
    usernameField: 'inputEmail'
}),authenticateUser)
passport.serializeUser(function (user, done))
passport.deserializeUser(function (id, done))


}
*/