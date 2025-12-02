import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#00C49F"];

const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const { data: stat } = useQuery({
    queryKey: ["parcels-deliveryStatus-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels/deliveryStatus/stats");
      return res.data;
    },
  });

  const getPieChartData = (data) => {
    return data?.map((item) => ({
      name: item.status || "Unknown",
      value: item.count,
    }));
  };

  return (
    <div className="m-8">
      <h3 className="text-2xl font-bold">Dashboard Overview</h3>
      <p>You can access all your data and information from here. </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 mt-5">
        {stat?.map((s) => (
          <div className="bg-[#fbfff1] border-2 border-[#dcff83] rounded-2xl p-5 flex justify-center items-center flex-col">
            <p>{s.status}</p>
            <h3 className="font-bold text-2xl mt-2 text-center">{s.count}</h3>
          </div>
        ))}
      </div>

      <div className="mt-14 rounded-2xl shadow-lg p-5">
        <h3 className="text-2xl font-bold">Overall Statistics</h3>


        {/* ------ Pie Chart Here ------ */}
        <div className="w-full mx-auto h-80 rounded-2xl flex justify-center mt-10 border-2 border-gray-300 md:p-6">
          <ResponsiveContainer width='100%' height='100%'>
            <AreaChart
              data={getPieChartData(stat)}
              margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
            >
              {/* Soft Grid */}
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />

              {/* X Axis */}
              <XAxis dataKey="name" />

              {/* Y Axis */}
              <YAxis />

              {/* Tooltip */}
              <Tooltip
                contentStyle={{
                  borderRadius: "10px",
                  border: "none",
                  boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                }}
                labelStyle={{ fontWeight: "bold" }}
                itemStyle={{ color: "#4CAF50" }}
              />

              {/* Gradient Fill */}
              <defs>
                <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#caeb66" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#caeb66" stopOpacity={0.1} />
                </linearGradient>
              </defs>

              {/* Smooth Area Line */}
              <Area
                type="monotone"
                dataKey="value"
                stroke="#caeb66"
                strokeWidth={3}
                fill="url(#colorGreen)"
                activeDot={{ r: 6, fill: "#4CAF50" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
