import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const CompletedDelivery = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [] } = useQuery({
    queryKey: ["parcels", user?.email, "rider_assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user?.email}&deliveryStatus=parcel_deliverd`
      );
      return res.data;
    },
  });

  const calculatePayout = parcel =>{
    if(parcel.senderDistrict === parcel.receiverDistrict){
        return parcel.cost * 0.8
    }else{
        return parcel.cost * 0.6
    }
  }
  console.log(parcels);
  return <div className="m-12">
      <h3 className="md:text-5xl font-bold my-5">Completed Parcels</h3>
      <div className="w-full overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full min-w-max table-auto text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Parcel Info
              </th>
              <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Recipient Info
              </th>
              <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Delivery Status
              </th>
              <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment Info
              </th>
              <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                PayOut
              </th>
              <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
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
                  {parcel.deliveryStatus}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                  {parcel.cost}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {calculatePayout(parcel)}
                </td>
                <td className="py-4 px-2 space-x-2">
                  <button>dff</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>;
};

export default CompletedDelivery;
