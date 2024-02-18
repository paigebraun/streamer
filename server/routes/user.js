const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('../passport')
const LocalStrategy = require('../passport/localStrategy');

// Use the local strategy
passport.use('local', LocalStrategy);

// Check if a user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
};

// User sign up route
router.post('/', async (req, res) => {
    console.log('user signup');
    console.log(req.body);
    const { username, password } = req.body;
    console.log('username:', username);

    try {
        // Add a check for an empty or whitespace-only username
        if (!username || username.trim() === '') {
            return res.status(400).json({
                error: 'Username cannot be empty',
            });
        }

        const existingUser = await User.findOne({ username: username });

        if (existingUser) {
            return res.status(400).json({
                error: `Username already exists`,
            });
        }

        // Add a check for an empty password
        if (!password || password.trim() === '') {
            return res.status(400).json({
                error: 'Password cannot be empty',
            });
        }

        const newUser = new User({
            username: username,
            password: password,
            watchlist: [],
        });
        console.log('new user', newUser);

        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (err) {
        console.log('User.js post error: ', err);
        res.status(500).json(err);
    }
});


// User login route
router.post('/login', (req, res) => {
    passport.authenticate('local', async (err, user, info) => {
      try {
        if (err) {
          console.error('Error during login:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }
  
        if (!user) {
          console.error('Login failed. Reason:', info.message || 'Unknown reason');
          return res.status(401).json({ error: info.message || 'Login failed' });
        }
  
        // Fetch the complete user object, including the watchlist
        const updatedUser = await User.findById(user._id);
  
        req.logIn(updatedUser, function (error) {
          if (error) {
            console.error('Error logging in:', error);
            return res.status(500).json({ error: 'Internal server error' });
          }
          // Send the user object with the watchlist in the response
          res.json(updatedUser);
        });
      } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    })(req, res);
  });
  

// Get current user
router.get('/', isAuthenticated, (req, res, next) => {
    console.log('===== user!!======')
    console.log(req.user)
    if (req.user) {
        res.json({ user: req.user })
    } else {
        res.json({ user: null })
    }
})

// Get current user's watchlist
router.get('/watchlist', (req, res) => {
    try {
        if (!req.isAuthenticated()) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        console.log('req.user.watchlist', req.user);
        const watchlist = req.user.watchlist || [];
        const username = req.user.username;
        res.status(200).json({ watchlist, username });
    } catch (error) {
        console.error('Error fetching watchlist:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Logout current user
router.post('/logout', (req, res) => {
    console.log('LOGOUT SESSION:', req.session);
    console.log('req.user', req.user);
    console.log('req.body', req.body);

    if (req.user) {
        req.logout();
        req.session.destroy((error) => {
            if (error) {
                console.error('Error destroying session:', error);
                res.status(500).send({ error: 'Internal server error' });
            } else {
                res.clearCookie('connect.sid'); // cleaning the cookies from the user session
                res.status(200).send({ msg: 'logging out' });
            }
        });
    } else {
        res.send({ msg: 'no user to log out' });
    }
});

// Add movie or series to current user's watchlist
router.post('/watchlist/add', async (req, res) => {
    const { username, movie, series } = req.body;
  
    try {
        const user = await User.findOne({ username: username });
  
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the movie or series is already in the watchlist
        if (!user.watchlist.some(item => item.id === (movie ? movie.id : series ? series.id : undefined))) {
            // Decide whether to add a movie or a series based on the presence of 'movie' or 'series' in the request
            if (movie) {
                user.watchlist.push({ ...movie });
            } else if (series) {
                user.watchlist.push({ ...series });
            } else {
                return res.status(400).json({ error: 'Invalid request. Please provide either a movie or series object.' });
            }

            await user.save();
  
            // Fetch the updated user to get the latest watchlist
            const updatedUser = await User.findOne({ username: username });
  
            req.logIn(updatedUser._id, function (error) {
                if (!error) {
                    return res.status(200).json({
                        message: 'Item added to watchlist successfully',
                        watchlist: updatedUser.watchlist, // Include the updated watchlist in the response
                    });
                } else {
                    console.error(error);
                    return res.status(500).json({ error: 'Error updating session after watchlist update' });
                }
            });
        } else {
            return res.status(400).json({ error: 'Item already in watchlist' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Remove movie or series from current user's watchlist
router.post('/watchlist/remove', async (req, res) => {
    const { username, movieId, seriesId } = req.body;

    try {
        const user = await User.findOne({ username: username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Determine whether to remove a movie or a series based on the presence of 'movieId' or 'seriesId' in the request
        const itemIdToRemove = movieId || seriesId;
        console.log('id to remove', itemIdToRemove);
        if (itemIdToRemove) {
            // Check if the item is in the watchlist
            const itemIndex = user.watchlist.findIndex(item => item.id === itemIdToRemove);

            if (itemIndex !== -1) {
                // Remove the item from the watchlist
                user.watchlist.splice(itemIndex, 1);
                await user.save();

                // Fetch the updated user to get the latest watchlist
                const updatedUser = await User.findOne({ username: username });

                req.logIn(updatedUser._id, function (error) {
                    if (!error) {
                        return res.status(200).json({
                            message: 'Item removed from watchlist successfully',
                            watchlist: updatedUser.watchlist, // Include the updated watchlist in the response
                        });
                    } else {
                        console.error(error);
                        return res.status(500).json({ error: 'Error updating session after watchlist update' });
                    }
                });
            } else {
                return res.status(400).json({ error: 'Item not found in watchlist' });
            }
        } else {
            return res.status(400).json({ error: 'Invalid request. Please provide either a movieId or seriesId.' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router