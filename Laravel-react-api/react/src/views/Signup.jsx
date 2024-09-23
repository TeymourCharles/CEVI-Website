import { Link } from "react-router-dom";

import logo from '../assets/only-logo.png';
import name from '../assets/cevi-name.png';

import { FaUser } from "react-icons/fa";
import { useRef, useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/Contextprovider";

export default function Signup() {
    const first_nameRef = useRef();
    const last_nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const password_confirmationRef = useRef();

    const {setUser, setToken} = useStateContext();
    const [errors, setErrors] = useState({});

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            first_name: first_nameRef.current.value,
            last_name: last_nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: password_confirmationRef.current.value
        }

        setErrors('');
        axiosClient.post('/signup', payload)
        .then(({data}) => {
            setUser(data.user);
            setToken(data.token);
        })
        .catch(err => {
            const response = err.response;
            if (response && response.status == 422){
                setErrors(response.data.errors);
                console.log(response.data.errors);
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
                            <Link className="duration-500 text-custom-brown" to="/login">Login</Link>
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
            <div className="md:w-[93%] w-[95%] p-6 shadow-lg bg-white rounded-md mt-[4%] mb-10">

                <div className="inline-flex w-full justify-center mb-2">
                    <FaUser className="text-3xl m-2"/>
                    <h1 className="text-3xl block font-semibold">Sign up</h1>
                </div>

                <hr className="m-3"/>

                <form onSubmit={onSubmit}>

                {/*errors && <div className="text-red-500">
                    {Object.keys(errors).map(key => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>
                */}

                    <div className="mt-3">
                        <label htmlFor="first_name" className="block text-base mb-2">First Name</label>
                        <input ref={first_nameRef} className="border w-full text-base px-2 py-1 focus:outline-none focus:border-gray-500" type="text" id="first_name" placeholder="Enter first name"/>
                        <span className="text-red-500">{errors.first_name}</span>
                    </div>
                    <div className="mt-3">
                        <label htmlFor="last_name" className="block text-base mb-2">Last Name</label>
                        <input ref={last_nameRef} className="border w-full text-base px-2 py-1 focus:outline-none focus:border-gray-500" type="text" id="last_name" placeholder="Enter last name"/>
                        <span className="text-red-500">{errors.last_name}</span>
                    </div>
                    <div className="mt-3">
                        <label htmlFor="email" className="block text-base mb-2">Email</label>
                        <input ref={emailRef} className="border w-full text-base px-2 py-1 focus:outline-none focus:border-gray-500" type="email" id="email" placeholder="Enter email"/>
                        <span className="text-red-500">{errors.email}</span>
                    </div>

                    <div className="mt-3">
                        <label htmlFor="password" className="block text-base mb-2">Password</label>
                        <input ref={passwordRef} className="border w-full text-base px-2 py-1 focus:outline-none focus:border-gray-500" type="password" id="password" placeholder="Enter password"/>
                        <span className="text-red-500">{errors.password}</span>
                    </div>
                    <div className="mt-3">
                        <label htmlFor="password_confirmation" className="block text-base mb-2">Password Confirmation</label>
                        <input ref={password_confirmationRef} className="border w-full text-base px-2 py-1 focus:outline-none focus:border-gray-500" type="password" id="password_confirmation" placeholder="Repeat Password"/>
                        <span className="text-red-500">{errors.password_confirmation}</span>

                    </div>


                    <div className="flex justify-center mb-4 my-3">
                        <button className="transition duration-700 ease-in-out md:w-64 w-full rounded-full text-custom-colorOne text-1xl border-2 bg-gradient-to-b from-custom-lightGray to-custom-darkGray hover:text-white hover:border-stone-800 p-1 pr-4 pl-4 m-2" type="submit">Sign up</button>
                    </div>



                </form>

            </div>

        </div>


    )
}
