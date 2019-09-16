const validator = require("validator");
const isEmpty = require("./is_empty");

const validateProfileInput = data => {
	let errors = {};
	const {
		handle,
		status,
		skills,
		website,
		youtube,
		instagram,
		linkedin
	} = data;

	if (isEmpty(handle)) {
		errors.handle = "Handle field is required";
	} else {
		if (
			!validator.isLength(handle, {
				min: 2,
				max: 40
			})
		) {
			errors.handle = "Handle must be between 2 and 40 character";
		}
	}

	if (isEmpty(status)) {
		errors.status = "Status field is required";
	}

	if (isEmpty(skills)) {
		errors.skills = "Skills field is required";
	}

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

module.exports = validateProfileInput;
