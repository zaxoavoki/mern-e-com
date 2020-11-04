import React, { useState } from "react";
import validator from "validator";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

function Login({ cookies, setState }) {
	const history = useHistory();
	const [error, setError] = useState({
		email: false,
		password: false,
	});

	function validate(email, password) {
		const error = {
			email: !validator.isEmail(email),
			password: !validator.isLength(password, { min: 6, max: 32 }),
		};
		setError({
			email: error.email,
			password: error.password,
		});
		return !(error.email || error.password);
	}

	function handleSubmit(e) {
		e.preventDefault();

		const { email, password } = e.target.elements;
		if (!validate(email.value, password.value)) {
			return; // interrupt here
		}

		fetch("http://localhost:3001/login", {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({ email: email.value, password: password.value }),
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.error) {
					setError({
						email: error.email,
						password: error.password,
						submit: res.error,
					});
				}
				cookies.set("jwt", res.token, { path: "/" });
				setState((prev) => Object.assign({ jwt: res.token }, prev));
				history.push("/");
			})
			.catch((e) => console.log("err", e));
	}

	return (
		<div className="mx-auto card my-5" style={{ width: "300px" }}>
			<div className="card-body p-4">
				{error.submit ? (
					<div className="alert alert-danger" role="alert">
						{error.submit}
					</div>
				) : (
					""
				)}
				<h1 className="mb-4">Log in</h1>
				<form action="/" method="POST" onSubmit={(e) => handleSubmit(e)}>
					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input
							className={`form-control ${error.email ? "is-invalid" : ""}`}
							type="email"
							id="email"
							name="email"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input
							className={`form-control ${error.password ? "is-invalid" : ""}`}
							type="password"
							id="password"
							name="password"
						/>
					</div>
					<button className="btn btn-primary float-right" type="submit">
						Log in
					</button>
				</form>
			</div>
		</div>
	);
}

Login.propTypes = {
	cookies: PropTypes.object,
	setState: PropTypes.func,
};

export default Login;
