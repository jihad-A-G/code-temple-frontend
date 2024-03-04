import { useNavigate, redirect } from "react-router-dom";


 export const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token');
      console.log("the user is protected" , token)
  
       if (!token) {
        console.log('user is not protected');
        navigate('/login', { replace: true });
        return null
      }
    
   return children;
  };
