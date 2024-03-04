import { Link, redirect,Navigate } from "react-router-dom"
import logo from '../assets/svgs/logo.svg'
import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
const Navbar = ({isVerified}) =>{
  const [showLogin, setShowLogin] = useState(false)
  const [shouldRedirect,setShouldRedirect] = useState(false)
  const developer = useSelector(state=>state.developer)
  console.log(isVerified);

  console.log(developer);

  
  useEffect(() => {
    const handleClickOutside = (event) => {
        if (showLogin && !event.target.closest('.login-dropdown') && !event.target.matches('.login-dropdown')) {
            setShowLogin(false);
        }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
}, [showLogin]);
const logout = () => {
  console.log("Logging out...");

  localStorage.removeItem('token');

   setShouldRedirect(true)
};


if (shouldRedirect) {
  return <Navigate to="/login" replace={true}/>;
}
    return(
        <>
       <nav className="w-full flex fixed top-0 z-50 justify-between items-center mx-auto px-8 h-20 border-b-.8 border-b-nav bg-[rgb(1,4,9,.7)] backdrop-blur-sm">
  {/* logo */}
  <div className="flex items-center gap-10">
  <Link to="/community">
    <div className="text-white font-semibold md:text-2xl text-lg tracking-tighter mx-auto flex items-center gap-2">
      <div>
<img src={logo} width={24} height={24} alt="" />

      </div>
      Code Temple
    </div>
  </Link>
  {/* end logo */}
  {/* community link */}
  <Link to={'/community'}>
    community
  </Link>
  </div>
  {/* login */}
  <div className="flex-initial">
 <div className="flex justify-end items-center relative">
    <div className="block">
      <div className="inline relative">
        <button
          type="button"
          className="inline-flex items-center relative px-2 border rounded-full hover:shadow-lg bg-#F0A04B" // Apply the background color here
          onClick={()=>setShowLogin(true)}
        >
          <div className="pl-1">
            <svg
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="presentation"
              focusable="false"
              style={{
                display: "block",
                fill: "none",
                height: 16,
                width: 16,
                stroke: "currentcolor",
                strokeWidth: 3,
                overflow: "visible"
              }}
            >
              <g fill="none" fillRule="nonzero">
                <path d="m2 16h28" />
                <path d="m2 24h28" />
                <path d="m2 8h28" />
              </g>
            </svg>
          </div>
          <div className="block flex-grow-0 flex-shrink-0 h-10 w-12 pl-5">
            <svg
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="presentation"
              focusable="false"
              style={{
                display: "block",
                height: "100%",
                width: "100%",
                fill: "currentcolor"
              }}
            >
              <path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z" />
            </svg>
          </div>
          {(!isVerified)&&<div className="absolute top-[-11px] right-[-7px] mt-2 mr-2 w-3 h-3 rounded-full bg-sandyBrown"></div>}
        </button>
        {showLogin && (
          <div className="absolute login-dropdown right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              <Link to={`/community/profile/${developer._id}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Profile</Link>
              {developer._id ? (
                <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Logout</button>
              ) : (
                <Link to="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Login</Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
 </div>
</div>
  {/* end login */}
</nav>

        
        </>
    )
}

export default Navbar