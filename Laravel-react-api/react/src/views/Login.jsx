import { Link } from "react-router-dom";

import logo from '../assets/only-logo.png';
import name from '../assets/cevi-name.png';

import { FaUser } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useStateContext } from "../contexts/Contextprovider";
import axiosClient from "../axios-client";
import Swal from 'sweetalert2';
import ClipLoader from "react-spinners/ClipLoader";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();

    const {user, setUser, setToken} = useStateContext();
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [checkStatus, setCheckStatus] = useState (false);


    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }

        setErrors('');
        setMessage('');
        setLoading(true);

        axiosClient.post('/login', payload)
        .then(({data}) => {
        setUser(data.user)
        setToken(data.token);
        setLoading(false);

        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: "success",
            title: "Logged in successfully"
        });


        })
        .catch(err => {
            const response = err.response;
            if (response && response.status == 422){
                if (response.data.errors) {
                    setErrors(response.data.errors);
                    setLoading(false);
                    console.log(response.data.errors);
                } else {
                    setMessage(response.data.message);
                    setLoading(false);
                }
            }
        })
    }

    return (
        <div className="flex-wrap justify-center lg:w-[40%] w-96">

            <header className="">
                <nav className="items-center w-[92%]">
                    <div className="flex justify-end py-4 gap-6 px-10">
                    <div className="transform transition-transform duration-300 hover:scale-110">
                            <Link className="duration-500 text-custom-brown" to="/homepage">Home</Link>
                        </div>
                        <div className="transform transition-transform duration-300 hover:scale-110">
                            <Link className="duration-500 text-custom-brown" to="/signup">Signup</Link>
                        </div>
                    </div>
                    <div className="bg-gradient-to-r from-custom-colorOne via-neutral-700 to-custom-brown h-1 rounded-sm"></div>
                    <div className="text-center pt-2">

                        <div className="flex justify-center w-full py-2 px-3">
                            <img className="w-25 h-24" src={logo} alt="cevi logo and name" />
                        </div>
                        <div className="flex justify-center">
                            <img className="w-[59%]" src={name} alt="cevi name" />
                        </div>

                    </div>



                </nav>

            </header>



            <div className={`md:w-[93%] w-[95%] p-6 shadow-lg bg-white rounded-md mt-[4%] mb-20 relative ${loading && "opacity-50"}`}>
                {loading && <ClipLoader className="absolute left-[45%] top-[43%]"
                            color={'#010101'}
                            loading={loading}
                            size={50}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />}
                <div className="inline-flex w-full justify-center mb-2">
                    <FaUser className="text-3xl m-2"/>
                    <h1 className="text-3xl block font-semibold">Login</h1>
                </div>

                <hr className="m-3"/>

                <form onSubmit={onSubmit}>
                    <div className="mt-3">
                        <label htmlFor="email" className="block text-base mb-2">Email</label>
                        <input ref={emailRef} className="border w-full text-base px-2 py-1 focus:outline-none focus:border-gray-500" type="email" id="email" placeholder="Enter email"/>
                        <span className="text-red-500">{errors.email}</span>
                    </div>
                    <div className="mt-3">
                        <label htmlFor="password" className="block text-base mb-2">Password</label>
                        <input ref={passwordRef} className="border w-full text-base px-2 py-1 focus:outline-none focus:border-gray-500" type="password" id="password" placeholder="Enter password"/>
                        <span className="text-red-500">{errors.password}</span>
                        {message && <span className="text-red-500">{message}</span>}
                        <br />
                        <Link to="/forgotpassword" className="underline hover:text-blue-500">Forgot password?</Link>
                    </div>


                    <div className="flex justify-center mb-4">
                        {!loading ?
                            <button className="transition duration-700 ease-in-out md:w-64 w-full rounded-full text-custom-colorOne text-1xl border-2 bg-gradient-to-b from-custom-lightGray to-custom-darkGray hover:bg-white hover:text-white hover:border-stone-800 p-1 pr-4 pl-4 m-2" type="submit">Login</button>
                        :
                            <button className="md:w-64 w-full rounded-full text-white text-1xl border-2 bg-custom-lightGray p-1 pr-4 pl-4 m-2" type="submit" disabled>Loading...</button>
                        }

                    </div>

                    <div className="flex justify-center">
                        <p>Not registered yet?</p>
                        <Link to="/signup" className="underline  ml-3 hover:text-blue-500">Click Sign up</Link>
                    </div>

                </form>

            </div>
        </div>

    )
}
