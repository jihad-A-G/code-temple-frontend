import Navbar from "../components/navbar.jsx"
import { Outlet } from "react-router-dom"
const Layout = () =>{

    return(
        <>
        <div className="w-screen h-screen bg-main text-white relative">
            <header>
        <Navbar/>
            </header>
            <main className="pt-20 container-lg relative">
                <Outlet/>
            </main>
        
        </div>
        </>
    )
}

export default Layout