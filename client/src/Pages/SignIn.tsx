import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useAppDispatch } from "../Redux/Hooks";
import { initialize } from "../Redux/Slice/userSlice";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const eventHandler = async (e: any) => {
    e.preventDefault();
    if (email === "" || password === "") {
      toast.info("All fields are required", {
        position: toast.POSITION.TOP_CENTER,
       
        autoClose: 2000,
      });
    }


    const regEx =  /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    if(!regEx.test(email) && email !== ""){
      toast.error("Invalid email", {
        position: toast.POSITION.TOP_CENTER,
        theme: "light",
        autoClose: 2000,
      });
    }


    axios
      .post("/user/signin", { email, password })
      .then(async (signInResponse) => {
        if (signInResponse.data.auth === true) {
            localStorage.setItem("jwt-token", signInResponse.data.token);
            localStorage.setItem("email", email)
            dispatch(
              initialize({
                user: signInResponse.data.user,
                auth: signInResponse.data.auth,
              })
            );
          setTimeout(() => {
            navigate("/qrcode");
            window.location.reload()
          }, 4000);
          toast.success(signInResponse.data.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
            // theme: "colored",
          });
        } else {
          toast.error(signInResponse.data.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
            
          });
        }
      })

      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="flex justify-center">
        <div
          style={{
            // backgroundColor: "#131355",
            backgroundColor: "lavender",
          }}
          className="block p-6 rounded-lg shadow-2xl max-w-lg  m-48"
        >
          <h5
            style={{
              fontFamily: "serif",
            }}
            className="text-black leading-tight font-medium mb-2 text-center text-2xl"
          >
            Sign In
          </h5>
          <div
            className=""
            style={{
              backgroundColor: "transparent",
              padding: "1rem",
            }}
          >
            <input
              type="email"
              name="email"
              placeholder=" email..."
              required
              style={{
                border: "0.1rem solid #4e0eff",
                borderRadius: "0.4rem",
              }}
              className="rounded-md  ml-6 required p-1 m-2 border border-blue-700   text-start"
              onChange={(e: any) => {
                setEmail(e.target.value);
              }}
            />
            <br />
            <input
              type="password"
              name="password"
              placeholder="password"
              required
              style={{
                border: "0.1rem solid #4e0eff",
                borderRadius: "0.4rem",
              }}
              className="rounded-md  ml-6 required p-1 m-2 border border-blue-700   text-start"
              onChange={(e: any) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <br />
          <div className="flex justify-between items-center mb-6">
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input  h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600  checked:border-blue-600 focus:outline-none transition duration-200  align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                id="exampleCheck2"
              />
              <label
                className="form-check-label inline-block text-black mr-10"
                htmlFor="exampleCheck2"
              >
                Remember me
              </label>
            </div>
          </div>

          <div className="text-center lg:text-left">
            <button
              onClick={eventHandler}
              type="button"
              style={{
                backgroundColor: "#4e0eff",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "70px",
              }}
              className="inline-block px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              SignIn
            </button>
            <p className="text-sm font-semibold mt-2 pt-1 mb-0 text-black">
              Don't have an account?{"  "}
              <Link
                to="/signup"
                style={{
                  color: "#9e0efdff",
                  textDecoration: "none",
                  fontWeight: "bold",
                  fontFamily: "serif",
                }}
              >
                SignUp
              </Link>
            </p>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default SignIn;
