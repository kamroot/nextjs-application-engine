import React from 'react';
import { log } from 'lib/functions/log';
import { TOCEntry } from 'lib/functions/toc';
import Link from 'next/link';

// This file exports two functions - GenerateTOC and genID.
// genID is used when parsing the MDX to generate and insert divids in header (or anything else really)
// Generate TOC is used later to generate the table of contents

// inspired by https://stackoverflow.com/questions/70582487/why-is-mdx-with-next-js-missing-ids-on-my-elements
// Array to hold all divids

// TOC display from https://www.emgoto.com/react-table-of-contents/
const TOC = [];

export const getTOC = () => {
  log('toc', `Return length ${TOC.length}`);
  return TOC;
};

type TOCProps = {
  toc: Array<TOCEntry>;
  level?: number;
};

const TableOfContents: React.FC<TOCProps> = ({ toc }) => {
  const levelOfNextEntry = (arr, indx) => indx + 1 < arr.length && parseInt(arr[indx + 1].level);

  const printChildren = (t) => {
    let foundNextH1 = false;
    if (t.level === 1) {
      return;
    }
    return t.map((e, j) => {
      const ret = foundNextH1 ? (
        ''
      ) : (
        <li key={j} className="px-2">
          <Link href={`#${e.anchor}`}>
            <a>{e.text}</a>
          </Link>
        </li>
      );
      if (levelOfNextEntry(t, j) === 1) {
        foundNextH1 = true;
      }
      return ret;
    });
  };

  const printEntryWithChildren = (arr, indx) => {
    const cls = ' text-brand-secondary-500';

    return (
      <details>
        <summary className={cls}>
          <Link href={`#${toc[indx].anchor}`}>
            <a>{toc[indx].text}</a>
          </Link>
        </summary>

        <ul>{indx + 1 < arr.length ? printChildren(arr.slice(indx + 1)) : ''}</ul>
      </details>
    );
  };

  return (
    <aside className="sticky top-0 w-72 rounded bg-brand-neutral-100 p-8 shadow-md">
      <div className="pb-2 text-2xl text-brand-core">Table of Contents</div>

      {toc.map((t, i) => {
        // We are going to print each array either on its own line or as a HTML detail
        // entry.
        return parseInt(t.level) === 1 ? (
          <div key={i}>
            {levelOfNextEntry(toc, i) !== 1 && i + 1 !== toc.length ? (
              printEntryWithChildren(toc, i)
            ) : (
              <Link href={`#${t.anchor}`}>
                <a>
                  <div className="flex items-center">
                    <div className="mr-2 inline-block h-1 w-1 rounded-full bg-brand-core"></div>
                    {t.text}
                  </div>
                </a>
              </Link>
            )}
          </div>
        ) : (
          ''
        );
      })}
    </aside>
  );
};

export default TableOfContents;
