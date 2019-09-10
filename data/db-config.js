const knex = require('knex');
const knexConfig = require('../knexfile.js');

const environment = proccess.env.ENVIRONMENT || 'development';

module.exports = knex(knexConfig[environment]);
