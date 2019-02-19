import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextareaFieldGroup from "../common/TextareaFieldGroup";

import { addComment } from "../../actions/postActions";

class CommentForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: "",
			errors: {}
		};
	}

	componentWillReceiveProps(nextprops) {
		if (nextprops.errors) {
			this.setState({ errors: nextprops.errors });
		}
	}

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
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
		this.setState({ text: "" });
	};
	render() {
		const { errors } = this.state;
		return (
			<div className="post-form mb-3">
				<div className="card card-info">
					<div className="card-header bg-info text-white">
						Make a Comment...
					</div>
					<div className="card-body">
						<form onSubmit={this.onSubmit}>
							<div className="form-group">
								<TextareaFieldGroup
									name="text"
									error={errors.text}
									onChange={this.onChange}
									value={this.state.text}
									placeholder="Reply to Post"
								/>
							</div>
							<button type="submit" className="btn btn-dark">
								Submit
							</button>
						</form>
					</div>
				</div>
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
