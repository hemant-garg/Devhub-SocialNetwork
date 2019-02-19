import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { deletePost, addLike, removeLike } from "../../actions/postActions";

class PostItem extends Component {
	onDeleteClick = id => {
		this.props.deletePost(id);
	};

	onLikeClick = id => {
		this.props.addLike(id);
	};
	onUnlikeClick = id => {
		this.props.removeLike(id);
	};

	findUserLike = likes => {
		const { auth } = this.props;
		if (likes.filter(like => like.user === auth.user.id).length > 0)
			return true;
		return false;
	};

	render() {
		const { post, auth, showActions } = this.props;
		let actionContent;
		if (showActions) {
			actionContent = (
				<div>
					<button
						onClick={() => this.onLikeClick(post._id)}
						type="button"
						className="btn btn-light mr-1"
					>
						<i
							className={classnames("fas fa-thumbs-up", {
								"text-info": this.findUserLike(post.likes)
							})}
						/>
						<span className="badge badge-light">{post.likes.length}</span>
					</button>
					<button
						onClick={() => this.onUnlikeClick(post._id)}
						type="button"
						className="btn btn-light mr-1"
					>
						<i className="text-secondary fas fa-thumbs-down" />
					</button>
					<Link to={`/post/${post._id}`} className="btn btn-info mr-1">
						Comments
					</Link>
					{post.user === auth.user.id ? (
						<button
							type="button"
							onClick={() => this.onDeleteClick(post._id)}
							className="btn btn-danger mr-1"
						>
							<i className="fas fa-times" />
						</button>
					) : null}
				</div>
			);
		} else actionContent = null;
		// console.log(post);
		return (
			<div className="card card-body mb-3">
				<div className="row">
					<div className="col-md-2">
						<img
							className="rounded-circle d-none d-md-block"
							src={post.avatar}
							alt=""
						/>
						<br />
						<p className="text-center">{post.name}</p>
					</div>
					<div className="col-md-10">
						<p className="lead">{post.text}</p>
						{actionContent}
					</div>
				</div>
			</div>
		);
	}
}

PostItem.propTypes = {
	deletePost: PropTypes.func.isRequired,
	addLike: PropTypes.func.isRequired,
	removeLike: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};

PostItem.defaultProps = {
	showActions: true
};

const mapStateToProps = ({ auth }) => {
	return { auth };
};

export default connect(
	mapStateToProps,
	{ deletePost, addLike, removeLike }
)(PostItem);
