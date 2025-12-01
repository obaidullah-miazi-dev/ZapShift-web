import React from 'react';

const PrimaryBtn = ({children,className}) => {
    return (
        <p className={`bg-main border border-main py-2.5 px-6 cursor-pointer ${className}`}>
            {children}
        </p>
    );
};

export default PrimaryBtn;