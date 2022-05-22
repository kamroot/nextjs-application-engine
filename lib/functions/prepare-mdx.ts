import path from 'path';
import { remarkMdxImages } from 'remark-mdx-images';
import remarkGfm from 'remark-gfm';
import { TOCEntry } from '~/lib/functions/toc';
import { genId } from '~/lib/functions/utils';

const getRehypeMdxCodeMeta = async (toc) => {
  const { visit } = await import('unist-util-visit');

  function visitor(node) {
    if (node.tagName === 'h1' || node.tagName === 'h2' || node.tagName === 'h3' || node.tagName === 'h4') {
      const lvl = node.tagName === 'h1' ? 1 : node.tagName === 'h2' ? 2 : node.tagName === 'h3' ? 3 : 4;
      toc.push({
        level: lvl,
        text: node.children[0].value,
        anchor: genId(node.tagName, node.children[0].value),
      });
    }
    if (node.tagName === 'code' && node.data && node.data.meta) {
      const blocks = node.data.meta.split(' ') as string[];

      node.properties = blocks.reduce((props, block) => {
        const [prop, value] = block.split('=');

        if (typeof value === 'undefined') {
          props.line = prop;

          return props;
        }

        props[prop] = value;

        return props;
      }, node.properties);
    }
  }

  return () => {
    return (tree) => {
      visit(tree, 'element', visitor);
    };
  };
};

export const prepareMDX = async (
  source: string,
  toc: TOCEntry[],
  options: {
    files?: Record<string, string>;
    directory?: string;
    imagesUrl?: string;
  }
) => {
  if (process.platform === 'win32') {
    process.env.ESBUILD_BINARY_PATH = path.join(process.cwd(), 'node_modules', 'esbuild-windows-64', 'esbuild.exe');
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(process.cwd(), 'node_modules', 'esbuild', 'bin', 'esbuild');
  }

  const { bundleMDX } = await import('mdx-bundler');

  const { directory, imagesUrl } = options;

  // const gfm = (await import('remark-gfm')) as any

  const rehypeMdxCodeMeta = await getRehypeMdxCodeMeta(toc);
  const { code, errors } = await bundleMDX({
    source,
    cwd: directory,
    xdmOptions: (options) => {
      options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkGfm, remarkMdxImages];

      options.rehypePlugins = [...(options.rehypePlugins ?? []), rehypeMdxCodeMeta];
      return options;
    },
    esbuildOptions: (options) => {
      options.outdir = path.join(process.cwd(), 'public', imagesUrl);
      options.loader = {
        ...options.loader,
        '.png': 'file',
        '.jpg': 'file',
        '.gif': 'file',
      };
      options.publicPath = imagesUrl;
      options.write = true;

      return options;
    },
  });

  if (errors.length > 0) {
    console.dir(errors.map(({ detail }) => detail));
  }

  return code;
};
