import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter,redirect,RouterProvider } from 'react-router-dom'
import Login from './auth/login.jsx'
import Signup from './auth/signup.jsx'
import axios from 'axios'
import ForgotPassword from './auth/forgotPassword.jsx'
import SetPassword from './auth/setPassword.jsx'
import AIChatbot from './pages/AIChatbot.jsx'
import Layout from './pages/layout.jsx'

//Create axios istance
const instance = axios.create({
  baseURL: 'http://localhost:5050/api',
  timeout: 7000,
});

const router = createBrowserRouter([
  {
    path:'/login',
    element:<Login/>,
    action: async({request}) =>{
      const formData = await request.formData()
      const data = Object.fromEntries(formData)

      const response = await instance.post('auth/login',{...data})
      console.log(response);

      return redirect('/')
    }
  },
  {
    path:'/register',
    element:<Signup/>,
    action: async({request}) =>{
      const formData = await request.formData()
      const data = Object.fromEntries(formData)

      const response = await instance.post('auth/signup',{...data})


      return redirect('/')
    }
  },
  {
    path:'/forgot-password',
    element:<ForgotPassword/>,
    action: async({request}) =>{
      const formData = await request.formData()
      const data = Object.fromEntries(formData)

      const response = await instance.post('auth/resetPassword',{...data})

      return null
    }
  },
  {
    path:'/set-password/:token',
    element:<SetPassword/>,
    action: async({request ,params}) =>{
      const formData = await request.formData()
      let data = Object.fromEntries(formData)
      data = {...data, token: params.token}
     
      const response = await instance.post('auth/setNewPassword',{...data})

      console.log(response);

      return redirect('/login')

    }
  },

  {
    path:'/',
    element:<Layout/>,
    children:[
      {
        path:'',
        element:<AIChatbot/>,
      }
    ]
  },
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
