import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxios from "../Hooks/useAxios";

const TrackParcel = () => {
  const { trackingId } = useParams();
  const axiosInstance = useAxios();
  const { data: trackingLogs } = useQuery({
    queryKey: ["track-parcel", trackingId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/track-parcel/${trackingId}/logs`);
      return res.data;
    },
  });
  console.log(trackingLogs);
  return (
    <div className="bg-white rounded-2xl mt-8 w-11/12 mx-auto pt-6 pb-16 px-5">
      Track Parcel of this : {trackingId}
      <p>total track: {trackingLogs?.length}</p>
      <ul className="timeline timeline-vertical">
        {trackingLogs?.map((log) => (
          <li key={log._id}>
            <div className="timeline-start">
              {new Date(log.createdAt).toLocaleString()}
            </div>
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="timeline-end timeline-box">
              <span className="text-xl">{log.details}</span>
            </div>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrackParcel;
