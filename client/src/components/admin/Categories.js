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
      .then((res) => {
        setCategories(res);
      })
      .catch(() => {});
  }, []);

  function addCategory() {
    // TODO: Add category edit form
  }

  function editCategory(id) {
    const idx = categories.findIndex((e) => e._id === id);
    setData({
      name: categories[idx].name,
      description: categories[idx].description,
      onClick: updateCategory,
      text: "Update category",
    });
  }

  function updateCategory(id, data, token) {
    // TODO: Add form update method
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
        {categories.length !== 0 &&
          categories.map((cat, i) => <Small key={i} editCategory={editCategory} removeCategory={removeCategory} category={cat} />)}
      </div>
    </div>
  );
}
