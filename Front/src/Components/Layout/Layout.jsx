import { Outlet } from "react-router-dom"
import { Header } from "../Header/Header";
import { NavBar } from "../NavBar/NavBar";
import { Footer } from "../Footer/Footer";
import { AuthProvider } from "../AuthContext/AuthContext";


export default function Layout() {
  return (
    <AuthProvider>
      <Header/>
      <NavBar/>
      <Outlet/>  
      <Footer/>
    </AuthProvider>
  )
}