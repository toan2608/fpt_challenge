const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

require('dotenv').config();

const app = express();

// Get host and port
app.set('port', process.env.APP_PORT || 3006);
app.set('host', process.env.APP_HOST || 'localhost');

// Call API from back-end to front-end
app.use(cors());
app.options('*', cors()) // include before other routes

// Req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}))

// Static file
app.use(express.static(path.join(__dirname, '../public')))

// View engine
app.set("view engine", "ejs")
// Views file
app.set("views",path.join(__dirname, '../views'))

module.exports = app;

