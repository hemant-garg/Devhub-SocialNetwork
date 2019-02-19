import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";
import PostItem from "../Posts/PostItem";
import { getPost } from "../../actions/postActions";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";

class Post extends Component {
	componentDidMount() {
		const id = this.props.match.params.id;
		if (id) this.props.getPost(id);
	}
	render() {
		const { post, loading } = this.props.post;
		let postContent;
		if (post === null || loading || Object.keys(post).length === 0)
			postContent = <Spinner />;
		else {
			postContent = (
				<div>
					<PostItem post={post} showActions={false} />
					<CommentForm postId={post._id} />
					<CommentFeed postId={post._id} comments={post.comments} />
				</div>
			);
		}
		return (
			<div className="post">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<Link to="/feed" className="btn btn-light mb-3">
								Back to Feed
							</Link>
							{postContent}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Post.propTypes = {
	getPost: PropTypes.func.isRequired,
	auth: PropTypes.object
};

const mapStateToProps = ({ post }) => {
	return { post };
};
export default connect(
	mapStateToProps,
	{ getPost }
)(Post);
