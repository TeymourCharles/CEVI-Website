import { useEffect, useState } from "react";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { Link } from "react-scroll";

import businessName from '../assets/cevi-name.png';

export default function Carousel ({ children:
    imageData,
    autoSlide,
    autoSlideInterval=3000  }) {
    const [current, setCurrent] = useState(0);

    const handleSetActive = (to) => {
        console.log(to);
        if (to === "contact") {
            setArrowUp(true);
        }

        if (to === "header") {
            setArrowUp(false);
        }
      };

    const prev = () =>
        setCurrent((current) => (current == 0 ? imageData.length - 1 : current - 1));

    const next = () =>
        setCurrent((current) => (current == imageData.length - 1 ? 0 : current + 1));

    useEffect(() => {
        if (!autoSlide) {
            return
        } else {
            const slideInterval = setInterval(next, autoSlideInterval);
            return () => clearInterval(slideInterval);
        }

    }, [])
    return (
        <div className="overflow-hidden relative group">
            <div className="flex transition-transform ease-out duration-500" style={{ transform: `translateX(-${current *100}%)` }}>{imageData}</div>

            <div className="flex justify-center">
                <div className="bg-custom-lightGray bg-opacity-30 h-[96%] w-[99%] absolute top-2 rounded-2xl">
                    <div className="relative h-[100%] w-[100%]">
                        <img src={businessName} alt="" className="absolute lg:bottom-40 bottom-20 lg:left-20 left-5 lg:w-96 w-48"/>

                        <Link
                            to="contact"
                            spy={true}
                            smooth={true}
                            offset={10}
                            duration={500}
                            onSetActive={handleSetActive}><button className="absolute lg:bottom-24 bottom-7 lg:left-20 left-5 border-2 px-5 py-2 rounded-3xl text-white lg:text-[15px] text-[10px] border-white hover:scale-105 duration-300">
                            Contact Us
                        </button></Link>
                    </div>

                </div>


            </div>
            <div className="absolute lg:block hidden bottom-4 right-0 left-0">
                <div className="flex items-center justify-center gap-2">
                    {imageData.map((_, index) => (
                        <div className={`transition-all w-3 h-3 bg-custom-lightGray rounded-full
                        ${current == index ? "p-2" : "bg-opacity-50"}
                        `}/>
                    ))}

                </div>
            </div>
        </div>
    )
}
