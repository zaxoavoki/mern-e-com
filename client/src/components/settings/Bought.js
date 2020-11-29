import React, { useState, useEffect, useContext } from "react";
import { bought } from "../../api/products";
import { AuthContext } from "../../contexts/AuthContext";

import Small from "../products/Small";

export default function Bought() {
  const { token } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    bought(token)
      .then((res) => {
        setProducts(res);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="row">
      <div className="col-12 mb-3">
        {products.length === 0 && <p>You did not buy any product yet.</p>}
        {products.length !== 0 && products.map((product, i) => <Small key={i} product={product} links={true} />)}
      </div>
    </div>
  );
}
