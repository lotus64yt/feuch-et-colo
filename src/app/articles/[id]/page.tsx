"use client";

import Spinner from "@/components/ui/Spinner";
import TextUnderline from "@/components/ui/TextUnderline";
import { ArticleJSON } from "@/types/article";
import { toHTML } from "discord-markdown";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const { id } = useParams();
    const [article, setArticle] = useState<ArticleJSON | null | false>(null);

    useEffect(() => {
        if (article) return;
        fetch(`/api/articles/${id}`)
            .then((res) => res.json())
            .then((data) => {
                if (!data || JSON.stringify(data.article) === "{}") return setArticle(false);
                setArticle(data.article);
            })
            .catch(() => {
                setArticle(false);
            });
    }, [id, article]);

    if (article === null) return (
        <div className="text-center py-10 flex flex-col items-center">
            <Spinner />
            <p className="mt-2">Loading...</p>
        </div>
    );

    if (article === false) return (
        <div className="text-center py-10 flex flex-col items-center">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            <p className="mt-2 text-red-600">Article not found</p>
        </div>
    );

    return (
        <div className="w-screen flex flex-col justify-center overflow-hidden">
            {/* Bannière avec effet de parallax */}
            <div className="relative w-screen flex flex-col gap-6 justify-center h-[150px] overflow-hidden">
                <div
                    className="h-full w-full absolute inset-0 bg-cover bg-center transform transition-transform duration-500 hover:scale-105 my-3"
                    style={{ backgroundImage: `url(${article.bannerImg})` }}
                />
                <div className="w-full relative z-10 text-white bg-black/50 p-6 backdrop-blur-md rounded-md shadow-lg my-3">
                    <h1 className="text-4xl font-bold transition-transform duration-300 hover:scale-105">
                        {article.title}
                    </h1>
                    <p className="opacity-80 transition-opacity duration-300 hover:opacity-100">{article.description}</p>
                    <div className="flex flex-row gap-3 items-center mt-4">
                        <Image
                            src={article.author?.avatarURL}
                            alt={article.author?.username}
                            width={40}
                            height={40}
                            className="rounded-full border-2 border-white hover:scale-110 transition-transform"
                        />
                        <p className="italic">Écrit par {article.author?.username}</p>
                    </div>
                </div>
            </div>

            {/* Contenu de l'article */}
            <div className="w-full h-full px-4 flex flex-col overflow-x-hidden">
                <div className="w-full p-10 text-lg leading-relaxed transition-opacity duration-300 hover:opacity-90">
                    <p>{article.content}</p>
                </div>

                {(article.parts || []).map((part, index) => (
                    <div
                        className="overflow-hidden h-full w-full flex flex-col p-10 gap-4 transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl"
                        id={part.url?.split("#")[1]}
                        key={index.toString()}
                    >

                        <div>
                            <TextUnderline>{part.title}</TextUnderline>
                        </div>
                        <div
                            className={`flex gap-4 transition-all duration-300 hover:opacity-90 ${part.img.position === "left" ? "flex-row items-start" : "flex-row-reverse items-start"}`}
                        >
                            <Image
                                src={part.img.url}
                                alt={part.img.alt}
                                width={300}
                                height={200}
                                className={`max-w-[300px] h-auto object-cover overflow-hidden transition-transform duration-300 hover:scale-110 cursor-pointer shadow-md ${part.img.position === "left" ? "rounded-l-md rounded-r-2xl" : "rounded-r-md rounded-l-2xl"}`}
                            />
                            <div className="m-4 transition-colors duration-300 hover:text-gray-500" dangerouslySetInnerHTML={{ __html: toHTML(part.content) }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}