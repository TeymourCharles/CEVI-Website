import { Link, Navigate } from "react-router-dom";

import logo from '../assets/only-logo.png';
import name from '../assets/cevi-name.png';

import { FaUser } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/Contextprovider";
import ClipLoader from "react-spinners/ClipLoader";
import Swal from "sweetalert2";

export default function Signup() {
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [email, setEmail] = useState('');
    const [proof_id, setProof_id] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPassword_confirmation] = useState('');



    const {user, setUser, setToken} = useStateContext();
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const onSubmit = (ev) => {
        ev.preventDefault();

        const formData= new FormData();
            formData.append('first_name', first_name);
            formData.append('last_name', last_name);
            formData.append('proof_id', proof_id);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('password_confirmation', password_confirmation);

        setErrors('');
        setLoading(true);
        axiosClient.post('/signup', formData)
        .then(() => {
            //setUser(data.user);
            //setToken(data.token);

            setLoading(false);
            Swal.fire({
                title: "Signed up Successfully",
                text: "Please login your account to check your status.",
                icon: "success",
                confirmButtonText: "OK",
                customClass: {
                    confirmButton: 'bg-custom-colorOne hover:bg-green-700 text-white font-bold py-2 px-4 w-20 rounded-1xl'
                }
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '/login'; // Redirect to login page
                    }
                });



        })
        .catch(err => {
            const response = err.response;
            if (response && response.status == 422){
                setErrors(response.data.errors);
                setLoading(false);
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
            <div className={`md:w-[93%] w-[95%] p-6 shadow-lg bg-white rounded-md mt-[4%] mb-10 relative ${loading && "opacity-50"}`}>
                    {loading && <ClipLoader className="absolute left-[45%] top-[47%]"
                        color={'#010101'}
                        loading={loading}
                        size={50}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />}
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
                        <input onChange={(ev) => setFirst_name(ev.target.value)} className="border w-full text-base px-2 py-1 focus:outline-none focus:border-gray-500" type="text" id="first_name" name="first_name" placeholder="Enter first name"/>
                        <span className="text-red-500">{errors.first_name}</span>
                    </div>
                    <div className="mt-3">
                        <label htmlFor="last_name" className="block text-base mb-2">Last Name</label>
                        <input onChange={(ev) => setLast_name(ev.target.value)} className="border w-full text-base px-2 py-1 focus:outline-none focus:border-gray-500" type="text" id="last_name" name="last_name" placeholder="Enter last name"/>
                        <span className="text-red-500">{errors.last_name}</span>
                    </div>
                    <div className="mt-3">
                        <label htmlFor="email" className="block text-base mb-2">Email</label>
                        <input onChange={(ev) => setEmail(ev.target.value)} className="border w-full text-base px-2 py-1 focus:outline-none focus:border-gray-500" type="email" id="email" name="email" placeholder="Enter email"/>
                        <span className="text-red-500">{errors.email}</span>
                    </div>

                    <div className="mt-3">
                        <label htmlFor="proof_id" className="block text-base mb-2">Upload your ID picture:</label>
                        <input onChange={(ev) => setProof_id(ev.target.files[0])} className="border w-full text-base px-2 py-1 focus:outline-none focus:border-gray-500" type="file" id="proof_id" name="proof_id" placeholder="Upload image"/>
                        <span className="text-red-500">{errors.proof_id}</span>
                    </div>

                    <div className="mt-3">
                        <label htmlFor="password" className="block text-base mb-2">Password</label>
                        <input onChange={(ev) => setPassword(ev.target.value)} className="border w-full text-base px-2 py-1 focus:outline-none focus:border-gray-500" type="password" id="password" name="password" placeholder="Enter password"/>
                        <span className="text-red-500">{errors.password}</span>
                    </div>
                    <div className="mt-3">
                        <label htmlFor="password_confirmation" className="block text-base mb-2">Password Confirmation</label>
                        <input onChange={(ev) => setPassword_confirmation(ev.target.value)} className="border w-full text-base px-2 py-1 focus:outline-none focus:border-gray-500" type="password" id="password_confirmation" name="password_confirmation" placeholder="Repeat Password"/>
                        <span className="text-red-500">{errors.password_confirmation}</span>

                    </div>


                    <div className="flex justify-center mb-4 my-3">
                        {!loading ?
                        <button className="transition duration-700 ease-in-out md:w-64 w-full rounded-full text-custom-colorOne text-1xl border-2 bg-gradient-to-b from-custom-lightGray to-custom-darkGray hover:text-white hover:border-stone-800 p-1 pr-4 pl-4 m-2" type="submit">Sign up</button>
                        :
                        <button className="md:w-64 w-full rounded-full text-white text-1xl border-2 bg-custom-lightGray p-1 pr-4 pl-4 m-2" type="submit" disabled>Loading...</button>
                        }
                        </div>



                </form>

            </div>

        </div>


    )
}
