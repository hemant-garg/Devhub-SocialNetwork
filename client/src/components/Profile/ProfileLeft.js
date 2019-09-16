import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { Container, Icon, Divider } from "semantic-ui-react";
import isEmpty from "../../validation/isEmpty";

import "./Profile.scss";
import EditSocialMedia from "../edit-profile/EditSocialMedia";
class ProfileLeft extends Component {
	state = {
		socialFormOpen: false
	};

	handleSocialForm = () => {
		this.setState(prev => ({ socialFormOpen: !prev.socialFormOpen }));
	};
	render() {
		const Segment = styled.div`
			border-radius: 0.5rem;
			box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
			margin-bottom: 2rem;
			background-color: #fff;
			padding: 2rem 1.3rem;
			position: sticky;
			top: 90px;
			font-family: "Montserrat", sans-serif;
			box-sizing: border-box;
		`;
		const { user, profile, auth } = this.props;
		const { socialFormOpen } = this.state;
		console.log("profile-left", this.props);
		return (
			<section className="profile-left">
				<Segment>
					<div>
						<img src={profile.user.avatar} alt={profile.user.name} />
						<h3 style={{ marginBottom: 0 }}>{profile.user.name}</h3>
						<p className="light-text">{profile.handle}</p>
						<p>
							{isEmpty(profile.bio) ? (
								`${profile.user.name} doesn't have a bio.`
							) : (
								<span>{profile.bio}</span>
							)}
						</p>
					</div>
					<br />
					<Divider />
					<div className="experience-top">
						<h5>Social Links: </h5>
						{profile.user._id === user.id ? (
							<Icon
								onClick={this.handleSocialForm}
								size="large"
								style={{ fontSize: "1rem" }}
								link
								name={socialFormOpen ? "close" : "pencil"}
							/>
						) : null}
					</div>
					{socialFormOpen && <EditSocialMedia profile={profile} />}
					<p style={{ marginTop: "1.5rem", textAlign: "left" }}>
						{isEmpty(profile.website) ? null : (
							<a
								target="_blank"
								rel="noopener noreferrer"
								href={profile.website}
							>
								<Icon size="big" color="black" name="globe" />
							</a>
						)}
						{isEmpty(profile.githubusername) ? null : (
							<a
								target="_blank"
								rel="noopener noreferrer"
								href={`https:github.com/${profile.githubusername}`}
							>
								<Icon size="big" color="grey" name="github" />
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

const mapStateToProps = ({ auth }) => {
	return { auth };
};

export default connect(mapStateToProps)(ProfileLeft);
