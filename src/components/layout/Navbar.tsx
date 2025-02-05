"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="flex flex-col gap-y-3">
            <div
                className={`fixed top-0 w-full h-20 flex justify-start items-cnter px-5 transition-all duration-300
          ${scrolled ? "bg-gray-800/80 backdrop-blur-md" : "bg-gray-800"} z-50`}
            >
                <div className="flex justify-between items-center gap-3 w-1/8 max-w-5xl text-white cursor-pointer relative group" onClick={() => window.location.href = "/"}>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 ease-out group-hover:w-full"></span>
                    <Image
                        src="/favicon.svg"
                        alt="Feuchetcolo icon"
                        width={50}
                        height={38}
                        priority
                    />
                    <h1 className="text-2xl font-bold">Le feuch et-colo</h1>
                </div>
            </div>
            <br />
{/* 
            <div className="w-full min-h-screen flex flex-col justify-center items-center mt-24">
                {children}
            </div> */}
        </div>
    );
}
