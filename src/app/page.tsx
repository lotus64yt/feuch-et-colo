"use client";

import TextUnderline from "@/components/ui/TextUnderline";
import SearchInput from "@/components/utils/searchInput";
import { ArticleJSON } from "@/types/article";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [recents, setRecents] = useState<ArticleJSON[] | null | false>(null);

  useEffect(() => {
    fetch("/api/articles/recent")
      .then((res) => res.json())
      .then((data) => {
        setRecents(data.articles);
      });
  }, [])
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center  pt-5">
      <main className="relative w-screen flex flex-col gap-6 justify-center items-center">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/backvideo.mp4"
          autoPlay
          loop
          muted
        />

        <div className="absolute inset-0 bg-black/40" />

        <Image
          className="w-[100px] h-[100px] justify-center mix-blend-difference"
          src="/favicon.svg"
          alt="Feuchetcolo icon"
          width={180}
          height={38}
          priority
        />

        <h1 className="animate-moveY justify-center text-4xl font-bold text-white">{/*" mix-blend-difference">*/}
          Le feuch et-colo
        </h1>
        <p className="text-white mix-blend-difference">
          Le journal d{"'"}écologie qui n{"'"}est pas tout le temps écologique.
        </p>

        <div className="relative z-10 w-full p-10">
          <SearchInput />
        </div>
      </main>
      <br />
      <TextUnderline>Articles récents</TextUnderline>
      <div className="w-full p-10 grid grid-cols-1 md:grid-cols-2 gap-4 justify-center">
        {recents === null ? (
          <p>Chargement...</p>
        ) : recents === false ? (
          <p>Erreur lors du chargement des articles récents</p>
        ) : (
          recents.map((article) => (
            <RecentArticle key={article.id} article={article} />
          ))
        )}
      </div>
    </div>
  );
}

function RecentArticle({ article }: { article: ArticleJSON }) {
  return (
    <div className="relative w-full h-60 rounded-md overflow-hidden bg-gray-100 group cursor-pointer" onClick={() => window.location.href = `/article/${article.id}`}>
      {/* Image */}
      <div
        className="absolute inset-x-0 top-0 h-1/2 bg-cover bg-center transition-all ease-in-out duration-500
                   group-hover:h-full group-hover:opacity-40"
        style={{ backgroundImage: `url(${article.bannerImg})` }}
      />

      {/* Contenu principal */}
      <div className="absolute inset-0 flex flex-col justify-end transition-all ease-in-out duration-500 p-2">
        {/* Titre (monte au hover) */}
        <h3 className="text-lg font-semibold bg-white/80 px-2 py-1 rounded transition-all ease-in-out duration-500
                      group-hover:bg-white/90 group-hover:translate-y-[-80%]">
          {article.title}
        </h3>

        {/* Description (apparaît au hover) */}
        <p className="text-sm text-gray-700 opacity-0 transition-all ease-in-out duration-500
                     group-hover:opacity-100 group-hover:translate-y-0">
          {article.description}
        </p>
      </div>
    </div>
  );
}


// function RecentArticle({ article }: { article: ArticleJSON }) {
//   return (
//     <div className="w-full rounded-md p-4 bg-gray-100">
//       <h3>{article.title}</h3>
//     </div>
//   )
// }