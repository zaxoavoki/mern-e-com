import React, { useContext, useState } from "react";
import validator from "validator";
import { useHistory } from "react-router-dom";

import loginUser from "../../api/login";
import { AuthContext } from "../../contexts/AuthContext";

function Login() {
    const { login } = useContext(AuthContext);
    const history = useHistory();
    const [error, setError] = useState({
        email: false,
        password: false,
    });

    function isValid(email, password) {
        const error = {
            email: !validator.isEmail(email),
            password: !validator.isLength(password, { min: 6, max: 32 }),
        };
        setError(error);
        return !Object.values(error).every(Boolean);
    }

    function handleSubmit(e) {
        e.preventDefault();

        const { email, password } = e.target.elements;
        if (!isValid(email.value, password.value)) {
            return;
        }

        loginUser(email.value, password.value)
            .then((res) => {
                login(res.token);
                history.push("/");
            })
            .catch((err) => {
                setError({
                    ...error,
                    submit: typeof err === "string" ? err : "Something went wrong",
                });
            });
    }

    return (
        <div className="mx-auto card my-5" style={{ width: "300px" }}>
            <div className="card-body p-4">
                {error.submit && (
                    <div className="alert alert-danger" role="alert">
                        {error.submit}
                    </div>
                )}
                <h1 className="mb-4">Log in</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input className={`form-control ${error.email ? "is-invalid" : ""}`} type="email" id="email" name="email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input className={`form-control ${error.password ? "is-invalid" : ""}`} type="password" id="password" name="password" />
                    </div>
                    <button className="btn btn-primary float-right" type="submit">
                        Log in
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
