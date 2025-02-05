import fetchAllArticles from "@/utils/articles/fetchAll";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const articles = await fetchAllArticles();
    const filteredArticles = articles
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 5);

    return NextResponse.json({ articles: filteredArticles });
}