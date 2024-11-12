import { Link, useNavigate } from "react-router-dom";
import "./Sign.css";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AddUser } from "../redux/slice/userSlice";

export const SignUp = () => {
  const user = useSelector((state: any) => state.user);

  const dispatch = useDispatch();
  console.log(user);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const user_name = first_name + "_" + last_name;

    const formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("user_name", user_name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password_confirmation", password_confirmation);
    if (profileImage) {
      formData.append("profile_image", profileImage);
    }
    interface TypeUser {
      name: string | null;
      email: string | null;
      image: string | null;
    }

    axios
      .post("https://test1.focal-x.com/api/register", formData)
      .then((res) => {
        console.log(res.data.data);
        const user: TypeUser = {
          name: first_name + " " + last_name,
          email,
          image: res.data.data.user.profile_image_url || null,
        };
        const name:any=user.name;
        const image:any=res.data.data.user.profile_image_url;
        localStorage.setItem("name",name);
        localStorage.setItem("image",image);
        dispatch(AddUser(user));
        localStorage.setItem("token", res.data.data.token);
        navigate("/dashboard/all-products");
      })
      .catch((error) => {
        console.log(error.message)
        alert("Failed to register user. Please try again.");
      });
  };

  const handleFileChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  return (
    <div className="sign up">
      <div className="content-sign up">
        <img src="/images/Logo.png" alt="logo" />
        <div className="sign-text">
          <h2>SIGN UP</h2>
          <p>Fill in the following fields to create an account.</p>
        </div>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <label htmlFor="name">Name</label>
          <div className="twice-input">
            <input
              type="text"
              placeholder="First Name"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Last Name"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label htmlFor="password">Password</label>
          <div className="twice-input">
            <input
              type="password"
              placeholder="Enter password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Re-enter your password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>

          <label htmlFor="ProfileImage">Profile Image</label>
          <div className="custom-file-upload">
            <input type="file" id="profileImage" onChange={handleFileChange} />
            <label htmlFor="profileImage">
              <div className="container-upload">
                <img
                  src="/images/Upload icon.png"
                  className="upload"
                  alt="upload"
                />
              </div>
            </label>
          </div>
          <input type="submit" value={"SIGN UP"} />
        </form>
        <p>
        Do you have an account?{" "}
          <Link to={"/sign-in"} className="create-one">
            {" "}
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};
