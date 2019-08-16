import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Container, Icon, Divider } from 'semantic-ui-react';
import isEmpty from '../../validation/isEmpty';

import './Profile.scss';
class ProfileLeft extends Component {
	render() {
		const Segment = styled.div`
			border-radius: 0.5rem;
			box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
			margin-bottom: 2rem;
			background-color: #fff;
			padding: 2rem 1rem;
			position: sticky;
			top: 90px;
			font-family: 'Montserrat', sans-serif;
			box-sizing: border-box;
		`;
		const { user, profile } = this.props;
		console.log('profile-left', this.props);
		return (
			<section className="profile-left">
				<Segment>
					<div>
						<img src={profile.user.avatar} alt={profile.user.name} />
						<h3 style={{ marginBottom: 0 }}>{profile.user.name}</h3>
						<p className="light-text">{profile.handle}</p>
						<p>
							{isEmpty(profile.bio) ? (
								<span>{profile.name} does not have a bio</span>
							) : (
								<span>{profile.bio}</span>
							)}
						</p>
					</div>
					<br />
					<Divider />
					<p>
						{isEmpty(profile.website) ? null : (
							<a
								target="_blank"
								rel="noopener noreferrer"
								href={profile.website}
							>
								<Icon size="big" color="grey" name="globe" />
							</a>
						)}
						{isEmpty(profile.social && profile.social.twitter) ? null : (
							<a
								target="_blank"
								rel="noopener noreferrer"
								href={profile.social.twitter}
							>
								<Icon size="big" color="blue" name="twitter" />
							</a>
						)}
						{isEmpty(profile.social && profile.social.facebook) ? null : (
							<a
								target="_blank"
								rel="noopener noreferrer"
								href={profile.social.facebook}
							>
								<Icon size="big" color="violet" name="facebook" />
							</a>
						)}
						{isEmpty(profile.social && profile.social.linkedin) ? null : (
							<a
								target="_blank"
								rel="noopener noreferrer"
								href={profile.social.linkedin}
							>
								<Icon size="big" color="blue" name="linkedin" />
							</a>
						)}
						{isEmpty(profile.social && profile.social.instagram) ? null : (
							<a
								target="_blank"
								rel="noopener noreferrer"
								href={profile.social.instagram}
							>
								<Icon size="big" color="pink" name="instagram" />
							</a>
						)}
						{isEmpty(profile.social && profile.social.youtube) ? null : (
							<a
								target="_blank"
								rel="noopener noreferrer"
								href={profile.social.youtube}
							>
								<Icon size="big" color="red" name="youtube" />
							</a>
						)}
					</p>
				</Segment>
			</section>
		);
	}
}

export default ProfileLeft;
