import { useLoaderData, Link, useFetcher, useParams } from "react-router-dom"
import pullRequest from '../assets/svgs/pullRequest.svg'
import { useState } from "react"
import { useSelector } from "react-redux"
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { useEffect } from "react"
const RequestPage = () =>{
    const [showOptions, setShowOptions] = useState(null)
    const {requests} = useLoaderData()
    const params = useParams()
    const fetcher = useFetcher()
    const developer = useSelector((state)=>state.developer)

    const [copied, setCopied] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const totalPages = Math.ceil(requests.length / itemsPerPage);

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, requests.length);

    const handlePrevPage = () => {
       if (currentPage > 1) {
         setCurrentPage(currentPage - 1);
       }
    };
   
    const handleNextPage = () => {
       if (currentPage < totalPages) {
         setCurrentPage(currentPage + 1);
       }
    };
   
    const displayedData = requests.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showOptions && !event.target.closest('.dropdown-container') && !event.target.matches('.dropdown-container')) {
                setShowOptions(null);
            }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showOptions]);

    const handleCopyClick = async(r) =>{
        try {
          await navigator.clipboard.writeText(r.code);
          setCopied(true);
          setTimeout(() => setCopied(false),  3000);
        } catch (err) {
          console.error('Failed to copy text: ', err);
        }        
      }
   
    return (
        <>
        <div className="w-full h-full flex items-center justify-center p-20 overflow-auto box-border">
            <div className="relative flex flex-col items-center w-full h-auto mx-0 mt-4 rounded-md border-1 border-[#30363d] pb-12">
                <div className="flex items-cener justify-between p-4 bg-secondary w-full rounded-ss-md">
                <div className="flex items-center text-[#a8b3cf] !text-[15px] !leading-[20px]">
            <time dateTime="2024-02-21T17:26:56.453Z">{`${requests.filter(r=>r.approve ==false).length} open`}</time>
            <span className="mx-2">•</span>
            <span >{`${requests.filter(r=>r.approve ==true).length} approved`}</span>
            </div>
            <Link to={`/community/update-request/${params.id}`} class="btn-default overflow-hidden relative bg-sandyBrown no-underline text-white py-2  px-4 rounded  ">
                <span class="relative">New request</span>
            </Link>
                </div>
               {displayedData.map(r=>{
                 const date = new Date(r.createdAt)
                 const today = new Date()
                 const openDay = Math.abs(today - date)
                return <div key={r._id} className="border-t-1 border-t-[#21262d] box-border w-full">
                <div className="flex w-full h-full relative">
                  <div className="pt-3 pl-4 relative shrink-0">
                    <img width={18} height={18} src={pullRequest} alt="" />
                  </div>
                  <div className="flex-auto p-2 box-border">
                    <div className="flex justify-between items-center p-0 ">
                      <Link to={`/community/requests/id/${r._id}`} className="text-white hover:text-[#F0A04B] no-underline text-base font-semibold align-middle">{`${r.description.substring(0,50)} ...`}</Link>
                      <button aria-label="Options" onClick={()=> setShowOptions(r._id)} className="btn shadow-none focus-outline inline-flex cursor-pointer select-none flex-row items-center justify-center font-bold no-underline transition duration-200 ease-in-out typo-callout iconOnly p-0 rounded-10 btn-tertiary my-auto">
                        <svg width="1rem" height="1rem" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className=" w-6 h-6 pointer-events-none "><path d="M12 17a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0-6.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM12 4a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" fill="#a8b3cf" fillRule="evenodd"></path></svg>
                      </button>
                    </div>
                    {showOptions == r._id &&(
                      <div className="dropdown-container z-50 absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1">
                         {r.developerId._id == developer._id? <Link to={`/community/requests/edit-request/${r._id}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Edit</Link>:null}
                          <button type="button" onClick={(e)=>handleCopyClick(r)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">{!copied?'Copy':'Copied'}</button>
                         {r.developerId._id == developer._id? <fetcher.Form method='DELETE' action={`/community/requests/delete`}><input type="hidden" name="requestId"  defaultValue={r._id}/><button type="submit" className=" text-start w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600">Delete</button></fetcher.Form>:null}
                        </div>
                      </div>
                    )}
                    <div className="flex justify-start items-center mt-1 text-xs">{`opened ${Math.floor(openDay/ (1000 * 60 * 60 * 24)) == 0?'today':`${Math.floor(openDay/ (1000 * 60 * 60 * 24))} days ago`} by ${r.developerId.username}`}</div>
                  </div>
                </div>
              </div>
               })} 
               <div className="flex items-center w-full justify-between text-white text-base  px-4 py-3 sm:px-6 absolute bottom-0">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm ">
            Showing <span className="font-medium">{startItem}</span> to <span className="font-medium">{endItem}</span> of{' '}
            <span className="font-medium">{requests.length}</span> results
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <a
              href="#"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400  ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true"  onClick={handlePrevPage}/>
            </a>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
   
            <a
            href="#"
            aria-current="page"
            className={`relative z-10 inline-flex items-center  px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${currentPage === page ? 'bg-sandyBrown' : null}`}
            onClick={() => setCurrentPage(page)}
            key={page}
          >
            {page}
          </a>
          ))}
           
            <a
              href="#"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" onClick={handleNextPage}/>
            </a>
          </nav>
        </div>
      </div>
    </div>


            </div>
        </div>
        
        </>
    )
}

export default RequestPage