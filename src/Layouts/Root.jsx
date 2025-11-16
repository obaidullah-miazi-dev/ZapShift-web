import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';

const Root = () => {
    return (
        <div className='bg-[#f0f1f1] min-h-screen py-5'>
            <Navbar></Navbar>
            <Outlet />
        </div>
    );
};

export default Root;