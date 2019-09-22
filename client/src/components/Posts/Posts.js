import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import PostForm from "./PostForm";
import PostFeed from "./PostFeed";
import { getPosts } from "../../actions/postActions";
import { Container, Divider } from "semantic-ui-react";
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
