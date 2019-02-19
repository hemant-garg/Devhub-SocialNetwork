import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const SelectListFieldGroup = ({
	name,
	value,
	error,
	info,
	options,
	onChange
}) => {
	const selectOptions = options.map(option => (
		<option key={option.label} value={option.value}>
			{option.label}
		</option>
	));
	return (
		<div className="form-group">
			<select
				className={classnames("form-control form-control-lg", {
					"is-invalid": error
				})}
				name={name}
				onChange={onChange}
				value={value}
			>
				{selectOptions}
			</select>
			{info && <small className="form-text text-muted">{info}</small>}
			{error && <div className="invalid-feedback">{error}</div>}
		</div>
	);
};

SelectListFieldGroup.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	error: PropTypes.string,
	info: PropTypes.string,
	options: PropTypes.array.isRequired,
	onChange: PropTypes.func.isRequired
};

export default SelectListFieldGroup;
