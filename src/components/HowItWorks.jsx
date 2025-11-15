import React from "react";
import Container from "./Container";
import { LandPlot, MapPin, PackageCheck, Route } from "lucide-react";
import HowItWorksCard from "./HowItWorksCard";

const HowItWorks = () => {

  const items = [
    {
      id: 1,
      icon: <LandPlot size={47}/>,
      title: "Booking Pick & Drop",
      subTitle:
        "From personal packages to business shipments,  we deliver on time, every time.",
    },
    {
      id: 2,
      icon: <MapPin size={47}/>,
      title: "Rider Arrives at Your Location",
      subTitle:
        "A verified rider will reach your pickup point, confirm your package, and start the journey.",
    },
    {
      id: 3,
      icon: <Route size={47}/>,
      title: "Live Tracking",
      subTitle:
        "Track your package in real-time, stay updated every moment until it’s delivered.",
    },
    {
      id: 4,
      icon: <PackageCheck size={47}/>,
      title: "Fast & Safe Delivery",
      subTitle:
        "Your parcel is delivered safely to the destination with instant delivery.",
    },
  ];

  return (
    <div className="w-11/12 mx-auto mt-20">
      <Container>
        <h3 className="font-bold text-3xl text-second my-4">How It Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map(item=> <HowItWorksCard key={item.id} item={item}/>)}
        </div>
      </Container>
    </div>
  );
};

export default HowItWorks;
