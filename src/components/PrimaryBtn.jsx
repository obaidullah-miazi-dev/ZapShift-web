import React from 'react';

const PrimaryBtn = ({children,className}) => {
    return (
        <button className={`bg-main border border-main py-2.5 px-6 cursor-pointer ${className}`}>
            {children}
        </button>
    );
};

export default PrimaryBtn;