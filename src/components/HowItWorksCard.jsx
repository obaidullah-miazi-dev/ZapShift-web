import React from 'react';

const HowItWorksCard = ({item}) => {
    const {title,subTitle,icon} = item
    
    return (
        <div className='bg-white p-8 rounded-xl flex flex-col gap-2 justify-between'>
            <p>{icon}</p>
            <h4 className='font-bold text-second text-xl'>{title}</h4>
            <p className='text-gray-500 font-semibold'>{subTitle}</p>
        </div>
    );
};

export default HowItWorksCard;