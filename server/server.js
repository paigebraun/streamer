require('dotenv').config();

const express = require("express");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const passport = require("passport");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Route requires
const user = require('./routes/user');
const movieRouter = require('./routes/movieRouter');
const seriesRouter = require('./routes/seriesRouter');
const popular = require('./routes/popular');

// Connect to database
const mongoDb = process.env.DATABASE_URL;
mongoose.connect(mongoDb);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for all routes
app.use(cors({
	origin: 'https://streamer-tqxz.onrender.com',
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	credentials: true,
  }));

// Sessions
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
		store: MongoStore.create({
			mongoUrl: process.env.DATABASE_URL,
		  }),
		cookie: {
			maxAge: 1000 * 60 * 60 * 24, // Cookie expiration is 1 day
			secure: false,
		},
	})
)

// Passport
app.use(passport.initialize())
app.use(passport.session())

// Handle preflight requests for the login route
app.options('/user/login', cors());

// Use routes
app.use('/user', user);
app.use('/movie', movieRouter);
app.use('/series', seriesRouter);
app.use('/popular', popular);


app.listen(3000, () => console.log("app listening on port 3000!"));