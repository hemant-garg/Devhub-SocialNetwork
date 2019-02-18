import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const TextareaFieldGroup = ({
	name,
	placeholder,
	value,
	error,
	info,
	onChange
}) => {
	return (
		<div className="form-group">
			<textarea
				className={classnames("form-control form-control-lg", {
					"is-invalid": error
				})}
				placeholder={placeholder}
				name={name}
				onChange={onChange}
				value={value}
			/>
			{info && <small classname="form-text text-muted">{info}</small>}
			{error && <div className="invalid-feedback">{error}</div>}
		</div>
	);
};

TextareaFieldGroup.propTypes = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	error: PropTypes.string,
	info: PropTypes.string,
	onChange: PropTypes.func.isRequired
};

export default TextareaFieldGroup;
