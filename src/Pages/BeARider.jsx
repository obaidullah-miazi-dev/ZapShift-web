
import React, { useContext } from "react";
import { useForm, useWatch } from "react-hook-form";
import Container from "../components/Container";
import riderImg from "../assets/images/agent-pending.png"; 
import { useLoaderData } from "react-router";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { AuthContext } from "../Provider/AuthProvider";

const BeARider = () => {
    const serviceCenters = useLoaderData()
    const axiosSecure = useAxiosSecure()
    const {user} = useContext(AuthContext)
    // console.log(user);
    // console.log(serviceCenters);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const selectedRegion = useWatch({ control, name: "region" });

  const regions = [...new Set(serviceCenters?.map(c => c.region))].sort();
  const districts = selectedRegion
    ? serviceCenters.filter(c => c.region === selectedRegion).map(c => c.district)
    : [];

  const onSubmit = (data) => {
    console.log("Rider Application:", data);
    axiosSecure.post('/riders',data)
    .then(res=>{
        console.log(res.data)
        if(res.data.insertedId){
            alert("Your application has been submitted successfully!");
        }
    })
    .catch(err=>{
        console.log(err)
    })
    
  };

  return (
    <div className="min-h-screen w-11/12 mx-auto rounded-2xl mt-16 bg-white py-16">
      <Container>
        <div className=" mx-auto">
          {/* Header */}
          <h1 className="text-4xl md:text-5xl font-bold text-second mb-4">
            Be a Rider
          </h1>
          <p className="text-gray-600 max-w-3xl mb-12">
            Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
          </p>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-second mb-8">Tell us about yourself</h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Your Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    value={user?.displayName}
                    placeholder="Your Name"
                    {...register("name", { required: "Name is required" })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                  <input
                    type="email"
                    value={user?.email}
                    placeholder="Your Email"
                    {...register("email", { required: "Email is required", pattern: /^\S+@\S+$/i })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">Valid email is required</p>}
                </div>

                {/* photo url */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Photo URL</label>
                  <input
                    type="url"
                    value={user?.photoURL}
                    placeholder="Your Photo URL"
                    {...register("photoURL", { required: "Photo URL is required"})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">Valid photo URL is required</p>}
                </div>


                {/* Driving License Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Driving License Number</label>
                  <input
                    type="number"
                    placeholder="Driving License Number"
                    {...register("drivingLicense", { required: "Driving license is required" })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition"
                  />
                  {errors.drivingLicense && <p className="text-red-500 text-sm mt-1">{errors.drivingLicense.message}</p>}
                </div>

                {/* Region & District */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Region</label>
                    <select
                      {...register("region", { required: "Region is required" })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition"
                    >
                      <option value="">Select your Region</option>
                      {regions.map(r => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                    {errors.region && <p className="text-red-500 text-sm mt-1">{errors.region.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your District</label>
                    <select
                      {...register("district", { required: selectedRegion ? "District is required" : false })}
                      disabled={!selectedRegion}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition disabled:bg-gray-50"
                    >
                      <option value="">{selectedRegion ? "Select your District" : "First select region"}</option>
                      {districts.map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                    {errors.district && <p className="text-red-500 text-sm mt-1">{errors.district.message}</p>}
                  </div>
                </div>

                {/* NID No */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">NID No</label>
                  <input
                    type="number"
                    placeholder="NID"
                    {...register("nid", { required: "NID is required" })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition"
                  />
                  {errors.nid && <p className="text-red-500 text-sm mt-1">{errors.nid.message}</p>}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    {...register("phone", { required: "Phone is required", pattern: /^[0-9]{11}$/ })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">Valid 11-digit number required</p>}
                </div>

                {/* Bike Details */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bike Brand Model and Year</label>
                  <input
                    type="text"
                    placeholder="Bike Brand Model and Year"
                    {...register("bikeModel", { required: "Bike model is required" })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition"
                  />
                  {errors.bikeModel && <p className="text-red-500 text-sm mt-1">{errors.bikeModel.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bike Registration Number</label>
                  <input
                    type="number"
                    placeholder="Bike Registration Number"
                    {...register("bikeRegistration", { required: "Registration number is required" })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition"
                  />
                  {errors.bikeRegistration && <p className="text-red-500 text-sm mt-1">{errors.bikeRegistration.message}</p>}
                </div>

                {/* Tell Us About Yourself */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tell Us About Yourself</label>
                  <textarea
                    rows={4}
                    placeholder="Tell Us About Yourself"
                    {...register("about", { required: "This field is required" })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition resize-none"
                  />
                  {errors.about && <p className="text-red-500 text-sm mt-1">{errors.about.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-main hover:bg-lime-500 text-black font-bold py-4 rounded-lg transition shadow-md text-lg"
                >
                  Submit
                </button>
              </form>
            </div>

            {/* Rider Illustration */}
            <div className="hidden lg:flex justify-center items-center">
              <img
                src={riderImg}
                alt="ZapShift Rider"
                className="w-full max-w-xl"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BeARider;