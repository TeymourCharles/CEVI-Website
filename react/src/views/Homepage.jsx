
import { Link } from "react-scroll";
import { useRef, useState } from "react";
import axiosClient from "../axios-client";
import Swal from 'sweetalert2';
import ClipLoader from "react-spinners/ClipLoader";

import slideOne from '../assets/slide01.jpg';
import slideTwo from '../assets/slide02.jpg';
import slideThree from '../assets/slide03.jpg';
import cargoPlane from '../assets/plane-cargo.jpg';


import imgTwo from '../assets/img-2.jpg';
import imgThree from '../assets/img-3.jpg';
import imgFour from '../assets/img-4.jpg';
import imgFive from '../assets/img-5.jpg';
import imgSix from '../assets/img-6.jpeg';

import onlyLogo from '../assets/only-logo.png';
import goldLogo from '../assets/logo-gold.png';
import skylineBg from '../assets/skyline-bg.jpg';

import stripe from '../assets/stripe-img.png';
import stripeTwo from '../assets/stripe-img-two.png';

import boi from '../assets/bureau-of-internal.png';
import fda from '../assets/FDA-logo.png';
import dti from '../assets/dti-bps.png';
import doaImg1 from '../assets/doa-img1.png';
import doaImg2 from '../assets/doa-img2.png';
import doaImg3 from '../assets/doa-img3.png';
import doaImg4 from '../assets/doa-img4.png';
import nationalTele from '../assets/national-telecom.png';
import sugarLegatory from '../assets/sugar-legatory.png';
import departFinan from '../assets/department-financial.png';
import philex from '../assets/philexport.png';
import fpa from '../assets/fpa.png';
import peza from '../assets/peza.png';

import { RiMenu3Fill } from "react-icons/ri";
import { TfiClose } from "react-icons/tfi";
import { LuArrowUpToLine } from "react-icons/lu";

import emailjs from '@emailjs/browser';

import Carousel from "../components/Corousel";

