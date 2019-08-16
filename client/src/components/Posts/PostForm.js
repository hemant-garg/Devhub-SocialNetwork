import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Icon, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import TextareaFieldGroup from '../common/TextareaFieldGroup';
import { addPost } from '../../actions/postActions';
import './Posts.scss';
class PostForm extends Component {
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
		this.setState({ text: '' });
	};
	render() {
		const { errors } = this.state;
		const Segment = styled.div`
			border-radius: 0.5rem;
			box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
			margin-bottom: 2rem;
			background-color: #fff;
			padding: 2rem 1rem;
			box-sizing: border-box;
		`;

		return (
			<Segment>
				<div>
					<div>
						<form onSubmit={this.onSubmit}>
							<TextareaFieldGroup
								name="text"
								error={errors.text}
								onChange={this.onChange}
								value={this.state.text}
								placeholder="Write Something here..."
							/>
							<div className="postform-bottom">
								<div style={{ fontWeight: 'bold' }}>
									<Icon color="blue" name="pencil" /> Write a Post
									<span style={{ marginLeft: '1.5rem', cursor: 'pointer' }}>
										<Icon color="green" name="image" /> Upload a photo
									</span>
								</div>

								<Button animated primary>
									<Button.Content visible>Post</Button.Content>
									<Button.Content hidden>
										<Icon name="send" />
									</Button.Content>
								</Button>
							</div>
						</form>
					</div>
				</div>
			</Segment>
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
