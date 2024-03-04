import Navbar from "../components/navbar.jsx"
import { Outlet } from "react-router-dom"
import SideBar from "../components/sideBar.jsx"
import { storeDeveloper } from "../redux/developerSlice.js"
import {  useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { jwtDecode } from "jwt-decode"
import { storePosts } from "../redux/developerSlice.js"
import socket from "../config/socketIo.js"
const Layout = () =>{

    const dispatch = useDispatch()
    const developer = useSelector((state)=>state.developer)
    console.log(developer);

    useEffect(()=>{
        const fetchDeveloper = () =>{
            const token = localStorage.getItem('token')
            dispatch(storeDeveloper(jwtDecode(token).developer))
            dispatch(storePosts(jwtDecode(token).developer.savedPost))
        }
        fetchDeveloper()
       
    },[])

    return(
        <>
        <div className="w-svh h-svh bg-main text-white box-border">
            <header>
        <Navbar isVerified={developer.isVerified}/>
            </header>
            <main className="pt-20 bg-main container-lg w-full !h-full flex justify-start relative overflow-auto">
                <SideBar/>
                <Outlet/>
            </main>
        
        </div>
        </>
    )
}

export default Layout