import React from 'react';
import { GetStaticPropsContext, NextPage, GetStaticPaths, InferGetStaticPropsType } from 'next';
import SEO from '~/lib/components/content/seo';
import { getMDXSource, getBlogList, MDXFrontmatterProps } from 'lib/data/mdx';
import { pick } from '@arcath/utils/lib/functions/pick';
import { MDX, ContentContainer } from '~/lib/components/mdx/mdx';
import { Layout } from '~/lib/components/layouts/classic';
import Signup from '~/lib/components/cta/signup';
import Image from '~/lib/components/primitives/image';
import TOCContainer from '~/lib/components/content/toc-container';
import RelatedArticles from '~/lib/components/content/related-articles';
import ArticleStats, { ArticleStatsType } from '~/lib/components/content/article-stats';
import meta from 'facade/data/meta.json';
import path from 'path';
import Subscribe from '~/lib/components/cta/subscribe';
import { readingTime, url } from '~/lib/functions/utils';
import fs from 'fs';
import { log } from '~/lib/functions/log';

const MODULE_NAME = 'blog-page';
const BLOGS_DIRECTORY = path.join(process.cwd(), meta.paths.BLOGS);

const getRelatedFrontMatter = async (relatedSlugs) => {
  // check if BLOGS_DIRECTORY exists 
  if (!fs.existsSync(BLOGS_DIRECTORY)) {
    log(MODULE_NAME, `${BLOGS_DIRECTORY} does not exist`);
    return null;
  }

  const r = await relatedSlugs.map(async (slug) => {
    const relatedFrontMatter = await getMDXSource(`${BLOGS_DIRECTORY}/${slug}/index.mdx`);
    return relatedFrontMatter.data;
  });
  return await Promise.all(r);
};

export const getStaticProps = async ({ params }: GetStaticPropsContext<{ slug: string }>) => {
  if (params?.slug) {
    const blog = getMDXSource(`${BLOGS_DIRECTORY}/${params.slug}/index.mdx`);

    const source = await blog.bundle;
    const related = (await blog.data).related;
    const relatedFrontMatter = related ? getRelatedFrontMatter(related) : [];
    const tags = (await blog.data).tags ?? null;
    const keywords = (await blog.data).keywords ?? null;
    const datePublished = (await blog.data).datePublished ?? null;
    const author = (await blog.data).author ?? null;

    // const alt = (await blog.data).alt ?? '';
    return {
      props: {
        blog: {
          ...pick(await blog.data, ['slug', 'title', 'description', 'image', 'category', 'dateUpdated', 'alt']),
          tags,
          keywords,
          datePublished,
          author,
        },
        source,
        slug: params.slug,
        toc: blog.toc,
        articles: await relatedFrontMatter,
      },
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  // const blogs = await getBlogs({ limit: false });
  const blogs = await getBlogList({ limit: false });

  const paths = blogs.map(({ properties }) => {
    return { params: { slug: properties.slug } };
  });

  return {
    paths,
    fallback: false,
  };
};

type MDXBlogProps = {
  // blog: Pick<BlogFrontmatter & BlogProperties, "slug" | "title" | "lead" | "image" | "category" | "readTime">
  blog: MDXFrontmatterProps;
  slug: string;
  source: string;
  toc: Array<any>;
  articles: Array<MDXFrontmatterProps>;
};

const MDXBlog: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  blog,
  source,
  slug,
  toc,
  articles,
}: MDXBlogProps) => {
  const stats: ArticleStatsType = {
    category: blog.category,
    author: blog.author ?? meta.author.name,
    dateUpdated: blog.dateUpdated,
    datePublished: blog.datePublished,
    tags: blog.tags,
    readingTime: readingTime(source),
  };

  return (
    <>
      <SEO
        title={`${blog.title}`}
        description={blog.description}
        url={url('blog', slug)}
        image={blog.image}
        type="blog"
        keywords={blog.keywords}
        datePublished={blog.datePublished}
        dateUpdated={blog.dateUpdated}
        author={blog.author}
      />

      <Layout>
        <header>
          <Image id="blog-hero" source={blog.image} alt={blog.alt} title={blog.title} text={blog.description} />
        </header>
        <article>
          <footer>
            <ArticleStats summary={stats} />
          </footer>
          <div className="mt-8 flex">
            <div className="content-positioning md:basis-4/6 ">
              <ContentContainer>
                <MDX
                  source={source}
                  toc={toc}
                  articles={articles}
                  components={{ Signup, TOCContainer, RelatedArticles, Subscribe }}
                />
              </ContentContainer>
            </div>
            <div className="sticky ml-8">
              {/* Show related articles and TOC on the sidebar on larger devices  */}
              <TOCContainer toc={toc} display="desktop only" />
              <div className="mt-8 hidden md:block">
                <RelatedArticles articles={articles} />
              </div>
            </div>
          </div>
        </article>
        {/* Show the related articles at the bottom of the page on small devices  */}
        <div className="mt-8 block md:hidden">
          <RelatedArticles articles={articles} />
        </div>
      </Layout>
    </>
  );
};

export default MDXBlog;
