import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { Divider } from "semantic-ui-react";

import "./Feed.scss";
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
			font-family: "Montserrat", sans-serif;
			box-sizing: border-box;
		`;

		const { user } = this.props;
		return (
			<section className="feed-left">
				<Segment>
					<div>
						<img src={user.avatar} alt={user.name} />
						<h3>{user.name}</h3>
						<p style={{ marginTop: "-.4rem" }}>{user.handle}</p>
					</div>
					<br />
					<Divider />

					<Link to={`/profile/${user.handle}`}>View Profile</Link>
				</Segment>
			</section>
		);
	}
}

export default FeedLeft;
