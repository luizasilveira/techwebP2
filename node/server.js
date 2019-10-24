const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const passport = require("passport");
const users = require("./routes/api/users");
const axios = require("axios")
// const DARKSKY_API_KEY = process.env.DARKSKY_API_KEY

const API_PORT = 5000;
const app = express();
app.use(cors());
const router = express.Router();


// connects our back end code with the database
mongoose.connect("mongodb://localhost:27017/login", { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);



// append /api for our http requests
app.use('/api', router);
app.use("/api/users", users);
app.use(express.json())
app.use(express.static('public'))

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
