import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const TextFieldGroup = ({
	name,
	placeholder,
	value,
	error,
	info,
	type,
	onChange,
	disabled
}) => {
	return (
		<div className="form-group">
			<input
				type={type}
				className={classnames("form-control form-control-lg", {
					"is-invalid": error
				})}
				placeholder={placeholder}
				name={name}
				onChange={onChange}
				value={value}
				disabled={disabled}
			/>
			{info && <small classname="form-text text-muted">{info}</small>}
			{error && <div className="invalid-feedback">{error}</div>}
		</div>
	);
};

TextFieldGroup.propTypes = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	type: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	error: PropTypes.string,
	info: PropTypes.string,
	disabled: PropTypes.string,
	onChange: PropTypes.func.isRequired
};

TextFieldGroup.defaultProps = {
	type: "text"
};

export default TextFieldGroup;
