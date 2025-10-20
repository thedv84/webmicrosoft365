import { createClient, EntryCollection, Entry, Asset, EntrySkeletonType } from 'contentful';
import type { Document } from '@contentful/rich-text-types'; // Import Document type

// 1. Define the Category skeleton
export type CategorySkeleton = EntrySkeletonType<{
  name: string;
}>;

// 2. Update the NewsPost skeleton to include the linked category
export type NewsPostSkeleton = EntrySkeletonType<{
  title: string;
  description: string;
  linkUrl: string;
  logoImage: Asset;
  category?: Entry<CategorySkeleton>;
  slug: string;
    content: Document; // Use Document type for rich text content
}>;

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
});

// 3. Update the fetch function to use the new skeleton
export const getNewsPosts = async (): Promise<EntryCollection<NewsPostSkeleton>> => {
  const entries = await client.getEntries<NewsPostSkeleton>({
    content_type: 'newsPost',
    include: 2
  });
  return entries;
};

// NEW FUNCTION: Fetch a single post by its unique slug
export const getNewsPostBySlug = async (slug: string): Promise<Entry<NewsPostSkeleton> | null> => {
  const entries = await client.getEntries<NewsPostSkeleton>({
    content_type: 'newsPost',
    include: 2,
    limit: 1,
  } as any);
  
  // Filter results in memory for slug match
  const filtered = entries.items.filter(item => item.fields.slug === slug);
  return filtered[0] || null;
};