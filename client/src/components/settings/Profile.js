import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { getOne as getUser, update as updateUserData } from "../../api/user";
import { refreshToken } from "../../api/auth";
import { useAlert } from "react-alert";

export default function Profile() {
  const { user: currentUser, token, cookies } = useContext(AuthContext);

  const alert = useAlert();
  const [user, setUser] = useState({});
  const [data, setData] = useState({
    email: currentUser.email,
    username: currentUser.username,
  });

  useEffect(() => {
    getUser(currentUser._id)
      .then((res) => setUser(res))
      .catch(() => {});
  }, []);

  function updateInfo(id) {
    updateUserData(
      id,
      {
        email: data.email,
        username: data.username,
      },
      token
    )
      .then(() => {
        refreshToken(token).then((res) => {
          alert.success("Changes saved.");
          cookies.set(process.env.REACT_APP_JWT_COOKIE_NAME, res.token, {
            expires: new Date(Date.now() + 1000 * 3600 * 2),
            path: "/",
          });
        });
      })
      .catch((err) => alert.error(err));
  }

  return (
    <div className="row">
      <h2 className="col-12 mb-4">Profile set up</h2>
      <div className="col-3">
        <img className="w-100 rounded" src={user.avatar} alt="User image" />
      </div>
      <div className="col-9">
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={data.email}
            onChange={(v) => setData((p) => ({ ...p, email: v.target.value }))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Name</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={data.username}
            onChange={(v) => setData((p) => ({ ...p, username: v.target.value }))}
          />
        </div>
        <button onClick={() => updateInfo(user._id)} className="btn btn-primary ml-auto d-block">
          Update info
        </button>
      </div>
    </div>
  );
}
