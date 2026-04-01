import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import { Home } from "../Home/Home";
import { Sign } from "../Sign/Sign";
import Profile from "../Profile/Profile";
import Notfound from "../NotFound/Notfound";
import SingleProduct from "../SingleProduct/SingleProduct";
import AllProducts from "../AllProducts/AllProducts";

export const Router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { element: <Sign />, index: true },
      { path: "home", element: <Home /> },
      { path: "profile", element: <Profile /> },
      { path: "allproducts", element: <AllProducts /> },
      { path: "singleproduct/:id", element: <SingleProduct /> }, 
      { path: "*", element: <Notfound /> },
    ],
  },
]);