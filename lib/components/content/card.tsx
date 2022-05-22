import React from 'react';
import Link from 'next/link';
import Image, { ImageProps } from '~/lib/components/primitives/image';
import { titleCase } from '~/lib/functions/utils';

// from https://ordinarycoders.com/blog/article/17-tailwindcss-cards

type CardProps = {
  title: string;

  category?: string;
  url: string;
  lead: string;
  tags?: string[];
  id: string;
  image: ImageProps;
};

const Card = ({ title, image, tags, category, url, lead }: CardProps) => {
  return (
    <div className="mt-auto py-4">
      <div className="overflow-hidden rounded shadow-lg">
        <div className="relative w-full overflow-clip" style={{ height: '40vh' }}>
          <Image
            source={image.source}
            alt={image.alt}
            title={image.title}
            text={image.text}
            category={category ? `For ${category}` : ''}
            id={`{id}-image-container`}
          />
        </div>
        <div className="px-6 py-2">
          <div className="mb-2 text-xl font-bold">
            <Link href={`${url}`}>
              <a>{title} </a>
            </Link>
          </div>
          <p className="text-base text-gray-700">{lead} </p>
        </div>
        <div className="px-6 pt-1 pb-2">
          {tags &&
            tags.map((tag, i) => {
              return (
                <span
                  key={i}
                  className="mr-2 mb-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700"
                >
                  {titleCase(tag)}
                </span>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Card;
