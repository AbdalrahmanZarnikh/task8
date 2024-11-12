import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slice/userSlice";
import productSlice from "../slice/productSlice";
const store = configureStore({ reducer: { user: userSlice,
    product:productSlice
 } });

export default store;
