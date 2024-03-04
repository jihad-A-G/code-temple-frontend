import { Form, redirect, useLoaderData, useNavigate, useSubmit } from "react-router-dom"
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import { useState } from "react";
import { useSelector } from "react-redux";
import swal from "sweetalert";
const EditPostForm = () =>{
    const {post} = useLoaderData()
    const [formData, setFormData] = useState({
      language: post.language,
      description: post.description,
      code: post.versions[0].code,
    });
    const submit = useSubmit()
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleCodeChange = (newCode) => {
      setFormData({ ...formData, code: newCode });
    };
    return(
      <>
      <div class="bg-main min-w-[60%] min-h-[60%] flex flex-col  text-center p-4 rounded-lg">
          <div class="mt-8">
             <Form action="" method="PUT" class="flex flex-col items-start">
                <label htmlFor="languange">Language</label>
              <input type="text" name="language" defaultValue={formData.language} onChange={handleChange} placeholder="Enter the programming language" class=" mt-1 py-2 px-4 bg-secondary text-white rounded-md focus:outline-none mb-4 w-full" />
                <label htmlFor="description">Description</label>
                  <textarea name="description" defaultValue={formData.description} onChange={handleChange} placeholder="" rows="4" class="mt-1 py-2 px-4 bg-secondary text-white rounded-md focus:outline-none mb-4 resize-none w-full" ></textarea>
                <label htmlFor="description">Your code</label>
                <AceEditor
                  mode="javascript"
                  theme="monokai"
                   name="code"
                  editorProps={{ $blockScrolling: true }}
                  style={{ width: '100%', height: '200px' ,borderRadius:'10px',marginBottom:'16px', marginTop:'4px', padding:'0 5px'}}
                  defaultValue={formData.code}
                  onChange={handleCodeChange}
                />
                <input type="hidden" name='formData' value={JSON.stringify(formData)} />
                  {/* <textarea name="code" placeholder="" rows="4" class="py-2 px-4 bg-gray-800 text-white rounded-md focus:outline-none mb-4 resize-none w-full" defaultValue={code}></textarea> */}
                  <button onClick= {(e)=>{
                    e.preventDefault()

                        swal({
                            title: "Edit this post?",
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,
                          })
                          .then((willEdit) => {
                            if (willEdit) {
                                submit(e.target.form)
                            } 
                          });
  
                    
                  }} type="submit" class="bg-white py-2 px-4 text-black hover:bg-main hover:text-white rounded-md focus:outline-none">Send</button>
              </Form>
            
          </div>
      </div>

      </>
    )
  }

  export default EditPostForm