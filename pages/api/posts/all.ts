import { NextApiHandler } from 'next';
import { asyncMap } from '@arcath/utils/lib/functions/async-map';
import type { NextApiRequest, NextApiResponse } from 'next';
import meta from 'facade/data/meta.json';
import { getBlogList } from '~/lib/data/mdx';
import { log } from '~/lib/functions/log';

const MODULE_NAME = 'api-posts-all';

type ResponseData = {
  date: number;
  totalPages: number;
  blogsInThisReq: number;
  currentPage: number;
  blogsPerPageLimit: number;
  blogs: any[];
};

const allPostsHandler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  let currentPage = req.query.page === undefined ? 0 : Number(req.query.page);

  // let's get a list of all the blogs in the blog directory.
  // This also allows us to calculate the total number of pages. We need to return that to the client.
  // All these calculations are underpinned by meta.api.pageLimit (it is set to 10 right now - so 10
  // blogs in one page
  const blogFiles = await getBlogList({
    limit: false,
  });

  // to understand the following try this - imagine there are 72 blog articles. that would be 8 pages. If there are 70
  // blog articles, that would be 7 pages.
  const totalPages =
    Math.floor(blogFiles.length / meta.api.pageLimit) + (blogFiles.length % meta.api.pageLimit ? 1 : 0);

  currentPage = currentPage > totalPages ? totalPages - 1 : currentPage;

  // read the blog directory and their frontmatter. We are only reading a slide of the original array returned
  // The calculations are underpinned by both meta.api.pageLimit and currentPage (which is what the clien requests)
  const blogs = await asyncMap(
    blogFiles.slice(currentPage * meta.api.pageLimit, currentPage * meta.api.pageLimit + meta.api.pageLimit),
    async (blog) => {
      const data = await blog.data;
      return data;
    }
  );

  log(MODULE_NAME, `API: req:: cookies - ${JSON.stringify(req.cookies)}, page - ${currentPage}`);
  log(MODULE_NAME, `API: res:: count ${blogs.length}, page ${currentPage}, limit - ${meta.api.pageLimit}`);
  // blogs.map((b, i) => console.log(`${i} - ${b.title}`));

  res.status(200).json({
    date: Date.now(),
    blogsPerPageLimit: meta.api.pageLimit,
    currentPage,
    totalPages,
    blogsInThisReq: blogs.length,
    blogs,
  });
};

export default allPostsHandler;
