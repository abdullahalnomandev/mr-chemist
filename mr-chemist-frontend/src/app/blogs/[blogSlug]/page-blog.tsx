import { TBlog } from "@/lib/types";
import { format } from "date-fns"; // Import format from date-fns
import Image from "next/image";

import styles from "./blog-description.module.css";

type BlogBySlugPageProps = { blog: TBlog | null };

export default async function BlogBySlugPage({ blog }: BlogBySlugPageProps) {
  if (!blog) {
    return <div className="container mx-auto py-12 text-center">Blog post not found.</div>;
  }

  // Format the date
  const formattedDate = blog.createdAt ? format(new Date(blog.createdAt), "MMM dd, yyyy") : "No date";
  const category = "Uncategorized"; // Use treatment as category
  const tags = blog.tags?.join(", ") || "No tags"; // Join tags into a string

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">{blog.title}</h1>

      {/* Metadata */}
      <p className="mt-2 text-sm text-gray-600">
        {category} | {tags} | {formattedDate}
      </p>

      {/* Featured Image */}
      {blog.imageUrls && blog.imageUrls.length > 0 && (
        <div className="relative mt-8 h-80 w-full overflow-hidden rounded-lg md:h-96">
          <Image
            src={blog.imageUrls[0]}
            alt={blog.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
          />
        </div>
      )}

      {/* Blog Content */}
      <div className="prose mt-8 max-w-none text-gray-700">
        {/* Render HTML content directly - use with caution and sanitize if needed */}
        <div className={styles.productDescription} dangerouslySetInnerHTML={{ __html: blog.content }} />
      </div>

      {/* Repeated Title at Bottom */}
      <div className="mt-12 border-t border-gray-200 pt-8">
        <h2 className="text-2xl font-bold text-gray-900">{blog.title}</h2>
      </div>
    </div>
  );
}
