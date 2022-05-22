import React from 'react';
import { NextSeo } from 'next-seo';
import meta from 'facade/data/meta.json';
import { ArticleJsonLd } from 'next-seo';

type SEOProps = {
  title: string;
  description: string;
  image: string;
  url: string;
  datePublished: string;
  dateUpdated: string;
  type: 'website' | 'blog' | 'article';
  author?: string;
  keywords: string[];
};

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  image,
  url,
  type = 'website',
  author = meta.author.name,
  dateUpdated = meta.datePublished,
  datePublished = meta.datePublished,
  keywords,
}) => {
  return (
    <>
      <NextSeo
        title={`${title}`}
        description={description}
        canonical={url}
        openGraph={{
          url,
          type,
          title: `${title} - ${meta.name}`,
          description,
          images: [
            {
              url: `${meta.productionUrl}${image}`,
              width: 800,
              height: 600,
              alt: `${description}`,
              type: 'image/jpeg',
            },
          ],
          site_name: `${meta.name}`,
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: keywords && keywords.join(', '),
          },
          {
            name: 'datePublished',
            content: datePublished,
          },
          {
            name: 'dateUpdated',
            content: dateUpdated,
          },
        ]}
      />
      <ArticleJsonLd
        type="Blog"
        url={url}
        title={title}
        images={[`${meta.productionUrl}${image}`]}
        datePublished={new Date(datePublished).toISOString()}
        dateModified={new Date(dateUpdated).toISOString()}
        authorName={author}
        keywords={keywords && keywords.join(' ')}
        description={description}
      />
    </>
  );
};

export default SEO;
