import {io} from 'socket.io-client'

const socket = io('http://localhost:5050',{
    reconnectionDelayMax:10000,
})

socket.on('connect',()=>{
    console.log('hello client',socket.id);
})


export default socket
