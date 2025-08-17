import react, { useState } from "react";
import { useStateContext } from "../contexts/Contextprovider";
import ClipLoader from "react-spinners/ClipLoader";

import { RiArrowGoBackFill } from "react-icons/ri";
import axiosClient from "../axios-client";
import Swal from 'sweetalert2';

export default function Forgotpassword() {

    const [errors, setErrors] = useState('');
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');


    const onSubmit = async (ev) => {
        ev.preventDefault();

        setLoading(true);
        setErrors('');
        setStatus(null);

        try {
            const response = await axiosClient.post('/forgot-password', {email});
            if (response.data.success == true) {
                setLoading(false);
                setEmail('');
                Swal.fire({
                    title: "Submitted Successfully",
                    text: response.data.msg,
                    icon: "success",
                    confirmButtonText: "OK",
                    customClass: {
                        confirmButton: 'bg-custom-darkGreen hover:bg-green-700 text-white font-bold py-2 px-4 w-20 rounded-1xl'
                    }
                    });
            } else {
                setLoading(false);
                setErrors(response.data.msg);
            }

        } catch (error) {
            setLoading(false);
            console.log(error);

        }
    }



    return (
        <div className="lg:w-[40%] w-96">
            <div className="mb-10 mt-5 fixed right-5">
                <a href="/login"><RiArrowGoBackFill size={35}/></a>
            </div>
            <div className={`lg:w-[95%] w-[100%] p-6 shadow-lg bg-white rounded-md my-36 relative ${loading && "opacity-50"}`}>
                {loading && <ClipLoader className="absolute left-[45%] top-[43%]"
                            color={'#010101'}
                            loading={loading}
                            size={50}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />}
                <div className="flex-wrap w-full text-center mb-2">

                    <h1 className="text-3xl block font-semibold mb-5">Forgot your Password? </h1>
                    <p>Let us know your email to send you your reset password link.</p>
                </div>

                <hr className="m-3"/>

                <form onSubmit={onSubmit}>
                    <div className="mt-3">
                        <span className="text-red-500">{errors}</span>

                        <input className="border w-full text-base px-2 py-1 mb-6 mt-3 focus:outline-none focus:border-gray-500 rounded-md"
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}/>

                    </div>



                    <div className="flex justify-center mb-4">
                        {!loading ?
                            <button className="transition duration-700 ease-in-out md:w-64 w-full rounded-full text-custom-colorOne text-1xl border-2 bg-gradient-to-b from-custom-lightGray to-custom-darkGray hover:bg-white hover:text-white hover:border-stone-800 p-1 pr-4 pl-4 m-2" type="submit">Submit</button>
                        :
                            <button className="md:w-64 w-full rounded-full text-white text-1xl border-2 bg-custom-lightGray p-1 pr-4 pl-4 m-2" type="submit" disabled>Loading...</button>
                        }

                    </div>

                </form>

            </div>
        </div>

    )
}
