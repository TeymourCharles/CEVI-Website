import logo from '../assets/only-logo.png';
import name from '../assets/cevi-name.png';

import { FaLinkedinIn } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-gradient-to-bl to-custom-brown from-custom-colorOne lg:h-44 h-24">
            <div className="md:flex md:justify-center md-items-center sm:px-12 px-4 py-7 h-full">


                    <div className="">
                        <div className="flex gap-4 justify-center pb-6">
                            <div className="bg-black h-min py-2 px-2 rounded-full">
                                <FaLinkedinIn size={25} className="text-custom-colorOne cursor-pointer"/>
                            </div>
                            <div>
                                <FaFacebook size={40} className="cursor-pointer"/>
                            </div>
                        </div>

                        <div>
                            <ul className="lg:flex gap-9 font-bold text-[17px] hidden">
                                <li><a href="#aboutus">About us</a></li>
                                <li><a href="#mission-vision">Mission & Vision</a></li>
                                <li><a href="#services">Services</a></li>
                                <li><a href="#affiliated">Affiliated Govt Agencies</a></li>
                                <li><a href="#industries">Industries Covered</a></li>
                                <li><a href="#contact">Contact Us</a></li>
                            </ul>
                        </div>
                    </div>
            </div>
            <div className="flex justify-center items-center h-16 bg-custom-darkGray text-white">

                <p className="opacity-65">
                    cevi.customsbrokerage@gmail.com
                </p>

            </div>
        </footer>
    )
}

