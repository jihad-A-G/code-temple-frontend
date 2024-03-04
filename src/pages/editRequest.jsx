import { useState } from "react";
import { Form, useLoaderData } from "react-router-dom"
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
const EditRequest = () =>{
    const {request} = useLoaderData()
    console.log(request);
    const [formData, setFormData] = useState({
      description:request.description,
        code: request.code,
        postId:request.postId._id
      });

      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      const handleCodeChange = (newCode) => {
        setFormData({ ...formData, code: newCode });
      };

    return(
        <>
        <div className="w-full h-full flex justify-center px-20 overflow-auto">
        <div class="w-full mt-8">
           <Form action="" method="PUT" class="flex flex-col items-start">
           <label htmlFor="description">Description</label>
              <textarea name="description" onChange={handleChange} value={formData.description}  placeholder="" rows="4" class="mt-1 py-2 px-4 bg-secondary text-white rounded-md focus:outline-none mb-4 resize-none w-full"></textarea>
               
             <label htmlFor="description">Your code</label>
              <AceEditor
                mode="javascript"
                theme="monokai"
                 name="code"
                editorProps={{ $blockScrolling: true }}
                style={{ width: '100%', height: '500px' ,borderRadius:'10px',marginBottom:'16px', marginTop:'4px', padding:'0 5px'}}
                value={formData.code}
                onChange={handleCodeChange}
              />
              <input type="hidden" name='formData' value={JSON.stringify(formData)} />
                {/* <textarea name="code" placeholder="" rows="4" class="py-2 px-4 bg-gray-800 text-white rounded-md focus:outline-none mb-4 resize-none w-full" defaultValue={code}></textarea> */}
                <button type="submit" class="bg-white py-2 px-4 text-black hover:bg-main hover:text-white rounded-md focus:outline-none">Send</button>
            </Form>
          
        </div>
    </div>
        </>
    )
}

export default EditRequest