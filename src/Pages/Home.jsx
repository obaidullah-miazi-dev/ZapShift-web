import React from 'react';
import Banner from '../components/Banner';
import HowItWorks from '../components/HowItWorks';
import OurService from '../components/OurService';
import Brands from '../components/Brands';
import FeaturesSection from '../components/FeaturesSection';
import MerchantBanner from '../components/MerchantBanner';
import CustomerReviews from '../components/CustomerReviews';
import FAQSection from '../components/FAQSection';

const Home = () => {
    return (
        <>
            <Banner />
            <HowItWorks />
            <OurService />
            <Brands />
            <FeaturesSection />
            <MerchantBanner />
            <CustomerReviews />
            <FAQSection />
        </>
    );
};

export default Home;