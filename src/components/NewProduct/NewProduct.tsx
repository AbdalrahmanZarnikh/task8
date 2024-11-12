import { useEffect, useState } from "react";
import "./NewProduct.css";
import { useDispatch } from "react-redux";
import { AddProduct, UpdateProduct } from "../../redux/slice/productSlice";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const NewProduct = ({ text }: any) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [image, setimage] = useState("");
  const [Name, setName] = useState("");
  const [Price, setPrice] = useState("");

  const [defaultImage, setDefaultImage] = useState("");
  const [defaultName, setDefaultName] = useState("");
  const [defaultPrice, setDefaultPrice] = useState("");

  const formData = new FormData();


  const handleFileChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setimage(e.target.files[0]);
    }
  };

  useEffect(()=>{
    axios.get(`https://test1.focal-x.com/api/items/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res)=>{
      setDefaultName(res.data.name);
      setDefaultPrice(res.data.price);
      setDefaultImage(res.data.image_url);
    })
  },[])

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (image) {
      formData.append("image", image);
    }
    if(!image && defaultImage){
      formData.append("image", defaultImage);
    }
    if(!Name && defaultName){
      setName(defaultName);
      formData.append("name", defaultName);
    }
    else if(Name){
      formData.append("name", Name);
    }
    if(!Price && defaultPrice){
      setPrice(defaultPrice)
      formData.append("price",defaultPrice);
    }
    else if(Price){
      formData.append("price", Price);
    }
    if (text === "ADD NEW ITEM") {
   
      axios
        .post("https://test1.focal-x.com/api/items", formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          const product = {
            id: res.data.id,
            name: Name,
            price: Price,
            image: image || "",
          };
          console.log(res.data.response);
          alert("Product added successfully!");
          dispatch(AddProduct(product));
          navigate("/dashboard/all-products");
        })
        .catch((error) => {
          console.log(error.message);
        });
        
        console.log(formData);
      } 
      else if(text === "EDIT ITEM"){
        console.log(formData) 
        formData.append("_method", "PUT");
        axios.post(`https://test1.focal-x.com/api/items/${id}`, formData,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }).then((res) => {
          console.log(res.data)
          const product = {
            id,
            name: Name,
            price: Price,
            image: image || defaultImage,
          };
          dispatch(UpdateProduct(product));
          alert("Product updated successfully!")
          navigate("/dashboard/all-products");
        })
    }
 
  };
  return (
    <div className="content-new-product">
      <img src="/images/Control.png" alt="" style={{cursor:"pointer"}} onClick={()=>{
        navigate("/dashboard/all-products");
      }}/>

      <h1>{text}</h1>

      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="text-product">
          <div className="name-product">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              defaultValue={defaultName}
              placeholder="Enter the product name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="price-product">
            <label htmlFor="pric">Price</label>
            <input
            defaultValue={defaultPrice}
              type="text"
              placeholder="Enter the product price"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="image-product">
          <label>Image</label>
          <div className="custom-file-upload">
            <input type="file" id="productImage" onChange={handleFileChange} />
            <label htmlFor="productImage">
              <div className="container-upload">
                <img
                  src={defaultImage? defaultImage : "/images/Upload icon.png"  }
                  className="upload"
                  alt="upload"
                />
              </div>
            </label>
          </div>
          <input type="submit" value={"Save"} />
        </div>
      </form>
    </div>
  );
};

export default NewProduct;
