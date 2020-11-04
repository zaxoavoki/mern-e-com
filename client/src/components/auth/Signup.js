import React from "react";

function Signup() {
	return (
		<div className="mx-auto card my-5" style={{ width: "350px" }}>
			<div className="card-body p-4">
				<h1 className="mb-4">Create account</h1>
				<form action="/" method="POST">
					<div className="form-group">
						<label htmlFor="username">Name</label>
						<input className="form-control" type="text" id="username" name="username" />
					</div>
					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input className="form-control" type="email" id="email" name="email" />
					</div>
					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input
							className="form-control"
							type="password"
							id="password"
							name="password"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password_confirmation">Password confirmation</label>
						<input
							className="form-control"
							type="password"
							id="password_confirmation"
							name="password_confirmation"
						/>
					</div>
					<button className="btn btn-primary" type="submit">
						Sign up
					</button>
				</form>
			</div>
		</div>
	);
}

export default Signup;
