"use client";

import Spinner from "@/components/ui/Spinner";
import TextUnderline from "@/components/ui/TextUnderline";
import SearchInput from "@/components/utils/searchInput";
import { ArticleJSON } from "@/types/article";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function Home() {
  const [recents, setRecents] = useState<ArticleJSON[] | null | false>(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    fetch("/api/articles/recent")
      .then((res) => res.json())
      .then((data) => {
        setRecents(data.articles);
      });
  }, []);

  return (
    <div className="w-screen min-h-screen flex flex-col items-center pt-5 mb-7 justify-center">
      <main className="relative w-full flex flex-col gap-6 items-center">
        <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] flex justify-center items-center overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="/videos/backvideo.mp4"
            autoPlay
            loop
            muted
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="w-full relative z-10 flex flex-col justify-center items-center text-center text-white">
            <Image
              className="w-20 h-20 sm:w-24 sm:h-24 mix-blend-difference"
              src="/favicon.svg"
              alt="Feuchetcolo icon"
              width={100}
              height={100}
              priority
            />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">Le feuch et-colo</h1>
            <p className="text-sm sm:text-base md:text-lg">Le journal d{'é'}cologie qui n{'est'} pas tout le temps écologique.</p>
            <br />
            <div className="w-full flex justify-center px-4 sm:px-6 md:px-8 text-black">
              <SearchInput />
            </div>
          </div>
        </div>

      </main>

      <br />
      <TextUnderline>Articles récents</TextUnderline>
      <br />
      <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
        {recents === null ? (
          <div className="col-span-3 flex justify-center"><Spinner /></div>
        ) : recents === false ? (
          <div className="col-span-3 flex justify-center">
            <p>Une erreur s'est produite lors du chargement des articles récents.</p>
          </div>
        ) : (
          recents.map((article) => (
            <div
              ref={ref}
              key={article.id}
              className={`transition-opacity duration-700 ease-in-out ${inView ? 'opacity-100' : 'opacity-0'}`}
            >
              <RecentArticle article={article} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function RecentArticle({ article }: { article: ArticleJSON }) {

  return (
    <div
      className={`relative w-full h-60 rounded-md overflow-hidden bg-gray-100 group cursor-pointer transition-opacity duration-500 ease-in-out opacity-100`}
      onClick={() => window.location.href = `/article/${article.id}`}>
      <div
        className="absolute inset-x-0 top-0 h-1/2 bg-cover bg-center transition-all duration-500 group-hover:h-full group-hover:opacity-40"
        style={{ backgroundImage: `url(${article.bannerImg})` }}
      />
      <div className="absolute inset-0 flex flex-col justify-end transition-all duration-500 p-3">
        <h3 className="text-base sm:text-lg font-semibold bg-white/80 px-2 py-1 rounded transition-all duration-500 group-hover:bg-white/90 group-hover:translate-y-[-80%]">
          {article.title}
        </h3>
        <p className="text-sm text-gray-700 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
          {article.description}
        </p>
      </div>
    </div>
  );
}

// function RecentArticle({ article }: { article: ArticleJSON }) {
//   return (
//     <div className="relative w-full h-60 rounded-md overflow-hidden bg-gray-100 group cursor-pointer" onClick={() => window.location.href = `/article/${article.id}`}>
//       <div
//         className="absolute inset-x-0 top-0 h-1/2 bg-cover bg-center transition-all duration-500 group-hover:h-full group-hover:opacity-40"
//         style={{ backgroundImage: `url(${article.bannerImg})` }}
//       />
//       <div className="absolute inset-0 flex flex-col justify-end transition-all duration-500 p-3">
//         <h3 className="text-base sm:text-lg font-semibold bg-white/80 px-2 py-1 rounded transition-all duration-500 group-hover:bg-white/90 group-hover:translate-y-[-80%]">
//           {article.title}
//         </h3>
//         <p className="text-sm text-gray-700 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
//           {article.description}
//         </p>
//       </div>
//     </div>
//   );
// }