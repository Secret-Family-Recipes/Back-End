const handleError = require('../middleware/error-handle-middleware');
const authorize = require('../middleware/auth-middleware');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

// SERVER
const server = express();

/********************************************************
 *                      MIDDLEWARE                      *
 ********************************************************/
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use(cors());

/********************************************************
 *                        ROUTES                        *
 ********************************************************/
const authRouter = require('../routes/auth/auth-router');
const recipesRouter = require('../routes/recipes/recipes-router');

server.use('/auth', authRouter);
server.use('/recipes', authorize, recipesRouter);

/********************************************************
 *                   CUSTOM MIDDLEWARE                  *
 ********************************************************/
server.use('/', handleError);

// EXPORTS
module.exports = server;
