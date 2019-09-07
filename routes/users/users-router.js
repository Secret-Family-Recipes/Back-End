const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Users = require('./users-model');

/********************************************************
 *                    GET /users                         *
 ********************************************************/
router.get('/', async (req, res) => {
  try {
    const users = await Users.find();

    res.status(200).json({
      users
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal Server Error: Could not retrieve users.',
      error: err.message
    });
  }
});

/********************************************************
 *                    GET /users/:id                    *
 ********************************************************/
router.get('/:id', validateID, async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Users.findById(id);

    res.status(200).json({
      user
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal Server Error: Could not retrieve user.',
      error: err.message
    });
  }
});

/********************************************************
 *                  GET /users/:id/recipes              *
 ********************************************************/
router.get('/:id/recipes', validateID, async (req, res) => {
  const { id } = req.params;

  try {
    const recipes = await Users.findRecipesByUserId(id);

    res.status(200).json({
      recipes
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal Server Error: Could not retrieve recipes.',
      error: err.message
    });
  }
});

/********************************************************
 *                    PUT /users/:id                    *
 ********************************************************/
router.put('/:id', validateID, async (req, res) => {
  const { id } = req.params;

  let updates = req.body;

  try {
    user = await Users.update(updates, id);

    res.status(200).json({
      message: 'User was updated.',
      user
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal Server Error: Could not update user.',
      error: err.message
    });
  }
});

/********************************************************
 *             PUT /users/:id/update-password           *
 ********************************************************/
router.put('/:id/update-password', validateID, async (req, res) => {
  const { id } = req.params;
  let { password } = req.body;

  try {
    password = bcrypt.hashSync(password, 10);

    await Users.update({ password }, id);

    res.status(200).json({
      message: 'Password was changed successfully.'
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal Server Error: Could not change password.',
      error: err.message
    });
  }
});

/********************************************************
 *                    PUT /users/:id                    *
 ********************************************************/
router.put('/:id', validateID, async (req, res) => {
  const { id } = req.params;
  let updates = req.body;

  try {
    if (updates.password) {
      updates.password = bcrypt.hashSync(updates.password, 10);
    }

    user = await Users.update(updates, id);

    res.status(200).json({
      message: 'User was updated.',
      user
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal Server Error: Could not update user.',
      error: err.message
    });
  }
});

/********************************************************
 *                   DELETE /users/:id                  *
 ********************************************************/
router.delete('/:id', validateID, async (req, res) => {
  const { id } = req.params;
  const { user } = req;

  try {
    await Users.remove(id);

    res.status(200).json({
      message: `User with id ${id} was removed.`,
      user
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal Server Error: Could not update user.',
      error: err.message
    });
  }
});

/********************************************************
 *                   CUSTOM MIDDLEWARE                  *
 ********************************************************/
async function validateID(req, res, next) {
  const { id } = req.params;

  let user = await Users.findById(id);

  if (user) {
    req.user = user;
    next();
  } else {
    res.status(400).json({
      message: `A user with id ${id} could not be found.`
    });
  }
}

module.exports = router;
