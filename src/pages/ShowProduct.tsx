import axios from "axios";
import "./ShowProduct.css"
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
interface typeProduct{
  id: number | null;
  name: string |null ;
  price: number | null;
  image_url: string ;
  created_at:string;
  updated_at:string; 

}
const ShowProduct = () => {
  const [product,setproduct] = useState<typeProduct | null>(null);
  const id=useParams();

  useEffect(()=>{
    axios.get(`https://test1.focal-x.com/api/items/${id.id}`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res)=>{
      setproduct(res.data);

      console.log(res.data.created_at.split("T")[0].split("-"));
    })
  },[])

  const Added=product?.created_at.split("T")[0].split("-").reverse().join("/" );
  const updated=product?.updated_at.split("T")[0].split("-").reverse().join("/" );

  console.log(Added,updated);



  
  return (
    <div className="show">
       <Link to={"/dashboard/all-products"}>   <img src="/images/Control.png" alt=""/></Link>
      <h1>{product?.name}</h1>

      <img src={product?.image_url} alt="image-product" className="image-product" />
       
      

      <div className="text">
        <p><span>Price: </span><span className="info-product">{product?.price}$</span></p>
        <p><span>Added At: </span><span className="info-product">{Added}</span> </p>
      </div>
      <p className="update"><span>Updated At: </span><span className="info-product">{updated}</span></p>



    </div>
  )
}

export default ShowProduct