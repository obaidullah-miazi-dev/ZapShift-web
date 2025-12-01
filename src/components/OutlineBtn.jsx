import React from 'react';

const OutlineBtn = ({children,className}) => {
    return (
        <p className={`border border-gray-300 py-2.5 px-6 cursor-pointer ${className}`}>
            {children}
        </p>
    );
};

export default OutlineBtn;