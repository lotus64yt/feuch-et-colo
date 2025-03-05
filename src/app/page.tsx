"use client";

import Spinner from "@/components/ui/Spinner";
import TextUnderline from "@/components/ui/TextUnderline";
import SearchInput from "@/components/utils/searchInput";
import { ArticleJSON } from "@/types/article";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [recents, setRecents] = useState<ArticleJSON[] | null | false>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!recents) return;
    setTimeout(() => setInView(true), 500);
  }, [recents]);

  useEffect(() => {
    fetch("/api/articles/recent")
      .then((res) => res.json())
      .then((data) => {
        setRecents(data.articles);
      });
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col items-center pt-5 mb-7 justify-center overflow-x-hidden">
      <main className="relative w-full flex flex-col gap-6 items-center overflow-x-hidden">
        <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] flex justify-center items-center overflow-x-hidden">
          <video
            loop
            muted
            autoPlay
            preload="none"
            className="absolute inset-0 w-full h-full object-cover overflow-hidden"
          >
            <source src="/videos/backvideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* <video
            src="/videos/backvideo.mp4"
            autoPlay
            loop
            muted
            preload="auto"
          /> */}
          <div className="absolute inset-0 bg-black/50" />
          <div className="w-screen relative z-10 flex flex-col justify-center items-center text-center text-white">
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
            <p>Une erreur s{"'"}est produite lors du chargement des articles récents.</p>
          </div>
        ) : (
          recents.map((article) => (
            <div
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
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById(`article-${article.id}`);
      if (element) {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.4;
        setIsExpanded(isVisible);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [article.id]);

  return (
    <div
      id={`article-${article.id}`}
      className="relative w-full h-60 rounded-md overflow-hidden bg-gray-100 group cursor-pointer"
      onClick={() => window.location.href = `/article/${article.id}`}
      onTouchStart={() => setIsExpanded(true)}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Image */}
      <div
        className={`absolute inset-x-0 top-0 h-1/2 bg-cover bg-center transition-all ease-in-out duration-500
                   ${isExpanded ? "h-full opacity-40" : "group-hover:h-full group-hover:opacity-40"}`}
        style={{ backgroundImage: `url(${article.bannerImg})` }}
      />

      {/* Contenu principal */}
      <div className="absolute inset-0 flex flex-col justify-end transition-all ease-in-out duration-500 p-2">
        {/* Titre */}
        <h3
          className={`text-lg font-semibold bg-white/80 px-2 py-1 rounded transition-all ease-in-out duration-500
                      ${isExpanded ? "bg-white/90 translate-y-[-80%]" : "group-hover:bg-white/90 group-hover:translate-y-[-80%]"}`}
        >
          {article.title}
        </h3>

        {/* Description */}
        <p
          className={`text-sm text-gray-700 opacity-0 transition-all ease-in-out duration-500
                     ${isExpanded ? "opacity-100 translate-y-0" : "group-hover:opacity-100 group-hover:translate-y-0"}`}
        >
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