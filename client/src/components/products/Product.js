import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import { isSaved, getOne, saveOrUnsave } from "../../api/products";
import { AuthContext } from "../../contexts/AuthContext";

function Product() {
  const { user, token } = useContext(AuthContext);
  const { productId } = useParams();
  const [product, setProduct] = useState();
  const [star, setStar] = useState(false);

  useEffect(() => {
    getOne(productId)
      .then((res) => {
        setProduct(res);

        if (user) {
          // Check if product is saved
          isSaved(productId, token)
            .then((res) => setStar(res))
            .catch(() => {});
        }
      })
      .catch((err) => console.log(err));
  }, []);

  function saveProduct(id) {
    saveOrUnsave(id, token)
      .then((res) => setStar(res))
      .catch(() => {});
  }

  return (
    <>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/categories">Categories</Link>
          </li>
          <li className="breadcrumb-item active">
            <Link to={`/categories/${(product && product.category && product.category.id) || ""}`}>
              {(product && product.category && product.category.name) || "Unknown"}
            </Link>
          </li>
          <li className="breadcrumb-item active">{(product && product.title) || "Not found"}</li>
        </ol>
      </nav>
      <div>
        {!product && <p>Product was not found</p>}
        {product && (
          <div className="row">
            <div className="col-4">
              <img className="img-fluid rounded" src={product.images ? product.images[0] : product.image} alt="Image" />
              <div className="btn-group my-2 w-100">
                <button className="btn btn-primary w-100">Buy</button>
                {user && (
                  <button className={`w-25 btn btn-${!star ? "outline-" : ""}primary`} onClick={() => saveProduct(product._id)}>
                    {<FontAwesomeIcon className={star ? "text-white" : ""} icon={star ? fasStar : faStar} />}
                  </button>
                )}
              </div>
            </div>
            <div className="col-8">
              <h3>{product.title}</h3>
              <div>{product.description}</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Product;
