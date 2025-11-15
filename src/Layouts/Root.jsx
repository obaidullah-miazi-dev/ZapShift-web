import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';

const Root = () => {
    return (
        <div className='bg-[#eaeced] min-h-screen py-5'>
            <Navbar></Navbar>
            <Outlet />
        </div>
    );
};

export default Root;