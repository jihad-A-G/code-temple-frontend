import { useLoaderData, useNavigate } from "react-router-dom"
import PostForm from "../components/addPostForm";
import { storeDeveloper } from "../redux/developerSlice.js"
import {  useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { jwtDecode } from "jwt-decode"
import { storePosts } from "../redux/developerSlice.js"
const SetToken = () =>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const developer = useSelector((state)=>state.developer)
    console.log(developer);

    const fetchDeveloper = () =>{
        const token = localStorage.getItem('token')
        dispatch(storeDeveloper(jwtDecode(token).developer))
        dispatch(storePosts(jwtDecode(token).developer.savedPost))
        navigate('/community')
    }
    useEffect(()=>{
       fetchDeveloper()
    },[])

    return(
        <>

        </>
    )
}
export default SetToken