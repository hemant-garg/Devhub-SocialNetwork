const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const router = express.Router();

const validateProfileinput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');
// Load profile model
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   GET api/profile/test
// @desc    tests profile route
// @access  public
router.get('/test', (req, res) => {
	res.json({
		msg: 'Profile Works !'
	});
});

// @route   GET api/profile
// @desc    get current user profile
// @access  private
router.get(
	'/',
	passport.authenticate('jwt', {
		session: false
	}),
	(req, res) => {
		const errors = {};
		Profile.findOne({
			user: req.user.id
		})
			.populate('user', ['name', 'avatar', 'email'])
			.then(profile => {
				if (!profile) {
					errors.noprofile = 'There is no profile for this user';
					return res.status(404).json(errors);
				}
				res.json(profile);
			})
			.catch(err => res.status(404).json(err));
	}
);

// @route   GET api/profile/handle/:handle
// @desc    get any user profile
// @access  public
router.get('/handle/:handle', (req, res) => {
	const errors = {};
	Profile.findOne({
		handle: req.params.handle
	})
		.populate('user', ['name', 'avatar', 'email'])
		.then(profile => {
			if (!profile) {
				errors.noprofile = 'There is no profile for this user';
				return res.status(404).json(errors);
			}
			res.json(profile);
		})
		.catch(err => res.status(404).json(err));
});

// @route   GET api/profile/user/:user_id
// @desc    get any user profile by userid
// @access  public
router.get('/user/:user_id', (req, res) => {
	const errors = {};
	Profile.findOne({
		user: req.params.user_id
	})
		.populate('user', ['name', 'avatar', 'email'])
		.then(profile => {
			if (!profile) {
				errors.noprofile = 'There is no profile for this user';
				return res.status(404).json(errors);
			}
			res.json(profile);
		})
		.catch(err => res.status(404).json(err));
});

// @route   GET api/profile/all
// @desc    get all users profile
// @access  public
router.get('/all', (req, res) => {
	const errors = {};
	Profile.find()
		.populate('user', ['name', 'avatar', 'email'])
		.then(profile => {
			if (!profile) {
				errors.noprofile = 'There are no profiles yet';
				return res.status(404).json(errors);
			}
			res.json(profile);
		})
		.catch(err => res.status(404).json(err));
});

// @route   POST api/profile
// @desc    Create/Update User Profile
// @access  private
router.post(
	'/',
	passport.authenticate('jwt', {
		session: false
	}),
	(req, res) => {
		// Get fields
		const { errors, isValid } = validateProfileinput(req.body);
		if (!isValid) {
			return res.status(400).json(errors);
		}
		const profileFields = {};
		const {
			handle,
			company,
			website,
			location,
			bio,
			status,
			githubusername,
			skills,
			youtube,
			facebook,
			instagram,
			twitter,
			linkedin
		} = req.body;
		profileFields.user = req.user.id;
		if (handle) profileFields.handle = handle;
		if (company) profileFields.company = company;
		if (website) profileFields.website = website;
		if (location) profileFields.location = location;
		if (bio) profileFields.bio = bio;
		if (status) profileFields.status = status;
		if (githubusername) profileFields.githubusername = githubusername;
		if (typeof skills !== 'undefined') {
			profileFields.skills = skills.split(',');
		}
		profileFields.social = {};
		if (youtube) profileFields.social.youtube = youtube;
		if (facebook) profileFields.social.facebook = facebook;
		if (linkedin) profileFields.social.linkedin = linkedin;
		if (instagram) profileFields.social.instagram = instagram;
		if (twitter) profileFields.social.twitter = twitter;
		// console.log(profileFields);
		Profile.findOne({
			user: req.user.id
		})
			.then(profile => {
				if (profile) {
					// update
					Profile.findOneAndUpdate(
						{
							user: req.user.id
						},
						{
							$set: profileFields
						},
						{
							new: true
						}
					).then(profile => res.json(profile));
				} else {
					// create

					// Check if handle exists
					Profile.findOne({
						handle: profileFields.handle
					}).then(profile => {
						if (profile) {
							errors.handle = 'That handle already exists';
							res.status(400).json(errors);
						}

						new Profile(profileFields)
							.save()
							.then(profile => res.json(profile));
					});
				}
			})
			.catch(err => res.status(404).json(err));
	}
);

