import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";
import registersvg from "./signup.jpg";
import "./auth.scss";
import { Container, Form, Button, Divider } from "semantic-ui-react";
class Register extends Component {
	constructor() {
		super();
		this.state = {
			name: "",
			email: "",
			password: "",
			password2: "",
			handle: "",
			errors: {}
		};
	}

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push("/feed");
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onSubmit = e => {
		e.preventDefault();
		const newUser = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2,
			handle: this.state.handle
		};

		this.props.registerUser(newUser, this.props.history);
	};

	render() {
		const { errors } = this.state;
		console.log("register", errors);
		return (
			<div className="white-back">
				<Container>
					<div className="register">
						<div className="register-left">
							<img src={registersvg} alt="register" />
						</div>
						<div className="register-right">
							<h2 className="register-right-title">
								Join Dev<span>Hub</span>
							</h2>
							<Divider />
							<Form noValidate onSubmit={this.onSubmit}>
								<Form.Input
									label="Name"
									name="name"
									placeholder="Name"
									value={this.state.name}
									onChange={this.onChange}
									error={errors.name ? errors.name : null}
								/>
								<Form.Input
									label="Username"
									name="handle"
									placeholder="User name"
									value={this.state.handle}
									onChange={this.onChange}
									error={errors.handle ? errors.handle : null}
								/>
								<Form.Input
									label="Email Address"
									placeholder="Email Address"
									name="email"
									value={this.state.email}
									onChange={this.onChange}
									error={errors.email ? errors.email : null}
								/>

								<Form.Group widths="equal">
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
									<Form.Input
										type="password"
										fluid
										label="Confirm Password"
										placeholder="Confirm Password"
										name="password2"
										value={this.state.password2}
										onChange={this.onChange}
										error={errors.password2 ? errors.password2 : null}
									/>
								</Form.Group>
								<div className="register-right-bottom">
									<Button primary type="submit">
										Register
									</Button>
									<Link to="/login">Sign in</Link>
								</div>
							</Form>

							{/* <form noValidate onSubmit={this.onSubmit}>
							<TextFieldGroup
								name="name"
								placeholder="Name"
								value={this.state.name}
								onChange={this.onChange}
								error={errors.name}
							/>
							<TextFieldGroup
								name="handle"
								placeholder="User handle"
								value={this.state.handle}
								onChange={this.onChange}
								error={errors.handle}
							/>
							<TextFieldGroup
								name="email"
								placeholder="Email Address"
								type="email"
								value={this.state.email}
								onChange={this.onChange}
								error={errors.email}
								info="This site uses Gravatar so if you want a profile image, use
									a Gravatar email"
							/>
							<TextFieldGroup
								name="password"
								placeholder="Password"
								type="password"
								value={this.state.password}
								onChange={this.onChange}
								error={errors.password}
							/>

							<TextFieldGroup
								name="password2"
								placeholder="Confirm Password"
								type="password"
								value={this.state.password2}
								onChange={this.onChange}
								error={errors.password2}
							/>

							<input type="submit" />
						</form> */}
						</div>
					</div>
				</Container>
			</div>
		);
	}
}

Register.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = ({ auth, errors }) => {
	return { auth, errors };
};

export default connect(
	mapStateToProps,
	{ registerUser }
)(withRouter(Register));
