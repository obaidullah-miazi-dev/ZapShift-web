import React from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const AssignRider = () => {
    const axiosSecure = useAxiosSecure()
    const {data:parcels = []} = useQuery({
        queryKey:['parcels', 'pending-pickup'],
        queryFn: async () =>{
            const res = await axiosSecure.get('/parcels?deliveryStatus=pending-pickup')
            return res.data 
        }
    })
    console.log(parcels)
    return (
        <div className="m-12">
      <h3 className="md:text-5xl font-bold my-5">Assign To Rider</h3>
      <div className="w-full overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full min-w-max table-auto text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Parcel Info
              </th>
              <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Transation ID
              </th>
              <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tracking ID
              </th>
              
              <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Delivery Status
              </th>
              <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pickup District
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
                
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {parcel.transactionId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {parcel.trackingId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {parcel.deliveryStatus}
                </td>
                <td className="px-6 py-4">
                  {parcel.senderDistrict}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                  {parcel.cost}
                </td>
                <td className="py-4 px-2 space-x-2">
                  <button className='btn bg-main'>Assign to Rider</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default AssignRider;