import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from "../Pages/Home";
import Coverage from "../Pages/Coverage";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import SendParcel from "../Pages/SendParcel";
import DashboardLayout from "../Layouts/DashboardLayout";
import PrivateRoute from "../Provider/PrivateRoute";
import MyParcels from "../Pages/MyParcels";
import Payment from "../Pages/ParcelDetails";
import PaymentSuccess from "../Pages/PaymentSuccess";
import PaymentCanceled from "../Pages/PaymentCanceled";
import ParcelDetails from "../Pages/ParcelDetails";
import PaymentHistory from "../Pages/PaymentHistory";
import BeARider from "../Pages/BeARider";

export const router = createBrowserRouter([
    {
        path:'/',
        Component: Root,
        children:[
            {
                index: true,
                Component: Home
            },
            {
                path:'/coverage',
                Component: Coverage,
                loader: () => fetch('/warehouses.json').then(res=> res.json())
            },
            {
                path:'/sendParcel',
                Component: SendParcel,
                loader: () => fetch('/warehouses.json').then(res=> res.json())
            },
            {
                path:'/beARider',
                Component: BeARider,
                loader: () => fetch('/warehouses.json').then(res=> res.json())
            }
        ]
    },
    {
        path:'/',
        Component: AuthLayout,
        children:[
            {
                path:'/login',
                Component: Login
            },
            {
                path:'/register',
                Component: Register
            }
        ]
    },
    {
        path:'/dashboard',
        Component: DashboardLayout,
        children:[
            {
                path: '/dashboard/myParcels',
                element: <PrivateRoute><MyParcels /></PrivateRoute>
            },
            {
                path:'/dashboard/parcelDetails/:id',
                Component: ParcelDetails
            },
            {
                path: '/dashboard/payment-success',
                Component: PaymentSuccess
            },
            {
                path: '/dashboard/payment-canceled',
                Component: PaymentCanceled
            },
            {
                path: '/dashboard/paymentHistory',
                Component: PaymentHistory
            }
            
        ]
    }
])