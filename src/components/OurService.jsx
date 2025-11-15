import React from "react";
import OurServiceCard from "./OurServiceCard";
import Container from "./Container";

const OurService = () => {
  const items = [
    {
      id: 1,
      icon: (
        <img
          width="48"
          height="48"
          src="https://img.icons8.com/color/48/in-transit--v1.png"
          alt="in-transit--v1"
        />
      ),
      title: "Express  & Standard Delivery",
      subtitle:
        "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    },
    {
      id: 2,
      icon: (
        <img
          width="48"
          height="48"
          src="https://img.icons8.com/fluency/48/city.png"
          alt="city"
        />
      ),
      title: "Nationwide Delivery",
      subtitle:
        "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    },
    {
      id: 3,
      icon: (
        <img
          width="48"
          height="48"
          src="https://img.icons8.com/parakeet/48/idea-sharing.png"
          alt="idea-sharing"
        />
      ),
      title: "Fulfillment Solution",
      subtitle:
        "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    },
    {
      id: 4,
      icon: (
        <img width="53" height="53" src="https://img.icons8.com/stickers/100/cash-on-delivery.png" alt="cash-on-delivery"/>
      ),
      title: "Cash on Home Delivery",
      subtitle:
        "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    },
    {
      id: 5,
      icon: (
        <img
          width="53"
          height="53"
          src="https://img.icons8.com/stickers/100/permanent-job.png"
          alt="permanent-job"
        />
      ),
      title: "Corporate Service / Contract In Logistics",
      subtitle:
        "Customized corporate services which includes warehouse and inventory management support.",
    },
    {
      id: 6,
      icon: (
        <img
          width="53"
          height="53"
          src="https://img.icons8.com/external-vectorslab-flat-vectorslab/53/external-Parcel-Return-e-commerce-vectorslab-flat-vectorslab-2.png"
          alt="external-Parcel-Return-e-commerce-vectorslab-flat-vectorslab-2"
        />
      ),
      title: "Parcel Return",
      subtitle:
        "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    },
  ];
  return (
    <Container>
      <div className="bg-second py-24 px-16 text-center rounded-4xl mt-26">
        <h3 className="text-4xl text-white font-bold mb-4">Our Services</h3>
        <p className="text-white max-w-2xl mx-auto">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {items.map((item) => (
            <OurServiceCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default OurService;
