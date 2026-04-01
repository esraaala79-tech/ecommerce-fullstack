// src/Components/AllProducts/AllProducts.jsx
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function getProducts() {
      try {
        const res = await axios.get("http://localhost:8000/api/products");
        console.log("Products from API:", res.data); 
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    }

    getProducts();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-danger" role="status"></div>
        <p className="mt-3">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="mb-5">
        <div className="d-flex align-items-center gap-3 mb-3">
          <div className="bg-danger rounded" style={{ width: "20px", height: "40px" }}></div>
          <h2 className="fw-bold text-danger mb-0">All Products</h2>
        </div>
        <h1 className="fw-bold">Explore Our Collection</h1>
      </div>

      <div className="row g-4">
        {products.map((item) => (
          <div className="col-12 col-sm-6 col-md-6 col-lg-3" key={item._id}>
            <div className="card border-0 shadow-sm h-100 position-relative">
              
              {/* Product Image */}
              <div className="position-relative bg-light" style={{ height: "200px" }}>
                <img
                  src={`http://localhost:8000/images/${item.image}`}
                  className="w-100 h-100 p-3"
                  alt={item.name}
                  style={{ objectFit: "contain", cursor: "pointer" }}
                  onClick={() => navigate(`/singleproduct/${item._id}`)}
                />

                {/* Icons */}
                <div className="position-absolute top-0 end-0 p-2 d-flex flex-column gap-2">
                  <button className="btn btn-white border rounded-circle" style={{ width: "35px", height: "35px" }}>
                    <i className="fa-regular fa-heart"></i>
                  </button>
                  <button 
                    className="btn btn-white border rounded-circle" 
                    style={{ width: "35px", height: "35px" }}
                    onClick={() => navigate(`/singleproduct/${item._id}`)}
                  >
                    <i className="fa-regular fa-eye"></i>
                  </button>
                </div>

                {item.discount && (
                  <div className="position-absolute top-0 start-0 m-2">
                    <span className="badge bg-danger rounded-pill px-3 py-2">
                      -{item.discount}%
                    </span>
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="card-body d-flex flex-column p-3">
                {/* Name */}
                <h6 
                  className="fw-bold mb-2" 
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/singleproduct/${item._id}`)}
                >
                  {item.name}
                </h6>

                {item.description && (
                  <p className="text-muted small mb-2" style={{ fontSize: "12px" }}>
                    {item.description.substring(0, 50)}...
                  </p>
                )}

                {/* Price */}
                <div className="d-flex gap-2 align-items-center mb-2">
                  <span className="text-danger fw-bold">${item.price}</span>
                  {item.oldPrice && (
                    <span className="text-muted text-decoration-line-through" style={{ fontSize: "14px" }}>
                      ${item.oldPrice}
                    </span>
                  )}
                </div>

               
                {item.rating && (
                  <div className="d-flex align-items-center gap-1 mb-2">
                    <div className="text-warning">
                      {[...Array(5)].map((_, index) => (
                        <i
                          key={index}
                          className={index < Math.floor(item.rating) ? "fas fa-star" : "far fa-star"}
                          style={{ fontSize: "12px" }}
                        ></i>
                      ))}
                    </div>
                    {item.reviews && (
                      <span className="text-muted" style={{ fontSize: "12px" }}>
                        ({item.reviews})
                      </span>
                    )}
                  </div>
                )}

              
                {item.category && (
                  <span className="badge bg-secondary mb-2" style={{ fontSize: "11px", width: "fit-content" }}>
                    {item.category}
                  </span>
                )}

               
                {item.stock !== undefined && (
                  <p className="text-muted mb-2" style={{ fontSize: "12px" }}>
                    {item.stock > 0 ? (
                      <span className="text-success">✓ In Stock ({item.stock})</span>
                    ) : (
                      <span className="text-danger">✗ Out of Stock</span>
                    )}
                  </p>
                )}

                <Link
                  to={`/singleproduct/${item._id}`}
                  className="btn btn-warning w-100 mt-auto rounded-0 fw-semibold"
                  style={{ fontSize: "14px" }}
                >
                  Show Product
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && !loading && (
        <div className="text-center py-5">
          <i className="fa-solid fa-box-open fa-4x text-muted mb-3"></i>
          <h4 className="text-muted">No products found</h4>
        </div>
      )}
    </div>
  );
};

export default AllProducts;   