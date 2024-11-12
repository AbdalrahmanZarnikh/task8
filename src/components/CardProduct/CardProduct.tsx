import { useNavigate } from "react-router-dom";
import "./CardProduct.css";
import axios from "axios";
import {  useState } from "react";
import {DeleteProduct} from "../../redux/slice/productSlice"
import { useDispatch } from "react-redux";

interface prop {
  id: any;
  name: string | null;
  image: string;
}

const CardProduct = ({ id, name, image }: prop) => {
   const dispatch=useDispatch();

  const [showDelete, setShowDelete] = useState(false);


  const navigate = useNavigate();
  const Show = () => {
    navigate(`/dashboard/show-product/${id}`);
  };
  const Edit = () => {
    navigate(`/dashboard/edit-product/${id}`);
  };


  const ClickedYes= ()=>{
    axios
    .delete(`https://test1.focal-x.com/api/items/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      dispatch(DeleteProduct(id))
      console.log(res.data);
      setShowDelete(false);
      window.location.reload();
      });

  }

  const ClickedNo = () => {
    setShowDelete(false);
  }

  const Delete = () => {

      setShowDelete(true);

      }
  return (
    <div className="product">
      <img src={image} alt="iphone-product" />
      <div className="overlay">
        <p
          onClick={() => {
            Show();
          }}
        >
          {name}
        </p>
        <div className="btns-overlay">
          <button className="edit" onClick={Edit}>
            Edit
          </button>
          <button className="delete" onClick={Delete}>
            Delete
          </button>
        </div>
      </div>

      {showDelete && (
        <div className="overlay-delete">
          <div className="content-overlay-delete">
            <h2>Are you sure you want to delete this product?</h2>
            <div className="btns-overlay-delete">
              <button onClick={ClickedYes} >Yes</button>
              <button onClick={ClickedNo}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardProduct;
