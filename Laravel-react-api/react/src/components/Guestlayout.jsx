import { Link, Navigate, Outlet } from "react-router-dom"
import { useStateContext } from "../contexts/Contextprovider"


import Footer from "./Footer";
import { useState } from "react";

export default function Guestlayout() {
    const {user, token} = useStateContext();

    if (token) {
        return <Navigate to="/"/>
    }
    return (

        <div className="">
            <div className="flex justify-center h-full">
                <Outlet/>
            </div>
            <Footer/>
        </div>

    )
}
