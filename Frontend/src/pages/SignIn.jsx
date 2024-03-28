import React, { useContext, useState } from 'react'
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";

let initialState = {
  userName: "",
  password: "",
};

export const SignIn = () => {
  const [details, setDetails] = useState(initialState);
  const { Login, isAuth } = useContext(AuthContext);
  const { userName, password } = details;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://paytment-api.vercel.app/api/v1/user/signin",
        details,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      console.log("response after post :- ", data);
      setDetails(initialState);
      Login(data.token);
    } catch (error) {
      console.log("an error occurred :-", error.response.data);
    }
  };


  const handleChange = (e) => {
    let inputValue = e.target.value;
    setDetails({ ...details, [e.target.name]: inputValue });
  };

  if (isAuth) {
    return <Navigate to={`/dashboard`} />;
  }
  return (
    <>
      <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
        <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
          <div className="flex-1 bg-blue-900 text-center hidden md:flex">
            <div
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(https://www.nttdata.com/vn/en/-/media/nttdataapac/ndvn/services/card-and-payment-services/services_card-and-payment-services_header_2732x1536.jpg?h=1536&iar=0&w=2732&rev=302b8b3481424484879ac210f6afc5ac)`,
              }}
            ></div>
          </div>
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className=" flex flex-col items-center">
              <div className="text-center">
                <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
                  Sign In
                </h1>
                <p className="text-[12px] mt-2 text-gray-500">
                  Hey enter your details to sign in
                </p>
              </div>
              <div className="w-full flex-1 mt-8">
                <div className="mx-auto max-w-xs flex flex-col gap-4">
                  <form onSubmit={handleSubmit} className="">
                    <input
                      className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="email"
                      onChange={handleChange}
                      name="userName"
                      placeholder="Enter Email"
                      value={userName}

                    />
                    <input
                      className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      onChange={handleChange}
                      type='password'
                      name="password"
                      placeholder="Enter Password"
                      value={password}
                    />
                    <button className="mt-5 tracking-wide font-semibold bg-blue-700 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                      <svg
                        className="w-6 h-6 -ml-2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <path d="M20 8v6M23 11h-6" />
                      </svg>
                      <span className="ml-3">Sign In</span>
                    </button>
                  </form>
                  <p className="mt-6 text-xs text-gray-600 text-center">
                    Don't have an account?{" "}
                    <Link to="/signup">
                      <span className="text-blue-900 font-semibold">Sign Up</span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
