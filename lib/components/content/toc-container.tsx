import React from 'react';
import { TOCEntry } from 'lib/functions/toc';
import TableOfContents from './toc';

type TOCContainerProps = {
  toc: Array<TOCEntry>;
  display: 'mobile only' | 'desktop only' | 'all';
};

const TOCContainer: React.FC<TOCContainerProps> = ({ toc, display }) => {
  const cls = display === 'mobile only' ? 'block md:hidden' : display === 'desktop only' ? 'hidden md:block' : 'block';
  return (
    <div className={cls}>
      <TableOfContents toc={toc} />
    </div>
  );
};

export default TOCContainer;
