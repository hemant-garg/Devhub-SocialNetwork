import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon, Input } from 'semantic-ui-react';
import TextareaFieldGroup from '../common/TextareaFieldGroup';

import { addComment } from '../../actions/postActions';

class CommentForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: '',
			errors: {}
		};
	}

	componentWillReceiveProps(nextprops) {
		if (nextprops.errors) {
			this.setState({ errors: nextprops.errors });
		}
	}

	onChange = e => {
		this.setState({ text: e.target.value });
	};

	onSubmit = e => {
		e.preventDefault();
		const { user } = this.props.auth;
		const { postId } = this.props;
		const newComment = {
			text: this.state.text,
			name: user.name,
			avatar: user.avatar
		};
		this.props.addComment(newComment, postId);
		this.setState({ text: '' });
	};
	render() {
		const { errors, text } = this.state;
		return (
			<div>
				<Input
					fluid
					onChange={this.onChange}
					value={text}
					icon={
						<Icon
							name="send"
							onClick={this.onSubmit}
							className="main-backcolor"
							circular
							link
						/>
					}
					transparent
					placeholder="Write a comment here..."
				/>
				{errors.text}
			</div>
		);
	}
}

CommentForm.propTypes = {
	addComment: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = ({ auth, errors }) => {
	return { auth, errors };
};

export default connect(
	mapStateToProps,
	{ addComment }
)(CommentForm);
