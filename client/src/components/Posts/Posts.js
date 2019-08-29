import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import PostForm from "./PostForm";
import PostFeed from "./PostFeed";
import { getPosts } from "../../actions/postActions";
import { Container, Icon, Divider } from "semantic-ui-react";
import FeedLeft from "../Feed/FeedLeft";
import FeedRight from "../Feed/FeedRight";

class Posts extends Component {
	componentDidMount() {
		this.props.getPosts();
	}
	render() {
		const { posts, loading } = this.props.post;
		const { user } = this.props.auth;
		let postContent;
		if (posts === null || loading) postContent = <Spinner />;
		else {
			postContent = <PostFeed posts={posts} />;
		}
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

		console.log(this.props);

		return (
			<div style={{ backgroundColor: "#f5f5f5" }}>
				<Container>
					<section className="feed">
						<FeedLeft user={user} />
						<section className="feed-middle">
							<PostForm />
							{postContent}
						</section>
						<FeedRight />
					</section>
					<Divider horizontal>END</Divider>
					<br />
				</Container>
			</div>
		);
	}
}

Posts.propTypes = {
	getPosts: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired
};

const mapStateToProps = ({ post, auth }) => {
	return { post, auth };
};

export default connect(
	mapStateToProps,
	{ getPosts }
)(Posts);
