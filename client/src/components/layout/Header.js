import React from "react";
import PropTypes from "prop-types";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";

function Header({ cookies, state, setState }) {
	const user = state.jwt ? jwt_decode(state.jwt) : null;

	function logout() {
		cookies.remove("jwt");
		setState((prev) => {
			prev.jwt = null;
			return prev;
		});
	}

	return (
		<header>
			<div className="py-4 d-flex align-items-center container">
				<Link to="/">
					<span className="font-weight-bold">E-com</span>
				</Link>

				<nav className="nav ml-5">
					<Link to="/">
						<span className="nav-link">Home</span>
					</Link>
					<Link to="/categories">
						<span className="nav-link">Categories</span>
					</Link>
				</nav>

				<nav className="nav ml-auto">
					{state.jwt ? (
						<>
							<span className="nav-link">Hi, {user.username}</span>
							<span className="nav-link btn btn-primary" onClick={() => logout()}>
								Log out
							</span>
						</>
					) : (
						<>
							<Link to="/login">
								<span className="nav-link">Log in</span>
							</Link>
							<Link to="/signup">
								<span className="nav-link btn btn-primary">Sign up</span>
							</Link>
						</>
					)}
				</nav>
			</div>
		</header>
	);
}

Header.propTypes = {
	cookies: PropTypes.object,
	state: PropTypes.object,
	setState: PropTypes.func,
};

export default Header;
