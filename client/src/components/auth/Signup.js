import validator from "validator";
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { signup as authSignup } from "../../api/auth";

function Signup() {
  const history = useHistory();
  const { cookies } = useContext(AuthContext);
  const [error, setError] = useState({});

  function isValid(obj) {
    const validators = {
      username: (e) => validator.isLength(e, { min: 4, max: 32 }),
      email: (e) => validator.isEmail(e),
      password: (e) => validator.isLength(e, { min: 6, max: 32 }),
      password_confirmation: (e) => e === obj.password.value,
    };

    const errors = {};
    for (const [key, validate] of Object.entries(validators)) {
      errors[key] = !validate(obj[key].value);
    }

    setError(errors);
    return !Object.values(errors).some(Boolean);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!isValid(e.target.elements)) {
      return;
    }

    // Maps on element values
    const data = {};
    Object.keys(e.target.elements).map((k) => {
      data[k] = e.target.elements[k].value;
    });

    authSignup(data)
      .then((res) => {
        cookies.set(process.env.REACT_APP_JWT_COOKIE_NAME, res.token, {
          path: "/",
          expires: new Date(Date.now() + 1000 * 3600 * 2),
        });
        history.push("/");
      })
      .catch((err) =>
        setError({
          ...error,
          submit: typeof err === "string" ? err : "Something went wrong",
        })
      );
  }

  return (
    <div className="mx-auto card my-5" style={{ width: "350px" }}>
      <div className="card-body p-4">
        {error.submit && (
          <div className="alert alert-danger" role="alert">
            {error.submit}
          </div>
        )}
        <h1 className="mb-4">Create account</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Name</label>
            <input className={`form-control ${error.username && "is-invalid"}`} type="text" id="username" name="username" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input className={`form-control ${error.email && "is-invalid"}`} type="email" id="email" name="email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input className={`form-control ${error.password && "is-invalid"}`} type="password" id="password" name="password" />
          </div>
          <div className="form-group">
            <label htmlFor="password_confirmation">Password confirmation</label>
            <input
              className={`form-control ${error.password_confirmation && "is-invalid"}`}
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
