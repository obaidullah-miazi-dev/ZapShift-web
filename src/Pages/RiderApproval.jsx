import Container from "../components/Container";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const RiderApproval = () => {
  const axiosSecure = useAxiosSecure();

  const { data: riders = [], refetch } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });
  console.log(riders)

  const updateRiderStatus = (rider, status) => {
    const updateInfo = { status: status, email: rider?.email };
    axiosSecure
      .patch(`/riders/${rider?._id}`, updateInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount) {
          alert(`riders status set to ${status}`);
          refetch();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAccept = (rider) => {
    updateRiderStatus(rider, "accepted");
  };

  const handleReject = (rider) => {
    updateRiderStatus(rider, "rejected");
  };

  const handleDelete = (rider) => {
console.log('rider delete button called',rider)
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "accepted":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Accepted
          </span>
        );
      case "rejected":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Rejected
          </span>
        );
      case "pending":
      default:
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Pending
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container>
        <div className="mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-second mb-8">
            Rider Approval Dashboard
          </h1>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Rider Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      District
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Working Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {riders.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-12 text-center text-gray-500"
                      >
                        No pending riders found.
                      </td>
                    </tr>
                  ) : (
                    riders.map((rider) => (
                      <tr
                        key={rider._id}
                        className="hover:bg-gray-50 transition"
                      >
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-lime-100 flex items-center justify-center text-lime-700 font-bold">
                              <img src={rider.photoURL} alt={rider.name} className="rounded-full"/>
                            </div>
                            <span className="ml-3 font-medium text-gray-900">
                              {rider.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-gray-600">
                          {rider.email}
                        </td>
                        <td className="px-6 py-5 text-gray-600">
                          {rider.district}
                        </td>
                        <td className={`px-6 py-5 ${rider.workStatus === 'available' ? 'text-green-600' : 'text-red-600'}`}>
                          {rider.workStatus}
                        </td>
                        <td className="px-6 py-5">
                          {getStatusBadge(rider.status)}
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center justify-end gap-2">
                            {rider.status === "pending" && (
                              <>
                                <button
                                  onClick={() => handleAccept(rider)}
                                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition shadow-sm"
                                >
                                  Accept
                                </button>
                                <button
                                  onClick={() => handleReject(rider)}
                                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition shadow-sm"
                                >
                                  Reject
                                </button>
                              </>
                            )}
                            <button
                              onClick={() => handleDelete(rider)}
                              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition shadow-sm"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary Stats (Optional) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
              <p className="text-3xl font-bold text-green-600">
                {riders.filter((r) => r.status === "accepted").length}
              </p>
              <p className="text-gray-600 mt-1">Accepted Riders</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
              <p className="text-3xl font-bold text-yellow-600">
                {riders.filter((r) => r.status === "pending").length}
              </p>
              <p className="text-gray-600 mt-1">Pending Approval</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
              <p className="text-3xl font-bold text-red-600">
                {riders.filter((r) => r.status === "rejected").length}
              </p>
              <p className="text-gray-600 mt-1">Rejected</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default RiderApproval;
