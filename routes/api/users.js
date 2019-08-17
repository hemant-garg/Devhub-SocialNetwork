const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const router = express.Router();

// @route   GET api/users/test
// @desc    tests users route
// @access  public
router.get('/test', (req, res) => {
	res.json({
		msg: 'Users Works !'
	});
});

// @route   GET api/users/register
// @desc    Reguster user
// @access  public
router.post('/register', (req, res) => {
	const { errors, isValid } = validateRegisterInput(req.body);

	// check if there are some errors
	if (!isValid) {
		return res.status(400).json(errors);
	}

	User.findOne({
		email: req.body.email
	}).then(user => {
		if (user) {
			errors.email = 'Email already exists';
			return res.status(400).json(errors);
		} else {
			const { name, email, password, handle } = req.body;
			const avatar = gravatar.url(email, {
				s: '200',
				r: 'pg',
				d: 'mm'
			});
			const newUser = new User({
				name,
				email,
				password,
				avatar,
				handle
			});
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser
						.save()
						.then(user => res.json(user))
						.catch(err => console.log(err));
				});
			});
		}
	});
});

// @route   GET api/users/login
// @desc    Login user - Returning the JWT
// @access  public

router.post('/login', (req, res) => {
	const { email, password } = req.body;

	const { errors, isValid } = validateLoginInput(req.body);

	// check if there are some errors
	if (!isValid) {
		return res.status(400).json(errors);
	}

	User.findOne({
		email
	}).then(user => {
		if (!user) {
			errors.email = 'User not found';
			return res.status(404).json(errors);
		}
		// Check Password
		bcrypt.compare(password, user.password).then(isMatch => {
			if (isMatch) {
				// user matched
				const payload = {
					id: user.id,
					name: user.name,
					avatar: user.avatar,
					handle: user.handle
				};
				// sign token
				jwt.sign(
					payload,
					keys.SECRETKEY,
					{
						expiresIn: 3600
					},
					(err, token) => {
						res.json({
							success: true,
							token: 'Bearer ' + token
						});
					}
				);
			} else {
				errors.password = 'Password incorrect';
				return res.status(400).json(errors);
			}
		});
	});
});

// @route   GET api/users/current
// @desc    return current user
// @access  private
router.get(
	'/current',
	passport.authenticate('jwt', {
		session: false
	}),
	(req, res) => {
		const { name, email, avatar, handle } = req.user;
		res.json({
			name,
			email,
			avatar,
			handle
		});
	}
);

module.exports = router;
