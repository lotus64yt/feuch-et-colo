import { NextResponse } from "next/server";
import fetchOneArticle from "@/utils/articles/fetchOne";
import { fetchParams } from "@/utils/api/params";

export async function GET(req: any) {
    const params = fetchParams(req.url);
    const article = await fetchOneArticle(params || "");
    
    if (!article) {
        return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }
    return NextResponse.json({ article });
}