import { createSlice } from "@reduxjs/toolkit";

const developer = {}

const developerSlice = createSlice({
    name:'developer',
    initialState:developer,
    reducers: {
        storeDeveloper :(state, action) =>{
            return action.payload
        },
        storePosts:(state, action) =>{
            state.savedPost= [...action.payload]
        },
        verifyDeveloper: (state)=>{
            state.isVerified =true
        }
    }
})

export const {storeDeveloper, storePosts, verifyDeveloper} = developerSlice.actions

export default developerSlice.reducer