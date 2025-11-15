import React from 'react';

const OurServiceCard = ({item}) => {
    const {title,subtitle,icon} = item
    return (
        <div className='bg-white rounded-xl py-8 px-6 space-y-3 hover:bg-main transition-all transform duration-300 hover:-translate-y-2'>
            <div className='bg-linear-to-b from-[#EEEDFC] to-[#eeedfc25] p-5 inline-block rounded-full'>{icon}</div>
            <h3 className='text-2xl font-bold text-second'>{title}</h3>
            <p>{subtitle}</p>
        </div>
    );
};

export default OurServiceCard;