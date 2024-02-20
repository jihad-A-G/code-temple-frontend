import { Link } from "react-router-dom"
const Navbar = () =>{

    return(
        <>
       <nav className="w-full flex fixed top-0 z-30 justify-between items-center mx-auto px-8 h-20 border-b-.8 border-b-nav bg-nav backdrop-blur-sm">
  {/* logo */}
  <div className="flex items-center gap-10">
  <Link to="/">
    <div className="text-white font-semibold md:text-2xl text-lg tracking-tighter mx-auto flex items-center gap-2">
      <div>
      <svg fill="#fff" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0  0  32  32" xml:space="preserve" width="24px" height="24px" stroke="#fff">
  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
  <g id="SVGRepo_iconCarrier">
    <path id="systems-devops--code_1_" d="M15.819,30.311l-12-7C3.708,23.246,3.64,23.128,3.64,23V9h0.72v13.793l11.821,6.896 L15.819,30.311z M8.36,16H7.64V6h0.72V16z M28.36,15h-0.72V9.207L16,2.417l-3.64,2.116L12.352,13h-0.72l0.008-8.675 c0-0.128,0.068-0.247,0.179-0.311l4-2.325c0.112-0.065,0.251-0.065,0.362,0l12,7C28.292,8.753,28.36,8.872,28.36,9V15z M30.509,22 l-4.254-4.255l-0.51,0.51L29.491,22l-3.746,3.745l0.51,0.51L30.509,22z M21.255,25.745L17.509,22l3.746-3.745l-0.51-0.51L16.491,22 l4.254,4.255L21.255,25.745z"></path>
  </g>
</svg>

      </div>
      Code Temple
    </div>
  </Link>
  {/* end logo */}
  {/* community link */}
  <Link to={'community'}>
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
            className="inline-flex items-center relative px-2 border rounded-full hover:shadow-lg"
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
          </button>
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