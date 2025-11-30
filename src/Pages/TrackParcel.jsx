import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxios from '../Hooks/useAxios';

const TrackParcel = () => {
    const {trackingId} = useParams()
    const axiosInstance = useAxios()
    const {data: trackingLogs} = useQuery({
        queryKey:['track-parcel',trackingId],
        queryFn:async()=>{
            const res = await axiosInstance.get(`/track-parcel/${trackingId}/logs`)
            return res.data
        }
    })
    console.log(trackingLogs)
    return (
        <div className='bg-white rounded-2xl mt-8 w-11/12 mx-auto pt-6 pb-16 px-5'>
            Track Parcel of this : {trackingId}
            <p>{trackingLogs?.length}</p>
        </div>
    );
};

export default TrackParcel;