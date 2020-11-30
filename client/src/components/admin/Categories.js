import React, { useContext, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { getAll, add, remove } from "../../api/categories";
import { AuthContext } from "../../contexts/AuthContext";
import Small from "../categories/Small";

export default function Categories() {
  const alert = useAlert();
  const { token } = useContext(AuthContext);

  const [categories, setCategories] = useState([]);
  const [data, setData] = useState({ name: "", description: "" });

  useEffect(() => {
    getAll()
      .then((res) => setCategories(res))
      .catch(() => {});
  }, []);

  function addCategory() {
    add(data, token)
      .then((res) => {
        alert.success("Category was added");
        setCategories((p) => [...p, res]);
      })
      .catch((err) => alert.error(err));
  }

  function removeCategory(id) {
    remove(id, token)
      .then(() => {
        alert.success("Category was removed.");
        setCategories((prev) => prev.filter((e) => e._id !== id));
      })
      .catch((err) => alert.error(err));
  }

  return (
    <div className="row mb-3">
      <div className="input-group mb-3">
        <input
          type="text"
          placeholder="Title"
          value={data.name}
          className="form-control"
          onChange={(e) => setData((p) => ({ ...p, name: e.target.value }))}
        />
        <input
          type="text"
          value={data.description}
          placeholder="Description"
          className="form-control"
          onChange={(e) => setData((p) => ({ ...p, description: e.target.value }))}
        />
        <div className="input-group-append">
          <button className="btn btn-outline-primary" onClick={() => addCategory()}>
            Add category
          </button>
        </div>
      </div>

      {categories.length === 0 && <p>There is no any category yet.</p>}
      <div className="card-columns">
        {categories.length !== 0 && categories.map((cat, i) => <Small key={i} removeCategory={removeCategory} category={cat} />)}
      </div>
    </div>
  );
}
