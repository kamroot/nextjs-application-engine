import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { defaults } from '@arcath/utils/lib/functions/defaults';
import { asyncMap } from '@arcath/utils/lib/functions/async-map';
import { TOCEntry } from '~/lib/functions/toc';
import { log } from '../functions/log';
import { prepareMDX } from '../functions/prepare-mdx';

const { readFile, readdir } = fs.promises;

const fileCache: Record<string, File<any, any>> = {};

const MODULE_NAME = 'file.ts';

export interface BaseProperties {
  bundleDirectory: string;
}

export type File<Frontmatter extends {}, Properties extends { bundleDirectory: string }> = {
  readonly contents: Promise<string>;
  readonly data: Promise<Frontmatter & Properties>;
  readonly bundle: Promise<string>;
  readonly toc: TOCEntry[];
  readonly file: {
    directory: string;
    extension: string;
    path: string;
    rawContents: string;
  };
  readonly index: number;
  clear: () => void;
  getProperty: (property: keyof (Frontmatter & Properties)) => Promise<any>;
  readonly properties: Properties;
};

const createFile = <Frontmatter extends {}, Properties extends BaseProperties>(
  filePath: string,
  properties: Properties
): File<Frontmatter, Properties> => {
  let rawContents: string;
  let contents: string;
  let frontmatter: Frontmatter;
  let bundle: string;
  let bundlePromise: Promise<string>;
  const toc: Array<TOCEntry> = new Array();

  const clear = () => {
    log('file', `clearing cache (${filePath})`);
    rawContents = undefined;
    contents = undefined;
    frontmatter = undefined;
    bundle = undefined;
  };

  if (process.env.NODE_ENV === 'development') {
    fs.watch(filePath, {}, (event) => {
      if (event === 'change' && typeof rawContents === 'string') {
        clear();
      }
    });
  }

  const getRawContents = async () => {
    // log('file', `got contents of ${filePath}`);
    rawContents = (await readFile(filePath)).toString();
  };

  const getContents = () => {
    const parsed = matter(rawContents);

    contents = parsed.content;
  };

  const getFrontmatter = () => {
    const parsed = matter(rawContents);

    frontmatter = parsed.data as any;
  };

  const file = {
    directory: path.dirname(filePath),
    extension: path.extname(filePath),
    path: filePath,
    rawContents,
  };

  return {
    properties,
    index: Object.keys(fileCache).length,
    file,
    toc,
    clear,
    getProperty: async (property: keyof (Frontmatter & Properties)) => {
      if (properties.hasOwnProperty(property)) {
        return properties[property as keyof Properties];
      }

      if (typeof rawContents !== 'string') {
        await getRawContents();
      }

      if (typeof frontmatter === 'undefined') {
        getFrontmatter();
      }

      return frontmatter[property as keyof Frontmatter];
    },
    get contents(): Promise<string> {
      return (async () => {
        if (typeof rawContents !== 'string') {
          await getRawContents();
        }

        if (typeof contents !== 'string') {
          getContents();
        }

        return contents;
      })();
    },
    get data(): Promise<Frontmatter & Properties> {
      return (async () => {
        if (typeof rawContents !== 'string') {
          await getRawContents();
        }

        if (typeof frontmatter === 'undefined') {
          getFrontmatter();
        }

        return {
          ...frontmatter,
          ...properties,
        };
      })();
    },
    get bundle(): Promise<string> {
      return (async () => {
        if (typeof rawContents !== 'string') {
          await getRawContents();
        }

        if (typeof contents !== 'string') {
          getContents();
        }

        if (typeof bundle !== 'string') {
          if (!bundlePromise) {
            bundlePromise = prepareMDX(contents, toc, {
              directory: file.directory,
              imagesUrl: properties.bundleDirectory,
            });
          }

          bundle = await bundlePromise;
        }

        return bundle;
      })();
    },
  };
};

export const file = <Frontmatter extends {}, Properties extends { bundleDirectory: string }>(
  filePath: string,
  properties: Properties
): File<Frontmatter, Properties> => {
  if (!fileCache[filePath]) {
    // log(`file`, `new file ${filePath}`);
    fileCache[filePath] = createFile(filePath, properties);
  }

  return fileCache[filePath] as File<Frontmatter, Properties>;
};

export interface ContentQueryParams<Frontmatter, Properties extends BaseProperties> {
  limit: number | false;
  orderBy: keyof (Frontmatter & Properties);
  /** Only works if `limit` is defined */
  skip: number;
  order: 'ASC' | 'DESC';
}

export const getFiles = <Frontmatter, Properties extends BaseProperties>({
  directory,
  getProperties,
  defaultQueryParams,
  getFilePath,
}: {
  directory: string;
  getProperties: (filePath: string) => Properties;
  defaultQueryParams: ContentQueryParams<Frontmatter, Properties>;
  getFilePath?: (dir: string) => string;
}): ((query?: Partial<ContentQueryParams<Frontmatter, Properties>>) => Promise<File<Frontmatter, Properties>[]>) => {
  if (!fs.existsSync(directory)) {
    console.log(MODULE_NAME, `${directory} does not exist`);
  }
  const ret = async (query) => {
    const dirs = fs.existsSync(directory) ? fs.readdirSync(directory) : [];

    const { limit, orderBy, order, skip } = defaults(query, defaultQueryParams);

    let files = dirs.map((dir) => {
      const filePath = getFilePath ? getFilePath(dir) : path.join(directory, dir, 'index.mdx');

      return file<Frontmatter, Properties>(filePath, getProperties(filePath));
    });

    const sortOnMap = await asyncMap(files, async (entry, index) => {
      const value = await entry.getProperty(orderBy);

      return { index, value };
    });

    const sorted = sortOnMap.sort((a, b) => {
      let retVal;
      if (a.value === b.value) {
        retVal = 0;
      } else {
        retVal = Date.parse(a.value) - Date.parse(b.value) > 0 ? 1 : -1;
      }
      return retVal;
    });

    files = sorted.map(({ index }) => files[index]);

    if (order === 'DESC') {
      files = files.reverse();
    }

    if (limit !== false) {
      files = files.slice(skip, skip + limit);
    }
    // for (const f in files) {
    //   console.log(
    //     f,
    //     // await files[f].getProperty('dateUpdated'),
    //     await files[f].getProperty('dateUpdated'),
    //     await files[f].getProperty('title'),
    //     files[f].properties.slug
    //   );
    // }
    return files;
  };
  return ret;
};
