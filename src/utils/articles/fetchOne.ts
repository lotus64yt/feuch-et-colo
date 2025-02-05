import { ArticleJSON } from '@/types/article';
import fs from 'fs';
import path from 'path';

export default async function fetchOneArticle(id: string | number): Promise<ArticleJSON> {
    const articlesDir = path.join(process.cwd(), 'public', 'articles');
    const filenames = fs.readdirSync(articlesDir);

    let article = {} as ArticleJSON;

    Promise.all(filenames.map(async (element, index) => {
        const filePath = path.join(articlesDir, element);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const articleData = JSON.parse(fileContents);
        if (articleData.id.toString() === id.toString()) {
            article = articleData;
        }
    }))

    return article;
}