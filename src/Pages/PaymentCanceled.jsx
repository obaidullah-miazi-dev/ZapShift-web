import React from 'react';
import { Link } from 'react-router';

const PaymentCanceled = () => {
    return (
        <div>
            <h3>Payment Canceled</h3>
            <Link to='/dashboard/myParcels'>
            <button>Go Back</button>
            </Link>
        </div>
    );
};

export default PaymentCanceled;