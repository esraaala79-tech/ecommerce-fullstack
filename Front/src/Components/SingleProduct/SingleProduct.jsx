import { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import axios from "axios";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [count, setCount] = useState(1);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setMainImage(res.data.image); 
      })
      .catch(err => console.error(err));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const images = product.images && product.images.length ? product.images : [product.image];

  return (
    <div className="container my-5">
      <nav>
        <small className="text-muted">
          Home / Products / <strong className="text-dark">{product.name}</strong>
        </small>
      </nav>

      <div className="row mt-4 g-4">
        <div className="col-md-6 d-flex gap-3">
          <div className="d-flex flex-column gap-2">
            {images.map((img, i) => (
              <img
                key={i}
                src={`http://localhost:8000/images/${img}`}
                alt={product.name}
                className="img-thumbnail"
                width="70"
                height="70"
                style={{ cursor: "pointer", objectFit: "cover" }}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>

          <div className="flex-grow-1 d-flex justify-content-center align-items-center bg-light rounded" style={{ height: "400px" }}>
            <img 
              src={`http://localhost:8000/images/${mainImage}`} 
              alt={product.name} 
              style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} 
            />
          </div>
        </div>

        <div className="col-md-6">
          <h3>{product.name}</h3>

          <div className="mb-2 d-flex align-items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <i
                key={i}
                className={`bi ${i < Math.round(product.rating || 0) ? "bi-star-fill" : "bi-star"} text-warning`}
              ></i>
            ))}
            <small className="text-muted ms-2">({product.reviews || 0} Reviews)</small> |{" "}
            <span className={`ms-1 ${product.stock > 0 ? "text-success" : "text-danger"}`}>
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <div className="d-flex align-items-baseline gap-2">
            <h4 className="text-danger">${product.price}</h4>
            {product.oldPrice && (
              <span className="text-muted text-decoration-line-through">${product.oldPrice}</span>
            )}
            {product.discount && (
              <span className="ms-2 text-danger">-{product.discount}%</span>
            )}
          </div>

          <p className="text-muted mt-3">{product.description}</p>

          <div className="d-flex align-items-center gap-3 mb-4">
            <div className="input-group w-auto">
              <button onClick={() => setCount(Math.max(1, count - 1))} className="btn btn-outline-secondary">-</button>
              <input type="text" className="form-control text-center" value={count} readOnly style={{ width: "50px" }} />
              <button onClick={() => setCount(count + 1)} className="btn btn-outline-secondary">+</button>
            </div>
            <button className="btn btn-danger btn-lg px-4" onClick={() => console.log("Buy", count)}>Buy Now</button>
            <button className="btn btn-outline-secondary">
              <i className="bi bi-heart"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;