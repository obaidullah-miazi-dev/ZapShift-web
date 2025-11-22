import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useSearchParams } from 'react-router';

const PaymentSuccess = () => {
    const axiosSecure = useAxiosSecure()
    const [searchParams] = useSearchParams()
    const [paymentInfo,setPaymentInfo] = useState({})
    const sessionId = searchParams.get('session_id')
    useEffect(()=>{
        if(sessionId){
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
            .then(res=>{
                console.log(res.data);
                setPaymentInfo({
                    transactionId: res.data.transactionId,
                    trackingId: res.data.trackingId
                })
            })
        }
    },[axiosSecure,sessionId])
    return (
        <div>
            <h3>Payment Successful</h3>
            <p>Transaction Id : {paymentInfo.transactionId}</p>
            <p>Tracking Id : {paymentInfo.trackingId}</p>
        </div>
    );
};

export default PaymentSuccess;