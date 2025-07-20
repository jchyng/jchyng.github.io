import { getAllPosts, getCategories } from "@/lib/posts";
import BlogContent from "./BlogContent";

export default async function BlogPage() {
  const posts = await getAllPosts();
  const categories = await getCategories();

  return <BlogContent posts={posts} categories={categories} />;
}
  
