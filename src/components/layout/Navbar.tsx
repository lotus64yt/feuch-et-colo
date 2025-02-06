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
                <div className="flex gap-3 h-full items-center ml-auto px-4">
                    <a href="https://github.com/lotus64yt/feuch-et-colo" aria-label="Aller sur le repo github" className="footer-octicon" title="GitHub" target="_blank" rel="noopener noreferrer">
                        <svg aria-hidden="true" className="octicon octicon-mark-github" height="24" version="1.1" viewBox="0 0 16 16" width="24"><path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
                    </a>
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
