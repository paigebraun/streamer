const express = require('express');
const router = express.Router();
const axios = require('axios');

// Load environment variables
require('dotenv').config();

// In-memory cache
const cache = new Map();

// Define options with API key
const options = {
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.API_KEY}`,
    },
};

// Middleware for caching responses
function cacheMiddleware(req, res, next) {
    const cacheKey = req.originalUrl;
    if (cache.has(cacheKey)) {
        const cachedResponse = cache.get(cacheKey);
        res.json(cachedResponse);
    } else {
        res.sendResponse = res.json;
        res.json = (body) => {
            cache.set(cacheKey, body);
            res.sendResponse(body);
        };
        next();
    }
}

router.get('/:id', cacheMiddleware, async (req, res) => {
    try {
        const movieId = req.params.id;
        const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?append_to_response=videos%2Ccredits&language=en-US`, options);
        const watchResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/watch/providers`, options);

        const movieDetails = movieResponse.data;
        const watchDetails = watchResponse.data;

        // Process the responses and send back to the client
        res.json({ movieDetails, watchDetails });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;



