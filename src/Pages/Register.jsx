import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const handleRegister = (data) => {
    console.log(data.photo[0]);
    const profilePhoto = data.photo[0];
    createUser(data.email, data.password).then((res) => {
      console.log(res.user);

      const formData = new FormData();
      formData.append("image", profilePhoto);

      const imageApiUrl = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_host_api_key
      }`;

      axios.post(imageApiUrl, formData).then((res) => {
        console.log("after image upload", res.data.data.url);

        const userProfile = {
          displayName: data.name,
          photoURL: res.data.data.url,
        };

        updateUser(userProfile)
          .then(() => {
            alert("sucessfull");
            navigate(location.state || "/");
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch(error=>{
        alert(error)
      })
    })
    .catch(error => {
      alert(error)
    })
  };
  return (
    <div>
      <div className="w-full">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-2">Create an Account</h1>
        <p className=" text-gray-600 mb-8">Register with ZapShift</p>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit(handleRegister)}>
          {/* Avatar Upload */}
          <div className="flex mb-8">
            <label htmlFor="avatar" className="relative cursor-pointer group">
              <div className="w-24 h-24 rounded-full bg-gray-100 border-2  border-main flex items-center justify-center">
                <img
                  width="60"
                  height="60"
                  src="https://img.icons8.com/fluency/48/user-male-circle--v1.png"
                  alt="user-male-circle--v1"
                />
              </div>
              <input
                id="avatar"
                type="file"
                {...register("photo", { required: true })}
                accept="image/*"
                // className="hidden"
              />
              {errors.photo?.type === "required" && (
                <p className="text-red-500">Image Required</p>
              )}

              <div className="absolute  rounded-full group-hover:bg-opacity-10 transition"></div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition"
            />
            {errors.name?.type === "required" && (
              <p className="text-red-500">Name Required</p>
            )}
          </div>

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
            Register
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#90c000] font-medium hover:underline"
          >
            Login
          </Link>
        </p>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-sm text-gray-500">Or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Google Button */}
        <button className="w-full flex items-center justify-center gap-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 rounded-lg transition">
          <FcGoogle className="text-xl" />
          Register with Google
        </button>
      </div>
    </div>
  );
};

export default Register;
