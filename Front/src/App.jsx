import { Form, Route, RouterProvider } from "react-router-dom";
import "./App.css";
// import { Header } from './Components/Header/Header';
// import { NavBar } from "./Components/NavBar/NavBar";
// import { Footer } from "./Components/Footer/Footer";
import "./Components/Styles/Global.css";

import { Router } from "./Components/Router/Router";
function App() {
  return (
    <>
      <RouterProvider router={Router} />
    </>
  );
}

export default App;
