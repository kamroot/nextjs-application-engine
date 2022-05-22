import React from 'react';
import NextImage from 'next/image';
import { titleCase } from '~/lib/functions/utils';
import { log } from '~/lib/functions/log';

export type ImageProps = {
  title: string;
  text: string | React.ReactNode;
  source: string;
  alt: string;
  category?: string;
  id?: string;
  opacity?: number;
};

// inspiration for this came from https://postsrc.com/components/card/card-image-with-text-over-component
const Image: React.FC<ImageProps> = ({ title, text, source, alt, opacity = 50, category, id }) => {
  // Why don't we make the id a required thing in the props? Because image is called from teh card component
  // and the card component generates the id for us.
  if (!id) {
    log('Image', `Image ${source} component requires an id prop`);
  }
  return (
    <>
      <div className="w-full gap-2 text-clip " id={id ? `${id}-image-container-parent` : ''}>
        <div className="relative rounded-lg rounded-t-none shadow-lg">
          <figure>
            <div className="h-72 min-h-full w-full  bg-gray-600" id={id ? `${id}-image-container` : ''}>
              <NextImage
                id={id ? id : ''}
                layout="fill"
                className={`object-cover opacity-${opacity}`}
                src={source}
                alt={alt}
              />
            </div>
            <div className=" absolute top-0  left-0 flex h-72 w-full flex-col items-center overflow-clip py-4 px-6 text-brand-light-600">
              <h1 className="mb-3 w-full  text-center text-lg font-bold tracking-tight  md:text-xl lg:text-3xl">
                <figcaption>{title}</figcaption>
              </h1>
              <p className="flex-1 leading-normal text-black md:max-w-prose md:text-lg">{text}</p>
              <div className="text-right"> {titleCase(category)} </div>
            </div>
          </figure>
        </div>
      </div>
    </>
  );
};

export default Image;
