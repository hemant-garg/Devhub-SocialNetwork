import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./Landing.scss";
import { Container, Button } from "semantic-ui-react";

import Background from "./59853.jpg";
class Landing extends Component {
	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push("/feed");
		}
	}
	render() {
		return (
			<div className="landing">
				<Container>
					<div className="landing-top">
						<div className="landing-top--left">
							<p className="landing-top--left-title">
								Welcome to your most Professional Community
							</p>
							<p className="landing-top--left-subtitle">
								Connect with other developers from all over the world.
							</p>
							<Button
								as={Link}
								to="/register"
								size="big"
								content="Get Started"
								primary
								circular
							/>
						</div>
						<div className="landing-top--right">
							<img src={Background} alt="hemant garg" />
						</div>
					</div>
				</Container>
			</div>
		);
	}
}

Landing.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = ({ auth }) => {
	return { auth };
};

export default connect(mapStateToProps)(Landing);
