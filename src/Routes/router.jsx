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
import RiderApproval from "../Pages/RiderApproval";
import UserManagement from "../Pages/UserManagement";
import AdminOnlyRoute from "../Provider/AdminOnlyRoute";
import AssignRider from "../Pages/AssignRider";
import RiderOnlyRoute from "../Provider/RiderOnlyRoute";
import DelliveryAssign from "../Pages/DelliveryAssign";
import CompletedDelivery from "../Pages/CompletedDelivery";
import TrackParcel from "../Pages/TrackParcel";

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
                element: <PrivateRoute><SendParcel/></PrivateRoute>,
                loader: () => fetch('/warehouses.json').then(res=> res.json())
            },
            {
                path:'/beARider',
                element:<PrivateRoute><BeARider/></PrivateRoute>,
                loader: () => fetch('/warehouses.json').then(res=> res.json())
            },
            {
                path: '/track-parcel/:trackingId',
                Component: TrackParcel
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
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children:[
            {
                path: '/dashboard/myParcels',
                Component: MyParcels
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
            },
            {
                path: '/dashboard/riderApproval',
                element: <AdminOnlyRoute><RiderApproval/></AdminOnlyRoute>
            },
            {
                path: '/dashboard/userManagement',
                element: <AdminOnlyRoute><UserManagement/></AdminOnlyRoute>
            },
            {
                path: '/dashboard/assignRider',
                element: <AdminOnlyRoute><AssignRider/></AdminOnlyRoute>
            },
            {
                path: '/dashboard/deliveryAssign',
                element: <RiderOnlyRoute><DelliveryAssign/></RiderOnlyRoute>
            },
            {
                path: '/dashboard/completedDelivery',
                element: <RiderOnlyRoute><CompletedDelivery/></RiderOnlyRoute>
            }
            
        ]
    }
])