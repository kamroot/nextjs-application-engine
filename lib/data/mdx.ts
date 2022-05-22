import path from 'path';
import { log } from '../functions/log';
import meta from 'facade/data/meta.json';
import { getFiles, file, BaseProperties } from './file';

/*
 *  This file has all the functions needed to handle MDX files.
 * - get a list of MDX Files from a directory
 * - get MDX frontmatter
 * - get MDX source
 */

const BLOGS_DIRECTORY = path.join(process.cwd(), meta.paths.BLOGS);
const MODULE_NAME = 'mdx.ts';

export interface MDXFrontmatterProps {
  title?: string;
  image?: string;
  description?: string;
  alt?: string;
  author?: string;
  readTime?: string;
  datePublished?: string;
  dateUpdated?: string;
  category?: string;
  keywords?: string[];
  tags?: string[];
  related?: string[];
}

interface MDXFileProps extends BaseProperties {
  slug: string;
  slugString: string;
  href: string;
}

// Return properties of a MDX file
const mdxProperties = (filePath: string): MDXFileProps => {
  const directory = path.dirname(filePath);
  const dir = path.basename(directory);

  return {
    slug: dir,
    slugString: ['features', dir].join('-'),
    href: `/features/${dir}`,
    bundleDirectory: `/img/features/${dir}/`,
  };
};

// Given an MDX file location return both the MDX front matter, and MDX source
export const getMDXSource = (filePath: string) => {
  let source;
  try {
    source = file<MDXFrontmatterProps, MDXFileProps>(filePath, mdxProperties(filePath));
  } catch (ENOENT) {
    log(MODULE_NAME, `${filePath} does not exist`);
    source = null;
  }
  return source;
};

export const getBlogList = getFiles<MDXFrontmatterProps, MDXFileProps>({
  directory: BLOGS_DIRECTORY,
  getProperties: mdxProperties,
  defaultQueryParams: {
    limit: 5,
    orderBy: 'dateUpdated',
    order: 'DESC',
    skip: 0,
  },
});
