import { useSelector } from "react-redux";
import Post from "../components/post";
import { useFetcher, useLoaderData, useSubmit } from "react-router-dom";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokaiSublime } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Link } from "react-router-dom";
const MyPosts = () =>{
    const data = useLoaderData()
    const fetcher = useFetcher()
    const submit = useSubmit()
    const developer = useSelector((state)=>state.developer)
    console.log(developer);

    return(
        <>
        <div className="bg-main w-full h-full !min-h-full overflow-auto px-[108px] pt-10 pb-16 flex flex-wrap justify-center lg:justify-start gap-8 relative">
        {data?
        data.posts.map(p=>{
            const length = p.versions.length
            return <article key={p._id} className="!p-2 !bg-secondary !border-1 !border-[#a8b3cf33] !rounded-[16px] !flex !flex-col !min-h-96 !max-h-96 !min-w-80 !max-w-80 !relative !leading-6">
           
              <h3 className="break-words leading-6 text-xl font-bold px-2 mt-2">{p.description.substring(0,50)}</h3>
              <div className="relative flex flex-1 flex-col">
                <div className="flex-1"></div>
                <div className="relative">
            <Link className='w-full h-full' to={`/community/post/${p._id}`}>
                <SyntaxHighlighter className="rounded-[12px] h-40 p-5 my-2 overflow-auto relative" language="javascript" wrapLongLines={true} wrapLines={true} style={monokaiSublime}>{p.versions[length-1].code}</SyntaxHighlighter>
            </Link>
                </div>
              <div className="flex flex-row items-center justify-between mt-auto px-4">
                {/* Comments */}
                  <div className="!min-w-[4.265rem] flex flex-row items-center">
                    <Link to={`/community/edit-post/${p._id}`} className="btn shadow-none focus-outline inline-flex cursor-pointer select-none flex-row items-center justify-center no-underline transition duration-200 ease-in-out typo-callout iconOnly px-3 py-1 bg-white text-black rounded-[8px]">
                        Update
                    </Link>
                  </div>
                  {/* Save */}
                  <div  className="!min-w-fit flex flex-row items-center">
                    <fetcher.Form method="DELETE">
                        <input type="hidden" name="postId" value={p._id} />
                    <button onClick={(e)=>{
                        e.preventDefault()
                        swal({
                            title: "Are you sure?",
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,
                          })
                          .then((willLogin) => {
                            if (willLogin) {
                                submit(e.target.form)
                            } 
                          });
                    }} type="submit" className="btn shadow-none focus-outline cursor-pointer select-none flex-row items-center justify-center no-underline transition duration-200 ease-in-out typo-callout iconOnly px-3 py-1 bg-red-600 rounded-[8px]">
                        Delete
                    </button>
                    </fetcher.Form>
                  </div>
              </div>
              </div>
          </article>
        })
        
        :<div className="w-full h-full flex items-center justify-center">
            <p className="text-3xl text-[#848D97] font-semibold">No posts!</p>
        </div>
            }
            </div>
        </>
    )
}

export default MyPosts