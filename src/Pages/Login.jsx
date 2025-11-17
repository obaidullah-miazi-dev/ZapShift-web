import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import GoogleLogin from "../components/GoogleLogin";
import { AuthContext } from "../Provider/AuthProvider";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {register,handleSubmit,formState:{errors}} = useForm()
    const {signInUser} = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const handleLogin = (data)=>{
        signInUser(data.email,data.password)
        .then(res=>{
            console.log(res.user)
            navigate(location.state || '/')
        }).catch(error=>{
            alert(error)
        })
    }
  return (
    <div>
      <div className="w-full">
        {/* Title */}
        <h1 className="text-4xl md:text-7xl font-bold mb-2">Welcome Back</h1>
        <p className=" text-gray-600 mb-8 md:text-2xl">Login with ZapShift</p>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit(handleLogin)}>
        
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email Required</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: true, minLength: 6 })}
                placeholder="Password"
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500">Password is Required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500">
                  Password must contain 6 characters
                </p>
              )}

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-4 text-gray-500 hover:text-gray-700 transition"
              >
                {showPassword ? (
                  <FiEyeOff className="w-5 h-5" />
                ) : (
                  <FiEye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-main hover:bg-[#b9dd4b] text-black font-semibold py-3 rounded-lg transition shadow-sm cursor-pointer"
          >
            Login
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          New In Here?{" "}
          <Link
            to="/register"
            className="text-[#90c000] font-medium hover:underline"
          >
            Register
          </Link>
        </p>

        <GoogleLogin />
      </div>
    </div>
  );
};

export default Login;
