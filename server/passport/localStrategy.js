const User = require('../models/user');
const LocalStrategy = require('passport-local');

const strategy = new LocalStrategy(
  {
    usernameField: 'username',
  },
  async function (username, password, done) {
    try {
      const user = await User.findOne({ username: username });

      if (!user) {
        return done(null, false, { message: 'Incorrect username or password' });
      }

      const isMatch = user.checkPassword(password);

      if (!isMatch) {
        return done(null, false, { message: 'Incorrect username or password' });
      }

      return done(null, user);
    } catch (error) {
      console.error('localstraterror', error);
      return done(error);
    }
  }
);

module.exports = strategy;