const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Users = require('./auth-model');

/********************************************************
 *                  POST auth/register                  *
 ********************************************************/
router.post('/register', validateRequest, async (req, res) => {
  let user = req.body;

  try {
    user.password = bcrypt.hashSync(user.password, 10);
    user = await Users.add(user);

    res.status(201).json({
      message: 'New user created',
      token: generateToken(user),
      user
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal Server Error: Could not create user.',
      error: err.message
    });
  }
});

/********************************************************
 *                    POST auth/login                   *
 ********************************************************/
router.post('/login', validateRequest, async (req, res) => {
  let { email, password } = req.body;

  try {
    const user = await Users.findBy({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        message: 'Login successful',
        token: generateToken(user),
        user
      });
    } else {
      res.status(400).json({
        message: 'Invalid credentials'
      });
    }
  } catch (err) {
    res.status(500).json({
      message: 'Internal Server Error: Could not login user.',
      error: err.message
    });
  }
});

/********************************************************
 *                 POST auth/check-token                *
 ********************************************************/
router.post('/check-token', (req, res) => {
  const tokenHeader = req.headers.authorization;

  if (tokenHeader) {
    const [bearer, token] = tokenHeader.split(' ');

    if (bearer.toUpperCase() === 'BEARER' && token) {
      jwt.verify(
        token,
        process.env.TOKEN_SECRET || 'sooperdoopersecret',
        err => {
          if (err) {
            res.json({
              message: 'error verifying token',
              error: err.message,
              tokenVerified: false
            });
          } else {
            res.status(200).json({
              message: 'token verified',
              tokenVerified: true
            });
          }
        }
      );
    } else {
      res.status(401).json({
        message: 'invalid scheme, or no token after scheme name.',
        tokenVerified: false
      });
    }
  } else {
    res.status(401).json({
      message: 'missing authorization header',
      tokenVerified: false
    });
  }
});

function generateToken(user) {
  const payload = {
    subject: 'user',
    userID: user.id
  };

  const options = {
    expiresIn: '6h'
  };

  return jwt.sign(
    payload,
    process.env.TOKEN_SECRET || 'sooperdoopersecret',
    options
  );
}

/********************************************************
 *                   CUSTOM MIDDLEWARE                  *
 ********************************************************/
function validateRequest(req, res, next) {
  const user = req.body;

  if (req.path === '/register') {
    if (
      user &&
      user.first_name &&
      user.last_name &&
      user.family_name &&
      user.email &&
      user.password
    ) {
      next();
    } else {
      res.status(400).json({
        message: `A new user must have fields for 'first_name', 'last_name', 'family_name', 'email' and 'password'.`
      });
    }
  } else if (req.path === '/login') {
    if (user && user.email && user.password) {
      next();
    } else {
      res.status(400).json({
        message: `Fields for 'email' and 'password' required.`
      });
    }
  } else {
    res.status(500).json({
      message: 'Internal Server Error.'
    });
  }
}

// EXPORTS
module.exports = router;
