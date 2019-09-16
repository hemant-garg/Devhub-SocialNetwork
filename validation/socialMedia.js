const validator = require("validator");
const isEmpty = require("./is_empty");

const validateSocialInput = data => {
	let errors = {};
	const { website, youtube, instagram, linkedin } = data;

	console.log(website, youtube, linkedin, instagram);
	if (!isEmpty(website)) {
		if (!validator.isURL(website)) errors.website = "Invalid URL";
	}

	if (!isEmpty(youtube)) {
		if (!validator.isURL(youtube)) errors.youtube = "Invalid URL";
	}

	if (!isEmpty(instagram)) {
		if (!validator.isURL(instagram)) errors.instagram = "Invalid URL";
	}

	if (!isEmpty(linkedin)) {
		if (!validator.isURL(linkedin)) errors.linkedin = "Invalid URL";
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};

module.exports = validateSocialInput;
