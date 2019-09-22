import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import classnames from "classnames";

const textareaStyles = {
	width: "100%",
	fontFamily: '"Montserrat", sans-serif',
	backgroundColor: "transparent",
	border: "none",
	borderBottom: "1px solid white",
	marginBottom: ".5rem",
	padding: "1rem",
	resize: "none"
};

const TextareaFieldGroup = ({
	name,
	placeholder,
	value,
	error,
	id,
	info,
	onChange,
	rows
}) => {
	return (
		<div>
			<textarea
				className={classnames("", {
					"is-invalid": error
				})}
				id={id}
				style={textareaStyles}
				placeholder={placeholder}
				name={name}
				onChange={onChange}
				value={value}
				rows={rows}
			/>
			{error && (
				<div
					style={{ color: "red", marginLeft: "1rem", marginBottom: ".3rem" }}
				>
					{error}
				</div>
			)}
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
