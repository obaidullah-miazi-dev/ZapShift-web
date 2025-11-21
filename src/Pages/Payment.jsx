import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const Payment = () => {
    const axiosSecure = useAxiosSecure()
    const {id} = useParams()
    const {data:parcels = []} = useQuery({
        queryKey:['parcel',id],
        queryFn: async ()=>{
            const res = await axiosSecure.get(`/parcels/${id}`)
            return res.data
        }
    })
    console.log(parcels);
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 m-12'>
            <div className='bg-base-200 p-5 rounded-2xl text-gray-500'>
                <h3 className='font-bold text-black text-2xl'>Sender Info</h3>
                <p>Name: {parcels?.senderName}</p>
                <p>Phone: {parcels?.senderContact}</p>
                <p>Email: {parcels?.senderEmail}</p>
                <p>Region: {parcels?.senderRegion}</p>
                <p>Address: {parcels?.senderAddress}</p>
            </div>
            <div className='bg-base-200 p-5 rounded-2xl text-gray-500'>
                <h3 className='font-bold text-black text-2xl'>Receiver Info</h3>
                <p>Name: {parcels?.receiverName}</p>
                <p>Phone: {parcels?.receiverContact}</p>
                <p>Email: {parcels?.receiverEmail}</p>
                <p>Region: {parcels?.receiverRegion}</p>
                <p>Address: {parcels?.receiverAddress}</p>
            </div>
            <div className='bg-base-200 p-5 rounded-2xl text-gray-500'>
                <h3 className='font-bold text-black text-2xl'>Parcel Details</h3>
                <p>Title: {parcels?.parcelName}</p>
                <p>Type: {parcels?.parcelType}</p>
                <p>Weight: {parcels?.parcelWeight}</p>
                <p>Charge: {parcels?.cost}</p>
                <p>Status: {parcels?.paymentStatus}</p>
                <p>Pickup Instruction: {parcels?.pickupInstruction}</p>
                <p>Delivery Instruction: {parcels?.deliveryInstruction}</p>
                <button className='bg-main btn btn-wide'>Pay</button>
            </div>
        </div>
    );
};

export default Payment;