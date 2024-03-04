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
import Posts from './pages/postsPage.jsx'
import PostDetails from './pages/postDetails.jsx'
import 'react-toastify/dist/ReactToastify.css';
import { toast,ToastContainer } from 'react-toastify';
import store from './redux/store.js'
import { Provider } from 'react-redux'
import {ProtectedRoute} from './util/protectedRoutes.jsx'
import UpdateRequestForm from './pages/updateRequestForm.jsx'
import addPost from './actionDataAPI/addPostAction.js'
import PostForm from './components/addPostForm.jsx'
import { jwtDecode } from 'jwt-decode'
import MyPosts from './pages/myPosts.jsx'
import EditPostForm from './pages/editPostForm.jsx'
import RequestPage from './pages/requestsPage.jsx'
import RequestView from './pages/updateRequestView.jsx'
import EditRequest from './pages/editRequest.jsx'
import Profile from './pages/profile.jsx'
import VerifyEmail from './pages/verifyEmail.jsx'
import SavedPosts from './pages/savedPosts.jsx'
import JoinRoom from './pages/rooms/joinRooms.jsx'
import AddRoom from './pages/rooms/addRoom.jsx'
import Chat from './pages/rooms/chat.jsx'
import Rooms from './pages/rooms/rooms.jsx'
import socket from './config/socketIo.js'
//Create axios istance
export const instance = axios.create({
  baseURL: 'http://localhost:5050/api',
  timeout: 7000,
  headers:{ authorization: `Bearer: ${localStorage.getItem("token")}`,}
},
);
console.log(localStorage.getItem('token'));

