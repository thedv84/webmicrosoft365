import { getNewsPostBySlug } from '@/lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

type Props = {
  params: { slug: string };
};

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getNewsPostBySlug(params.slug);
  if (!post) {
    return { title: 'Not Found' };
  }
  return {
    title: post.fields.title?.toString() || '',
    description: post.fields.description?.toString() || '',
  };
}

// The Page Component
const NewsPostPage = async ({ params }: Props) => {
  const post = await getNewsPostBySlug(params.slug);

  // If no post is found for the given slug, show a 404 page
  if (!post) {
    notFound();
  }

  const { title, content, description } = post.fields;

  return (
    <main className="bg-white py-12">
      <div className="container mx-auto px-4">
        <article className="prose lg:prose-xl max-w-4xl mx-auto">
          <h1>{title as any}</h1>
          <p className="lead text-lg text-gray-600">{description as any}</p>
          <hr />
          <div>{documentToReactComponents(content as any)}</div>
        </article>
      </div>
    </main>
  );
};

export default NewsPostPage;