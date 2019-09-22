import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import { Container } from "semantic-ui-react";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";
import Button from "../common/Button.js";
import SearchBox from "../SearchBox/SearchBox";
import "./Navbar.scss";

class Navbar extends Component {
	state = { activeItem: "home" };

	handleItemClick = (e, { name }) => this.setState({ activeItem: name });

	onLogoutClick = e => {
		e.preventDefault();
		this.props.clearCurrentProfile();
		this.props.logoutUser();
	};

	render() {
		const { user, isAuthenticated } = this.props.auth;
		const authLinks = (
			<div style={{ display: "flex", alignItems: "center" }}>
				<img
					src={user.avatar}
					alt={user.name}
					style={{
						width: "30px",
						marginRight: "10px",
						alignSelf: "center",
						borderRadius: "50%"
					}}
				/>
				<Dropdown text={`Hi, ${user.name}`}>
					<Dropdown.Menu>
						<Dropdown.Divider />
						<Dropdown.Item
							style={{ marginLeft: "0" }}
							as={Link}
							to={`/profile/${user.handle}`}
							icon="user"
							text={user.name}
						/>

						<Dropdown.Divider />

						<Dropdown.Item
							style={{ marginLeft: "0" }}
							as="a"
							icon="sign-out"
							onClick={this.onLogoutClick}
							text="Sign out"
						/>
					</Dropdown.Menu>
				</Dropdown>
			</div>
		);

		const guestLinks = (
			<div>
				<Link to="/register">Join now</Link>
				<Button
					to="/login"
					color="#0172B0"
					background="white"
					content="Sign in"
				/>
			</div>
		);

		return (
			<section className="navbar-container">
				<Container>
					<nav className="navbar">
						<div className="navbar-left">
							<Link to="/">
								Dev<span>Hub</span>
							</Link>
							{/* <Link to="/profiles">Developers</Link> */}
						</div>
						<div className="navbar-middle">
							{isAuthenticated ? <SearchBox /> : null}
						</div>
						<div className="navbar-right">
							{isAuthenticated ? authLinks : guestLinks}
						</div>
					</nav>
				</Container>
			</section>
		);
	}
}

const mapStateToProps = ({ auth }) => {
	return { auth };
};

export default connect(
	mapStateToProps,
	{ logoutUser, clearCurrentProfile }
)(Navbar);
