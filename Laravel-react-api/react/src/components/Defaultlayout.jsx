import { Link, Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useStateContext } from "../contexts/Contextprovider";

import { BsArrowLeft } from "react-icons/bs";
import { MdDashboardCustomize } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { FaEarlybirds } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import axiosClient from "../axios-client";

import ceviLogo from "../assets/cevi-logo.png"
import logo from '../assets/only-logo.png';
import name from '../assets/cevi-name.png';

export default function Defaultlayout() {
    const [open, setOpen] = useState(true);

    const {user, token, setUser, setToken} = useStateContext();


    useEffect(() => {
        axiosClient.get('/user')
        .then(({data}) =>{
            setUser(data)
        })
    }, [])

    if (!token) {
        return <Navigate to="/homepage"/>
    }

    const onLogout = async (ev) => {
        ev.preventDefault();

        try {
            await axiosClient.post('/logout');
            setUser({});
            setToken(null);
          } catch (error) {
            console.error('Logout failed:', error);
            // Handle error if needed, e.g., show a notification
          }
    }



    return (
        <div className="">
            <aside className={`${open ? "w-72" : "w-20"} duration-300 bg-gradient-to-r from-custom-lightGray to-custom-darkGray text-white fixed left-0 top-0 h-full flex flex-col py-8 space-y-4`}>

                    <BsArrowLeft className={`${!open && "rotate-180"} duration-300 bg-gradient-to-r from-custom-colorOne to-custom-brown text-black text-3xl rounded-full absolute -right-3 border border-custom-brown cursor-pointer`}
                    onClick={() => setOpen(!open)}/>
                    <div className="inline-flex p-1 pt-2 pb-2 hover:bg-gray-600 rounded-md m-1">
                        <MdDashboardCustomize className={`${open && "rotate-[360deg]"} text-4xl fixed block float-left ml-5 text-custom-colorOne duration-500`}/>
                        <Link className={`${!open && "scale-0"} duration-300 origin-left font-medium text-custom-colorOne text-2xl ml-20`} to="/dashboard">Dashboard</Link>
                    </div>


                    <div className="inline-flex p-1 pt-2 pb-2 hover:bg-gray-600 rounded-md m-1">
                        <FiUsers className={`${open && "rotate-[360deg]"} text-4xl fixed block float-left ml-5 text-custom-colorOne duration-500`}/>
                        <Link className={`${!open && "scale-0"} duration-300 origin-left font-medium text-custom-colorOne text-2xl ml-20`} to="/users">Users</Link>
                    </div>

            </aside>

            <div>
            <header className="flex rounded-lg shadow-lg p-1">
                <div className="flex-grow">
                    <div className="flex justify-center lg:ml-72 ml-36">
                        <img className="w-32 mt-2" src={logo} alt="Cevi Logo" />
                        <img className="lg:block hidden w-72 h-9 mt-4 ml-4" src={name} alt="Business name" />
                    </div>



                </div>

                <div className="mr-4 w-[20%]">

                    <div className="flex justify-end">

                        <h3 className="text-black pr-2 pt-1">{user.first_name}</h3>

                        <CgProfile className="text-4xl text-custom-lightGray"/>
                    </div>
                    <div className="flex justify-end mt-1">
                        <button className="transition duration-700 ease-in-out border-2 hover:border-stone-800 hover:text-white rounded-full text-custom-colorOne bg-gradient-to-b from-custom-lightGray to-custom-darkGray py-1 px-4 ml-30 text-sm" onClick={onLogout}>Logout</button>
                    </div>

                </div>
            </header>

            <main className="flex justify-center ">
                <Outlet/>
            </main>
            </div>


        </div>
    )
}
