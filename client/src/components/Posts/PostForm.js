import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextareaFieldGroup from "../common/TextareaFieldGroup";

import { addPost } from "../../actions/postActions";

class PostForm extends Component {
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
		const newPost = {
			text: this.state.text,
			name: user.name,
			avatar: user.avatar
		};
		this.props.addPost(newPost);
		this.setState({ text: "" });
	};
	render() {
		const { errors } = this.state;
		return (
			<div className="post-form mb-3">
				<div className="card card-info">
					<div className="card-header bg-info text-white">Say Somthing...</div>
					<div className="card-body">
						<form onSubmit={this.onSubmit}>
							<div className="form-group">
								<TextareaFieldGroup
									name="text"
									error={errors.text}
									onChange={this.onChange}
									value={this.state.text}
									placeholder="Create a post"
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

PostForm.propTypes = {
	addPost: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = ({ auth, errors, profile }) => {
	return { auth, errors, profile };
};

export default connect(
	mapStateToProps,
	{ addPost }
)(PostForm);
