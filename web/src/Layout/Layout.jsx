import Footer from "../comman/Footer/Footer"
import Header from "../comman/Header"
import { Outlet } from "react-router-dom"


const Layout = () => {
  return (
    <div className="layout">
        <Header/>
        <Outlet />
        <Footer/>
    </div>
  )
}

export default Layout