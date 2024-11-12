import { createSlice } from "@reduxjs/toolkit";


interface UserState{
  name:string | null;
  email:string | null;
  image:string | null;
}







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