import React, { useMemo, ReactHTMLElement } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import Link from 'next/link';
import { omit } from '@arcath/utils/lib/functions/pick';
import { TOCEntry } from '~/lib/functions/toc';
import { H1, H2, H3, H4 } from '~/lib/components/primitives/headers';
import { Code } from './code';
import { MDXFrontmatterProps } from 'lib/data/mdx';
// import Article  from 'lib/components/related-articles';

const preToCodeBlock = (
  preProps: any
): {
  language: string;
  codeString: string;
  line?: string;
  fileName?: string;
  url?: string;
  className: string;
} => {
  if (
    // children is code element
    preProps.children &&
    // code props
    preProps.children.props &&
    // if children is actually a <code>
    preProps.children.type === 'code'
  ) {
    // we have a <pre><code> situation
    const { children: codeString, className = '', ...props } = preProps.children.props;

    const matches = className.match(/language-(?<lang>.*)/);

    return {
      codeString: codeString.trim(),
      className,
      line: props.line,
      fileName: props.filename,
      language: matches && matches.groups && matches.groups.lang ? matches.groups.lang : '',
      ...omit(props, ['children']),
    };
  }
};

const Paragraph: React.FC<any> = (props) => {
  if (typeof props.children !== 'string' && props.children.type === 'img') {
    return <>{props.children}</>;
  }

  return <p {...props} />;
};

const BlockQuote: React.FC<any> = (props) => {
  return (
    <div className="relative  m-0 mb-2 border-2 border-neutral-200  bg-brand-primary-200 p-1 text-lg  font-semibold text-brand-core shadow-lg shadow-neutral-300">
      <p className="absolute -top-1 -left-1 m-0 h-5 w-5 border-t-4 border-l-4 border-brand-core p-0" />
      <div className=""> {props.children} </div>
      <p className="absolute -bottom-1 -right-1 m-0 h-5 w-5 border-b-4 border-r-4 border-brand-core p-0" />
    </div>
  );
};

const Anchor: React.FC<Partial<ReactHTMLElement<HTMLAnchorElement>['props']>> = (props) => {
  const { href, children } = props;

  if (!href) {
    return <a {...props} />;
  }

  return (
    <Link href={href!}>
      <a>{children}</a>
    </Link>
  );
};

export const renderComponents = {
  //img: Img,
  p: Paragraph,
  a: Anchor,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  blockquote: BlockQuote,
  pre: (preProps: Partial<ReactHTMLElement<HTMLPreElement>['props']>) => {
    const props = preToCodeBlock(preProps);

    if (props) {
      return <Code {...props} />;
    }

    return <pre {...preProps} />;
  },
};

type MDXProps = {
  source: string;
  toc?: Array<TOCEntry>;
  articles?: Array<MDXFrontmatterProps>;
  components?: {};
};
export const MDX: React.FC<MDXProps> = ({ source, toc, components }) => {
  const Component = useMemo(() => getMDXComponent(source), [source]);
  return <Component components={{ ...renderComponents, ...components }} toc={toc} />;
};

export const Content: React.FC<{ source: any; heading: string; toc: Array<TOCEntry> }> = ({ source, heading, toc }) => {
  return (
    <>
      <H1>{heading}</H1>
      <MDX source={source} toc={toc} />
    </>
  );
};

export const ContentContainer: React.FC = ({ children }) => {
  return (
    <>
      <div className="content-positioning prose">{children}</div>
    </>
  );
};
