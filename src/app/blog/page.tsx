import { getAllPosts, getCategories, getCategoryHierarchy } from "@/lib/posts";
import BlogContent from "./BlogContent";

export default async function BlogPage() {
  const posts = await getAllPosts();
  const categories = await getCategories();
  const categoryHierarchy = await getCategoryHierarchy();

  return (
    <BlogContent 
      posts={posts} 
      categories={categories} 
      categoryHierarchy={Object.values(categoryHierarchy)}
    />
  );
}
  
