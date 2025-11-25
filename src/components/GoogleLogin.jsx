import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../Provider/AuthProvider";
import { useLocation, useNavigate } from "react-router";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const GoogleLogin = () => {
  const { googleLogIn,setLoading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure()
  const navigate = useNavigate();
  const location = useLocation();
  const handleGoogleLogin = () => {
    googleLogIn()
      .then((res) => {
        console.log(res.user);
        
        // create user in db
        const userInfo = {
          email: res.user.email,
          displayName: res.user.displayName,
          photoURL: res.user.photoURL,
        };
        axiosSecure.post("/users", userInfo).then((res) => {
          console.log(res);
          if (res.data.insertedId) {
            console.log("user created successfully",res.data);
          }
        });
      })
      .catch((error) => {
        alert(error);
      }).finally(()=>navigate(location.state || "/"), setLoading(false))
  };
  return (
    <>
      {/* Divider */}
      <div className="flex items-center my-6">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="px-4 text-sm text-gray-500">Or</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      {/* Google Button */}
      <button
        className="w-full flex items-center justify-center gap-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 rounded-lg transition cursor-pointer"
        onClick={handleGoogleLogin}
      >
        <FcGoogle className="text-xl" />
        Register with Google
      </button>
    </>
  );
};

export default GoogleLogin;
