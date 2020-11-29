import Cookies from "universal-cookie";
import React, { useState } from "react";
import PropTypes from "prop-types";
import jwt_decode from "jwt-decode";

export const AuthContext = React.createContext();

export default function AuthContextProvider(props) {
  const cookies = new Cookies();

  cookies.addChangeListener((res) => {
    // Update state only if auth cookies were updated
    if (res.name === process.env.REACT_APP_JWT_COOKIE_NAME) {
      setAuth((auth) => ({
        ...auth,
        user: res.value ? jwt_decode(res.value) : null,
      }));
    }
  });

  const token = cookies.get("token");
  const user = token ? jwt_decode(token) : null;
  const [auth, setAuth] = useState({ token, user, cookies });

  return <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>;
}

AuthContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
