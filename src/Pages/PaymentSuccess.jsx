import React, { useEffect } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useSearchParams } from 'react-router';

const PaymentSuccess = () => {
    const axiosSecure = useAxiosSecure()
    const [searchParams] = useSearchParams()
    const sessionId = searchParams.get('session_id')
    useEffect(()=>{
        if(sessionId){
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
            .then(res=>{
                console.log(res.data);
            })
        }
    },[])
    return (
        <div>
            <h3>Payment Successful</h3>
        </div>
    );
};

export default PaymentSuccess;