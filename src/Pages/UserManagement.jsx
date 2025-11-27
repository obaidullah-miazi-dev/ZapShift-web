
import {  useQuery} from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { Shield, ShieldOff } from 'lucide-react';


const UserManagement = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['user-manage'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    },
  });

  


  

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-main"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="w-11/12 mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-second mb-8 text-center">
          User Management
        </h1>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Current Role
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50 transition">
                      {/* User Info */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <img
                            src={user.photoURL || "https://i.ibb.co/h1KPqV8B/boy-cartoon-wallpaper.png"}
                            alt={user.displayName}
                            className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                          />
                          <div>
                            <p className="font-semibold text-gray-900">{user.displayName || "Anonymous"}</p>
                            <p className="text-sm text-gray-500">ID: {user._id.slice(-6)}</p>
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-6 py-5 text-gray-700">
                        {user.email}
                      </td>

                      {/* Current Role Badge */}
                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                            user.role === 'admin'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {user.role || 'user'}
                        </span>
                      </td>

                      {/* Action: Toggle Admin */}
                      <td className="px-6 py-5 text-center">
                          {user.role === 'admin' ? (
                            <button className='group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-white bg-red-500 transition-all
                            disabled:opacity-60'>
                              <ShieldOff className="w-4 h-4" />
                              Remove Admin
                            </button>
                          ) : (
                            <button className='group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all
                            disabled:opacity-60 bg-main'>
                              <Shield className="w-4 h-4" />
                              Make Admin
                            </button>
                          )}
                          {/* Tooltip */}
                          <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                            {user.role === 'admin' ? 'Remove admin access' : 'Grant admin access'}
                          </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Total Users Summary */}
        <div className="mt-8 text-center">
          <p className="text-lg text-gray-600">
            Total Users: <span className="font-bold text-second">{users.length}</span> | 
            Admins: <span className="font-bold text-purple-600">
              {users.filter(u => u.role === 'admin').length}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;