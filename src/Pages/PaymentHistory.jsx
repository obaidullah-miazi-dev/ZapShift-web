import React, { useContext } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Provider/AuthProvider";
import { Link } from "react-router";
import { Info } from "lucide-react";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const { data: paymentsHistory = [] } = useQuery({
    queryKey: ["paymentHistory", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/?email=${user?.email}`);
      return res.data;
    },
  });
  console.log(paymentsHistory);
  return (
    <div className="m-12">
      <h3 className="md:text-5xl font-bold my-5">Payment History</h3>
      <div className="w-full overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full min-w-max table-auto text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                payment Info
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
            {paymentsHistory.map((payment) => (
              <tr key={payment._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {payment.parcelName}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 font-medium">
                    {payment.customerEmail || "-"}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {payment.trackingId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                  {payment.amount} ({payment.paymentStatus})
                </td>
                <td className="py-4 px-2 space-x-2">
                  <Link to={`/dashboard/parcelDetails/${payment.parcelId}`}>
                    <button className="btn btn-square" title="Info">
                      <Info />
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

export default PaymentHistory;