const router = createBrowserRouter([
  {
    path:'/login',
    element:<Login/>,
   
  },
  {
    path:'/register',
    element:<Signup/>,
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
    path:'/community',
    element:<Layout/>,
    children:[
      {
        path:'/community',
        element:<Posts/>,
        loader: async() =>{

          try {
           const response = await instance.get('/posts/')
             
            return response?.data
            
          } catch (err) {
            if( err.request.status ==  404){
            
            return null
            }
            console.log(err);
          }

        }

      },
      {
        path:'post/:id',
        element:<PostDetails/>,
        loader: async({params}) =>{
          const id = params.id
          try {
          if(!id){
            return toast.error("Post not found", {
               position: "top-right",
               autoClose: 4000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               theme: "light",
             });
            }
             const response = await instance.get(`/posts/${id}`)
              return response.data.post
            } catch (err) {
              console.log(err);
            }
        },
        action: async({request,params}) =>{
            const formData = await request.formData()
            const data = Object.fromEntries(formData)

            const response = await instance.post(`/comments/${params.id}`,{...data})

            return null
        }
      },
      {
        path:'add-post',
        element:<div className="w-full h-full flex justify-center"><PostForm/></div>,
        action: addPost
      },
      {
        path:'update-request/:id',
        element:<UpdateRequestForm/>,
        loader: async({params}) =>{
          const {id} = params
          try {
             const response = await instance.get(`/posts/${id}`)
              return response.data.post
            } catch (err) {
              console.log(err);
            }
        },
        action: async({request,params}) =>{
          const formData = await request.formData()
          const data = Object.fromEntries(formData)
          data.formData = JSON.parse(data.formData)
          console.log(data.formData);
          const response = await instance.post(`/requests/add/${params.id}`,{...data.formData})
          return redirect(`/community/post/${params.id}`)
          // return null
        }
        

      },
      {
        path:'my-posts',
        element:<MyPosts/>,
        loader: async({params}) =>{
          const response = await instance.get('/posts/myPosts')

          return response.data
        },
         action: async({request}) =>{
          const formData = await request.formData()
          const data = Object.fromEntries(formData)

          const response = await instance.delete(`/posts/${data.postId}`)

          return null
         }
      },
      {
        path:'edit-post/:id',
        element:<div className="w-full h-full flex justify-center"><EditPostForm/></div>,
        loader: async({params}) =>{
          const response = await instance.get(`/posts/${params.id}`)
          return response.data.post
        },
        action: async({request,params}) =>{
          const formData = await request.formData()
          const data = Object.fromEntries(formData)
          data.formData = JSON.parse(data.formData)

          const response = await instance.put(`/posts/${params.id}`,{...data.formData})

          return redirect(`/community/post/${params.id}`)
        }
      },
      {
        path:'requests/:id',
        element:<RequestPage/>,
        loader: async({params}) =>{
          const response = await instance.get(`/requests/${params.id}`)
          console.log(response.data);
          return response.data
        },
        
        
      },
      {
        path:'requests/delete',
        action: async({request}) =>{
          const formData = await request.formData()
          const data = Object.fromEntries(formData)
          console.log(data.requestId);
          const response = await instance.delete(`/requests/${data.requestId}`)

          return null
         }

      },
      {
        path:'requests/id/:id',
        element:<RequestView/>,
        loader: async({params}) =>{
          const response = await instance.get(`/requests/id/${params.id}`)
          return response.data
        },
        action: async({request, params}) =>{
          const formData = await request.formData()
          const data = Object.fromEntries(formData)
          const response = await instance.post(`/requests/approve/${params.id}`)
          return redirect(`/community/post/${data.postId}`)
        }
      },
      {
        path:'requests/edit-request/:id',
        element:<EditRequest/>,
        loader: async({params}) =>{
          const response = await instance.get(`/requests/id/${params.id}`)
          return response.data
        },
        action: async({request,params}) =>{
          const formData = await request.formData()
          const data = Object.fromEntries(formData)
          data.formData = JSON.parse(data.formData)
          console.log(data.formData);
          const response = await instance.put(`/requests/${params.id}`,{...data.formData})
          return redirect(`/community/requests/${data.formData.postId}`)
          // return null
        }
      },
      {
        path:'profile/:id',
        element:<Profile/>,
        loader: async({params}) =>{
          const response = await instance.get(`/auth/profile/${params.id}`)
          return response.data
        },
        action: async({request,params}) =>{
          const formData = await request.formData()
          const data = Object.fromEntries(formData)
          console.log(data.image);
          const response = await instance.put(`/auth/${params.id}`,{...data})
          return null
        }

      },
      {
        path:'saved',
        element:<SavedPosts/>,
        loader: async() =>{
          const response = await instance.get('/posts/saved')
          return response.data
        }
      },
      {
        path:'room/join',
        element:<JoinRoom/>,
        action: async({request}) =>{
          const formData = await request.formData()
          const data = Object.fromEntries(formData)

          const response = await instance.post('/rooms/join',{...data})
          socket.emit('joinRoom',response.data.room._id)
          // console.log(response.data);
          return redirect(`/community/rooms/chat/${response.data.room._id}`)

        }
      },
      {
        path:'room/add',
        element:<AddRoom/>,
        action: async({request}) =>{
          const formData = await request.formData()
          const data = Object.fromEntries(formData)

          const response = await instance.post('/rooms/add',{...data})
          socket.emit('joinRoom',response.data.room._id)

          return redirect(`/community/rooms/chat/${response.data.room._id}`)
        }
      },
      {
        path:'rooms',
        element:<Rooms/>,
        loader: async() =>{
          const response = await instance.get('/rooms')

          return response.data
        },
        children:[
          {
            path:'chat/:id',
            element:<Chat/>,
            loader:async({params}) =>{
              const response = await instance.get(`/rooms/${params.id}`)
          socket.emit('joinRoom',response.data.room._id)
              return response.data
            },
            action: async({request,params}) =>{
              const formData = await request.formData()
              const data = Object.fromEntries(formData)
    
              const response = await instance.post(`/messages/${params.id}`,{...data})
    
              return null
            }
          },
          {
            path:'chat/message/delete',
            action: async({request}) =>{
              const formData = await request.formData()
              const data = Object.fromEntries(formData)
              console.log(data.requestId);
              const response = await instance.delete(`/messages/${data.messageId}`)
    
              return redirect(`/community/rooms/chat/${response.data.message.roomId}`)
             }
    
          },
          {
            path:'chat/edit-message',
            action: async({request, params}) =>{
              const formData = await request.formData()
              const data = Object.fromEntries(formData)
              const response = await instance.put(`/messages/${data.messageId}`,{...data})
              return redirect(`/community/rooms/chat/${response.data.message.roomId}`)
            }
          }
          
        ]

      },
      
    ]
  },
  {
    path:'/verify-email',
    element:<VerifyEmail/>
  },
  {
    path:'/chat/ai',
    element:<AIChatbot/>,
    action: addPost
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <ToastContainer/>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
