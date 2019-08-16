import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import './Button.css';

class Button extends React.Component {
	render() {
		const { content, to, color, background } = this.props;

		const Button = styled.button`
			background: ${background};
			color: ${color};
			font-size: 1em;
			padding: 0.8rem 1.4rem;
			font-weight: bold;
			border: 1px solid ${color};
			border-radius: 3px;
			:hover {
				background-color: ${color};
				color: ${background};
			}
		`;

		return (
			<Link to={to}>
				<Button className="button">{content}</Button>
			</Link>
		);
	}
}

export default Button;
