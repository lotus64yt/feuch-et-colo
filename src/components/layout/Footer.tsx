import Image from "next/image";

export default function Footer() {
    return (
        <div className="z-5 w-full p-10 bg-gray-900">
            <div className="w-full flex flex-row gap-5 items-center">
                <div className="w-10 h-10 rounded-lg">
                    <Image
                        src="/favicon.svg"
                        alt="Feuchetcolo icon"
                        className="transition-transform duration-300 ease-in-out hover:rotate-[15deg]"
                        width={50}
                        height={50}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <h1 className="text-4xl font-bold text-white">Le feuch et-colo</h1>
                    <p className="text-white">Le journal d{"'"}écologie qui n{"'"}est pas tout le temps écologique.</p>
                    <br />
                    <span className="text-white underline"><a href="https://lmcgroup.xyz/" className="cursor-pointer transition-all duration-300 ease-in-out hover:tracking-wide hover:scale-105">Powered by Pulse UI from LMC Group</a></span>
                    <br />
                    <h3 className="ml-4 text-white">© 2021 Le feuch et-colo</h3>
                </div>
            </div>
        </div>
    )
} 