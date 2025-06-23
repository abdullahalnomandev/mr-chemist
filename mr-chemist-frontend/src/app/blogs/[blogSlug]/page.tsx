import { getBlogBySlug } from "@/lib/api/api-server";
import BlogBySlugPage from "./page-blog";

// Correct type for params
type PageProps = { params: { blogSlug: string } };

// No need for async on the component itself if only fetching data inside
// But async is fine if you need to await the fetch directly in the component
export default async function Page({ params }: PageProps) {
  // params is already the object, no need to await
  const blog = await getBlogBySlug(params.blogSlug); // Await the fetch call

  return <BlogBySlugPage blog={blog} />;
}