export default function Homepage() {

    const [open, setOpen] = useState(false);

    const imageData = [
            imgFour,
            imgTwo,
            imgThree,
            imgFive,
            imgSix
    ];

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [arrowUp, setArrowUp] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSetActive = (to) => {
        console.log(to);
        if (to === "aboutus" || to === "mission-vision" || to === "services" || to === "affiliated" || to === "industries" || to === "contact") {
            setArrowUp(true);
        }

        if (to === "header") {
            setArrowUp(false);
        }


      };

    const sendEmail = async (ev) => {
        ev.preventDefault();
        try {
            setLoading(true);
            setResponseMessage('');
            const response = await axiosClient.post('/contact', {
                name,
                email,
                message,
            });

            setLoading(false);
            Swal.fire({
                title: "Submitted Successfully",
                text: "Thank you for contacting us!",
                icon: "success",
                confirmButtonText: "OK",
                customClass: {
                    confirmButton: 'bg-custom-darkGreen hover:bg-green-700 text-white font-bold py-2 px-4 w-20 rounded-1xl'
                }
              });

            setName('');
            setEmail('');
            setMessage('');
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            setLoading(false);
            setResponseMessage('Failed to send message. Please try again.');
        }
    };

    return (
        <div className="overflow-hidden">
            <header id="header"  className="bg-white shadow-md flex justify-center">
                <nav className="flex justify-between items-center w-[92%]">
                    <div className="">
                        <div className="flex justify-center w-full py-2 px-3">
                            <img className="h-14" src={onlyLogo} alt="" />
                        </div>
                    </div>
                    <div className={`lg:static lg:min-h-fit absolute bg-white min-h-[40vh] left-0 ${open ? "top-[11%]" : "top-[-100%]"} lg:w-auto w-full flex items-center px-5 py-5 lg:shadow-none shadow-sm duration-500`}>
                        <ul className="flex lg:flex-row flex-col lg:items-center lg:gap-[3vw] text-sm gap-8">
                            <li className="transform transition-transform duration-300 hover:scale-110">
                                <Link
                                    to="aboutus"
                                    spy={true}
                                    smooth={true}
                                    offset={10}
                                    duration={500}
                                    onSetActive={handleSetActive} className="duration-500 text-custom-brown">About</Link>
                            </li>
                            <li className="transform transition-transform duration-300 hover:scale-110">
                                <Link
                                    to="mission-vision"
                                    spy={true}
                                    smooth={true}
                                    offset={10}
                                    duration={500}
                                    onSetActive={handleSetActive} className="duration-500 text-custom-brown">Mission & Vision</Link>
                            </li>

                            <li className="transform transition-transform duration-300 hover:scale-110">
                                <Link
                                    to="services"
                                    spy={true}
                                    smooth={true}
                                    offset={10}
                                    duration={500}
                                    onSetActive={handleSetActive} className="duration-500 text-custom-brown">Services</Link>
                            </li>
                            <li className="transform transition-transform duration-300 hover:scale-110">
                                <Link
                                    to="affiliated"
                                    spy={true}
                                    smooth={true}
                                    offset={10}
                                    duration={500}
                                    onSetActive={handleSetActive} className="duration-500 text-custom-brown">Affiliated Govt</Link>
                            </li>
                            <li className="transform transition-transform duration-300 hover:scale-110">
                                <Link
                                    to="industries"
                                    spy={true}
                                    smooth={true}
                                    offset={10}
                                    duration={500}
                                    onSetActive={handleSetActive} className="duration-500 text-custom-brown">Industries Covered</Link>
                            </li>
                            <li className="transform transition-transform duration-300 hover:scale-110">
                                <Link
                                    to="contact"
                                    spy={true}
                                    smooth={true}
                                    offset={10}
                                    duration={500}
                                    onSetActive={handleSetActive} className="duration-500 text-custom-brown">Contact</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex items-center gap-6">
                        <a className="transition duration-700 ease-in-out bg-gradient-to-b from-custom-lightGray to-custom-darkGray border-2 px-5 py-1 text-custom-colorOne rounded-full hover:bg-white hover:text-white hover:border-custom-darkGray" href="/login">Login</a>
                        {!open ? <RiMenu3Fill className="text-3xl cursor-pointer lg:hidden" onClick={() => setOpen(!open)} />
                        : <TfiClose className="text-3xl cursor-pointer lg:hidden" onClick={() => setOpen(!open)}/>
                        }

                    </div>


                </nav>

            </header>
            {arrowUp &&
                <Link
                    to="header"
                    spy={true}
                    smooth={true}
                    offset={10}
                    duration={500}
                    onSetActive={handleSetActive}>
                        <div className="bg-custom-darkGray fixed bottom-8 lg:right-10 right-2 rounded-full lg:py-0 lg:px-0 py-2 px-2">
                            <LuArrowUpToLine size={23} className="text-white lg:my-3 lg:mx-3 my-1 mx-1"/>
                        </div>
                </Link>
            }

                {!open &&
                <div>

                        <Carousel autoSlide={true}>
                        {imageData.map((s) => (
                            <img src={s} alt="Cargo Images" />
                        ))}
                        </Carousel>



                </div>

                }


                <section id="aboutus">
                    <div className="bg-gradient-to-b from-custom-lightGray to-custom-darkGray flex justify-center">
                        <h1 className="text-custom-colorOne font-bold text-2xl py-4">About Us</h1>

                    </div>
                    <div className="bg-gradient-to-r from-custom-colorOne via-custom-brown to-custom-colorOne h-2"></div>
                    <div className="flex justify-center">
                        <div className="w-[70%] pt-10 pb-10">
                            <p className="text-justify indent-10"><b>CEVI CUSTOMS BROKERAGE</b>is a Sole Proprietor Company established in May, 2023, REGISTERED under
                                the Department of Trade and Industry {"(DTI)"} and ACCREDITED by the Bureau of Customs {"(BOC)"} to
                                PERFORM CUSTOMS CLEARANCE in all international airports and seaports within the Philippines.</p>
                            <br />
                            <p className="text-justify indent-10">CEVI CUSTOMS BROKERAGE offers a wide-array of Logistics services starting from International Freight
                                Forwarding, Customs Clearance, Domestic Freight Forwarding and other affiliated logistics management
                                services. The Company adheres to its commitment to provide a constant and quicker assistance in the global
                                and domestic trade facilitation combined with extensive knowledge in order to exhibit a hassle-free delivery
                                and mitigate the potential risks in a highy-technical setting. The government-based electronic resources
                                integrated with the Company's up-to-date knowledge bank has proven to be effective and adaptable to steer
                                the import and export clearance in an expedite manner and ensure to meet the integral timeline of the
                                Importers and Exporters.</p>
                            <br />
                            <p className="text-justify indent-10">The Company is newly-established firm but capabe to meet and perform the industry's standard of
                                service. Throughout the year  after the establishment, the Company had widen its network and partnered with multiple
                                Int'l and Local Agents and major Multi-modal Carries to bring in and bring out the cargoes
                                that went through the hands of CEVI Customs Brokerage. Our dynamic relationship with our external
                                providers is being strengthened to increase the volume and productivity that will
                                result to lower costs of shipping without compromising thw quality of service.</p>
                            <br />
                            <p className="text-justify indent-10">Equipped with people with over 15 years of combined experiences in the fields of Customs Brokerage:
                                Airfreight and Seafreight, Domestic & International Freight Forwarding and Transport Services, we make sure
                                that every shipment entrusted to the Company will be handled with utmost diligence to meet the highest
                                satisfaction and to adhere our commitment of top-notch Logistics Solutions.</p>
                            <br />

                            <div className="lg:flex">

                                <div className="lg:w-full py-2 px-3 flex justify-center overflow-hidden">
                                    <img className="h-14 min-w-max" src={goldLogo} alt="Gold logo" />
                                </div>

                                <div className="lg:flex lg:justify-center mx-auto lg:space-x-16 w-[90%] lg:w-full rounded-md bg-gradient-to-b
                                from-custom-lightGray to-custom-darkGray lg:py-4 py-7 px-5 border-b-4 border-l-2 border-custom-colorOne">
                                    <div className="flex justify-center">
                                        <div className="bg-custom-lightGray border-2 border-custom-colorOne w-2 h-2 rounded-full mt-3 mr-2"/>
                                        <h1 className="text-white font-bold"><b className="text-custom-colorOne text-2xl">C</b>OMPLIANCE</h1>
                                    </div>
                                    <div className="flex justify-center">
                                        <div className="bg-custom-lightGray border-2 border-custom-colorOne w-2 h-2 rounded-full mt-3 mr-2"/>
                                        <h1 className="text-white font-bold"><b className="text-custom-colorOne text-2xl">E</b>FFICIENCY</h1>
                                    </div>
                                    <div className="flex justify-center">
                                        <div className="bg-custom-lightGray border-2 border-custom-colorOne w-2 h-2 rounded-full mt-3 mr-2"/>
                                        <h1 className="text-white font-bold"><b className="text-custom-colorOne text-2xl">V</b>ERSATILITY</h1>
                                    </div>
                                    <div className="flex justify-center">
                                        <div className="bg-custom-lightGray border-2 border-custom-colorOne w-2 h-2 rounded-full mt-3 mr-2"/>
                                        <h1 className="text-white font-bold"><b className="text-custom-colorOne text-2xl">I</b>NNOVATIVE</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="mission-vision">
                    <div className="bg-gradient-to-b from-custom-lightGray to-custom-darkGray flex justify-center">
                        <h1 className="text-custom-colorOne font-bold text-2xl py-4">Mission & Vision</h1>

                    </div>
                    <div className="bg-gradient-to-r from-custom-colorOne via-custom-brown to-custom-colorOne h-2"></div>


                    <div className="bg-gradient-to-bl from-custom-colorOne to-custom-brown lg:w-full flex justify-center">

                        <div className="flex justify-center mb-10 lg:mt-0 mt-7">
                            <div className="w-[70%]">
                                <div className="text-center">
                                    <h1 className="font-bold lg:text-4xl text-2xl lg:pt-10">OUR MISSION</h1>
                                </div>
                                <p className="text-center lg:text-2xl py-5 lg:leading-loose leading-10">To meet the Client's standard of service in moving and releasing the freight and cargoes. We endeavor to
                                    constantly deliver the highest satisfaction by performing speedy delivery, handling shipments with
                                    utmost diligence and maintaining excellencein every box and container
                                    we forward, clear and deliver.</p>
                                <div className="text-center">
                                    <h1 className="font-bold lg:text-4xl text-2xl lg:pt-5">OUR VISION</h1>
                                </div>

                                <div>
                                    <p className="text-center lg:text-2xl pt-5">We envision to be the Company of choice
                                        in the field of Logistics Management.</p>
                                </div>

                            </div>

                        </div>
                    </div>


                </section>

                <section id="services" className="bg-gradient-to-b from-custom-lightGray to-custom-darkGray pb-1">
                    <div className="bg-gradient-to-b from-custom-lightGray to-custom-darkGray flex justify-center">
                            <h1 className="text-custom-colorOne font-bold text-2xl py-4">Services</h1>

                    </div>
                    <div className="bg-gradient-to-r from-custom-colorOne via-custom-brown to-custom-colorOne h-2"></div>

                    <div className="h-fit">

                        <div className="lg:flex justify-center max-w-max mx-auto">
                            <div className="bg-gradient-to-b from-custom-lightGray to-custom-darkGray border-b-2 border-custom-colorOne relative w-96 pb-20 my-10 mx-5 rounded-xl lg:pt-0 pt-1 hover:scale-105 duration-300">
                                <img className="w-24 absolute bottom-0 py-2 ml-2" src={goldLogo} alt="gold logo" />
                                <img className="w-32 absolute right-0 top-0" src={stripe} alt="stripe gold" />

                                <h1 className="font-bold text-white mt-9 ml-5 text-2xl">DECLARING EXPERTISE</h1>
                                <p className="text-custom-colorOne ml-5 text-1xl">Customs Brokerage {"(Import/Export)"}</p>
                                <p className="text-custom-colorOne ml-5 text-1xl tracking-widest">{"(CONSUMPTION/WAREHOUSING/PEZA)"}</p>
                                <br />

                                <ul className="list-circle text-white text-sm font-bold tracking-widest ml-10">
                                    <li>AIR, LCL & FCL SHIPMENTS</li>
                                    <li>{"IMPORTER ACCREDITATION (NEW & RENEWAL)"}</li>
                                    <li>{"PERMIT APPLICATION ASSISTANCE"}</li>
                                    <li>SAD CANCELLATION</li>
                                    <li>{"POST-MODIFICATION OF SAD (AMENDMENT)"}</li>
                                    <li>{"AMENDMENT OF AWB/BL"}</li>
                                    <li>LIFTING OF ABANDONMENT</li>
                                    <li>ASSISTANCE ON LEGAL REMEDIES IN CUSTOMS
                                    CLEARANCE DISPUTE</li>
                                    <li>CUSTOMS & TARIFF CONSULTATION</li>
                                </ul>


                            </div>
                            <div className="bg-gradient-to-b from-custom-lightGray to-custom-darkGray border-t-2 border-custom-colorOne relative w-96 pb-20 my-10 mx-5 rounded-xl lg:pt-0 pt-1 hover:scale-105 duration-300">
                                <img className="w-24 absolute top-0 py-2 ml-2" src={goldLogo} alt="gold logo" />
                                <img className="w-44 absolute bottom-0 right-0" src={stripeTwo} alt="stripe gold" />

                                <h1 className="font-bold text-white mt-14 ml-5 text-2xl">MOVING BEYOND BORDERS</h1>
                                <p className="text-custom-colorOne ml-5 text-1xl">International & Domestic Freight Forwarding {"(Import/Export)"}</p>
                                <p className="text-custom-colorOne ml-5 text-1xl tracking-widest">{"(CONSUMPTION/WAREHOUSING/PEZA)"}</p>
                                <br />

                                <ul className="list-circle text-white text-sm font-bold tracking-widest ml-10">
                                    <li>CARGO PICK-UP</li>
                                    <li>PACKING, LABELLING & CRATING</li>
                                    <li>BOOKING OF SPACE TO CARRIERS {"AIR/SEA"}</li>
                                    <li>RATES NEGOTIATION</li>
                                    <li>{"PORT TO DOOR/DOOR TO DOOR SHIPMENTS"}</li>

                                </ul>
                            </div>
                            <div className="bg-gradient-to-b from-custom-lightGray to-custom-darkGray border-b-2 border-custom-colorOne relative w-96 my-10 mx-5 rounded-xl lg:pb-0 pb-20 lg:pt-0 pt-4 hover:scale-105 duration-300">
                                <img className="w-24 absolute bottom-0 py-2 ml-2" src={goldLogo} alt="gold logo" />
                                <img className="w-32 absolute right-0 top-0" src={stripe} alt="stripe gold" />

                                <h1 className="font-bold text-white lg:mt-9 ml-5 text-2xl">TRANSPORTING GREAT SERVICE</h1>
                                <p className="text-custom-colorOne ml-5 text-1xl tracking-widest">Tucking Services</p>
                                <br />

                                <ul className="list-circle text-white text-sm font-bold tracking-widest ml-10">
                                    <li>{"AIR/SEA PORT AREA TO CLIENT'S WAREHOUSE"}</li>
                                    <li>DOMESTIC TRANSFER</li>
                                </ul>
                            </div>
                        </div>



                    </div>
                </section>
                <section id="affiliated" className="bg-gradient-to-b from-custom-darkGray to-custom-lightGray">





                    <div className="bg-gradient-to-b from-custom-lightGray to-custom-darkGray flex justify-center">
                            <h1 className="text-custom-colorOne font-bold text-2xl py-4">Affiliated Govt Agencies</h1>

                    </div>
                    <div className="bg-gradient-to-r from-custom-colorOne via-custom-brown to-custom-colorOne h-2"></div>

                    <div className="flex justify-center">
                        <div>
                            <div className="flex space-x-16 group lg:w-[1235px] w-[410px] overflow-hidden bg-white rounded-b-3xl rounded-t-3xl my-2 mx-2 py-5">
                                <div className="flex animate-loop-scroll space-x-16 group-hover:paused">
                                    <img loading="lazy" className="lg:h-32 h-20 max-w-none" src={boi} alt="" />
                                    <img loading="lazy" className="lg:h-32 h-20 max-w-none" src={fda} alt="" />
                                    <img loading="lazy" className="lg:h-32 h-20 max-w-none" src={dti} alt="" />
                                    <img loading="lazy" className="lg:h-32 h-20 max-w-none" src={doaImg1} alt="" />
                                    <img loading="lazy" className="lg:h-32 h-20 max-w-none" src={doaImg2} alt="" />
                                    <img loading="lazy" className="lg:h-32 h-20 max-w-none" src={doaImg3} alt="" />
                                    <img loading="lazy" className="lg:h-32 h-20 max-w-none" src={doaImg4} alt="" />
                                    <img loading="lazy" className="lg:h-32 h-20 max-w-none" src={nationalTele} alt="" />
                                    <img loading="lazy" className="lg:h-32 h-20 max-w-none" src={sugarLegatory} alt="" />
                                    <img loading="lazy" className="lg:h-32 h-20 max-w-none" src={departFinan} alt="" />
                                    <img loading="lazy" className="lg:h-32 h-20 max-w-none" src={philex} alt="" />
                                    <img loading="lazy" className="lg:h-32 h-20 max-w-none" src={fpa} alt="" />
                                    <img loading="lazy" className="lg:h-32 h-20 max-w-none" src={peza} alt="" />
                                </div>
                                <div className="flex space-x-16 animate-loop-scroll group-hover:paused" aria-hidden="true">
                                    <img loading="lazy" className="lg:h-32 h-20 max-w-none" src={boi} alt="" />
                                    <img loading="lazy" className="lg:h-32 h-20 max-w-none" src={fda} alt="" />
                                    <img loading="lazy" className="lg:h-32 h-20 max-w-none" src={dti} alt="" />
                                    <img loading="lazy" className="lg:h-32 h-20 max-w-none" src={doaImg1} alt="" />
                                    <img loading="lazy" className="lg:h-32 h-20 max-w-none" src={doaImg2} alt="" />
                                    <img loading="lazy" className="lg:h-32 h-20 max-w-none" src={doaImg3} alt="" />
                                    <img loading="lazy" className="lg:h-32 h-20 max-w-none" src={doaImg4} alt="" />
                                    <img loading="lazy" className="lg:h-32 h-20 max-w-none" src={nationalTele} alt="" />
                                    <img loading="lazy" className="lg:h-32 h-20 max-w-none" src={sugarLegatory} alt="" />
                                    <img loading="lazy" className="lg:h-32 h-20 max-w-none" src={departFinan} alt="" />
                                    <img loading="lazy" className="lg:h-32 h-20 max-w-none" src={philex} alt="" />
                                    <img loading="lazy" className="lg:h-32 h-20 max-w-none" src={fpa} alt="" />
                                    <img loading="lazy" className="lg:h-32 h-20 max-w-none" src={peza} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
                <section id="industries" className="bg-gradient-to-b from-custom-lightGray to-custom-darkGray lg:h-min h-[900px]">


                    <div className="text-center">
                        <h1 className="text-custom-colorOne font-bold text-2xl py-4">Industries Covered</h1>
                    </div>
                    <div className="lg:flex justify-center gap-7 mx-auto w-min">
                        <div className="w-96 border-b-2 border-custom-colorOne bg-gradient-to-b from-custom-colorOne to-custom-brown text-black rounded-b-3xl lg:rounded-t-3xl rounded-t-sm lg:mx-2 mx-10 mb-10 py-3 pt-6 hover:scale-105 duration-300">

                            <ol className="list-decimal mx-14">
                                <li>Agricultural Products</li>
                                <li>Aluminum Formworks & accessories</li>
                                <li>{"Appliances (Kitchen Appliances, Et)"}</li>
                                <li>Automotive Parts & Tractor Parts</li>
                                <li>Dairy Products</li>
                                <li> Feed Additives & Fertilizers</li>
                            </ol>
                        </div>
                        <div className="w-96 border-t-2 border-custom-colorOne bg-gradient-to-bl from-custom-brown to-custom-colorOne text-black rounded-b-3xl lg:rounded-t-3xl rounded-t-sm lg:mx-2 mx-10 mb-10 py-3 pt-6 hover:scale-105 duration-300">
                            <ol className="mx-10 pb-6">
                                <li>7. Food & Beverages</li>
                                <li>8. Garments/Textiles/Fabrics</li>
                                <li>{"9. Glass Articles (Tempered/Laminated/Insulated)"}</li>
                                <li>10. IT/Telecom/Electronics Products</li>
                                <li>11. Mechanical/Machine Products & parts/accessories</li>
                                <li>12. Medical Devices & Laboratory Equipments</li>
                            </ol>
                        </div>
                        <div className="w-96 border-b-2 border-custom-colorOne bg-gradient-to-b from-custom-colorOne to-custom-brown text-black rounded-b-3xl lg:rounded-t-3xl rounded-t-sm lg:mx-2 mx-10 mb-10 py-3 pt-6 hover:scale-105 duration-300">
                            <ol className="mx-10">
                                <li>13. Metal Products</li>
                                <li>{"14. Pesticide/Disinfectant (Huhs & Urban Use) / Herbicide / Insecticides / Fungicide"}</li>
                                <li>15. Plastic Articles</li>
                                <li>16. Rubber Articles</li>
                                <li>17. Veterinary & Human Drugs/Pharmaceuticals & Supplements</li>
                                <li>18. Other General and Regulated Cargo</li>
                            </ol>

                        </div>
                    </div>
                </section>
                <section id="contact">
                    <div className="bg-gradient-to-b from-custom-lightGray to-custom-darkGray flex justify-center">
                            <h1 className="text-custom-colorOne font-bold text-2xl py-4">Contact Us</h1>
                    </div>
                    <div className="bg-gradient-to-r from-custom-colorOne via-custom-brown to-custom-colorOne h-2"></div>
                    <div className="flex justify-center bg-gradient-to-b from-custom-lightGray to-custom-darkGray">

                        <div className={`flex justify-center h-[500px] lg:w-[1000px] w-[500px] rounded-3xl border-b-2 border-custom-colorOne text-custom-colorOne bg-gradient-to-b from-custom-lightGray to-custom-darkGray my-10 relative ${loading && "opacity-50"}`}>
                            {loading && <ClipLoader className="absolute left-[48%] top-[41%]"
                                    color={'#FFD870'}
                                    loading={loading}
                                    size={50}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                />}
                            <div className="mt-16 w-[80%]">

                                <form onSubmit={sendEmail}>

                                    <label htmlFor="name">Full name</label>
                                    <br />
                                    <input className="h-10 text-white w-[100%] rounded-md mb-4 mt-1 border-2 px-4 border-custom-colorOne bg-custom-darkGray bg-opacity-10"
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="Enter full name"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}/>
                                    <br />
                                    <label htmlFor="email">Email address</label>
                                    <br />
                                    <input className="h-10 text-white w-[100%] rounded-md mb-4 mt-1 border-2 px-4 border-custom-colorOne bg-custom-darkGray bg-opacity-10"
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Enter your email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}/>
                                    <br />
                                    <label htmlFor="message">Message</label>
                                    <br />

                                    <textarea className="h-28 text-white w-[100%] rounded-md mb-4 mt-1 border-2 px-4 border-custom-colorOne bg-custom-darkGray bg-opacity-10"
                                    name="message"
                                    id="message"
                                    placeholder="Enter a message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}></textarea>
                                    <br />
                                    <span className="text-red-600">{responseMessage}</span>
                                    {!loading ?
                                        <button type="submit" className="bg-custom-darkGreen px-5 py-1 w-[100%] border-custom-colorOne rounded-xl text-xl duration-300 hover:scale-105 cursor-pointer">
                                        Submit
                                        </button>
                                    :
                                        <button type="submit" className="bg-custom-lightGray px-5 py-1 w-[100%] border-custom-colorOne rounded-xl text-xl duration-300 cursor-pointer" disabled>
                                        Loading...
                                        </button>
                                    }

                                </form>

                            </div>


                        </div>
                    </div>
                </section>
        </div>
    )
}
