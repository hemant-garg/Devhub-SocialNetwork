import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Label, Divider } from 'semantic-ui-react';
import isEmpty from '../../validation/isEmpty';

class ProfileAbout extends Component {
	render() {
		const Segment = styled.div`
			border-radius: 0.5rem;
			box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
			margin-bottom: 2rem;
			background-color: #fff;
			padding: 2rem 1.3rem;
			font-family: 'Montserrat', sans-serif;
			box-sizing: border-box;
		`;
		const { profile } = this.props;

		return (
			<Segment>
				<h4>SkillS:</h4>
				<Divider />
				<div>
					{profile.skills.map((skill, i) => (
						<span style={{ marginRight: '1rem' }} key={i}>
							<Label circular color="blue">
								{skill}
							</Label>
						</span>
					))}
				</div>
			</Segment>
		);
	}
}

ProfileAbout.propTypes = {
	profile: PropTypes.object.isRequired
};

export default ProfileAbout;
