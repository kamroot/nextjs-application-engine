import React from 'react';
import Image from 'next/image';
import { stringToId, trim } from 'lib/functions/utils';
import Link from 'next/link';
import { MDXFrontmatterProps } from 'lib/data/mdx';
import { debug } from 'lib/functions/log';

type RelatedArticlesProps = {
  heading?: string;
  articles: MDXFrontmatterProps[];
};

const Article = ({ article }) => {
  return (
    <Link href={article.slug} passHref>
      <div className="group cursor-pointer ">
        <div className="relative overflow-hidden rounded-sm">
          <div className="h-32">
            <Image
              layout="fill"
              className="object-cover opacity-80 group-hover:opacity-100"
              src={article.image}
              alt={article.title}
            />
          </div>
        </div>

        <div className="mt-1 mb-3 ml-0">
          <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{article.title}</p>
          <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
            {trim(article.description, 100)}
          </p>
        </div>
      </div>
    </Link>
  );
};

const RelatedArticles: React.FC<RelatedArticlesProps> = ({ heading = 'Related Articles', articles }) => {
  if (!articles || articles.length === 0) {
    debug('Related Articles', `No related articles`);
    return null;
  }
  return (
    <div className="w-72 rounded bg-brand-primary-50 p-8 shadow-md ">
      <div className="pb-2 text-2xl text-brand-core">{heading}</div>
      {articles.map((article) => (
        <div key={stringToId(article.title)} className="mt-8">
          <Article article={article} />
        </div>
      ))}
    </div>
  );
};

export default RelatedArticles;
