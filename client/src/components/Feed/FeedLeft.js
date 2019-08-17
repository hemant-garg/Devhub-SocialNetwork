import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Container, Icon, Divider } from 'semantic-ui-react';

import './Feed.scss';
class FeedLeft extends Component {
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
		const SocialDeck = styled.div`
			display: flex;
			margin: 2rem 0;
			justify-content: center;
		`;
		const { user } = this.props;
		return (
			<section className="feed-left">
				<Segment>
					<div>
						<img src={user.avatar} alt={user.name} />
						<h3>{user.name}</h3>
						<p>A full stack Web developer who plays guitar.</p>
					</div>
					<br />
					<Divider />
					<SocialDeck>
						<Icon color="grey" size="big" name="globe" />
						<Icon color="violet" size="big" name="facebook" />
						<Icon color="blue" size="big" name="linkedin" />
						<Icon color="pink" size="big" name="instagram" />
						<Icon color="black" size="big" name="github" />
					</SocialDeck>
					<Link to={`/profile/${user.handle}`}>View Profile</Link>
				</Segment>
			</section>
		);
	}
}

export default FeedLeft;
