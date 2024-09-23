import { useEffect, useState } from "react";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";

import businessName from '../assets/cevi-name.png';

export default function Carousel ({ children:
    imageData,
    autoSlide,
    autoSlideInterval=3000  }) {
    const [current, setCurrent] = useState(0);

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
                        <img src={businessName} alt="" className="absolute bottom-40 left-20 w-96"/>
                        <p className="absolute bottom-32 left-20 text-custom-colorOne">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim quidem neque labore voluptatibus voluptatem culpa quam est, veniam provident,
                        </p>
                        <a href="#contact"><button className="absolute bottom-20 left-20 border-2 px-5 py-2 rounded-3xl text-white border-white">
                            Contact Us
                        </button></a>
                    </div>

                </div>


            </div>
            <div className="absolute bottom-4 right-0 left-0">
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
