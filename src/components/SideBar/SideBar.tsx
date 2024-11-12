import { NavLink, useNavigate } from "react-router-dom";
import "./SideBar.css";
import "../../App.css"
import axios from "axios";
import { useSelector } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

const SideBar = () => {
  const infoUsers = useSelector((state: any) => state.user);
  const infoUser = infoUsers[infoUsers.length - 1];

  // const  imageUser=infoUser.image ? infoUser.image : "/images/user.png";

  const imageUser: any = localStorage.getItem("image");
  const userName: any = localStorage.getItem("name");

  console.log(imageUser);

  // const userName=infoUser.name ? infoUser.name : "User";

  const navigate = useNavigate();
  const handleLogout = () => {
    axios
      .post(
        "https://test1.focal-x.com/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("image");
        navigate("/sign-in");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const [showSideBar,setShowSidebar] =useState(false);

  const handleShowSideBar =()=>{
    setShowSidebar(!showSideBar);
  }

  return (
      <>
        <div className={`side-bar ${showSideBar ? "display":""}`}>
        <div className="top">
          <img src="/images/Logo.png" alt="logo" className="logo2" />
          <div className="info">
            <img src={imageUser} alt="user-image" className="user-image" />
            <p className="info-text">{userName}</p>
          </div>
          <ul>
            <li>
              <NavLink
                to={`/dashboard/all-products`}
                className={({ isActive }) =>
                  isActive ? "link active" : "link"
                }
              >
                <img src="/images/Vector.png" alt="" className="vector1" />
                Products
              </NavLink>
            </li>

            <NavLink
              to={`/dashboard/favorites`}
              className={({ isActive }) => (isActive ? "link active" : "link")}
            >
              <img src="/images/Vector2.png" alt="" className="vector2" />
              Favorites
            </NavLink>

            <NavLink
              to={`/dashboard/order-list`}
              className={({ isActive }) => (isActive ? "link active" : "link")}
            >
              <img src="/images/Vector2.png" alt="" className="vector2" />
              Order List
            </NavLink>
          </ul>
        </div>
        <div className="logout">
          <p>Logout</p>
          <button onClick={handleLogout}>
            <img src="/images/logout.png" alt="logout-icon" />
          </button>
        </div>
      </div>
      <div className="hamburger-menu">
        <GiHamburgerMenu onClick={handleShowSideBar} />
      </div>
      </>
  );
};

export default SideBar;
