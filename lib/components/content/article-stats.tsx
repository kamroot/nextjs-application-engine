import React from 'react';
import DateTime from '~/lib/components/content/date-time';
import { titleCase } from '~/lib/functions/utils';

export type ArticleStatsType = {
  category: string;
  author: string;
  dateUpdated: string;
  datePublished: string;
  tags: string[];
  readingTime: number;
};

const ArticleStats = ({ summary }) => {
  return (
    <div className="mt-4 flex w-full flex-wrap rounded-sm bg-slate-200 p-4 shadow-sm">
      <div className="basis-full md:basis-1/2">
        <div>
          <span className="font-light">Author</span> {summary.author}
        </div>
        <div>
          <span className="font-light">Reading Time </span>
          {summary.readingTime} minutes
        </div>
      </div>
      <div className="basis-full md:basis-1/2">
        <div>
          <span className="font-light">Category </span>
          {titleCase(summary.category)}
        </div>
        <div>
          <span className="font-light">Updated on </span>
          <DateTime datetime={summary.dateUpdated} />
        </div>
        {/* <div>
          <span className="font-light">Tags </span>
          {summary.tags && summary.tags.join(', ')}
        </div> */}
      </div>
    </div>
  );
};

export default ArticleStats;
