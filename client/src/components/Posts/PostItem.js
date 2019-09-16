import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Icon, Input, Divider } from "semantic-ui-react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { deletePost, addLike, removeLike } from "../../actions/postActions";
import CommentForm from "../Post/CommentForm";
import CommentFeed from "../Post/CommentFeed";

const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];

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
		const { post, auth, showActions, postId } = this.props;
		console.log("post", this.props);
		const Segment = styled.div`
			border-radius: 0.5rem;
			box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
			margin-bottom: 2rem;
			background-color: #fff;
			padding: 2rem;
			font-family: "Montserrat", sans-serif;
			box-sizing: border-box;
		`;

		// console.log(post);
		return (
			<div>
				<Segment>
					<div>
						<div className="postitem-top">
							<Link to={`/profile/${post.handle}`}>
								<img src={post.avatar} alt={post.name} />
							</Link>
							<div className="postitem-top-right">
								<div>
									<Link to={`/profile/${post.handle}`}>
										<strong>{post.name}</strong>
									</Link>
									<p>{`${new Date(post.date).getDate()} ${
										months[new Date(post.date).getMonth()]
									}, ${new Date(post.date).getFullYear()}`}</p>
								</div>
								<div>
									{post.user === auth.user.id ? (
										<Icon
											title="Delete"
											link
											color="red"
											circular
											name="trash alternate"
											style={{ marginRight: "15px", cursor: "pointer" }}
											onClick={() => this.onDeleteClick(post._id)}
										/>
									) : null}
								</div>
							</div>
						</div>
						<br />
						<p className="postitem-text">{post.text}</p>

						<div className="postitem-bottom">
							<Icon
								color="red"
								onClick={() => this.onLikeClick(post._id)}
								name="heart outline"
							/>
							{post.likes.length > 0 && post.likes.length}
							{
								// <i
								// 	className={classnames('fas fa-thumbs-up', {
								// 		'text-info': this.findUserLike(post.likes)
								// 	})}
								// />
							}
							{/* <button onClick={() => this.onUnlikeClick(post._id)} type="button">
						<Icon name="thumbs down outline" /> Unlike
					</button> */}
							<Link to={`/post/${post._id}`}>
								<Icon name="comment outline" />
							</Link>
							<Icon name="share alternate" />
						</div>
					</div>
					<Divider />
					<h5 style={{ marginTop: 0, fontSize: ".8rem" }}>Comments:</h5>
					<CommentFeed postId={post._id} comments={post.comments} />
					<br />
					<CommentForm postId={post._id} />
				</Segment>
			</div>
		);
	}
}

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
