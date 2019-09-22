import React, { Component } from "react";
import { Icon } from "semantic-ui-react";
import styled from "styled-components";
import isEmpty from "../../validation/isEmpty";
import EditBio from "../edit-profile/EditBio";

class ProfileHeader extends Component {
	state = {
		bioFormOpen: false
	};

	handleBioForm = () => {
		this.setState(prev => ({ bioFormOpen: !prev.bioFormOpen }));
	};

	render() {
		const Segment = styled.div`
			border-radius: 0.5rem;
			box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
			margin-bottom: 2rem;
			background-color: #fff;
			padding: 2rem 1.3rem;
			font-family: "Montserrat", sans-serif;
			box-sizing: border-box;
		`;
		const { profile, user } = this.props;
		const { bioFormOpen } = this.state;
		return (
			<Segment>
				<div className="experience-top">
					<h4>Bio:</h4>
					{profile.user._id === user.id ? (
						<Icon
							onClick={this.handleBioForm}
							size="large"
							style={{ fontSize: "1.15rem" }}
							link
							name={bioFormOpen ? "close" : "pencil"}
						/>
					) : null}
				</div>
				{bioFormOpen && <EditBio profile={profile} />}
				{!bioFormOpen && (
					<p className="mt1">
						{isEmpty(profile.bio) ? (
							`${profile.user.name} doesn't have a bio.`
						) : (
							<span>{profile.bio}</span>
						)}
					</p>
				)}
			</Segment>
		);
	}
}

export default ProfileHeader;
