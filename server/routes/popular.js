const express = require('express');
const router = express.Router();
const axios = require('axios');

// Load environment variables
require('dotenv').config();

// Define options with API key
const options = {
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.API_KEY}`,
    },
};

router.get('/movies', async (req, res) => {
    try {
        const response = await axios.get(
            'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
            options
        );
        res.json(response.data.results);
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/tv', async (req, res) => {
    try {
        const response = await axios.get(
            'https://api.themoviedb.org/3/trending/tv/day?language=en-US',
            options
        );
        res.json(response.data.results);
    } catch (error) {
        console.error('Error fetching popular TV shows:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
