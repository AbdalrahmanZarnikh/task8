import { Link, useNavigate } from "react-router-dom";
import "./Sign.css";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

import { SignInUser } from "../redux/slice/userSlice";

export const SignIn = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    interface TypeUser {
      email: string | null;
      name: string | null;
      image: string | null;
    }

    axios
      .post("https://test1.focal-x.com/api/login", { email, password })
      .then((res) => {
        console.log(res.data.user.profile_image_url);
        const user: TypeUser = {
          email,
          name: res.data.user.first_name + " " + res.data.user.last_name,
          image: res.data.user.profile_image_url || null,
        };
        dispatch(SignInUser(user));
        localStorage.setItem("token", res.data.token);
        const name:any=user.name;
        const image:any=res.data.user.profile_image_url;
        localStorage.setItem("name",name);
        localStorage.setItem("image",image);
        navigate("/dashboard/all-products");
      })
      .catch((error) => {
        console.error(error);
        alert("Invalid email or password");
      });
  };

  return (
    <div className="sign">
      <div className="content-sign">
        <img src="/images/Logo.png" alt="logo" />
        <div className="sign-text">
          <h2>SIGN IN</h2>
          <p>Enter your credentials to access your account</p>
        </div>
        <form
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <input type="submit" value={"SIGN IN"} />
        </form>
        <p>
          Don't have an account?{" "}
          <Link to={"/"} className="create-one">
            {" "}
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};
