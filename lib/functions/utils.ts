import { log } from './log';
import meta from 'facade/data/meta.json';
import { Children } from 'react';
import { config } from 'lib/functions/config';
const path = require('path');

// takes a list of file paths and converts it to a URL
// core idea from https://javascript.plainenglish.io/how-to-safely-concatenate-url-with-node-js-f6527b623d5
export const url = (...paths) => {
  const p = paths.reduce((acc, curr) => path.join(acc, curr));
  return new URL(p, process.env.NEXT_PUBLIC_SITE_URL).toString();
};

export const titleCase = (text) => {
  return (
    text &&
    text
      .toLowerCase()
      .split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ')
  );
};

// function to generate an id for an element
export const genId = (prefix: string, text: React.ReactNode) => {
  const renderedText = Children.toArray(text).join('');
  const _divid = prefix + '-' + renderedText.toLocaleLowerCase().replace(/ /g, '-');
  return _divid;
};

// export const SPECIAL_CHARS = '?[]!';
const SPECIAL_CHARS = /[`~!@#$%^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/gi;

export const stringToId = (str: string) => {
  // return str.replaceAll(' ', '-').replaceAll(SPECIAL_CHARS, '');
  if (!str) {
    log('stringToId', 'str is empty');
    return 'unknown';
  }
  return str.replace(/ /g, '-').replace(SPECIAL_CHARS, '');
};

export const trim = (str: string, len: number, trailingChars = '...') => {
  return str.slice(0, len) + `${trailingChars}`;
};

export const dateToISOString = (date: Date) => date.toISOString().split('T')[0];

export const isoDateToReadable = (date: string) => {
  const d = new Date(date);
  return d.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

export const readingTime = (text: string) => Math.round(text.length / meta.constants.WORDS_PER_MINUTE);

export const showFullDate = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
