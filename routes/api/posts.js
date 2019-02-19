const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Post = require("../../models/Post");
const Profile = require("../../models/Profile");

const validatePostInput = require("../../validation/post");

// @route   GET api/posts/test
// @desc    tests posts route
// @access  public
router.get("/test", (req, res) => {
	res.json({
		msg: "Posts Works !"
	});
});

// @route   POST api/posts
// @desc    create post
// @access  private
router.post(
	"/",
	passport.authenticate("jwt", {
		session: false
	}),
	(req, res) => {
		const { errors, isValid } = validatePostInput(req.body);
		if (!isValid) {
			return res.status(400).json(errors);
		}
		const { text, name, avatar, handle } = req.body;
		const user = req.user.id;
		const newPost = new Post({
			text,
			name,
			avatar,
			user,
			handle
		});
		newPost
			.save()
			.then(post => res.json(post))
			.catch(err => res.status(404).json(err));
	}
);

// @route   GET api/posts
// @desc    fetch posts
// @access  public
router.get("/", (req, res) => {
	Post.find()
		.sort({
			date: -1
		})
		.then(posts => res.json(posts))
		.catch(err =>
			res.status(404).json({
				nopostsfound: "No posts found !"
			})
		);
});

// @route   GET api/posts/:post_id
// @desc    fetch post by id
// @access  public
router.get("/:post_id", (req, res) => {
	Post.findOne({
		_id: req.params.post_id
	})
		.then(post => res.json(post))
		.catch(err =>
			res.status(404).json({
				nopostfound: "Invalid URL, No post here !"
			})
		);
});

// @route   DELETE api/posts/:post_id
// @desc    delete post by id
// @access  private
router.delete(
	"/:post_id",
	passport.authenticate("jwt", {
		session: false
	}),
	(req, res) => {
		Profile.findOne({
			user: req.user.id
		}).then(profile => {
			Post.findById(req.params.post_id)
				.then(post => {
					if (post.user.toString() !== req.user.id) {
						return res.status(401).json({
							notauthorized: "User not authorized"
						});
					}
					post.remove().then(() =>
						res.json({
							success: true
						})
					);
				})
				.catch(err =>
					res.status(404).json({
						postnotfound: "No post found"
					})
				);
		});
	}
);

// @route   POST api/posts/like/:post_id
// @desc    like post by id
// @access  private
router.post(
	"/like/:post_id",
	passport.authenticate("jwt", {
		session: false
	}),
	(req, res) => {
		Profile.findOne({
			user: req.user.id
		}).then(profile => {
			Post.findById(req.params.post_id)
				.then(post => {
					if (
						post.likes.filter(like => like.user.toString() === req.user.id)
							.length > 0
					) {
						return res.status(400).json({
							alreadyliked: "User already liked this post"
						});
					}

					post.likes.push({
						user: req.user.id
					});

					post.save().then(post => res.json(post));
				})
				.catch(err =>
					res.status(404).json({
						postnotfound: "No post found"
					})
				);
		});
	}
);

// @route   POST api/posts/unlike/:post_id
// @desc    unlike post by id
// @access  private
router.post(
	"/unlike/:post_id",
	passport.authenticate("jwt", {
		session: false
	}),
	(req, res) => {
		Profile.findOne({
			user: req.user.id
		}).then(profile => {
			Post.findById(req.params.post_id)
				.then(post => {
					if (
						post.likes.filter(like => like.user.toString() === req.user.id)
							.length === 0
					) {
						return res.status(400).json({
							notliked: "You have not yet liked this post"
						});
					}

					const removeIndex = post.likes
						.map(item => item.user.toString())
						.indexOf(req.user.id);
					post.likes.splice(removeIndex, 1);
					post.save().then(post => res.json(post));
				})
				.catch(err =>
					res.status(404).json({
						postnotfound: "No post found"
					})
				);
		});
	}
);

// @route   POST api/posts/comment/:post_id
// @desc    add comment on post by post_id
// @access  private
router.post(
	"/comment/:post_id",
	passport.authenticate("jwt", {
		session: false
	}),
	(req, res) => {
		const { errors, isValid } = validatePostInput(req.body);
		if (!isValid) {
			return res.status(400).json(errors);
		}
		Profile.findOne({
			user: req.user.id
		}).then(profile => {
			Post.findById(req.params.post_id)
				.then(post => {
					const newComment = {
						text: req.body.text,
						name: req.body.name,
						avatar: req.body.avatar,
						user: req.user.id,
						handle: req.body.handle
					};
					post.comments.unshift(newComment);
					post.save().then(post => res.json(post));
				})
				.catch(err =>
					res.status(404).json({
						postnotfound: "No post found"
					})
				);
		});
	}
);

// @route   DELETE api/posts/comment/:post_id/:comment_id
// @desc    remove comment on post
// @access  private
router.delete(
	"/comment/:post_id/:comment_id",
	passport.authenticate("jwt", {
		session: false
	}),
	(req, res) => {
		Profile.findOne({
			user: req.user.id
		}).then(profile => {
			Post.findById(req.params.post_id)
				.then(post => {
					if (
						post.comments.filter(
							comment => comment._id.toString() === req.params.comment_id
						).length === 0
					) {
						return res.status(404).json({
							nocomment: "Comment does not exists"
						});
					}
					const removeIndex = post.comments
						.map(item => item._id.toString())
						.indexOf(req.params.comment_id);
					post.comments.splice(removeIndex, 1);
					post.save().then(post => res.json(post));
				})
				.catch(err =>
					res.status(404).json({
						postnotfound: "No post found"
					})
				);
		});
	}
);

module.exports = router;
