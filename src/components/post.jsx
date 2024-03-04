import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokaiSublime } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useDispatch,useSelector } from 'react-redux';
import { storePosts } from '../redux/developerSlice';
import { toast} from 'react-toastify';
import { Link } from 'react-router-dom';
import { instance } from '../main';
import logo from '../assets/svgs/logo.svg'
const Post = ({post}) =>{
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const date = new Date(post._doc.createdAt)
  const createDay = date.getDate()
  const createMonth = monthNames[date.getMonth()]
  const length = post._doc.versions.length
  const developer =useSelector((state)=>state.developer)
  console.log(developer);
  const dispatch = useDispatch()
  const handleSavePost = async(postId) =>{
    try {
       const response= await instance.post(`/posts/save/${postId}`)
       if(response.data.message == 'Post is saved'){
        dispatch(storePosts(response.data.savedPosts))
        toast.success("Post is saved", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
       }else{
        dispatch(storePosts(response.data.savedPosts))
        toast("Post is unsaved", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
       }
    } catch (err) {
        console.log(err);
    }
}
    return(
        
       <article className="!p-2 !bg-secondary !border-1 !border-[#a8b3cf33] !rounded-[16px] !flex !flex-col !min-h-96 !max-h-96 !min-w-80 !max-w-80 !relative !leading-6">
        <div className="flex justify-between items-center">
          <div className="relative m-2 flex flex-row gap-2">
            <div className="relative">
              <Link className='flex items-center no-underline' to={`user/${post._doc._id}`}>
                <img src={logo} alt="user-profile" className='object-cover w-10 h-10 rounded-full'/>
              </Link>
            </div>
            <div className="ml-2 mr-6 flex flex-1 flex-grow flex-col w-full">
              <span className='line-clamp-2 font-bold text-sm w-full'>{post._doc.developerId.username}</span>
              <div className="text-sm leading-[18px] text-[#a8b3cf]flex items-center break-words text-wrap w-full">
                <time dateTime='2024-02-20T13:24:50.381Z'>{`${createMonth} ${createDay}`}</time>
              </div>
            </div>
          </div>
          {/* Banner */}
          <div className="px-4 py-2 rounded-full w-fit h-fit bg-sandyBrown text-white">{post._doc.language}</div>
          </div>
          <h3 className="break-words leading-6 text-xl font-bold px-2 mt-2">{`${post._doc.description.substring(0,50)} ...`}</h3>
          <div className="relative flex flex-1 flex-col">
            <div className="flex-1"></div>
            <div className="relative">
        <Link className='w-full h-full' to={`/community/post/${post._doc._id}`}>
            <SyntaxHighlighter className="rounded-[12px] h-40 p-5 my-2 overflow-auto relative" language="javascript" wrapLongLines={true} wrapLines={true} style={monokaiSublime}>{post._doc.versions[length-1].code}</SyntaxHighlighter>
        </Link>
            </div>
          <div className="flex flex-row items-center justify-between mt-auto">
            {/* Comments */}
              <div className="!min-w-[4.265rem] flex flex-row items-center">
                <button className="btn shadow-none focus-outline inline-flex cursor-pointer select-none flex-row items-center justify-center font-bold no-underline transition duration-200 ease-in-out typo-callout iconOnly h-8 w-8 p-0 rounded-10">
                <svg width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 pointer-events-none"><path d="M8.084 3.217a35.447 35.447 0 017.05-.078l.782.078.279.031c1.089.121 1.885.372 2.606.828a4.516 4.516 0 011.664 1.86c.336.69.5 1.423.53 2.361l.005.321v3.975a4.493 4.493 0 01-3.545 4.392l-.207.04-2.089.346-2.86 2.992-.147.135c-.986.789-2.399.623-3.205-.324-.532-.625-.616-1.34-.51-2.29l.029-.224.038-.254.033-.187-1.332-.189a5.011 5.011 0 01-1.677-.55l-.253-.146-.243-.16a4.777 4.777 0 01-1.491-1.721 4.935 4.935 0 01-.532-1.972l-.009-.3V8.618c0-1.096.162-1.915.535-2.683.375-.77.94-1.4 1.664-1.859.649-.41 1.359-.655 2.288-.788l.318-.04.28-.031zm7.666 1.491a33.948 33.948 0 00-6.752-.075l-.748.075-.28.031c-.915.102-1.481.297-1.97.606a3.016 3.016 0 00-1.116 1.247c-.228.468-.357.989-.38 1.76l-.004.266v3.563c0 .577.134 1.116.375 1.587.242.471.592.874 1.024 1.18.37.263.801.453 1.276.554l.242.043 1.98.283c.339.048.457.096.575.175.119.078.262.187.27.386l-.002.024-.013.08-.164.741-.064.333c-.111.63-.167 1.332.09 1.634.263.309.7.39 1.037.187l.089-.062 2.998-3.135.13-.101.092-.063.077-.04.08-.03.035-.01.087-.02L17 15.545a2.993 2.993 0 002.495-2.77l.005-.182V8.618c0-.921-.13-1.506-.384-2.026A3.016 3.016 0 0018 5.345c-.44-.278-.943-.464-1.706-.572l-.265-.034-.279-.03zm-.55 6.294l.093.005c.398.044.707.36.707.746 0 .38-.301.693-.691.743l-.109.007H8.8l-.093-.005c-.398-.044-.707-.36-.707-.745 0-.38.301-.694.691-.744l.109-.007h6.4zm0-3.5l.093.004c.398.044.707.36.707.746 0 .38-.301.693-.691.743l-.109.007H8.8l-.093-.005C8.309 8.953 8 8.637 8 8.252c0-.38.301-.694.691-.744l.109-.007h6.4z" fill="currentcolor" fillRule="evenodd"></path></svg>
                </button>
                <span className=''>{post.comments.length??0}</span>
              </div>
              {/* Save */}
              <div onClick={()=>handleSavePost(post._doc._id)} className="!min-w-fit flex flex-row items-center">
                <button className="btn shadow-none focus-outline inline-flex cursor-pointer select-none flex-row items-center justify-center font-bold no-underline transition duration-200 ease-in-out typo-callout iconOnly h-8 w-8 p-0 rounded-10">
                <svg width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 pointer-events-none"><path d="M15.874 3H8.126a3.357 3.357 0 00-3.35 3.152l-.772 12.77c-.028.459.106.915.38 1.286l.101.125c.666.764 1.818.9 2.647.287L12 17.023l4.868 3.597a1.964 1.964 0 003.128-1.7l-.771-12.767A3.358 3.358 0 0015.874 3zm0 1.5c.981 0 1.794.764 1.854 1.744l.771 12.768a.464.464 0 01-.74.402l-5.207-3.848a.929.929 0 00-1.104 0L6.24 19.414a.464.464 0 01-.74-.402l.773-12.768c.06-.98.872-1.744 1.853-1.744h7.748z" fill={`${developer.savedPost?.includes(post._doc._id)?'#F0A04B':'white'}`} fillRule="evenodd"></path></svg>
                </button>
              </div>
          </div>
          </div>
      </article>
    )
}

export default Post