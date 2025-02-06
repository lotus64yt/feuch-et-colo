"use client";

import { ArticleJSON } from "@/types/article";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SearchInput() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<ArticleJSON[] | null | false>(null);
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (search.length === 0) {
      setResults(null);
      setOpen(false);
      return;
    }

    setOpen(true);

    fetch(`/api/articles?filter=${search}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data.articles);
      });
  }, [search]);

  return (
    <div className={`relative transition-all duration-300 ${open ? 'w-full' : 'w-1/3'}`} >
      <input
        type="text"
        value={search}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 200)}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Rechercher un article"
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className={`relative z-40 w-full bg-white border border-gray-300 rounded-md shadow-md mt-1 max-h-60 overflow-y-auto ${(open && results !== null && results !== false && results.length > 0) ? 'block' : 'hidden'}`}>
        {
          search!== "" && results !== null && results !== false && results.length > 0 && (
            <ul className="flex flex-col gap-2 my-2">
              {results.map((article) => (
                <li key={article.id} className="hover:bg-gray-100 rounded-md">
                  <Link
                    href={`/articles/${article.id}`}
                    // onMouseDown={(e) => e.preventDefault()}
                    className="text-blue-600 hover:underline">
                    <SearchResult title={article.title} imageUrl={article.bannerImg} id={article.id.toString()} />
                  </Link>
                </li>
              ))}
            </ul>
          )
        }
      </div>
    </div>
  );
}

export function SearchResult(
  { title, imageUrl, id }
    :
    { title: string, imageUrl: string, id: string }
) {
  return (
    <div className="relative group overflow-hidden p-4 cursor-pointer rounded-md" onClick={() => window.location.href = `/articles/${id}`}>
      <div
        className="absolute inset-0 bg-cover bg-center scale-110 opacity-0 group-hover:opacity-100 
             transition-all ease-in-out duration-[600ms] 
             -translate-x-full group-hover:translate-x-0"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />


      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-900" />

      <p className="relative z-10 text-lg font-medium text-gray-900 group-hover:text-white group-hover:font-semibold transition-all duration-900">
        {title}
      </p>
    </div>
  );
}
