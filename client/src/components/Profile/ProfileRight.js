import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { Divider, Icon } from "semantic-ui-react";
import "./Profile.scss";
import ProfileGithub from "./ProfileGithub";

class FeedRight extends Component {
	state = {
		githubFormOpen: false
	};
	handleGithubForm = () => {
		this.setState(prev => ({ githubFormOpen: !prev.githubFormOpen }));
	};

	render() {
		const { profile } = this.props;
		const { githubFormOpen } = this.state;
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
		return (
			<section className="profile-right">
				<Segment>
					<h5>Latest Github Repos:</h5>
					<Divider />
					{!githubFormOpen && (
						<p>
							{profile.githubusername ? (
								<ProfileGithub username={profile.githubusername} />
							) : (
								"No repo found"
							)}
						</p>
					)}
				</Segment>
			</section>
		);
	}
}

export default FeedRight;
