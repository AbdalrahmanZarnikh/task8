import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState{
  name:string | null;
  email:string | null;
  image:string | null;
}

const getAllProducts=createAsyncThunk("products/getall",async(url,asyncThunk)=>{
    const {rejectWithValue}=asyncThunk;
    try {
      const res=  await axios.get("https://test1.focal-x.com/api/items", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      return res.data;
    } catch (error:any) {
        rejectWithValue(error.message)
    }
})







const initialState:UserState[]=[{
    name:null,
    email:null,
    image:null
}]

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        AddUser:(state,action)=>{
          state.push(action.payload);
        },
        RemoveUser:(state,action)=>{
          state=state.filter((user)=>user.email!==action.payload);
        },
        SignInUser:(state,action)=>{
            const findIndexUser=state.findIndex((user)=>user.email===action.payload.email);
            if(findIndexUser==-1)
            {
              console.log("User not found");
              state.push(action.payload);
            }

            const user=state[findIndexUser];
            state=state.filter((user)=>user.email!==action.payload);
            state.push(user);


        }
    },

}
)



 




export const {AddUser,RemoveUser,SignInUser} =userSlice.actions;
export default userSlice.reducer;