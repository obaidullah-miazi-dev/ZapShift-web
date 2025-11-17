import React, { useContext } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../Provider/AuthProvider';
import { useLocation, useNavigate } from 'react-router';

const GoogleLogin = () => {
    const {googleLogIn} = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const handleGoogleLogin = ()=>{
        googleLogIn()
        .then(res=>{
            console.log(res.user);
            navigate(location.state || '/')
        })
        .catch(error=>{
            alert(error)
        })
    }
    return (
        <>
          {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-sm text-gray-500">Or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Google Button */}
        <button className="w-full flex items-center justify-center gap-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 rounded-lg transition cursor-pointer"
        onClick={handleGoogleLogin}
        >
          <FcGoogle className="text-xl" />
          Register with Google
        </button>  
        </>
    );
};

export default GoogleLogin;