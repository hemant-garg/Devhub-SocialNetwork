import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button, Form, Container, Divider } from "semantic-ui-react";

import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import loginsvg from "./login.jpg";
import "./auth.scss";
class Login extends Component {
	constructor() {
		super();
		this.state = {
			name: "",
			email: "",
			errors: {}
		};
	}

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push("/feed");
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAuthenticated) {
			this.props.history.push("/feed");
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
			<div className="white-back">
				<Container>
					<div className="login">
						<div className="login-left">
							<h2 className="login-left-title">
								Sign in to Dev<span>Hub</span>
							</h2>

							<Divider />

							<Form onSubmit={this.onSubmit}>
								<Form.Input
									label="Email Address"
									placeholder="Email Address"
									name="email"
									value={this.state.email}
									onChange={this.onChange}
									error={errors.email ? errors.email : null}
								/>
								<Form.Input
									fluid
									type="password"
									label="Password"
									placeholder="Password"
									name="password"
									value={this.state.password}
									onChange={this.onChange}
									error={errors.password ? errors.password : null}
								/>
								<br />
								<div className="login-left-bottom">
									<Button primary type="submit">
										Sign in
									</Button>
									<Link to="/register">Register</Link>
								</div>
							</Form>
						</div>
						<div className="login-right">
							<img src={loginsvg} alt="login" />
						</div>
					</div>
				</Container>
			</div>
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
