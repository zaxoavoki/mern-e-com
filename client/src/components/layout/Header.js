import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

function Header() {
  const history = useHistory();
  const { user, cookies } = useContext(AuthContext);

  function logout() {
    cookies.remove(process.env.REACT_APP_JWT_COOKIE_NAME);
    history.push("/");
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
          {user ? (
            <div className="btn-group">
              <span className="dropdown-toggle btn btn-outline-primary" data-toggle="dropdown">
                {user.username}
              </span>
              <div className="dropdown-menu">
                <Link to="/settings">
                  <span className="dropdown-item">Settings</span>
                </Link>
                {user.role === 2 && (
                  <Link to="/admin">
                    <span className="dropdown-item">Admin panel</span>
                  </Link>
                )}
                <div className="dropdown-divider" />
                <span className="dropdown-item" onClick={() => logout()}>
                  Log out
                </span>
              </div>
            </div>
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

export default Header;
