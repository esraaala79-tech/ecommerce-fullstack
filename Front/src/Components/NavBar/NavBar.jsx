import { Link } from "react-router-dom";
import logo from "../images/Logo (2).png";
import { useAuth } from "../AuthContext/AuthContext";

export const NavBar = () => {
  const { MyEmail } = useAuth(); 

  return (
    <nav className="navbar navbar-expand-lg bg-body-light border-bottom">
      <div className="container d-flex align-items-center justify-content-between position-relative">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Logo" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <ul className="navbar-nav d-flex justify-content-between w-25">
          <li className="nav-item">
            <Link to="/" className="nav-link active">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Features
            </a>
          </li>
  <li className="nav-item">
    <Link to="/allproducts" className="nav-link">
      Products
    </Link>
  </li>
          {/* <li className="nav-item">
            <Link to="/singleproduct" className="nav-link">
              SingleProduct
            </Link>
          </li> */}
          <li className="nav-item">
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
          </li>
          
       
          {!MyEmail && (
            <li className="nav-item">
              <Link to="/sign" className="nav-link">
                Sign
              </Link>
            </li>
          )}
        </ul>

        <div className="mt-2 d-flex w-25 position-relative">
          <input
            className="form-control bg-secondary-subtle p-3 w-100 border-0 border-start"
            type="search"
            placeholder="What are you looking for"
            aria-label="Search"
          />
          <button className="btn position-absolute end-0 me-3" type="submit">
            <i className="bi bi-search fs-3"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};