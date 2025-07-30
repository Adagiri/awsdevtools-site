import { BlogArticlePage } from '@/components/blog/BlogArticlePage';
import { mockPosts } from '@/lib/blog/blog-data';

export async function generateStaticParams() {
  return mockPosts.map((post) => ({
    slug: post.id,
  }));
}

export default function BlogArticle({ params }: { params: { slug: string } }) {
  return <BlogArticlePage slug={params.slug} />;
}