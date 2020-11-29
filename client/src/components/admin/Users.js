import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { getAll, remove } from "../../api/user";
import Small from "../users/Small";
import { useAlert } from "react-alert";

export default function Users() {
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const alert = useAlert();

  useEffect(() => {
    getAll()
      .then((res) => setUsers(res))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function removeUser(id) {
    remove(id, token)
      .then(() => {
        alert.info("User was removed.");
        setUsers((prev) => prev.filter((e) => e._id !== id));
      })
      .catch((err) => alert.error(err));
  }

  return (
    <div className="row">
      <div className="col-12 mb-3">
        {users.length === 0 && <p>There is no any user yet.</p>}
        {users.length !== 0 && users.map((user, i) => <Small key={i} removeUser={removeUser} user={user} />)}
      </div>
    </div>
  );
}
