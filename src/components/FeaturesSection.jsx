// src/components/FeaturesSection.jsx
import React from "react";
import Container from "./Container";
import FeatureCard from "./FeatureCard";

import {
  Truck,
  ShieldCheck,
  PhoneCall,
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon:<Truck size={48} />,
      title: "Live Parcel Tracking",
      description:
        "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment’s journey and get instant status updates for complete peace of mind.",
    },
    {
      icon: <ShieldCheck size={48} />,
      title: "100% Safe Delivery",
      description:
        "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    },
    {
      icon: <PhoneCall size={48} />,
      title: "24/7 Call Center Support",
      description:
        "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    },
  ];

  return (
    <section className="w-11/12 mx-auto  mt-32">
      <Container>
        <div className="space-y-5 border-y-2 border-dashed border-gray-400 py-20 ">
          {features.map((feat, idx) => (
            <FeatureCard
              key={idx}
              icon={feat.icon}
              title={feat.title}
              description={feat.description}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturesSection;