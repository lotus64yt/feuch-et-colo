

export default function TextUnderline({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative w-fit group">
            <h2 className="text-2xl font-bold relative">
                {children}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 ease-out group-hover:w-full"></span>
            </h2>
        </div>
    )
}