// @route   POST api/profile/experience
// @desc    add User Experience
// @access  private
router.post(
	'/experience',
	passport.authenticate('jwt', {
		session: false
	}),
	(req, res) => {
		const { errors, isValid } = validateExperienceInput(req.body);
		if (!isValid) {
			return res.status(400).json(errors);
		}

		Profile.findOne({
			user: req.user.id
		})
			.then(profile => {
				const {
					title,
					company,
					location,
					from,
					to,
					current,
					description
				} = req.body;
				const newExp = {
					title,
					company,
					location,
					from,
					to,
					current,
					description
				};

				profile.experience.unshift(newExp);
				profile.save().then(profile => res.json(profile));
			})
			.catch(err => res.status(404).json(err));
	}
);

// @route   POST api/profile/education
// @desc    add User Education
// @access  private
router.post(
	'/education',
	passport.authenticate('jwt', {
		session: false
	}),
	(req, res) => {
		const { errors, isValid } = validateEducationInput(req.body);
		if (!isValid) {
			return res.status(400).json(errors);
		}

		Profile.findOne({
			user: req.user.id
		})
			.then(profile => {
				const {
					school,
					degree,
					fieldofstudy,
					from,
					to,
					current,
					description
				} = req.body;
				const newEdu = {
					school,
					degree,
					fieldofstudy,
					from,
					to,
					current,
					description
				};

				profile.education.unshift(newEdu);
				profile.save().then(profile => res.json(profile));
			})
			.catch(err => res.status(404).json(err));
	}
);

// @route   DELETE api/profile/experience/:exp_id
// @desc    delete User Experience by exp_id
// @access  private
router.delete(
	'/experience/:exp_id',
	passport.authenticate('jwt', {
		session: false
	}),
	(req, res) => {
		Profile.findOne({
			user: req.user.id
		})
			.populate('user', ['name', 'avatar', 'email'])
			.then(profile => {
				console.log(profile);
				const removedIndex = profile.experience
					.map(exp => exp.id)
					.indexOf(req.params.exp_id);
				profile.experience.splice(removedIndex, 1);
				profile
					.save()
					.then(profile => res.json(profile))
					.catch(err => res.status(404).json(err));
			})
			.catch(err => res.status(404).json(err));
	}
);

// @route   DELETE api/profile/education/:edu_id
// @desc    delete User Education by edu_id
// @access  private
router.delete(
	'/education/:edu_id',
	passport.authenticate('jwt', {
		session: false
	}),
	(req, res) => {
		Profile.findOne({
			user: req.user.id
		})
			.populate('user', ['name', 'avatar', 'email'])
			.then(profile => {
				const removedIndex = profile.education
					.map(edu => edu.id)
					.indexOf(req.params.edu_id);
				profile.education.splice(removedIndex, 1);
				profile
					.save()
					.then(profile => res.json(profile))
					.catch(err => res.status(404).json(err));
			})
			.catch(err => res.status(404).json(err));
	}
);

// @route   DELETE api/profile/
// @desc    delete User profile
// @access  private
router.delete(
	'/',
	passport.authenticate('jwt', {
		session: false
	}),
	(req, res) => {
		Profile.findOneAndRemove({
			user: req.user.id
		})
			.then(() => {
				User.findOneAndRemove({
					_id: req.user.id
				}).then(() =>
					res.json({
						success: true
					})
				);
			})
			.catch(err => res.status(404).json(err));
	}
);

module.exports = router;
