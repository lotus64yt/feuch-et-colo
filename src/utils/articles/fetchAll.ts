import { ArticleJSON } from '@/types/article';
import fs from 'fs';
import path from 'path';

export default async function fetchAllArticles(filter?: string): Promise<ArticleJSON[]> {
	const articlesDir = path.join(process.cwd(), 'public', 'articles');
	const filenames = fs.readdirSync(articlesDir);
	const articles = filenames.map(filename => {
		const filePath = path.join(articlesDir, filename);
		const fileContents = fs.readFileSync(filePath, 'utf8');
		return JSON.parse(fileContents);
	});
	if (filter) {
		return articles.filter(article => article.title.includes(filter) || article.description.includes(filter));
	} else {
		return articles;
	}
}