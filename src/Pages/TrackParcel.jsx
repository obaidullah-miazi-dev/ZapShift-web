import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxios from "../Hooks/useAxios";
import { Package, CheckCircle, Clock, UserCheck, Bike } from "lucide-react";

const TrackParcel = () => {
  const { trackingId } = useParams();
  const axiosInstance = useAxios();

  const { data: trackingLogs = [], isLoading, error } = useQuery({
    queryKey: ["track-parcel", trackingId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/track-parcel/${trackingId}/logs`);
      return res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
  });
  console.log(trackingLogs)

  
  const getStatusConfig = (status) => {
    switch (status) {
      case "parcel_deliverd":
        return {
          label: "Delivered",
          icon: <CheckCircle className="w-6 h-6 text-green-600" />,
          color: "bg-green-100 text-green-800 border-green-200",
          bgCircle: "border-green-500 bg-green-50",
        };
      case "parcel_pickedUp":
        return {
          label: "Picked Up",
          icon: <Package className="w-6 h-6 text-blue-600" />,
          color: "bg-blue-100 text-blue-800 border-blue-200",
          bgCircle: "border-blue-500 bg-blue-50",
        };
      case "rider_arriving":
        return {
          label: "Rider Arriving",
          icon: <Bike className="w-6 h-6 text-indigo-600" />,
          color: "bg-indigo-100 text-indigo-800 border-indigo-200",
          bgCircle: "border-indigo-500 bg-indigo-50",
        };
      case "rider-assigned":
        return {
          label: "Rider Assigned",
          icon: <UserCheck className="w-6 h-6 text-purple-600" />,
          color: "bg-purple-100 text-purple-800 border-purple-200",
          bgCircle: "border-purple-500 bg-purple-50",
        };
      case "pending-pickup":
      default:
        return {
          label: "Pending Pickup",
          icon: <Clock className="w-6 h-6 text-yellow-600" />,
          color: "bg-yellow-100 text-yellow-800 border-yellow-200",
          bgCircle: "border-yellow-500 bg-yellow-50",
        };
    }
  };

  const latestLog = trackingLogs[0];
  const currentStatus = latestLog ? getStatusConfig(latestLog.status) : null;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-main mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading tracking info...</p>
        </div>
      </div>
    );
  }

  if (error || !trackingLogs.length) {
    return (
      <div className="min-h-screen bg-white w-11/12 mx-auto rounded-2xl mt-8 flex items-center justify-center px-4">
        <div className="text-center bg-white rounded-2xl shadow-lg p-10 max-w-md">
          <Package className="w-20 h-20 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Invalid Tracking ID</h2>
          <p className="text-gray-600">Tracking ID: <strong>{trackingId}</strong></p>
          <p className="text-gray-500 mt-4">We couldn't find any parcel with this ID.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white w-11/12 mx-auto rounded-2xl mt-8 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-second mb-3">Track Your Parcel</h1>
          <p className="text-xl text-gray-600">
            Tracking ID: <span className="font-mono font-bold text-main">{trackingId}</span>
          </p>
        </div>

        {/* Current Status Card */}
        {currentStatus && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 text-center border border-gray-200">
            <div className="flex justify-center mb-4">
              {currentStatus.icon}
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{currentStatus.label}</h2>
            <p className="text-lg text-gray-600">
              {currentStatus.label === "Delivered"
                ? "Your parcel has been delivered successfully!"
                : currentStatus.label === "Picked Up"
                ? "Your parcel has been collected and is on its way."
                : "Your parcel is being processed."}
            </p>
          </div>
        )}

        {/* Tracking Timeline */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <h3 className="text-2xl font-bold text-second mb-8 text-center">Parcel Journey</h3>

          <div className="space-y-10">
            {trackingLogs.map((log, index) => {
              const config = getStatusConfig(log.status);
              const isLatest = index === 0;

              return (
                <div key={log._id} className="flex gap-6 items-start relative">
                  {/* Icon Circle */}
                  <div className="shrink-0 z-10">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center border-4 transition-all ${
                        isLatest ? config.bgCircle : "border-gray-300 bg-gray-100"
                      }`}
                    >
                      {config.icon}
                    </div>
                  </div>

                  {/* Vertical Line */}
                  {index < trackingLogs.length - 1 && (
                    <div className="absolute left-8 top-16 bottom-0 w-1 bg-gray-300 -z-10"></div>
                  )}

                  {/* Content */}
                  <div className="flex-1 pb-8 pt-2">
                    <div
                      className={`inline-block px-5 py-2.5 rounded-full text-sm font-bold border-2 ${config.color} ${
                        isLatest ? "ring-4 ring-main/20" : ""
                      }`}
                    >
                      {config.label}
                    </div>
                    <p className="text-gray-700 font-medium mt-3">
                      {log.details.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(log.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}{" "}
                      at{" "}
                      {new Date(log.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Support */}
        <div className="mt-12 text-center bg-white rounded-2xl shadow p-6 border border-gray-200">
          <p className="text-gray-600">
            Questions? Contact us at{" "}
            <a href="mailto:support@zapshift.com" className="text-main font-bold hover:underline">
              support@zapshift.com
            </a>{" "}
            or call <strong>09678-123456</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrackParcel;