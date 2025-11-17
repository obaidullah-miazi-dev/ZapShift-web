// src/components/SendParcel.jsx
import React from "react";
import { useForm } from "react-hook-form";
import Container from "../components/Container";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSendParcel = (data) => {
    console.log("Parcel Data:", data);
    alert("Parcel booking submitted successfully!");
    // Here you can add API call to submit data
  };

  // Sample options for dropdowns (customize as needed)
  const wireHouses = ["Warehouse A", "Warehouse B", "Warehouse C"];
  const regions = ["Dhaka", "Chattogram", "Sylhet", "Rajshahi", "Khulna", "Barishal", "Rangpur", "Mymensingh"];

  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <Container>
        <div className="w-full bg-white rounded-2xl p-8 md:p-12 shadow-sm">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-second mb-2">Send A Parcel</h1>
        <p className="text-gray-600 text-lg mb-10">Enter your parcel details</p>

        {/* Form */}
        <form className="space-y-8" onSubmit={handleSubmit(handleSendParcel)}>
          {/* Parcel Type Radio */}
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="Document"
                defaultChecked
                {...register("parcelType", { required: true })}
                className="radio radio-success"
              />
              <span className="text-second font-medium">Document</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="Not-Document"
                {...register("parcelType", { required: true })}
                className="radio radio-success"
              />
              <span className="text-second font-medium">Not-Document</span>
            </label>
          </div>
          {errors.parcelType && <p className="text-red-500 text-sm">Parcel type is required</p>}

          {/* Parcel Name & Weight */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Parcel Name</label>
              <input
                type="text"
                placeholder="Parcel Name"
                {...register("parcelName", { required: true })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition"
              />
              {errors.parcelName && <p className="text-red-500 text-sm">Parcel name is required</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Parcel Weight (KG)</label>
              <input
                type="number"
                step="0.01"
                placeholder="Parcel Weight (KG)"
                {...register("parcelWeight", { required: true, min: 0.1 })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition"
              />
              {errors.parcelWeight?.type === "required" && <p className="text-red-500 text-sm">Weight is required</p>}
              {errors.parcelWeight?.type === "min" && <p className="text-red-500 text-sm">Weight must be at least 0.1 KG</p>}
            </div>
          </div>

          {/* Sender & Receiver Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Sender Details */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-second mb-4">Sender Details</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sender Name</label>
                <input
                  type="text"
                  placeholder="Sender Name"
                  {...register("senderName", { required: true })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition"
                />
                {errors.senderName && <p className="text-red-500 text-sm">Sender name is required</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sender Pickup Wire house</label>
                <select
                  {...register("senderWireHouse", { required: true })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition appearance-none"
                >
                  <option value="">Select Wire house</option>
                  {wireHouses.map((wh) => (
                    <option key={wh} value={wh}>{wh}</option>
                  ))}
                </select>
                {errors.senderWireHouse && <p className="text-red-500 text-sm">Sender wire house is required</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  placeholder="Address"
                  {...register("senderAddress", { required: true })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition"
                />
                {errors.senderAddress && <p className="text-red-500 text-sm">Sender address is required</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sender Contact No</label>
                <input
                  type="tel"
                  placeholder="Sender Contact No"
                  {...register("senderContact", { required: true, pattern: /^[0-9]{10,15}$/ })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition"
                />
                {errors.senderContact?.type === "required" && <p className="text-red-500 text-sm">Contact number is required</p>}
                {errors.senderContact?.type === "pattern" && <p className="text-red-500 text-sm">Invalid contact number</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Region</label>
                <select
                  {...register("senderRegion", { required: true })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition appearance-none"
                >
                  <option value="">Select your region</option>
                  {regions.map((reg) => (
                    <option key={reg} value={reg}>{reg}</option>
                  ))}
                </select>
                {errors.senderRegion && <p className="text-red-500 text-sm">Sender region is required</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Instruction</label>
                <textarea
                  placeholder="Pickup Instruction"
                  {...register("pickupInstruction")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition resize-none h-24"
                />
              </div>
            </div>

            {/* Receiver Details */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-second mb-4">Receiver Details</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Receiver Name</label>
                <input
                  type="text"
                  placeholder="Receiver Name"
                  {...register("receiverName", { required: true })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition"
                />
                {errors.receiverName && <p className="text-red-500 text-sm">Receiver name is required</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Receiver Delivery Wire house</label>
                <select
                  {...register("receiverWireHouse", { required: true })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition appearance-none"
                >
                  <option value="">Select Wire house</option>
                  {wireHouses.map((wh) => (
                    <option key={wh} value={wh}>{wh}</option>
                  ))}
                </select>
                {errors.receiverWireHouse && <p className="text-red-500 text-sm">Receiver wire house is required</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  placeholder="Address"
                  {...register("receiverAddress", { required: true })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition"
                />
                {errors.receiverAddress && <p className="text-red-500 text-sm">Receiver address is required</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Receiver Contact No</label>
                <input
                  type="tel"
                  placeholder="Receiver Contact No"
                  {...register("receiverContact", { required: true, pattern: /^[0-9]{10,15}$/ })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition"
                />
                {errors.receiverContact?.type === "required" && <p className="text-red-500 text-sm">Contact number is required</p>}
                {errors.receiverContact?.type === "pattern" && <p className="text-red-500 text-sm">Invalid contact number</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Receiver Region</label>
                <select
                  {...register("receiverRegion", { required: true })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition appearance-none"
                >
                  <option value="">Select your region</option>
                  {regions.map((reg) => (
                    <option key={reg} value={reg}>{reg}</option>
                  ))}
                </select>
                {errors.receiverRegion && <p className="text-red-500 text-sm">Receiver region is required</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Instruction</label>
                <textarea
                  placeholder="Delivery Instruction"
                  {...register("deliveryInstruction")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition resize-none h-24"
                />
              </div>
            </div>
          </div>

          {/* Pickup Time Note */}
          <p className="text-sm text-gray-600 mt-4">* Pickup Time 4pm-7pm Approx.</p>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full md:w-auto px-8 bg-main hover:bg-[#b9dd4b] text-black font-semibold py-3 rounded-lg transition shadow-sm cursor-pointer"
          >
            Proceed To Confirm Booking
          </button>
        </form>
      </div>
      </Container>
    </div>
  );
};

export default SendParcel;