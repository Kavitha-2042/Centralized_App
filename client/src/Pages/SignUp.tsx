import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Header from "../Components/Header";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [clicked, setClicked] = useState(false);
  const [address, setAddress] = useState("")
  const [privateKey, setPrivateKey] = useState("")

  // const navigate = useNavigate();

  const eventHandler = async (e: any) => {
    e.preventDefault();
    
    if (name === "" || email === "" || password === "" || conPassword === "") {
      toast.info("All fields are required", {
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
        autoClose: 2000,
      });
    }

    axios
      .post("/user/signup", { name, email, password, conPassword })
      .then(async (signUpResponse) => {
        if (signUpResponse.data.auth === true) {
          setAddress(signUpResponse.data.address)
          setPrivateKey(signUpResponse.data.originalKey)
          toast.success(signUpResponse.data.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
          setTimeout(() => {
            setClicked(true);
          }, 4000);
        } else {
          toast.error(signUpResponse.data.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
        }

        // setTimeout(() => {
        //   navigate("/userAccountPage");
        // }, 4000);
      })

      .catch((err) => console.log(err));
  };

  return (
    <div>
      {
        clicked ? 
        <>
          <div>
          <Header/>
            <div className='m-10'>
        <h1 className='text-5xl text-bold '>Account Details</h1>
        <h4 className='text-4xl mt-7'>Kindly note your account address and private key!</h4>
        <h5 className='text-3xl mt-7'>Your address: <span className="text-xl">{address}</span></h5>
        <h5 className='text-3xl mt-3'>Your private key : <span className="text-xl">{privateKey}</span></h5>
        <Link to='/signin'><button className='mt-7'>Click Here to move to signin!!</button></Link>
    </div>
          </div>
        </>
        :
        <>
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
              Sign Up
            </h5>
            <div
              className=""
              style={{
                backgroundColor: "transparent",
                padding: "1rem",
              }}
            >
              <input
                type="text"
                name="username"
                placeholder=" username..."
                required
                style={{
                  border: "0.1rem solid #4e0eff",
                  borderRadius: "0.4rem",
                  // backgroundColor: "#131324",
                }}
                className="rounded-md  ml-6 required p-1 m-2 border border-blue-700   text-start"
                onChange={(e: any) => {
                  setName(e.target.value);
                }}
              />
              <br />
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
              <br />
              <input
                type="password"
                name="confrim password"
                placeholder="confirm password"
                required
                style={{
                  border: "0.1rem solid #4e0eff",
                  borderRadius: "0.4rem",
                }}
                className="rounded-md  ml-6 required p-1 m-2 border border-blue-700   text-start"
                onChange={(e: any) => {
                  setConPassword(e.target.value);
                }}
              />
            </div>
            <br />
            <div className="flex justify-between items-center mb-6">
              <div className="form-group form-check">
                <input
                  type="checkbox"
                  className="form-check-input  h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600  checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
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
                SignUp
              </button>
              <p className="text-sm font-semibold mt-2 pt-1 mb-0 text-black">
                Already have an account?{"  "}
                <Link
                  to="/signin"
                  style={{
                    color: "#9e0efdff",
                    textDecoration: "none",
                    fontWeight: "bold",
                    fontFamily: "serif",
                  }}
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>

        <ToastContainer />
      </div>
      <div></div>
        </>
      }
      
    </div>
  );
};

export default SignUp;
