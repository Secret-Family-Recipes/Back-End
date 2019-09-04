const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Users = require('./auth-model');

/********************************************************
 *                     GET api/auth                      *
 ********************************************************/
router.get('/', (req, res, next) => {
  // TEST ENDPOINT
  res.status(200).json({
    message: 'running'
  });
});

module.exports = router;
