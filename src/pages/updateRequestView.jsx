import { useLoaderData,useFetcher,Form,Link, useSubmit } from "react-router-dom"
import { useEffect,useState } from "react";
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';
import {  useDispatch, useSelector } from "react-redux";
import diff from "../util/requestDiff";
import addMarker from "../util/addMarker";
import '../assets/style.css'
const RequestView = () =>{
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const data = useLoaderData()
    const developer = useSelector((state)=>state.developer)
    const [copied,setCopied] = useState(false)
    const submit = useSubmit()
    console.log(developer);
    console.log(data.request);
    
    const date = new Date(data.request.createdAt)
    const createDay = date.getDate()
    const createMonth = monthNames[date.getMonth()]
    const length = data.request.postId.versions.length
    const newCode = diff(data.request.postId.versions[length-1].code,data.request.code)

    
    useEffect(() => {
        const editor = ace.edit("code");
        const session = editor.getSession();
    
        newCode.forEach((line, index) => {
          if (line.startsWith('+')) {
            addMarker(session, index,'lightgreen');
          } else if (line.startsWith('-')) {
            addMarker(session, index, 'lightred');
          }
        });
     }, []);
    
     const handleCopyClick = async(e) =>{
        e.preventDefault()
        try {
          await navigator.clipboard.writeText(data.request.code);
          setCopied(true);
          setTimeout(() => setCopied(false),  3000);
        } catch (err) {
          console.error('Failed to copy text: ', err);
        }        
      }

    return(
        <>
        <div className="bg-main w-full px-[108px] pt-10 pb-16 flex flex-col items-center lg:items-start relative overflow-auto">
            <h1 className="text-3xl font-bold mt-6 break-words">{data.request.developerId.username}</h1>
            <div className="flex items-center justify-between my-4 w-full">
            <div className="flex items-center text-[#a8b3cf] !text-[15px] !leading-[20px]">
            <time dateTime="2024-02-21T17:26:56.453Z">{`${createMonth} ${createDay}`}</time>
            <span className="mx-1">•</span>
            <span data-testid="readTime">{Math.ceil((data.request.description.length/250))}m read time</span>
            </div>
            </div>
            <div className="mb-6 text-[#cfd6e6] border-l border-[#F0A04B] pl-4"><p className="select-text break-words text-[17px] leading-[22px]">{data.request.description}</p></div>
            <div className="w-full ">
            <AceEditor
                mode="javascript"
                theme="monokai"
                editorProps={{ $blockScrolling: true }}
                readOnly={true}
                style={{ width: '100%', height: '400px' ,borderRadius:'10px',marginBottom:'16px', marginTop:'4px', padding:'0 5px', overflow:'auto'}}
                value={newCode.join('\n')}
                name="code"
              />
             </div>
               {/* action bar */}
             <div className="flex w-full items-center rounded-16 border border-[#a8b3cf33]">
                <div className="flex flex-1 items-center justify-between px-4 py-2">
                    {data.request.postId.developerId === developer._id &&
                <div className=" flex flex-row items-center select-none">
                    <Form method="POST">
                        <input type="hidden" name="postId" defaultValue={data.request.postId._id} />
                    <button onClick={(e)=>{
                        e.preventDefault()
                        swal({
                            title: "Are you sure?",
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,
                          })
                          .then((willApprove) => {
                            if (willApprove) {
                                submit(e.target.form)
                            } 
                          });
                    }} aria-label="Comment" id="comment-post-btn" aria-pressed="false" type="submit" className="btn shadow-none focus-outline inline-flex cursor-pointer select-none flex-row items-center justify-center font-bold no-underline transition duration-200 ease-in-out text-base h-10 w-10 p-0 rounded-12">
                       <svg fill="#FFF" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 335.765 335.765" xml:space="preserve" stroke="#FFF"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <polygon points="311.757,41.803 107.573,245.96 23.986,162.364 0,186.393 107.573,293.962 335.765,65.795 "></polygon> </g> </g> </g></svg></button>
                    </Form>
                    <label htmlFor="comment-post-btn" className="cursor-pointer items-center font-bold text-base hidden md:flex">Approve</label>
                    </div>}

                   {!copied? <div className=" flex flex-row items-center select-none">
                    <button onClick={handleCopyClick} aria-label="Comment" id="comment-post-btn" aria-pressed="false" className="btn shadow-none focus-outline inline-flex cursor-pointer select-none flex-row items-center justify-center font-bold no-underline transition duration-200 ease-in-out text-base h-10 w-10 p-0 rounded-12">
                    <svg
                              width="18px"
                              height="18px"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              stroke="fff"
                            >
                              <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                              <g id="SVGRepo_iconCarrier">
                                {" "}
                                <path
                                  fill="#fff"
                                  fillRule="evenodd"
                                  d="M4 2a2 2 0 00-2 2v9a2 2 0 002 2h2v2a2 2 0 002 2h9a2 2 0 002-2V8a2 2 0 00-2-2h-2V4a2 2 0 00-2-2H4zm9 4V4H4v9h2V8a2 2 0 012-2h5zM8 8h9v9H8V8z"
                                />{" "}
                              </g>
                            </svg> </button>
                    <label className="cursor-pointer items-center font-bold text-base hidden md:flex">Copy</label>
                    </div>:'copied'}

                </div>
             </div>
            
        </div>
        
        </>
    )
}

export default RequestView