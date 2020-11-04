import React, { useState } from "react";
import PropTypes from "prop-types";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import About from "./components/About";
import Error from "./components/layout/Error";
import Categories from "./components/categories/Categories";
import Category from "./components/categories/Category";

function App({ cookies }) {
	const [state, setState] = useState({ jwt: cookies.get("jwt") });

	return (
		<>
			<Header cookies={cookies} state={state} setState={setState} />
			<main className="container py-5">
				<Switch>
					<Route path="/" exact render={() => <h1>Path /</h1>} />
					{state.jwt ? null : (
						<Route path="/login" exact>
							<Login cookies={cookies} setState={setState} />
						</Route>
					)}
					{state.jwt ? null : (
						<Route path="/signup" exact>
							<Signup state={state} setState={setState} />
						</Route>
					)}
					<Route path="/about" exact component={About} />
					<Route path="/categories" exact component={Categories} />
					<Route path="/categories/:categoryId" exact component={Category} />
					<Route component={Error} />
				</Switch>
			</main>
			<Footer />
		</>
	);
}

App.propTypes = {
	cookies: PropTypes.object,
};

export default App;
