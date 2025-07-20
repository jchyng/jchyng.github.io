import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypePrism from '@mapbox/rehype-prism';
import matter from 'gray-matter';

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(remarkRehype)
    .use(rehypePrism)
    .use(rehypeStringify)
    .process(markdown)
  return result.toString()
}
export function parseFrontmatter(fileContent: string) {
  const { data, content } = matter(fileContent);
  return {
    frontmatter: data,
    content: content
  };
}