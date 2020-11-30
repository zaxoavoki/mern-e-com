import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { getAll, remove } from "../../api/user";
import Small from "../users/Small";
import { useAlert } from "react-alert";

export default function Users() {
  const alert = useAlert();
  const { token } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState({ sort: "email" });

  useEffect(() => {
    getAll()
      .then((res) => setUsers(res))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function fetchData() {
    getAll(`sort=${sort.sort}&limit=${sort.limit}`)
      .then((res) => {
        alert.info("List was updated.");
        setUsers(res);
      })
      .catch((err) => alert.error(err));
  }

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
      <div className="col-12 mb-3 row">
        <div className="col-3">
          <label htmlFor="sort">Sort by</label>
          <select className="form-control" id="sort" onChange={(e) => setSort((p) => ({ ...p, sort: e.target.value.toLowerCase() }))}>
            <option>Username</option>
            <option>Email</option>
            <option>Role</option>
            <option value="created_at">Created date</option>
            <option>None</option>
          </select>
        </div>

        <div className="col-3">
          <label htmlFor="order">Order</label>
          <select
            className="form-control"
            id="order"
            onChange={(e) => setSort((p) => ({ ...p, sort: e.target.value === "A-Z" ? p.sort : `-${p.sort}` }))}
          >
            <option>A-Z</option>
            <option>Z-A</option>
          </select>
        </div>

        <div className="col-3">
          <label htmlFor="limit">Limit</label>
          <input type="number" className="form-control" onChange={(e) => setSort((p) => ({ ...p, limit: +e.target.value }))} />
        </div>

        <button className="btn btn-primary mt-auto" onClick={() => fetchData()}>
          Fetch data
        </button>
      </div>

      <div className="col-12 mb-3">
        {users.length === 0 && <p>There is no any user yet.</p>}
        {users.length !== 0 && users.map((user, i) => <Small key={i} removeUser={removeUser} user={user} />)}
      </div>
    </div>
  );
}
