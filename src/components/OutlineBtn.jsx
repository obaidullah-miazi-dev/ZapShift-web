import React from 'react';

const OutlineBtn = ({children,className}) => {
    return (
        <button className={`border border-gray-300 py-2.5 px-6 cursor-pointer ${className}`}>
            {children}
        </button>
    );
};

export default OutlineBtn;