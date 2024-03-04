import { Form,Link, useFetcher, useLoaderData, useParams, useSubmit } from 'react-router-dom'
import logo from '../../assets/svgs/logo.svg'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import socket from '../../config/socketIo'
import { instance } from '../../main'

const Chat = () =>{
    const data = useLoaderData()
    const [messages,setMessages] = useState(data.messages)
    const [showOptions, setShowOptions] = useState(false)
    const [sendMessage, setSendMessage] = useState('')
    const [copied,setCopied] = useState(false)
    const [isEditing,setISEditing] = useState(false)
    const [idToEdit,setIdTOEdit] = useState('')
    const developer = useSelector(state=>state.developer)
    console.log(developer);
    const fetcher = useFetcher()
    const submit = useSubmit()
    const params = useParams()
    console.log(data.messages);

    useEffect(()=>{
        const handleNewMessage = async(message) => {
            const response = await instance.get(`/rooms/${data.room._id}`)
            setMessages(response.data.messages)
              
          };
      
        socket.on('newMessage',handleNewMessage)

        return () => {
            socket.off('newMessage', handleNewMessage);
          };
    },[socket,setMessages])

    useEffect(() => {
      const handleClickOutside = (event) => {
          if (showOptions && !event.target.closest('.message-container') && !event.target.matches('.message-container')) {
              setShowOptions(false);
          }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
          document.removeEventListener('mousedown', handleClickOutside);
      };
  }, [showOptions]);
  const handleCopyClick = async(m) =>{
    try {
      await navigator.clipboard.writeText(m.content);
      setCopied(true);
      setTimeout(() => setCopied(false),  3000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }        
  }
    console.log(messages);
    return(
        <>
        <>
  {/* Main Chat Area */}
  <div className="flex-1 w-full h-full overflow-hidden relative border-x-1 border-x-[#68717a]">
    {/* Chat Header */}
    <header className="bg-secondary p-4 text-white">
      <h1 className="text-2xl font-semibold">{data.room.roomName}</h1>
    </header>
    {/* Chat Messages */}
    <div className="h-screen s-full overflow-y-auto p-4 pb-60">
        {data.messages?
        messages.map(m=>{
            if(m.developerId._id == developer._id){
                return <div key={m._id} className="flex justify-end mb-4 cursor-pointer">
                <div className="flex max-w-96 relative bg-secondary text-white rounded-lg p-3 gap-3">
                  <p>{m.content}</p>
                  <button aria-label="Options" onClick={()=>setShowOptions(m._id)} className="btn shadow-none focus-outline inline-flex cursor-pointer select-none flex-row items-center justify-center font-bold no-underline transition duration-200 ease-in-out typo-callout iconOnly p-0 rounded-10 btn-tertiary my-auto">
                        <svg width="1rem" height="1rem" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className=" w-6 h-6 pointer-events-none "><path d="M12 17a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0-6.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM12 4a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" fill="#a8b3cf" fillRule="evenodd"></path></svg>
                      </button>
                      {showOptions == m._id &&(
                      <div className="message-container absolute right-0 left-[-200px] top-[-50px] mt-2 w-48 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg">
                        <div className="py-1">
                         {m.developerId._id == developer._id? <button onClick={(e)=>{
                          setISEditing(true)
                          setSendMessage(m.content)
                          setIdTOEdit(m._id)
                        }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left" role="menuitem">Edit</button>:null}
                          <button type="button" onClick={(e)=>handleCopyClick(m)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">{!copied?'Copy':'Copied'}</button>
                         {m.developerId._id == developer._id? <fetcher.Form method='DELETE' action={`/community/rooms/chat/message/delete`}><input type="hidden" name="messageId"  defaultValue={m._id}/><input type="hidden" name="roomId"  defaultValue={params.id}/><button type="submit" className=" text-start w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600">Delete</button></fetcher.Form>:null}
                        </div>
                      </div>
                    )}
                </div>
                <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                  <img
                    src={logo}
                    alt="My Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                </div>
              </div>
            }else{
                
               return <div key={m._id} className="flex mb-4 cursor-pointer">
                <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                  <img
                    src={logo}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                </div>
                <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3 relative">
                  <p className="text-gray-700">{m.content}</p>
                 < button aria-label="Options" onClick={()=> setShowOptions(m._id)} className="btn shadow-none focus-outline inline-flex cursor-pointer select-none flex-row items-center justify-center font-bold no-underline transition duration-200 ease-in-out typo-callout iconOnly p-0 rounded-10 btn-tertiary my-auto">
                        <svg width="1rem" height="1rem" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className=" w-6 h-6 pointer-events-none "><path d="M12 17a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0-6.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM12 4a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" fill="#a8b3cf" fillRule="evenodd"></path></svg>
                      </button>
                      {showOptions == m._id &&(
                      <div className="message-container absolute left-[230px] top-0 mt-2 w-48 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg">
                        <div className="py-1">
                          <button type="button" onClick={(e)=>handleCopyClick(m)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">{!copied?'Copy':'Copied'}</button>
                        </div>
                      </div>
                    )}
                </div>
              </div>
            }
               
            
         
                  
        }):<div className="w-full h-full flex items-center justify-center">
        <p className="text-3xl text-[#848D97] font-semibold">No messages!</p>
    </div>}
  
     
      
    </div>
    {/* Chat Input */}
    
    <footer className="bg-secondary p-4 fixed bottom-0" style={{ width: 'calc(100% - 420px)' }}>
    <fetcher.Form method={`${isEditing?'PUT':'POST'}`} action={`${isEditing?`/community/rooms/chat/edit-message`:''}`} >
 <div className="flex items-center">
    <input
      type="text"
      name='content'
      onChange={(e)=>setSendMessage(e.target.value)}
      value={sendMessage}
      placeholder="Type a message..."
      className="w-full p-2 bg-main rounded-md border border-sandyBrown focus:outline-none focus:border-[#F0A04B]"
    />
    {isEditing?
    
    <div > <input type='hidden' name='messageId' defaultValue={idToEdit}/>
    <input type="hidden" name="roomId"  defaultValue={params.id}/>
    </div>
    :null
    }
    <button onClick={(e)=>{
      e.preventDefault()
      setSendMessage('')
      submit(e.target.form)
    }} type='submit' className="bg-sandyBrown text-white px-4 py-2 rounded-md ml-2">
      Send
    </button>
 </div>
    </fetcher.Form>
</footer>
  </div>
</>

        </>
    )
}
export default Chat