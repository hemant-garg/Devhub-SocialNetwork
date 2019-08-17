import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import { deleteComment } from '../../actions/postActions';
import './Comment.scss';

const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];
class CommentItem extends Component {
	onDeleteClick = (postId, commentId) => {
		// console.log(postId);
		this.props.deleteComment(postId, commentId);
	};

	render() {
		const { postId, auth, comment } = this.props;
		console.log(this.props);
		return (
			<div className="commentitem">
				<img src={comment.avatar} alt="comment" />
				<div className="commentitem-top">
					<div className="commentitem-top-right">
						<div>
							<Link to={`/profile/${comment.handle}`}>
								<strong>{comment.name}</strong>
							</Link>
							<span>{`${new Date(comment.date).getDate()} ${
								months[new Date(comment.date).getMonth()]
							}, ${new Date(comment.date).getFullYear()}`}</span>
						</div>
						<div>
							{comment.user === auth.user.id ? (
								<Icon
									title="Delete"
									name="trash"
									style={{ marginRight: '15px', cursor: 'pointer' }}
									onClick={() => this.onDeleteClick(postId, comment._id)}
								/>
							) : null}
						</div>
					</div>
					<p className="commentitem-text">{comment.text}</p>
				</div>
			</div>
		);
	}
}

CommentItem.propTypes = {
	deleteComment: PropTypes.func.isRequired,
	postId: PropTypes.string.isRequired,
	comment: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = ({ auth }) => {
	return { auth };
};

export default connect(
	mapStateToProps,
	{ deleteComment }
)(CommentItem);
