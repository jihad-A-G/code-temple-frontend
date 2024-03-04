import { Link } from "react-router-dom"
import ai from '../assets/svgs/ai.svg'
import post from '../assets/svgs/post.svg'
import chat from '../assets/svgs/chat.svg'
import add from  '../assets/svgs/addPost.svg'
import request from '../assets/svgs/request.svg'
import community from '../assets/svgs/community.svg'
import save from '../assets/svgs/save.svg'
import { useEffect, useState } from "react"
import { instance } from "../main"
const SideBar = () =>{


  
    return(
    <>
        <section className="hidden md:block p-4 !min-h-full h-full w-60 bg-secondary">
            <ul className="flex flex-col h-full ">
                <div className="px-2 mt-4">
                <p className=" text-xs font-bold">AI</p>
                <li><Link className="py-1.5 flex gap-2" to={'/chat/ai'}><img className="text-sideBarLinks" src={ai} width={20} height={20} alt=""  /> <span>AI Chatbot</span></Link></li>
                </div>
                <div className="px-2 mt-4">
                <p className=" text-xs font-bold ">Discover</p>
                <li><Link className=" py-1.5 flex gap-2" to={'/community'}><img className="text-sideBarLinks" src={community} width={20} height={20} alt=""  /> <span>Community</span></Link></li>
                </div>
                <div className="px-2 mt-4">
                <p className=" text-xs font-bold ">Rooms</p>
                <li><Link className=" py-1.5 flex gap-2" to={'/community/room/join'}><img src={chat} width={20} height={20} alt=""  /> <span>join room</span></Link></li>
                <li><Link className=" py-1.5 flex gap-2" to={'/community/room/add'}><img src={add} width={20} height={20} alt=""  /> <span>Create room</span></Link></li>
                <li><Link className=" py-1.5 flex gap-2" to={'/community/rooms'}><img src={chat} width={20} height={20} alt=""  /> <span>Open rooms</span></Link></li>

               
                   </div> 
              
                <div className="px-2 mt-4">
                <p className=" text-xs font-bold ">Posts</p>
                <li><Link className=" py-1.5 flex gap-2" to={'my-posts'}><img src={post} width={20} height={20} alt="" /> <span>My posts</span></Link></li>
                <li><Link className=" py-1.5 flex gap-2" to={'add-post'}><img src={add} width={20} height={20} alt="" /> <span>Add post</span></Link></li>
                <li><Link className=" py-1.5 flex gap-2" to={'saved'}><img src={save} width={20} height={20} alt="" /> <span>Saved posts</span></Link></li>
                </div>

            </ul>
        </section>
    </>
    )
}

export default SideBar