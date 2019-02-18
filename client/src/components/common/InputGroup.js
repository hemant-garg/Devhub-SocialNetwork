import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const InputGroup = ({
	name,
	placeholder,
	value,
	error,
	onChange,
	icon,
	type
}) => {
	return (
		<div className="input-group mb-3">
			<div className="input-group-prepend">
				<span className="input-group-text">
					<i className={icon} />
				</span>
			</div>
			<input
				type={type}
				className={classnames("form-control form-control-lg", {
					"is-invalid": error
				})}
				placeholder={placeholder}
				name={name}
				onChange={onChange}
				value={value}
			/>
			{error && <div className="invalid-feedback">{error}</div>}
		</div>
	);
};

InputGroup.propTypes = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	type: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	error: PropTypes.string,
	icon: PropTypes.string,
	onChange: PropTypes.func.isRequired
};

InputGroup.defaultProps = {
	type: "text"
};

export default InputGroup;
