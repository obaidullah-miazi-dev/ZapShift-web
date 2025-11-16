import React from 'react';
import Banner from '../components/Banner';
import HowItWorks from '../components/HowItWorks';
import OurService from '../components/OurService';
import Brands from '../components/Brands';
import FeaturesSection from '../components/FeaturesSection';

const Home = () => {
    return (
        <>
            <Banner />
            <HowItWorks />
            <OurService />
            <Brands />
            <FeaturesSection />
        </>
    );
};

export default Home;