// src/components/SendParcel.jsx
import React, { useContext } from "react";
import { useForm, useWatch } from "react-hook-form";
import Container from "../components/Container";
import { useLoaderData } from "react-router";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { AuthContext } from "../Provider/AuthProvider";

const SendParcel = () => {
  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map((center) => center.region);
  const regions = [...new Set(regionsDuplicate)];
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  // console.log(regions);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const senderRegion = useWatch({control,name:"senderRegion"});
  const receiverRegion = useWatch({control,name:"receiverRegion"});

  const districtByRegions = (region) => {
    const regionsDistrict = serviceCenters.filter(
      (center) => center.region === region
    );
    const districts = regionsDistrict.map((d) => d.district);
    return districts;
  };

  const handleSendParcel = (data) => {
    console.log("Parcel Data:", data);

    const isDocument = data.parcelType === "Document";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight);

    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minCharge + extraCharge;
      }
    }

    console.log("cost of parcel : ", cost);
    // Here you can add API call to submit data
    data.cost = Number(cost)
    data.parcelWeight = Number(data.parcelWeight)
    axiosSecure
      .post("/parcels", data)
      .then((res) => {
        console.log(res.data);
        alert('parcel send request successfull ')
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <Container>
        <div className="w-full bg-white rounded-2xl p-8 md:p-12 shadow-sm">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-second mb-2">
            Send A Parcel
          </h1>
          <p className="text-gray-600 text-lg mb-10">
            Enter your parcel details
          </p>

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
            {errors.parcelType && (
              <p className="text-red-500 text-sm">Parcel type is required</p>
            )}

            {/* Parcel Name & Weight */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Parcel Name
                </label>
                <input
                  type="text"
                  placeholder="Parcel Name"
                  {...register("parcelName", { required: true })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition"
                />
                {errors.parcelName && (
                  <p className="text-red-500 text-sm">
                    Parcel name is required
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Parcel Weight (KG)
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="Parcel Weight (KG)"
                  {...register("parcelWeight", { required: true, min: 0.1 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition"
                />
                {errors.parcelWeight?.type === "required" && (
                  <p className="text-red-500 text-sm">Weight is required</p>
                )}
                {errors.parcelWeight?.type === "min" && (
                  <p className="text-red-500 text-sm">
                    Weight must be at least 0.1 KG
                  </p>
                )}
              </div>
            </div>

            {/* Sender & Receiver Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Sender Details */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-second mb-4">
                  Sender Details
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sender Name
                  </label>
                  <input
                    type="text"
                    placeholder="Sender Name"
                    defaultValue={user?.displayName}
                    {...register("senderName", { required: true })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition"
                  />
                  {errors.senderName && (
                    <p className="text-red-500 text-sm">
                      Sender name is required
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sender Email
                  </label>
                  <input
                    type="email"
                    placeholder="Sender Email"
                    defaultValue={user?.email}
                    {...register("senderEmail", { required: true })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition"
                  />
                  {errors.senderName && (
                    <p className="text-red-500 text-sm">
                      Sender Email is required
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sender Pickup Region
                  </label>
                  <select
                    {...register("senderRegion", { required: true })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition appearance-none"
                  >
                    <option value="">Select Region</option>
                    {regions.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                  {errors.senderRegion && (
                    <p className="text-red-500 text-sm">
                      Sender Region is required
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sender District
                  </label>
                  <select
                    {...register("senderDistrict", { required: true })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition appearance-none"
                  >
                    <option value="" disabled>
                      Select your District
                    </option>
                    {districtByRegions(senderRegion).map((d, i) => (
                      <option key={i} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                  {errors.senderDistrict && (
                    <p className="text-red-500 text-sm">
                      Sender District is required
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    placeholder="Address"
                    {...register("senderAddress", { required: true })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition"
                  />
                  {errors.senderAddress && (
                    <p className="text-red-500 text-sm">
                      Sender address is required
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sender Contact No
                  </label>
                  <input
                    type="tel"
                    placeholder="Sender Contact No"
                    {...register("senderContact", {
                      required: true,
                      pattern: /^[0-9]{10,15}$/,
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition"
                  />
                  {errors.senderContact?.type === "required" && (
                    <p className="text-red-500 text-sm">
                      Contact number is required
                    </p>
                  )}
                  {errors.senderContact?.type === "pattern" && (
                    <p className="text-red-500 text-sm">
                      Invalid contact number
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pickup Instruction
                  </label>
                  <textarea
                    placeholder="Pickup Instruction"
                    {...register("pickupInstruction")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition resize-none h-24"
                  />
                </div>
              </div>

              {/* Receiver Details */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-second mb-4">
                  Receiver Details
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Receiver Name
                  </label>
                  <input
                    type="text"
                    placeholder="Receiver Name"
                    {...register("receiverName", { required: true })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition"
                  />
                  {errors.receiverName && (
                    <p className="text-red-500 text-sm">
                      Receiver name is required
                    </p>
                  )}
                </div>


                  <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Receiver Email
                  </label>
                  <input
                    type="email"
                    placeholder="Receiver Email"
                    {...register("receiverEmail", { required: true })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition"
                  />
                  {errors.senderName && (
                    <p className="text-red-500 text-sm">
                      Receiver Email is required
                    </p>
                  )}
                </div>


                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Receiver Pickup Region
                  </label>
                  <select
                    {...register("receiverRegion", { required: true })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition appearance-none"
                  >
                    <option value="">Select Region</option>
                    {regions.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                  {errors.receiverRegion && (
                    <p className="text-red-500 text-sm">
                      Receiver Region is required
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Receiver District
                  </label>
                  <select
                    {...register("receiverDistrict", { required: true })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition appearance-none"
                  >
                    <option value="" disabled>
                      Select Receiver District
                    </option>
                    {districtByRegions(receiverRegion).map((d, i) => (
                      <option key={i} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                  {errors.receiverDistrict && (
                    <p className="text-red-500 text-sm">
                      Receiver District is required
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    placeholder="Address"
                    {...register("receiverAddress", { required: true })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition"
                  />
                  {errors.receiverAddress && (
                    <p className="text-red-500 text-sm">
                      Receiver address is required
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Receiver Contact No
                  </label>
                  <input
                    type="tel"
                    placeholder="Receiver Contact No"
                    {...register("receiverContact", {
                      required: true,
                      pattern: /^[0-9]{10,15}$/,
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition"
                  />
                  {errors.receiverContact?.type === "required" && (
                    <p className="text-red-500 text-sm">
                      Contact number is required
                    </p>
                  )}
                  {errors.receiverContact?.type === "pattern" && (
                    <p className="text-red-500 text-sm">
                      Invalid contact number
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Instruction
                  </label>
                  <textarea
                    placeholder="Delivery Instruction"
                    {...register("deliveryInstruction")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition resize-none h-24"
                  />
                </div>
              </div>
            </div>

            {/* Pickup Time Note */}
            <p className="text-sm text-gray-600 mt-4">
              * Pickup Time 4pm-7pm Approx.
            </p>

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
