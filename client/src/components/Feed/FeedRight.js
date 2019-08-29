import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { Divider } from "semantic-ui-react";
import "./Feed.scss";

class FeedRight extends Component {
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
		return (
			<section className="feed-right">
				<Segment>
					<h5>Keep in touch</h5>
					<Divider />
					<div className="feed-right-top">
						<img
							src="https://avatars0.githubusercontent.com/u/28654111?s=460&v=4"
							alt="Hemant Garg"
						/>
						<div>
							<strong>Hemant Garg</strong>
							<p>Developer of this App</p>
						</div>
					</div>
					<Divider />
					<div style={{ textAlign: "center" }}>
						<Link to="/profile/manishgarg">View Profile</Link>
					</div>
				</Segment>
			</section>
		);
	}
}

export default FeedRight;
