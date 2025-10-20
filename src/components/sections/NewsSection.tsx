import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getNewsPosts } from '@/lib/contentful';
import type { CategorySkeleton } from '@/lib/contentful';
import type { Entry } from 'contentful';

const NewsSection = async () => {
  const newsPostsResponse = await getNewsPosts();
  
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-3xl font-bold mb-10">Tin tức mới nhất</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {newsPostsResponse.items.map((item) => {
            const { slug, logoImage, category, title, description } = item.fields;
            const categoryEntry = category as Entry<CategorySkeleton> | undefined;

            // --- THE FIX IS HERE ---
            // We check for both categoryEntry and categoryEntry.fields
            const categoryName = categoryEntry?.fields?.name;

            return (
              <div key={item.sys.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
                <div className="bg-black flex items-center justify-center p-8 h-40">
                  {logoImage && (
                    <Image
                      src={'https:' + logoImage.fields.file?.url}
                      alt={logoImage.fields.title || 'News Logo'}
                      width={200}
                      height={50}
                      style={{ objectFit: 'contain' }}
                    />
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  {/* Now this check is safe */}
                  {categoryName && (
                    <p className="text-sm font-semibold text-teal-600 mb-2 uppercase tracking-wider">
                      {categoryName}
                    </p>
                  )}
                  <h3 className="text-xl font-bold mb-2">{title}</h3>
                  <p className="text-gray-600 mb-4 flex-grow">{description}</p>
                  <Link href={`/news/${slug}`} className="text-teal-600 font-semibold hover:underline mt-auto">
                    Tìm hiểu thêm &gt;
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;