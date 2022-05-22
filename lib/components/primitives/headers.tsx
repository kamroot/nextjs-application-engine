import Link from 'next/link';
import React from 'react';
import { genId } from '~/lib/functions/utils';

export const H1: React.FC<any> = (props) => {
  const id = genId('h1', props.children);
  return (
    <>
      <div>
        <span className="invisible hover:visible">
          <h1 className="visible inline" id={id}>
            {...props.children}
          </h1>
          <Link href={`#${id}`}> ## </Link>
        </span>
      </div>
    </>
  );
};

export const H2: React.FC<any> = (props) => {
  const id = genId('h2', props.children);
  return (
    <>
      <div>
        <span className="invisible hover:visible">
          <h2 className="visible inline" id={id}>
            {...props.children}
          </h2>
          <Link href={`#${id}`}> ## </Link>
        </span>
      </div>
    </>
  );
};

export const H3: React.FC<any> = (props) => {
  const id = genId('h3', props.children);
  return (
    <>
      <div>
        <span className="invisible hover:visible">
          <h3 className="visible inline" id={id}>
            {...props.children}
          </h3>
          <Link href={`#${id}`}> ## </Link>
        </span>
      </div>
    </>
  );
};

export const H4: React.FC<any> = (props) => {
  const id = genId('h4', props.children);
  return (
    <>
      <div>
        <span className="invisible hover:visible">
          <h4 className="visible inline" id={id}>
            {...props.children}
          </h4>
          <Link href={`#${id}`}> ## </Link>
        </span>
      </div>
    </>
  );
};
