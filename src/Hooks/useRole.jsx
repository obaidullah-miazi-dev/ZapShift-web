import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useRole = () => {
    const {user} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()

    const {isLoading,data:role = 'user'} = useQuery({
        queryKey:['user-role',user?.email],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/users/${user?.email}/role`)
            return res.data
        }
    })
    return {isLoading,role}
};

export default useRole;