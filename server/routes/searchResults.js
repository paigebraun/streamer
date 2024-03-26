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

router.get('/', async (req, res) => {
    try {
        const query = req.query.query;
        const response = await axios.get(
            `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`,
            options
        );
        res.json(response.data.results);
    } catch (error) {
        console.error('Error fetching search results:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;