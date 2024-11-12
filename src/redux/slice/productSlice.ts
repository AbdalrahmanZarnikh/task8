import { createSlice } from "@reduxjs/toolkit";

let initialState: any = {
  products: [],
  currentPage: 1,
  productsPerPage: 8,
  searchTerm: "",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setProductsPerPage: (state, action) => {
      state.productsPerPage = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    AddProduct: (state, action) => {
      state.products.push(action.payload);
    },
    UpdateProduct:(state,action)=>{
        const index=state.products.findIndex((p:any)=>p.id===action.payload.id);
        if(index>-1)
        {
          state.products[index]=action.payload;
        }
    } ,
    DeleteProduct:(state,action)=>{ 
      state.products=state.products.filter((p:any)=>p.id!==action.payload);
    }
  },
});

export const {
  setProducts,
  setCurrentPage,
  setProductsPerPage,
  setSearchTerm,
  AddProduct,
  UpdateProduct,
  DeleteProduct
} = productSlice.actions;
export default productSlice.reducer;
