const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

const router = express.Router();


// @route   GET api/users/test
// @desc    tests users route
// @access  public
router.get('/test', (req, res) => {
   res.json({
      msg: "Users Works !"
   });
});


// @route   GET api/users/register
// @desc    Reguster user
// @access  public
router.post('/register', (req, res) => {
   User.findOne({
         email: req.body.email
      })
      .then(user => {
         if (user) {
            return res.status(400).json({
               email: 'Email already exists'
            });
         } else {
            const {
               name,
               email,
               password
            } = req.body;
            const avatar = gravatar.url(email, {
               s: '200',
               r: 'pg',
               d: 'mm'
            });
            const newUser = new User({
               name,
               email,
               password,
               avatar
            });
            bcrypt.genSalt(10, (err, salt) => {
               bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if (err) throw err;
                  newUser.password = hash;
                  newUser.save()
                     .then(user => res.json(user))
                     .catch(err => console.log(err));
               })
            })
         }
      })
});



// @route   GET api/users/login
// @desc    Login user - Returning the JWT
// @access  public

router.post('/login', (req, res) => {
   const {
      email,
      password
   } = req.body;

   User.findOne({
         email
      })
      .then(user => {
         if (!user) {
            return res.status(404).json({
               email: "User not found"
            });
         }
         // Check Password
         bcrypt.compare(password, user.password)
            .then(isMatch => {
               if (isMatch) {
                  // user matched
                  const payload = {
                     id: user.id,
                     name: user.name,
                     avatar: user.avatar
                  }
                  // sign token
                  jwt.sign(payload, keys.SECRETKEY, {
                     expiresIn: 3600
                  }, (err, token) => {
                     res.json({
                        success: true,
                        token: 'Bearer ' + token
                     })
                  });
               } else {
                  return res.status(400).json({
                     password: "Password incorrect"
                  });
               }
            });
      });
})


// @route   GET api/users/current
// @desc    return current user
// @access  private
router.get('/current', passport.authenticate('jwt', {
   session: false
}), (req, res) => {
   res.json({
      msg: 'Success'
   });
});


module.exports = router;