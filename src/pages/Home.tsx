import { Outlet } from "react-router-dom"
import "../App.css";
import SideBar from "../components/SideBar/SideBar"
import { GiHamburgerMenu } from "react-icons/gi";
const Home = () => {
  return (
    <div className="home">
      <SideBar/>

      
      <Outlet/>
    </div>
  )
}

export default Home