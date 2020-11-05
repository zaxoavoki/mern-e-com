import Cookies from "universal-cookie";
import React, { useState } from "react";
import PropTypes from "prop-types";
import jwt_decode from "jwt-decode";

export const AuthContext = React.createContext();

export default function AuthContextProvider(props) {
    const cookies = new Cookies();
    const removeJWT = () => cookies.remove("jwt");
    const setJWT = (token) => cookies.set("jwt", token);

    cookies.addChangeListener((res) => {
        const user = res.value ? jwt_decode(res.value) : null;
        setAuth({
            user,
            logout: removeJWT,
            login: setJWT,
        });
    });

    const jwt = cookies.get("jwt");
    const user = jwt ? jwt_decode(jwt) : null;
    const [auth, setAuth] = useState({
        user,
        logout: removeJWT,
        login: setJWT,
    });

    return <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>;
}

AuthContextProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
