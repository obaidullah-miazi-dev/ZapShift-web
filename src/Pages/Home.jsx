import React from 'react';
import Banner from '../components/Banner';
import HowItWorks from '../components/HowItWorks';
import OurService from '../components/OurService';
import Brands from '../components/Brands';
import FeaturesSection from '../components/FeaturesSection';
import MerchantBanner from '../components/MerchantBanner';

const Home = () => {
    return (
        <>
            <Banner />
            <HowItWorks />
            <OurService />
            <Brands />
            <FeaturesSection />
            <MerchantBanner />
        </>
    );
};

export default Home;