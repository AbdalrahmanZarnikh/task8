import { Route, Routes } from "react-router-dom";
import "./App.css";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import Home from "./pages/Home";
import AllProduts from "./pages/AllProduts";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import ShowProduct from "./pages/ShowProduct";
function App() {
  return (
    <>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/" element={<SignUp />} />
        <Route path="/dashboard" element={<Home />}>
          <Route path="all-products" element={<AllProduts />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="edit-product/:id" element={<EditProduct />} />
          <Route path="show-product/:id" element={<ShowProduct />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
