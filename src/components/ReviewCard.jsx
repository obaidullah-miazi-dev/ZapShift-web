
import React from "react";
import { Quote } from "lucide-react";

const ReviewCard = ({ review, name, title,photoURL }) => {
  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm flex flex-col mx-auto">
      {/* Quote Icon */}
      <div className="mb-4">
        <Quote />
      </div>

      {/* Review Text */}
      <p className="text-gray-600 text-sm md:text-base leading-relaxed flex-1 mb-5">
        {review}
      </p>

      {/* Dotted Line */}
      <div className="w-full border-t border-dashed border-gray-300 mb-5" />

      {/* Avatar Circle + Name + Title */}
      <div className="flex items-center gap-4">
        
            <div>
                <img src={photoURL} alt="user image" className="h-12 rounded-full"/>
            </div>

        {/* Name & Title */}
        <div>
          <h4 className="font-bold text-second text-base">{name}</h4>
          <p className="text-sm text-gray-500">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;