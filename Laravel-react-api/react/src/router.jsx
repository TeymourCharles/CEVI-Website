import {createBrowserRouter, Navigate} from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Users from "./views/Users";
import NotFound from "./views/Notfound";
import Defaultlayout from "./components/Defaultlayout";
import Guestlayout from "./components/Guestlayout";
import Dashboard from "./views/Dashboard";
import Homepage from "./views/Homepage";
import Forgotpassword from "./views/Forgotpassword";

const router = createBrowserRouter( [

    {
        path: '/',
        element: <Defaultlayout/>,
        children: [
            {
                path: '/',
                element: <Navigate to="/users"/>
            },
            {
                path: '/users',
                element: <Users/>
            },
            {
                path: '/dashboard',
                element: <Dashboard/>
            }
        ]
    },
    {
        path: '/',
        element: <Guestlayout/>,
        children: [
            {
                path: '/homepage',
                element: <Homepage/>
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/signup',
                element: <Signup/>
            },
            {
                path: '/forgotpassword',
                element: <Forgotpassword/>
            }

        ]
    },

    {
        path: '*',
        element: <NotFound/>
    }
])

export default router;
