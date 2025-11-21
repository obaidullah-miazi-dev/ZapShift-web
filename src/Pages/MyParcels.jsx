import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { BanknoteArrowUp, Delete, Edit, Info, Trash, View } from "lucide-react";
import { Link } from "react-router";

const MyParcels = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data;
    },
  });

  const handleDelete = (id) => {
    axiosSecure
      .delete(`/parcels/${id}`)
      .then((res) => {
        if (res.data.deletedCount) {
          refetch();
          alert("parcels request deleted successfully");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="m-12">
      <h3 className="md:text-5xl font-bold my-5">Manage Parcels</h3>
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
                Tracking Number
              </th>
              <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment Info
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
                  {parcel._id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                  {parcel.cost}{" "}
                  <span
                    className={`${
                      parcel.paymentStatus === "Paid"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    ({parcel?.paymentStatus})
                  </span>
                </td>
                <td className="py-4 px-2 space-x-2">
                  <button
                    className="btn btn-square text-green-500"
                    title="Edit"
                  >
                    <Edit />
                  </button>
                  <button
                    onClick={() => handleDelete(parcel._id)}
                    className="btn btn-square text-red-500"
                    title="delete"
                  >
                    <Trash />
                  </button>
                  <button className="btn btn-square" title="Info">
                    <Info />
                  </button>

                  <Link to={`/dashboard/parcels/${parcel._id}`}>
                    <button
                      className="btn btn-square bg-main text-black"
                      title="Pay"
                    >
                      Pay
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
