import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { Provider } from "react-redux";
import store from "./store";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";

import setAuthToken from "./utils/setAuthToken";

import PrivateRoute from "./components/common/PrivateRoute";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import AddExperience from "./components/add-credentials/AddExperience";
import AddEducation from "./components/add-credentials/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/Profile/Profile";
import NotFound from "./components/not-found/NotFound";
import Posts from "./components/Posts/Posts";
import Post from "./components/Post/Post";

import "semantic-ui-css/semantic.min.css";
import "./App.scss";

// checck for token

if (localStorage.jwtToken) {
	// set auth token header auth
	setAuthToken(localStorage.jwtToken);
	// decode token to get user data
	const decoded = jwt_decode(localStorage.jwtToken);
	// set user and isAuthenticated
	store.dispatch(setCurrentUser(decoded));

	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		store.dispatch(logoutUser());
		store.dispatch(clearCurrentProfile());

		window.location.href = "/login";
	}
}

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div className="App">
						<Navbar />
						<Route exact path="/" component={Landing} />
						<div className="container">
							<Route exact path="/login" component={Login} />
							<Route exact path="/register" component={Register} />
							<Route exact path="/profiles" component={Profiles} />
							<Route exact path="/profile/:handle" component={Profile} />
							<Switch>
								<PrivateRoute exact path="/dashboard" component={Dashboard} />
							</Switch>
							<Switch>
								<PrivateRoute
									exact
									path="/create-profile"
									component={CreateProfile}
								/>
							</Switch>
							<Switch>
								<PrivateRoute
									exact
									path="/edit-profile"
									component={EditProfile}
								/>
							</Switch>
							<Switch>
								<PrivateRoute
									exact
									path="/add-experience"
									component={AddExperience}
								/>
							</Switch>
							<Switch>
								<PrivateRoute
									exact
									path="/add-education"
									component={AddEducation}
								/>
							</Switch>
							<Switch>
								<PrivateRoute exact path="/feed" component={Posts} />
							</Switch>
							<Switch>
								<PrivateRoute exact path="/post/:id" component={Post} />
							</Switch>
							<Route exact path="/not-found" component={NotFound} />
						</div>
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
