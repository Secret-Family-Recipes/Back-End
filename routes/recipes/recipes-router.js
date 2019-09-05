const router = require('express').Router();

const Recipes = require('./recipes-model');

/********************************************************
 *                     GET api/recipes                   *
 ********************************************************/
router.get('/', (req, res, next) => {
  // TEST ENDPOINT
  res.status(200).json({
    message: 'running'
  });
});

// EXPORTS
module.exports = router;
