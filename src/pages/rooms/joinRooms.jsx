import { Form } from "react-router-dom"
const JoinRoom = () =>{

    return(
        <>
        <div className="p-20 flex justify-center items-center w-full h-full">
        <div class=" flex flex-col  text-center !min-w-64 p-4 rounded-lg">
          <div class="text-white">
              <h1 class="text-4xl font-bold mb-2">Join a Chat</h1>
          </div>
          <div class="mt-8">
             <Form action="" method="post" class="flex flex-col items-start">
                <label htmlFor="secretKey">Link</label>
              <input type="text" name="secretKey" placeholder="" class=" mt-1 py-2 px-4 bg-secondary text-white rounded-md focus:outline-none mb-4 w-full" />
               
                  <button type="submit" class="bg-white py-2 px-4 text-black hover:bg-secondary hover:text-white rounded-md focus:outline-none">Join</button>
              </Form>
            
          </div>
      </div>
      </div>
        </>
    )
}

export default JoinRoom