import React from 'react';
import authImage from '../assets/images/authImage.png'
import logo from '../assets/images/ZapShift-logo.png'
import { NavLink, Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className='w-11/12 mx-auto'>
            <NavLink to='/'>
                <img src={logo} alt="logo"  className='mt-5'/>
            </NavLink>

            <div className='flex items-center justify-between min-h-screen'>
                <div className='flex-1'>
                    <Outlet></Outlet>
                </div>
                <div className='flex-1'>
                    <img src={authImage} className='mx-auto' />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;