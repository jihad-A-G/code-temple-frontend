import { useSelector } from "react-redux";
import Post from "../components/post";
import { useLoaderData } from "react-router-dom";
const Posts = () =>{
    const data = useLoaderData()
    console.log(data);
    const developer = useSelector((state)=>state.developer)
    console.log(developer);
    return(
        <>
        <div className="bg-main w-full h-full !min-h-full overflow-auto px-[108px] pt-10 pb-16 flex flex-wrap justify-center lg:justify-start gap-8 relative">
        {data?
        data.posts.map(p=>{
            return <Post key={p._doc._id} post={p}/>
        })
        
        :<div className="w-full h-full flex items-center justify-center">
            <p className="text-3xl text-[#848D97] font-semibold">No posts!</p>
        </div>
            }
            </div>
        </>
    )
}

export default Posts