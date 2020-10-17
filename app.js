const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const cors = require('cors');

// import all the express routes we will be using
const indexRouter = require('./routes/index');
// add usersRouter, freetsRouter


const app = express();

// set up user session
app.use(session({
  secret: 'wildcard-secret',
  resave: true,
  saveUninitialized: true
}));

// allows us to make requests from POSTMAN
app.use(cors());

// set up logger, cookies for sessions, ...
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// serve html+css+js frontend
app.use(express.static(path.join(__dirname, 'public')));

// connect url hierarchies to our routers
app.use('/', indexRouter);
// TODO add usersRouter, freetsRouter mapping


module.exports = app;
