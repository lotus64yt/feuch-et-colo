import fetchAllArticles from "@/utils/articles/fetchAll";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    const filter = new URL(req.url).searchParams.get("filter") as string | undefined;
    const articles = await fetchAllArticles(filter);
    return NextResponse.json({ articles });
}