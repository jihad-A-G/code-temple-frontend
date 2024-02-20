import { Form } from "react-router-dom"
import { useState, useEffect } from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import axios from "axios";

import '../assets/style.css'
const AIChatbot = () =>{
    // const fecther = useFetcher()
    const [prompt,setPrompt] = useState('')
    const [code,setCode] = useState('')
    const [explaination,setExplaination] = useState('')
    const [isLoading,setIsLoading] = useState(false)
    const codeRegex = /```(\w+)\n([\s\S]+?)\n```/

   
    const submitPrompt = async (e) => {
        try {
          e.preventDefault()
          setIsLoading(true)
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
          console.log(response.data);
          const answer = response.data.openai.generated_text
          // const match = response.data.openai.generated_text.match(codeRegex);
          // if (match && match[1]) {
          //   setCode(match[1].trim()); // Trim any leading/trailing whitespace
          //   console.log('meshi l 7al');
          // }
          setCode(answer.split(codeRegex)[1])
          setExplaination(answer.split(codeRegex)[0])
          
          // setCode(response.data.openai.generated_text);
          setIsLoading(false)
        } catch (error) {
          console.error('Error submitting prompt:', error);
        }
      };


    return(
        <>
        <section className="w-full h-full relative">
             {/* Search bar */}
             <div className="fixed bottom-5 w-full z-30">             
             <div className=" w-full h-full flex justify-center ">
                <form method="POST" onSubmit={submitPrompt}>
                    <div className="rounded-xl border-3 border-transparent background flex items-stretch w-1070 flex-wrap">
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
            <div className="flex flex-col items-center relative justify-center py-10 px-8 w-full h-full bg-main">
            {/* result */}
            {isLoading&&<div className="flex justify-center items-center absolute top-70 ">
  <span className="animate-blink text-4xl font-mono"><svg fill="#fff" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0  0  32  32" xml:space="preserve" width="64px" height="64px" stroke="#fff">
  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
  <g id="SVGRepo_iconCarrier">
    <path id="systems-devops--code_1_" d="M15.819,30.311l-12-7C3.708,23.246,3.64,23.128,3.64,23V9h0.72v13.793l11.821,6.896 L15.819,30.311z M8.36,16H7.64V6h0.72V16z M28.36,15h-0.72V9.207L16,2.417l-3.64,2.116L12.352,13h-0.72l0.008-8.675 c0-0.128,0.068-0.247,0.179-0.311l4-2.325c0.112-0.065,0.251-0.065,0.362,0l12,7C28.292,8.753,28.36,8.872,28.36,9V15z M30.509,22 l-4.254-4.255l-0.51,0.51L29.491,22l-3.746,3.745l0.51,0.51L30.509,22z M21.255,25.745L17.509,22l3.746-3.745l-0.51-0.51L16.491,22 l4.254,4.255L21.255,25.745z"></path>
  </g>
</svg></span>
</div>}
            {explaination&&<p className="mb-2">{explaination}</p>}
            {code&&<div className="w-full h-full  mb-5">
                        <SyntaxHighlighter className="rounded-xl bg-secondary h-fit p-5 overflow-auto" language="javascript" style={darcula}>{code}</SyntaxHighlighter>
            </div>}
           
        </div>
        </section>
       

        </>

    )
}

export default AIChatbot