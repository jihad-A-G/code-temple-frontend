import { useState, useEffect } from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Navbar from "../components/navbar";
import logo from '../assets/svgs/logo.svg'
import axios from "axios";
import '../assets/style.css'
import PostForm from "../components/addPostForm";
const AIChatbot = () =>{
    // const fecther = useFetcher()
    const [prompt,setPrompt] = useState('')
    const [code,setCode] = useState('')
    const [codeToPost,setCodeToPost] = useState('')
    const [explaination,setExplaination] = useState('')
    const [isLoading,setIsLoading] = useState(false)
    const [completeTyping,setCompleteTyping] = useState(false)
    const [copied,setCopied] = useState(false)
    const [chat,setChat] = useState([])
    const [openForm,setOpenForm] = useState(false)
    const codeRegex = /```\w+\n([\s\S]+?)\n```/
  
   
    const handleOpenForm = (e) =>{
      e.preventDefault()
      setOpenForm(true)
    }

    const submitPrompt = async (e) => {
        try {
          let indexForExplaination = 0
          let indexForCode = 0
          e.preventDefault()
          setIsLoading(true)
          setCode('')
          setExplaination('')
            console.log('Function is being executed!');
          const response = await axios.post(
            'https://api.edenai.run/v2/text/code_generation',
            {
              providers: "openai",
              instruction: prompt,
              temperature:  0.1,
              max_tokens:  500,
              fallback_providers: "",
            },
            {
              headers: {
                authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYjUzYjEyYjEtM2JlZC00NTc2LTkwODItMWJmODY2MmYzOTg3IiwidHlwZSI6ImFwaV90b2tlbiJ9.G8QZcbisNj6-FoGiaSNJuaQpHNNOzbqMqho2vb26iF4`,
               'content-type': 'application/json'
              },
            }
          );
          // console.log(response.data);
          const answer = response.data.openai.generated_text
          const explainationToAnimate = answer.split(codeRegex)[0]
          const codeToAnimate = answer.split(codeRegex)[1]
          setCodeToPost(codeToAnimate)
          console.log(codeToPost);
          setIsLoading(false)
          //adding the first character to explaination
            setExplaination(explainationToAnimate[0])
            //Every 10 ms add a character to the explaination state
          const ExplainationInterval = setInterval(()=>{

            setExplaination((prevExplaination) => prevExplaination + explainationToAnimate.charAt(indexForExplaination));

            indexForExplaination++

            if(indexForExplaination >= explainationToAnimate.length){
              //stop explaination interval
              //Every 10 ms add a character to the code state
              const CodeInterval = setInterval(()=>{
                setCode((prevCode) => prevCode + codeToAnimate.charAt(indexForCode));
                indexForCode++
                
                if(indexForCode >= codeToAnimate?.length){
                  //stop the code interval
                  clearInterval(CodeInterval)
                }
              },8)
              
              clearInterval(ExplainationInterval)
            }
          },8)

          setChat([...chat,{explaination:explainationToAnimate, code:codeToAnimate}])
          console.log(code);
          console.log(explaination);
         console.log(chat);
          
          setCompleteTyping(true)

          
        } catch (error) {
          console.error('Error submitting prompt:', error);
        }
      };

      const handleCopyClick = async(e) =>{
        e.preventDefault()
        try {
          await navigator.clipboard.writeText(code);
          setCopied(true);
          setTimeout(() => setCopied(false),  3000);
        } catch (err) {
          console.error('Failed to copy text: ', err);
        }        
      }

    return(
        <>
         {/* POST FORM */}
         {openForm?
      <div className=" w-full h-full bg-[rgb(0,0,0,.80)]  flex justify-center items-center !absolute z-[60] text-white">
        <PostForm code={codeToPost}/>
        </div>:null}

        <div className="w-screen h-screen bg-main text-white box-border relative overflow-auto">
            <header>
        <Navbar/>
            </header>
            <main className="pt-20 container-lg w-full h-full  flex justify-start relative bg-main overflow-auto">
            <section className="w-full h-full relative bg-main pt-10 pb-20">
             {/* Search bar */}
             <div className="fixed bottom-5 w-full z-30">             
             <div className=" w-full h-full flex ">
                <form method="POST" onSubmit={submitPrompt} className="w-1070 mx-auto">
                    <div className="rounded-xl border-3 border-transparent background flex items-stretch flex-wrap">
                    <textarea
                        tabIndex="0"
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                        name="prompt"
                        className="grow shrink basis-auto w-[1%] min-h-[3.1rem] rounded-lg p-3 outline-none border-1 border-transparent bg-secondary overflow-hidden resize-none h-50"
                        placeholder="Send message"
                        aria-label="Send message"
                        onInput={(e) => {
                        e.target.style.height = 'auto';
                        e.target.style.height = `${e.target.scrollHeight}px`;
                        }}
                        onChange={(e)=>setPrompt(e.target.value)}
                    /> 
                    <div className="rounded-[10px] inline-flex relative align-middle">
                    <button className="grow shrink basis-auto relative p-3">
                        <svg
                            width="18px"
                            height="18px"
                            viewBox="0 0 24.00 24.00"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            stroke="#fff"
                            transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"
                            >
                            <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                            <g
                                id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                stroke="#CCCCCC"
                                strokeWidth="0.24000000000000005"
                            />
                            <g id="SVGRepo_iconCarrier">
                                {" "}
                                <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071C11.9024 19.3166 11.9024 18.6834 12.2929 18.2929L17.5858 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H17.5858L12.2929 5.70711C11.9024 5.31658 11.9024 4.68342 12.2929 4.29289Z"
                                fill="#fff"
                                />{" "}
                            </g>
                        </svg>

                     </button>
                    
                    </div>
                    </div>
                </form>
            </div>
            </div>
            <div className="flex">
            <div className=" relative py-10 px-8 mx-auto w-1070 h-full bg-main">
            {/* result */}
          
          <div className="flex items-center border-b-.8 border-b-nav gap-5 mb-4">
          <div className="p-2"><span className="font-mono"><img src={logo}  alt="" /></span>

</div>
<p>Ask me anything related to coding.</p>
          </div>

            <div className="">
              {isLoading?<div className="flex items-baseline space-x-2">
	<div className="animate-pulse dark:text-white">Loading</div>
	<div className="w-1 h-1 rounded-full animate-pulse dark:bg-white"></div>
	<div className="w-1 h-1 rounded-full animate-pulse dark:bg-white"></div>
	<div className="w-1 h-1 rounded-full animate-pulse dark:bg-white"></div>
</div>:null}
            {explaination&&<p className="mb-2">{explaination}</p>}
            {code&&<div className=" mt-5 mb-20 relative">
              <div className="absolute top-3 right-3 z-40 "><button class="px-3 md:px-4 py-1 md:py-2 bg-white border border-white text-black rounded-lg hover:bg-main hover:text-white" onClick={handleOpenForm}>post</button></div>
                        <SyntaxHighlighter className="rounded-xl w-full h-fit p-5 overflow-auto mb-2 relative" language="javascript" style={monokai}>{code}</SyntaxHighlighter>
                         <div className="">
                          {!copied?<button type="button" onClick={handleCopyClick}><svg
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
                            </svg></button>:'copied'}
                            </div>
            </div>}
          
            </div>   
        </div>

        </div>
        </section>
       
            </main>
        </div>
          

        </>

    )
}


export default AIChatbot