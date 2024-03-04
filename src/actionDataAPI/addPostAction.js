import { instance } from "../main";
import { redirect } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const addPost =async({request})=>{
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    data.formData = JSON.parse(data.formData)

    const response = await instance.post('/posts',{...data.formData})

    return redirect('/community')
  }

  export default addPost