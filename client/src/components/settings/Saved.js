import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { saved as getSaved, saveOrUnsave } from "../../api/products";
import Small from "../products/Small";
import { useAlert } from "react-alert";

export default function Saved() {
  const { token } = useContext(AuthContext);
  const [saved, setSaved] = useState([]);
  const alert = useAlert();

  useEffect(() => {
    getSaved(token)
      .then((res) => setSaved(res))
      .catch(() => {});
  }, []);

  function deleteFromSaved(id) {
    saveOrUnsave(id, token)
      .then((res) => {
        if (!res) {
          alert.success("Product was deleted from saved.");
          setSaved((prev) => prev.filter((e) => e._id != id));
        }
      })
      .catch(() => {});
  }

  return (
    <div className="row">
      <div className="col-12 mb-3">
        {saved.length === 0 && <p>There is no any saved product yet.</p>}
        {saved.length !== 0 && saved.map((product, i) => <Small key={i} deleteFromSaved={deleteFromSaved} product={product} />)}
      </div>
    </div>
  );
}
