import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	Form,
	Grid,
	Header,
	Image,
	Message,
	Segment
} from 'semantic-ui-react';

import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Login extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
			email: '',
			errors: {}
		};
	}

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/feed');
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onSubmit = e => {
		e.preventDefault();
		const user = {
			email: this.state.email,
			password: this.state.password
		};
		this.props.loginUser(user);
	};

	render() {
		const { errors } = this.state;
		return (
			<div className="login">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Log In</h1>
							<p className="lead text-center">
								Sign in to your SocialNetwork account
							</p>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									name="email"
									placeholder="Email Address"
									type="email"
									value={this.state.email}
									onChange={this.onChange}
									error={errors.email}
								/>
								<TextFieldGroup
									name="password"
									placeholder="Password"
									type="password"
									value={this.state.password}
									onChange={this.onChange}
									error={errors.password}
								/>

								<input type="submit" className="btn btn-info btn-block mt-4" />
							</form>
						</div>
					</div>
				</div>
			</div>
			// <Grid
			// 	textAlign="center"
			// 	style={{ height: '100vh' }}
			// 	verticalAlign="middle"
			// >
			// 	<Grid.Column style={{ maxWidth: 450 }}>
			// 		<Header as="h2" color="teal" textAlign="center">
			// 			Log-in to your account
			// 		</Header>
			// 		<Form size="large">
			// 			<Segment stacked>
			// 				<Form.Input
			// 					fluid
			// 					icon="user"
			// 					iconPosition="left"
			// 					placeholder="E-mail address"
			// 				/>
			// 				<Form.Input
			// 					fluid
			// 					icon="lock"
			// 					iconPosition="left"
			// 					placeholder="Password"
			// 					type="password"
			// 				/>

			// 				<Button color="teal" fluid size="large">
			// 					Login
			// 				</Button>
			// 			</Segment>
			// 		</Form>
			// 		<Message>
			// 			New to us? <a href="#">Sign Up</a>
			// 		</Message>
			// 	</Grid.Column>
			// </Grid>
		);
	}
}

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = ({ auth, errors }) => {
	return { auth, errors };
};

export default connect(
	mapStateToProps,
	{ loginUser }
)(Login);
