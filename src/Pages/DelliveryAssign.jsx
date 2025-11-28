import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const DelliveryAssign = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", user?.email, "rider_assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user?.email}&deliveryStatus=rider_assigned`
      );
      return res.data;
    },
  });

  const handleUpdateDeliveryStatus = (parcel, status) => {
    const parcelInfo = { deliveryStatus: status };
    axiosSecure
      .patch(`/parcels/${parcel._id}/status`, parcelInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          alert(`Thanks for ${status.split("_").join(" ")}`);
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
  console.log(parcels);
  return (
    <div className="m-12">
      <h3 className="md:text-5xl font-bold my-5">Assigned Deliveries</h3>
      <div className="w-full overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full min-w-max table-auto text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Parcel Info
              </th>
              <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sender Info
              </th>
              <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Receiver Info
              </th>
              <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tracking ID
              </th>
              <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pickup Location
              </th>
              <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pickup Instruction
              </th>
              <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Delivery Status
              </th>
              <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment Info
              </th>
              <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
              <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Others Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {parcels.map((parcel) => (
              <tr key={parcel._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {parcel.parcelName}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 font-medium">
                    {parcel.senderName || "-"}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {parcel.senderAddress}
                  </div>
                  {parcel.receiverContact && (
                    <div className="text-sm text-gray-900 mt-1">
                      +88{parcel.senderContact}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 font-medium">
                    {parcel.receiverName || "-"}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {parcel.receiverAddress}
                  </div>
                  {parcel.receiverContact && (
                    <div className="text-sm text-gray-900 mt-1">
                      +88{parcel.receiverContact}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {parcel.trackingId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {parcel.senderDistrict} <br />
                  {parcel.senderAddress}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {parcel.pickupInstruction}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {parcel.deliveryStatus}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                  {parcel.cost} (paid)
                </td>
                <td className="py-4 px-2 space-x-2">
                  {parcel.deliveryStatus === "rider_assigned" ? (
                    <>
                      <button
                        onClick={() =>
                          handleUpdateDeliveryStatus(parcel, "rider_arriving")
                        }
                        className="bg-green-500 px-3.5 text-white py-1 rounded-lg"
                      >
                        Accept
                      </button>
                      <button className="bg-orange-500 px-3.5 text-white py-1 rounded-lg">
                        Reject
                      </button>
                    </>
                  ) : (
                    <span className="text-green-600">Accepted</span>
                  )}
                </td>

                <td className="py-4 px-2 space-x-2">
                  {parcel.deliveryStatus === "rider_arriving" && (
                    <button
                      onClick={() =>
                        handleUpdateDeliveryStatus(parcel, "parcel_pickedUp")
                      }
                      className="bg-green-500 px-3.5 text-white py-1 rounded-lg"
                    >
                      Mark as Picked Up
                    </button>
                  )}

                  {parcel.deliveryStatus === "parcel_pickedUp" && (
                    <button
                      onClick={() =>
                        handleUpdateDeliveryStatus(parcel, "parcel_deliverd")
                      }
                      className="bg-green-500 px-3.5 text-white py-1 rounded-lg"
                    >
                      Mark as Deliverd
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DelliveryAssign;
