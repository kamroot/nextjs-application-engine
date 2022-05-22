import React from 'react';
import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType, NextPage } from 'next';
import meta from 'facade/data/meta.json';
import Routes from 'facade/data/routes.json';
import { Layout } from '~/lib/components/layouts/classic';
import { ContentContainer, MDX } from '~/lib/components/mdx/mdx';
import Signup from '~/lib/components/cta/signup';
import TOCContainer from '~/lib/components/content/toc-container';
import RelatedArticles from '~/lib/components/content/related-articles';
import { getMDXSource } from '~/lib/data/mdx';
import path from 'path';
import SEO from '~/lib/components/content/seo';
import Image from '~/lib/components/primitives/image';
import ArticleStats, { ArticleStatsType } from '~/lib/components/content/article-stats';
import Subscribe from '~/lib/components/cta/subscribe';
import { readingTime, url } from '~/lib/functions/utils';
import { pick } from '@arcath/utils/lib/functions/pick';
import { log } from '~/lib/functions/log';
import Error from 'next/error';

const MODULE_NAME = 'page-router-slug';

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [];
  const fallback = false;

  Routes.map((route) => {
    paths.push({ params: { slug: route.path.split('/') } });
  });

  return {
    paths,
    fallback,
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext<{ slug: string[] }>) => {
  // we have the slug but that is split into an array of directories. let's join it
  // back so we can find the path of the file from the routes.json
  const slugPath = params.slug.join('/');
  const routeEntry = Routes.find((r) => r.path === slugPath);
  const article = getMDXSource(path.join(process.cwd(), routeEntry.mdxFile));

  const source = await article.bundle;
  const relatedFrontMatter = null;
  const author = (await article.data).author ?? null;
  const image = (await article.data).image ?? null;
  const alt = (await article.data).alt ?? null;
  const category = (await article.data).category ?? null;
  const tags = (await article.data).tags ?? null;

  return {
    props: {
      article: {
        ...pick(await article.data, ['slug', 'title', 'description', 'keywords', 'dateUpdated', 'datePublished']),
        author,
        image,
        alt,
        category,
        tags,
      },
      source,
      // keywords: article.keywords,
      slug: params.slug,
      toc: article.toc,
      relatedArticles: await relatedFrontMatter,
      routeEntry,
    },
  };
};

const RouterPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  article,
  source,
  slug,
  toc,
  relatedArticles,
  routeEntry,
}) => {
  const stats: ArticleStatsType = {
    dateUpdated: article.dateUpdated,
    datePublished: article.datePublished,
    author: article.author ?? meta.author.name,
    category: article.category ?? null,
    readingTime: readingTime(source),
    tags: article.tags,
  };
  const pageSlug = slug.join('/');
  if (routeEntry.layoutOptions.showImage && !article.image) {
    log(MODULE_NAME, `No image found for article - ${article.slug}`);
    return <Error statusCode={500} />;
  }
  return (
    <>
      <SEO
        title={`${article.title} `}
        description={article.description}
        url={url(pageSlug)}
        image={article.image ? article.image : meta.defaultImage}
        type="article"
        keywords={article.keywords}
        datePublished={article.datePublished}
        dateUpdated={article.dateUpdated}
      />

      <Layout>
        <header>
          {routeEntry.layoutOptions.showImage ? (
            <Image
              id="blog-hero"
              source={article.image}
              alt={article.alt}
              title={article.title}
              text={article.description}
            />
          ) : (
            ''
          )}
        </header>
        <article>
          <footer>{routeEntry.layoutOptions.articleStats ? <ArticleStats summary={stats} /> : ''}</footer>
          <div className="mt-8 flex">
            <div className="content-positioning prose md:basis-4/6 ">
              <ContentContainer>
                <MDX
                  source={source}
                  toc={toc}
                  articles={relatedArticles}
                  components={{ Signup, TOCContainer, RelatedArticles, Subscribe }}
                />
              </ContentContainer>
            </div>
            <div className="sticky ml-8">
              {/* Show related articles and TOC on the sidebar on larger devices  */}
              {routeEntry.layoutOptions.toc ? <TOCContainer toc={toc} display="desktop only" /> : ''}
              <div className="mt-8 hidden md:block">
                {routeEntry.layoutOptions.relatedArticles ? <RelatedArticles articles={relatedArticles} /> : ''}
              </div>
            </div>
          </div>
        </article>
        {/* Show the related articles at the bottom of the page on small devices  */}
        <div className="mt-8 block md:hidden">
          <RelatedArticles articles={relatedArticles} />
        </div>
      </Layout>
    </>
  );
};

export default RouterPage;
