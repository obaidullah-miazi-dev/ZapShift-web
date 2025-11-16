// src/components/FeatureCard.jsx
import React from "react";
import CircleIcon from "./CircleIcon";

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start gap-6 hover:shadow-lg transition-shadow">
      {/* Icon + Circle arrow */}
      <div className="shrink-0">
        <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-second">
          {icon}
        </div>
      </div>

      {/* Text */}
      <div className="flex-1">
        <h4 className="font-bold text-second text-xl md:text-2xl mb-2">
          {title}
        </h4>
        <p className="text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;