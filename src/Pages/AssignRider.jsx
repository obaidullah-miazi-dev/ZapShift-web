import React, { useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";

const AssignRider = () => {
  const axiosSecure = useAxiosSecure();
  const modalbox = useRef()
  const [selectedParcel,setSelectedParcel] = useState(null)


  const { data: parcels = [],refetch } = useQuery({
    queryKey: ["parcels", "pending-pickup"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?deliveryStatus=pending-pickup"
      );
      return res.data;
    },
  });

  const {data:riders= []} =useQuery({
    queryKey:['riders',selectedParcel?.senderDistrict, 'available'],
    enabled: !!selectedParcel,
    queryFn: async()=>{
        const res = await axiosSecure.get(`/riders?status=accepted&district=${selectedParcel.senderDistrict}&workStatus=available`)
        return res.data 
    }
  })

  console.log(parcels);


  const handleModalOpen = parcel =>{
    setSelectedParcel(parcel)
    modalbox.current.showModal()
  }

  const handleAssignRider = (rider) =>{
    const riderInfo = {
        riderId : rider?._id,
        riderEmail:rider?.email,
        riderName: rider?.name,
        parcelId: selectedParcel?._id,
        trackingId:selectedParcel?.trackingId
    }
    axiosSecure.patch(`/parcels/${selectedParcel._id}`,riderInfo)
    .then(res =>{
        if(res.data.modifiedCount){
            modalbox.current.close()
            refetch()
            alert('rider assigned')
        }
    })
    .catch(err=>{
        console.log(err)
        alert(err)
    })

  }
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
                <td className="px-6 py-4">{parcel.senderDistrict}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                  {parcel.cost}
                </td>
                <td className="py-4 px-2 space-x-2">
                  <button className="btn bg-main" onClick={()=>handleModalOpen(parcel)}>Find Rider</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>



      
      <dialog ref={modalbox} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-2">Available Riders : {riders.length}</h3>

          <table className="w-full min-w-max table-auto text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rider Name
              </th>
              <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rider Email
              </th>
              
              <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {riders.map((rider) => (
              <tr key={rider._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {rider?.name}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 font-medium">
                    {rider?.email || "-"}
                  </div>
                </td>
               
                <td className="py-4 px-2 space-x-2">
                  
                    <button onClick={()=>handleAssignRider(rider)} className="btn bg-main" title="Info">
                      Assign Rider
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
          
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignRider;
