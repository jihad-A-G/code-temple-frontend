import { useLoaderData,useFetcher,Form,Link, useParams, useSubmit } from "react-router-dom"
import { useEffect,useState } from "react";
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai'
import logo from '../assets/svgs/logo.svg'
import {  useDispatch, useSelector } from "react-redux";
import { toast} from 'react-toastify';
import { instance } from "../main";
import { jwtDecode } from "jwt-decode";
import { storePosts } from "../redux/developerSlice";
const PostDetails = () =>{
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const data = useLoaderData()
    const fetcher = useFetcher()
    const dispatch = useDispatch()
    const submit = useSubmit()
    const developer = useSelector((state)=>state.developer)
    const [showOptions, setShowOptions] = useState(false)
    const [commentToSend,setCommentToSend] = useState('')
    const [isEditing,setISEditing] = useState(false)
    const [idToEdit,setIdToEdit] = useState(null)


    console.log(developer);
    
    const date = new Date(data.post.createdAt)
    const createDay = date.getDate()
    const createMonth = monthNames[date.getMonth()]
    const length = data.post.versions.length

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showOptions && !event.target.closest('.comment-container') && !event.target.matches('.comment-container')) {
                setShowOptions(false);
            }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showOptions]);

    const handleUpVote = async(commentId) =>{
        try {
            await instance.post(`/comments/upvote/${commentId}`)
        } catch (err) {
            console.log(err);
        }
    }

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
                theme: "colored",
              });
           }
        } catch (err) {
            console.log(err);
        }
    }


    return(
        <>
        <div className="bg-main w-full px-[108px] pt-10 pb-16 flex flex-col items-center lg:items-start relative overflow-auto">
            <h1 className="text-3xl font-bold mt-6 break-words">{data.post.developerId.username}</h1>
            <div className="flex items-center justify-between my-4 w-full">
            <div className="flex items-center text-[#a8b3cf] !text-[15px] !leading-[20px]">
            <time dateTime="2024-02-21T17:26:56.453Z">{`${createMonth} ${createDay}`}</time>
            <span className="mx-1">•</span>
            <span data-testid="readTime">{Math.ceil((data.post.description.length/250))}m read time</span>
            </div>
            <Link to={`/community/requests/${data.post._id}`} class="btn-default overflow-hidden relative bg-sandyBrown no-underline text-white py-3 px-5 rounded-xl  ">
                <span class="relative">View Requests</span>
            </Link>
            </div>
            <div className="mb-6 text-[#cfd6e6] border-l border-[#F0A04B] pl-4"><p className="select-text break-words text-[17px] leading-[22px]">{data.post.description}</p></div>
            <div className="w-full ">
            <AceEditor
                mode="javascript"
                theme="monokai"
                 name="code"
                editorProps={{ $blockScrolling: true }}
                readOnly={true}
                style={{ width: '100%', height: '400px' ,borderRadius:'10px',marginBottom:'16px', marginTop:'4px', padding:'0 5px', overflow:'auto'}}
                value={data.post.versions[length-1].code}
              />
             </div>
               {/* action bar */}
             <div className="flex w-full items-center rounded-16 border border-[#a8b3cf33]">
                <div className="flex flex-1 items-center justify-between px-4 py-2">
                <div className=" flex flex-row items-center select-none">
                    <button aria-label="Comment" id="comment-post-btn" aria-pressed="false" className="btn shadow-none focus-outline inline-flex cursor-pointer select-none flex-row items-center justify-center font-bold no-underline transition duration-200 ease-in-out text-base h-10 w-10 p-0 rounded-12">
                        <svg width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 pointer-events-none"><path d="M8.084 3.217a35.447 35.447 0 017.05-.078l.782.078.279.031c1.089.121 1.885.372 2.606.828a4.516 4.516 0 011.664 1.86c.336.69.5 1.423.53 2.361l.005.321v3.975a4.493 4.493 0 01-3.545 4.392l-.207.04-2.089.346-2.86 2.992-.147.135c-.986.789-2.399.623-3.205-.324-.532-.625-.616-1.34-.51-2.29l.029-.224.038-.254.033-.187-1.332-.189a5.011 5.011 0 01-1.677-.55l-.253-.146-.243-.16a4.777 4.777 0 01-1.491-1.721 4.935 4.935 0 01-.532-1.972l-.009-.3V8.618c0-1.096.162-1.915.535-2.683.375-.77.94-1.4 1.664-1.859.649-.41 1.359-.655 2.288-.788l.318-.04.28-.031zm7.666 1.491a33.948 33.948 0 00-6.752-.075l-.748.075-.28.031c-.915.102-1.481.297-1.97.606a3.016 3.016 0 00-1.116 1.247c-.228.468-.357.989-.38 1.76l-.004.266v3.563c0 .577.134 1.116.375 1.587.242.471.592.874 1.024 1.18.37.263.801.453 1.276.554l.242.043 1.98.283c.339.048.457.096.575.175.119.078.262.187.27.386l-.002.024-.013.08-.164.741-.064.333c-.111.63-.167 1.332.09 1.634.263.309.7.39 1.037.187l.089-.062 2.998-3.135.13-.101.092-.063.077-.04.08-.03.035-.01.087-.02L17 15.545a2.993 2.993 0 002.495-2.77l.005-.182V8.618c0-.921-.13-1.506-.384-2.026A3.016 3.016 0 0018 5.345c-.44-.278-.943-.464-1.706-.572l-.265-.034-.279-.03zm-.55 6.294l.093.005c.398.044.707.36.707.746 0 .38-.301.693-.691.743l-.109.007H8.8l-.093-.005c-.398-.044-.707-.36-.707-.745 0-.38.301-.694.691-.744l.109-.007h6.4zm0-3.5l.093.004c.398.044.707.36.707.746 0 .38-.301.693-.691.743l-.109.007H8.8l-.093-.005C8.309 8.953 8 8.637 8 8.252c0-.38.301-.694.691-.744l.109-.007h6.4z" fill="currentcolor" fillRule="evenodd"></path></svg></button>
                    <label htmlFor="comment-post-btn" className="cursor-pointer items-center font-bold text-base hidden md:flex">Comment</label>
                    </div>
                    <Link to={`/community/update-request/${data.post._id}`}>
                    <div className=" flex flex-row items-center select-none">
                    <button aria-label="Comment" id="comment-post-btn" aria-pressed="false" className="btn shadow-none focus-outline inline-flex cursor-pointer select-none flex-row items-center justify-center font-bold no-underline transition duration-200 ease-in-out text-base h-10 w-10 p-0 rounded-12">
                    <svg width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 pointer-events-none"><path d="M9.456 4.216l-5.985 7.851c-.456.637-.583 1.402-.371 2.108l.052.155a2.384 2.384 0 002.916 1.443l2.876-.864.578 4.042a2.384 2.384 0 002.36 2.047h.234l.161-.006a2.384 2.384 0 002.2-2.041l.576-4.042 2.877.864a2.384 2.384 0 002.625-3.668L14.63 4.33a3.268 3.268 0 00-5.174-.115zm3.57.613c.16.114.298.253.411.411l5.897 7.736a.884.884 0 01-.973 1.36l-3.563-1.069a.884.884 0 00-1.129.722l-.678 4.75a.884.884 0 01-.875.759h-.234a.884.884 0 01-.875-.76l-.679-4.75a.884.884 0 00-1.128-.72l-3.563 1.068a.884.884 0 01-.973-1.36L10.56 5.24a1.767 1.767 0 012.465-.41z" fill="currentcolor" fillRule="evenodd"></path></svg>
                    </button>
                    <label htmlFor="comment-post-btn" className="cursor-pointer items-center font-bold text-base hidden md:flex">Update request</label>
                    </div>
                    </Link>
                    <div onClick={()=>handleSavePost(data.post._id)} className=" flex flex-row items-center select-none">
                    <button type="button" id="comment-post-btn" aria-pressed="false" className="btn shadow-none focus-outline inline-flex cursor-pointer select-none flex-row items-center justify-center font-bold no-underline transition duration-200 ease-in-out text-base h-10 w-10 p-0 rounded-12">                
                    <svg width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 pointer-events-none"><path d="M15.874 3H8.126a3.357 3.357 0 00-3.35 3.152l-.772 12.77c-.028.459.106.915.38 1.286l.101.125c.666.764 1.818.9 2.647.287L12 17.023l4.868 3.597a1.964 1.964 0 003.128-1.7l-.771-12.767A3.358 3.358 0 0015.874 3zm0 1.5c.981 0 1.794.764 1.854 1.744l.771 12.768a.464.464 0 01-.74.402l-5.207-3.848a.929.929 0 00-1.104 0L6.24 19.414a.464.464 0 01-.74-.402l.773-12.768c.06-.98.872-1.744 1.853-1.744h7.748z" fill={`${developer.savedPost?.includes(data.post._id)? '#F0A04B':'white'}`} fillRule="evenodd"></path></svg>
                    </button>
                    <label htmlFor="comment-post-btn" className={`cursor-pointer items-center font-bold text-base hidden md:flex ${developer.savedPost?.includes(data.post._id)? 'text-[#F0A04B]':'text-white'}`}>Save</label>
                    </div>
                </div>
             </div>
             {/* Comment */}
             <fetcher.Form method={`${isEditing?'PUT':'POST'}`} action={`${isEditing?`/community/post/comment/update/${data.post._id}`:''}`} className="my-4 w-full">
                <div className="relative bg-secondary flex flex-col rounded-16 ">
                    <div className="flex flex-col !min-h-[15rem]">
                       
                        <span className="flex w-full flex-row">
                            <img src={logo} alt="" className="object-cover w-10 h-10 rounded-[12px] ml-3 mt-3" />
                            <span className="relative flex flex-1">
                                <input type="hidden" name="commentId" value={idToEdit} />
                                <textarea onChange={(e)=>setCommentToSend(e.target.value)} value={commentToSend} rows="7" placeholder="Share your thoughts" name="content" className="flex max-h-[290px] flex-1 bg-transparent outline-none text-[17px] leading-[22px]  m-3">
                                </textarea>
                                {/* <input type="hidden" name="postId" value={data._id} /> */}
                                </span>
                        </span>
                        <span className="flex flex-row items-center justify-end border-t border-[#a8b3cf33] p-3 px-4 text-[#a8b3cf]">
                        <button onClick={(e)=>{
                            e.preventDefault()
                            setCommentToSend('')
                            submit(e.target.form)
                        }} type="submit"  className="bg-sandyBrown shadow-none focus-outline inline-flex cursor-pointer select-none flex-row items-center justify-center font-bold no-underline transition duration-200 ease-in-out text-white text-base h-10 px-5 rounded-[12px] ml-auto" disabled="">
                            Comment
                            </button>
                        </span>
                    </div>
                </div>
             </fetcher.Form>
            <div className="mb-12 flex flex-col gap-4 w-full">
                {data.comments?data.comments.map(c=>{
               return <section key={c._id} className="flex scroll-mt-16 flex-col items-stretch rounded-[24px] border border-[#a8b3cf33]">
                    <article className="flex flex-col rounded-[24px] p-4 hover:bg-theme-hover focus:outline border-[#a8b3cf33] border-b">
                        <header className="z-1 flex flex-row self-start">
                            <Link className='flex items-center no-underline'>
                                <img src={logo} alt="" className="object-cover w-10 h-10 rounded-[12px]" />
                            </Link>
                            <div className="ml-3 flex flex-col text-base">
                                <span className="flex flex-row">
                                    <Link className="w-fit overflow-hidden whitespace-nowrap font-bold text-white text-base flex items-center no-underline">{c.developerId.username}</Link>
                                </span>
                                <span className="items-center text-[#a8b3cfa3] flex flex-row">
                                <time dateTime="2024-02-16T16:53:12.159Z" className="typo-callout">Feb 16</time>
                                </span>
                            </div>
                        </header>
                        <div className="break-words-overflow z-1 mt-3 text-[17px] leading-[22px] relative">
                            <div className="realtive break-words">
                                <p>{c.content}</p>
                            </div>
                            <div className="flex flex-row items-center pointer-events-auto mt-3">
                               <button type="button" onClick={()=>handleUpVote(c._id)}  className="btn shadow-none focus-outline inline-flex cursor-pointer select-none flex-row items-center justify-center font-bold no-underline transition duration-200 ease-in-out text-base h-8 w-8 p-0 rounded-10 mr-3 hover:fill-[#F0A04B]">
                                <svg width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 pointer-events-none hover:fill-[#F0A04B]"><path d="M9.456 4.216l-5.985 7.851c-.456.637-.583 1.402-.371 2.108l.052.155a2.384 2.384 0 002.916 1.443l2.876-.864.578 4.042a2.384 2.384 0 002.36 2.047h.234l.161-.006a2.384 2.384 0 002.2-2.041l.576-4.042 2.877.864a2.384 2.384 0 002.625-3.668L14.63 4.33a3.268 3.268 0 00-5.174-.115zm3.57.613c.16.114.298.253.411.411l5.897 7.736a.884.884 0 01-.973 1.36l-3.563-1.069a.884.884 0 00-1.129.722l-.678 4.75a.884.884 0 01-.875.759h-.234a.884.884 0 01-.875-.76l-.679-4.75a.884.884 0 00-1.128-.72l-3.563 1.068a.884.884 0 01-.973-1.36L10.56 5.24a1.767 1.767 0 012.465-.41z" fill="#a8b3cf" fillRule="evenodd"></path></svg>
                                </button>
                                {c.developerId._id == developer._id &&  <button onClick={()=>setShowOptions(c._id)} aria-label="Options" className="btn shadow-none focus-outline inline-flex cursor-pointer select-none flex-row items-center justify-center font-bold no-underline transition duration-200 ease-in-out typo-callout iconOnly h-8 w-8 p-0 rounded-10 btn-tertiary my-auto">
                                    <svg width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 pointer-events-none "><path d="M12 17a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0-6.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM12 4a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" fill="#a8b3cf" fillRule="evenodd"></path></svg>
                                    </button>}
                                    <button className="flex cursor-pointer flex-row items-center text-[#a8b3cf] hover:underline focus:underline text-base ml-auto">{c.upVote} upvote</button> 
                                    {showOptions == c._id &&(
                      <div className="comment-container absolute left-20  mt-2 w-48 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg">
                        <div className="py-1">
                         {c.developerId._id == developer._id? <button onClick={(e)=>{
                          setISEditing(true)
                          setCommentToSend(c.content)
                          setIdToEdit(c._id)
                        }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left" role="menuitem">Edit</button>:null}
                         {c.developerId._id == developer._id? <fetcher.Form method='DELETE' action={`/community/post/comment/delete`}><input type="hidden" name="commentId"  defaultValue={c._id}/><button type="submit" className=" text-start w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600">Delete</button></fetcher.Form>:null}
                        </div>
                      </div>
                    )}
                            </div>
                        </div>
                    </article>
                </section>
                }): <h1>No Comments</h1>}
            </div>
        </div>
        
        </>
    )
}

export default PostDetails