import "./AllProducts.css";
import CardProduct from "../components/CardProduct/CardProduct";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentPage,
  setProducts,
  setSearchTerm,
} from "../redux/slice/productSlice";

const AllProduts = () => {
  const dispatch = useDispatch();

  const products = useSelector((state: any) => state.product.products);
  console.log(products);
  const currentPage = useSelector((state: any) => state.product.currentPage);
  const productsPerPage = useSelector(
    (state: any) => state.product.productsPerPage
  );
  const searchTerm = useSelector((state: any) => state.product.searchTerm);

  useEffect(() => {
    axios
      .get("https://test1.focal-x.com/api/items", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => dispatch(setProducts(res.data)));
  }, []);

  // ============Pagination====================

  const totalPages = Math.ceil(products?.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = products
    ?.filter((p: any) => {
      return p.name.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .slice(indexOfFirstProduct, indexOfLastProduct);

  const generatePageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  // ============Pagination====================

  return (
    <div className="content-all-products">
      <div className="search">
        <input
          type="text"
          placeholder="Search product by name "
          onChange={(e) => {
            dispatch(setSearchTerm(e.target.value));
          }}
        />
        <img src="/images/search-icon.png" alt="search-icon" />
      </div>
      <div className="btn">
        <button className="add-product">
          <Link className="link-add" to={"/dashboard/add-product"}>
            ADD NEW PRODUCT
          </Link>
        </button>
      </div>
      <div className="cards">
        {currentProducts?.map((product: any) => {
          return (
            <CardProduct
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.image_url}
            />
          );
        })}
      </div>

      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => dispatch(setCurrentPage(currentPage - 1))}
        >
          <img src="/images/Prev.png" alt="" />
        </button>
        {generatePageNumbers().map((number) => {
          return (
            <button
              key={number}
              onClick={() => dispatch(setCurrentPage(number))}
              className={number === currentPage ? "active" : ""}
            >
              {number}
            </button>
          );
        })}

        <button
          disabled={currentPage === totalPages}
          onClick={() => {
            dispatch(setCurrentPage(Math.min(currentPage + 1, totalPages)));
          }}
        >
          <img src="/images/Next.png" alt="" />
        </button>
      </div>


    </div>
  );
};

export default AllProduts;

