import { Form, redirect, useNavigate, useSubmit } from "react-router-dom"
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import { useState } from "react";
import { useSelector } from "react-redux";
import swal from "sweetalert";
const PostForm = ({code}) =>{
    const [formData, setFormData] = useState({
      language: '',
      description: '',
      code: code??null,
    });
    const submit = useSubmit()
    const navigate = useNavigate()
    const developer = useSelector((state)=>state.developer)
    console.log(developer);
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleCodeChange = (newCode) => {
      setFormData({ ...formData, code: newCode });
    };
    return(
      <>
      <div class="bg-secondary min-w-[60%] min-h-[60%] flex flex-col  text-center p-4 rounded-lg">
          <div class="text-white">
              <h1 class="text-4xl font-bold mb-2">Post To Community</h1>
              <p>Are you stuck? get help from our community</p>
          </div>
          <div class="mt-8">
             <Form action="" method="post" class="flex flex-col items-start">
                <label htmlFor="languange">Language</label>
              <input type="text" name="language" value={formData.language} onChange={handleChange} placeholder="Enter the programming language" class=" mt-1 py-2 px-4 bg-main text-white rounded-md focus:outline-none mb-4 w-full" />
                <label htmlFor="description">Description</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} placeholder="" rows="4" class="mt-1 py-2 px-4 bg-main text-white rounded-md focus:outline-none mb-4 resize-none w-full" ></textarea>
                <label htmlFor="code">Your code</label>
                <AceEditor
                  mode="javascript"
                  theme="monokai"
                   name="code"
                  editorProps={{ $blockScrolling: true }}
                  style={{ width: '100%', height: '200px' ,borderRadius:'10px',marginBottom:'16px', marginTop:'4px', padding:'0 5px'}}
                  value={formData.code}
                  onChange={handleCodeChange}
                />
                <input type="hidden" name='formData' value={JSON.stringify(formData)} />
                  {/* <textarea name="code" placeholder="" rows="4" class="py-2 px-4 bg-gray-800 text-white rounded-md focus:outline-none mb-4 resize-none w-full" defaultValue={code}></textarea> */}
                  <button onClick= {(e)=>{
                    e.preventDefault()
                    if(developer._id){
                        submit(e.target.form)
                    }else{
                        
                        swal({
                            title: "You need to login",
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,
                          })
                          .then((willLogin) => {
                            if (willLogin) {
                                return navigate('/login')
                            } 
                          });
  
                    }
                  }} type="submit" class="bg-white py-2 px-4 text-black hover:bg-main hover:text-white rounded-md focus:outline-none">Send</button>
              </Form>
            
          </div>
      </div>

      </>
    )
  }

  export default PostForm