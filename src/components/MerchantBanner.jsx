// src/components/MerchantBanner.jsx
import React from "react";
import Container from "./Container";
import PrimaryBtn from "./PrimaryBtn";
import OutlineBtn from "./OutlineBtn";
import waveBg from "../assets/images/be-a-merchant-bg.png";
import parcelIllustration from "../assets/images/location-merchant.png";

const MerchantBanner = () => {
  return (
    <section className="mt-32 w-11/12 mx-auto">
      <Container>
        <div className="relative bg-linear-to-r from-teal-900 via-teal-800 to-teal-900 rounded-3xl overflow-hidden text-white">

          {/* Background wave image (covers the whole card) */}
          <img
            src={waveBg}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />

          <div className="relative flex flex-col md:flex-row items-center justify-between px-8 py-12 md:px-16 md:py-20 gap-10">

            {/* Left – Text + Buttons */}
            <div className="space-y-6 flex-2">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                Merchant and Customer Satisfaction
                <br />
                <span className="text-2xl md:text-3xl lg:text-4xl">
                  is Our First Priority
                </span>
              </h2>

              <p className="text-sm md:text-base text-gray-200">
                We offer the lowest delivery charge with the highest value along with
                100% safety of your product. Pathao courier delivers your parcels in every
                corner of Bangladesh right on time.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                {/* Primary (green) button */}
                <PrimaryBtn className="text-black font-semibold rounded-full">
                  Become a Merchant
                </PrimaryBtn>

                {/* Outline button */}
                <OutlineBtn className="border-main text-main hover:bg-main hover:text-black font-semibold rounded-full transition-colors">
                  Earn with ZapShift
                </OutlineBtn>
              </div>
            </div>

            {/* Right – Parcel illustration */}
            <div className="flex-1">
              <img
                src={parcelIllustration}
                alt="Parcel with location pin"
                className="w-48 md:w-64 lg:w-full"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default MerchantBanner;