import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const textareaStyles = {
	width: '100%',
	fontFamily: '"Montserrat", sans-serif',
	backgroundColor: 'transparent',
	border: 'none',
	borderBottom: '1px solid white',
	// boxShadow: '0 0px 2px rgba(0,0,0,.2)',
	marginBottom: '.5rem',
	padding: '1rem',
	resize: 'none'
};

const TextareaFieldGroup = ({
	name,
	placeholder,
	value,
	error,
	info,
	onChange,
	rows
}) => {
	return (
		<div>
			<textarea
				className={classnames('', {
					'is-invalid': error
				})}
				style={textareaStyles}
				placeholder={placeholder}
				name={name}
				onChange={onChange}
				value={value}
				rows={rows}
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
