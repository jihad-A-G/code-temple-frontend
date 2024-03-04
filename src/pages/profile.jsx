import { useSelector } from "react-redux";
import { Link, useLoaderData,Form, useSubmit, useFetcher } from "react-router-dom"
const Profile = () =>{
    const data = useLoaderData()
    const developer = useSelector((state)=>state.developer)
    const submit = useSubmit()
    const fetcher = useFetcher()
    console.log(data);
    return(
        <>
        <div className="overflow-auto h-full w-full">
        <div className="flex justify-center items-center w-full">
        <div className="p-16 overflow-auto">
  <div className="p-8 bg-main shadow mt-24">
    
    <div className="grid grid-cols-1 md:grid-cols-3">
      
      <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
        
      <div>
          
          <p className="font-bold text-white text-xl">{data.postsNumber}</p>
          <p className="text-white">Posts</p>
        </div>

        <div> 
          <p className="font-bold text-white text-xl">{data.commentsNumber}</p>
          <p className="text-white">Comments</p>
        </div>
        <div>
          
          <p className="font-bold text-white text-xl">{data.requestsNumber}</p>
          <p className="text-white">requests</p>
        </div>
      </div>
      <div className="relative">
        
        <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-24 w-24"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
        {(!data.developer.isVerified && data.developer._id == developer._id)?
        <Link to={'/verify-email'}>
        <button className="text-white h-full py-2 px-4 uppercase rounded bg-sandyBrown  shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
          
          Verify
        </button></Link>:null}
        <button className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
          
          Message
        </button>
      </div>
    </div>
    <div className="mt-20 text-center border-b pb-12">
      
      <h1 className="text-4xl font-medium text-white">
        {data.developer.username}
      </h1>
      <p className="font-light text-gray-600 mt-3">{data.developer.email}</p>
      <p className="mt-8 text-gray-500">
        Solution Manager - Creative Tim Officer
      </p>
      <p className="mt-2 text-gray-500">University of Computer Science</p>
    </div>
    <div class="mt-8">
             <fetcher.Form action="" method="PUT" class="flex flex-col items-start">
                <input type="hidden" name="password"  defaultValue={data.developer.password}/>
                <label htmlFor="username">username</label>
              <input type="text" name="username" defaultValue={data.developer.username}   class=" mt-1 py-2 px-4 bg-secondary text-white rounded-md focus:outline-none mb-4 w-full" />
              <label htmlFor="email">email</label>
              <input type="text" name="email" defaultValue={data.developer.email} class=" mt-1 py-2 px-4 bg-secondary text-white rounded-md focus:outline-none mb-4 w-full" />
              <label class="block mb-2 text-sm font-medium text-gray-900  dark:text-gray-300" htmlFor="image">Upload image</label>
<input name="image" class="block w-full text-sm text-gray-900 rounded-lg cursor-pointer bg-secondary dark:text-white focus:outline-none" id="image" type="file"/>

                <label htmlFor="bio">bio</label>
                  <textarea name="bio" defaultValue={data.developer.bio}  placeholder="" rows="4" class="mt-1 py-2 px-4 bg-secondary text-white rounded-md focus:outline-none mb-4 resize-none w-full" ></textarea>
                
                <input type="hidden" name='oldImage' defaultValue={data.developer.image} />
                  {/* <textarea name="code" placeholder="" rows="4" class="py-2 px-4 bg-gray-800 text-white rounded-md focus:outline-none mb-4 resize-none w-full" defaultValue={code}></textarea> */}
                  <button onClick= {(e)=>{
                    e.preventDefault()
                  
                        
                        swal({
                            title: "Are you sure?",
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,
                          })
                          .then((willsubmit) => {
                            if (willsubmit) {
                                submit(e.target.form)
                            } 
                          });
  
                
                  }} type="submit" class="bg-white py-2 px-4 text-black hover:bg-main hover:text-white rounded-md focus:outline-none">Send</button>
              </fetcher.Form>
            
          </div>
   
  </div>
</div>
</div>
</div>
        </>
    )
}

export default Profile