import { remark } from 'remark';
import remarkHtml from 'remark-html';
import matter from 'gray-matter';

const processor = remark().use(remarkHtml);

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await processor.process(markdown);
  return result.toString();
}

export function parseFrontmatter(fileContent: string) {
  const { data, content } = matter(fileContent);
  return {
    frontmatter: data,
    content: content
  };
}