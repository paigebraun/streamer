const User = require('../models/user');
const LocalStrategy = require('passport-local');

const strategy = new LocalStrategy(
  {
    usernameField: 'username',
  },
  async function (username, password, done) {
    try {
      const user = await User.findOne({ username: username });
      console.log('localstrat', username, password);
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }

      const isMatch = user.checkPassword(password);

      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password' });
      }
      console.log('localstrat', user);
      return done(null, user);
    } catch (error) {
      console.log('localstraterror', error);
      return done(error);
    }
  }
);

module.exports = strategy;

