const passport = require('passport')
const LocalStrategy = require('./localStrategy')
const User = require('../models/user')

// Serialize user (called on login)
passport.serializeUser((user, done) => {
    console.log('*** serializeUser called, user: ', user);
    console.log('---------');
    done(null, { _id: user._id, username: user.username, watchlist: user.watchlist });
});

// Deserialize user (called on each request)
passport.deserializeUser(async (id, done) => {
    try {
        console.log('DeserializeUser called');
        const user = await User.findById(id);
        console.log('*** Deserialize user, user:');
        console.log(user);
        console.log('--------------');
        done(null, { _id: user._id, username: user.username, watchlist: user.watchlist });
    } catch (err) {
        done(err, null);
    }
});

//  Use Strategies 
passport.use(LocalStrategy)

module.exports = passport

