import React, { Component } from 'react';
import { Divider } from 'semantic-ui-react';
import styled from 'styled-components';
import isEmpty from '../../validation/isEmpty';

class ProfileHeader extends Component {
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
				<h4>Bio</h4>
				<Divider />
				<p>
					{profile.status} at{' '}
					{isEmpty(profile.company) ? null : <span>{profile.company}</span>}
				</p>
				{isEmpty(profile.location) ? null : <p>{profile.location}</p>}
			</Segment>
		);
	}
}

export default ProfileHeader;
