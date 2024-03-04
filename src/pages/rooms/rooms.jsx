import { Link, Outlet, useLoaderData } from "react-router-dom"
const Rooms = () =>{
 const data = useLoaderData()
 console.log(data);
    return(
        <>
        <div className="w-full h-full flex items-center overflow-auto">
            <Outlet/>
            <div className="w-48 h-full items-center gap-3 p-4">
                {data.rooms.length>0?
                data.rooms.map(r=>{
                   return <div key={r._id} className="flex items-center gap-2">
                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z" fill="#fff"></path> </g></svg>
                    <Link className="text-white text-base" to={`chat/${r._id}`}>{r.roomName}</Link></div>
                })    
           : <p className="text-white text-2xl">No rooms</p> }

            </div>
        </div>

        </>
    )
}

export default Rooms