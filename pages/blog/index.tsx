import React, { useState } from 'react';
import { NextPage } from 'next';
import meta from 'facade/data/meta.json';
import { Layout } from '~/lib/components/layouts/classic';
import Card from '~/lib/components/content/card';
import { useQuery, dehydrate, QueryClient } from 'react-query';
import Pagination from '@material-ui/lab/Pagination';
import { useRouter } from 'next/router';
import SEO from '~/lib/components/content/seo';
import { url, genId } from 'lib/functions/utils';
// import { ToastContainer, toast } from 'react-toastify';

export async function getServerSideProps(context) {
  let page = 0;
  if (context.query.page) {
    page = parseInt(context.query.page);
  }
  const apiLocation = url(`/api/posts/all?page=${page}`);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    ['blogs', page],
    async () =>
      await fetch(apiLocation).then((result) => {
        return result.json();
      })
  );
  return { props: { dehydratedState: dehydrate(queryClient) } };
}

const BlogsPage: NextPage = () => {
  const router = useRouter();
  // @ts-ignore
  // console.log(router.query);
  const [page, setPage] = useState(parseInt(router.query.page) || 0);
  const apiLocation = url(`/api/posts/all?page=${page}`);

  // does the requesting page want us to show a toast?
  const showToast = router.query.showToast;
  const message = router.query.message;

  // log('BLOG TOAST', `${showToast} and message ${message}`);

  // showToast === 'true' ? toast.info(message) : '';

  const { data } = useQuery(['blogs', page], async () => await fetch(apiLocation).then((result) => result.json()), {
    keepPreviousData: true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  function handlePaginationChange(e, value) {
    setPage(value);
    router.push(`blog/?page=${value}`, undefined, { shallow: true });
  }

  return (
    <Layout>
      <SEO
        title="Best in real-estate : Investment, finance, taxes, landlord, tenant relations, managing expenses, design and style ideas"
        description="Best in real-estate : Investment, finance, taxes, landlord, tenant relations, managing expenses, design and style ideas "
        url={url('/blog')}
        image="/img/blog/WhenToWithholdRent.jpg"
        type="blog"
        datePublished={meta.datePublished}
        dateUpdated="2022-05-01"
        keywords={[
          'real estate',
          'real estate investment',
          'real estate finance',
          'real estate taxes',
          'real estate landlord',
          'real estate tenant',
          'real estate management',
          'real estate design',
          'real estate style',
        ]}
      />
      {/* 
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        containerId="blog-toast"
        limit={1}
      /> */}

      <div className="prose prose-xl">
        {data.blogs &&
          data.blogs.map((blog) => (
            <Card
              key={blog.slug}
              title={blog.title}
              url={`/blog/${blog.slug}`}
              lead={blog.description}
              id={genId('blog_card', blog.title)}
              image={{
                source: blog.image,
                alt: blog.title,
                title: blog.title,
                text: null,
                category: blog.category,
              }}
            />
          ))}
      </div>

      <Pagination
        count={data?.totalPages - 1}
        variant="outlined"
        color="primary"
        className="pagination"
        page={page}
        onChange={handlePaginationChange}
      />
    </Layout>
  );
};

export default BlogsPage;
