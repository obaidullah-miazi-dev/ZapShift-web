import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from "../Pages/Home";
import Coverage from "../Pages/Coverage";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

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
    }
])