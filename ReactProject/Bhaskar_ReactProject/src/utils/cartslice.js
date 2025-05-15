import { createSlice } from "@reduxjs/toolkit";

const cartslice = createSlice({
    name:"cart",
    initialState:{
        cartitems:[]
    },
    reducers:{
        additem: (state,action)=>{
            state.cartitems.push(action.payload);
        },
        removeitem: (state,index)=>{
            state.cartitems.splice(index,1);
        },
        clearcart: (state)=>{
            state.cartitems.length=0;
        },
    }
})

export const {additem,removeitem,clearcart} = cartslice.actions;

export default cartslice.reducer;