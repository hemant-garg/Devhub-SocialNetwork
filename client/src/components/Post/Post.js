import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";
import { Container } from "semantic-ui-react";
import PostItem from "../Posts/PostItem";
import { getPost } from "../../actions/postActions";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";
import FeedLeft from "../Feed/FeedLeft";
import FeedRight from "../Feed/FeedRight";

class Post extends Component {
	componentDidMount() {
		const id = this.props.match.params.id;
		if (id) this.props.getPost(id);
	}
	render() {
		const { post, loading } = this.props.post;
		const { user } = this.props.auth;
		let postContent;
		if (post === null || loading || Object.keys(post).length === 0)
			postContent = <Spinner />;
		else {
			postContent = (
				<PostItem post={post} postId={post._id} showActions={false} />
			);
		}
		return (
			<div className="post">
				<Container>
					<div className="feed">
						<FeedLeft user={user} />
						<div className="feed-middle">{postContent}</div>
						<FeedRight />
					</div>
				</Container>
			</div>
		);
	}
}

Post.propTypes = {
	getPost: PropTypes.func.isRequired,
	auth: PropTypes.object
};

const mapStateToProps = ({ post, auth }) => {
	return { post, auth };
};
export default connect(
	mapStateToProps,
	{ getPost }
)(Post);
