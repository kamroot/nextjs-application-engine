const fs = require('fs');
const fm = require('front-matter');
const path = require('path');
const chalk = require('chalk');

const MIN_TITLE_LENGTH = 25;
const MAX_TITLE_LENGTH = 70;
const MIN_ALT_LENGTH = 25;
const MIN_INTERNAL_URLS = 3;
const MIN_EXTERNAL_URLS = 3;
const IMAGE_URL_PATTERN = '/img/blog';
const MIN_KEYWORDS = 2;
const MIN_TAGS = 2;
const MIN_RELATED = 3;
const MIN_DESCRIPTION_LENGTH = 80;
const MIN_CONTENT_LENGTH = 500;
const CATEGORIES = ['Property Managers', 'Tenants', 'Home Owners'];
const TAGS = ['Finding Tenants', 'Managing Property', 'HowTos', 'Legal Matters'];

const titleCase = (text) => {
  return text
    .toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
};

const log = (text, status, addition) => {
  status ? console.log(`\t${chalk.green(text)} - ${addition}`) : console.log(`\t${chalk.red(text)} - ${addition}`);
  return status;
};

function getMDXFiles(filePath) {
  return fs.readdirSync(filePath).map((f) => path.join(f, '/index.mdx'));
}

const findURLs = (text) => {
  const re = /\[.*\]\(.*\)/g;
  // const res = text.match(re);
  // console.log(res && res.length);
  // console.log(res);
  const urls = {
    internal: [],
    external: [],
    match: text.match(re),
  };

  urls.match &&
    urls.match.forEach((el) => {
      if (el.includes('http')) {
        urls.external.push(el);
      } else {
        urls.internal.push(el);
      }
    });

  return urls;
};

const getFM = async (source, index) => {
  await fs.readFile(`../content/blog/${source}`, 'utf8', function (err, data) {
    if (err) {
      console.log(`No file - ${source}`);
    }

    const content = fm(data);

    const {
      title,
      dateUpdated,
      datePublished,
      image,
      alt,
      category,
      readTime,
      year,
      keywords,
      description,
      tags,
      related,
      region,
      country,
    } = content.attributes;
    console.log(`${index}.` + chalk.blue.underline.bold(`${title}`));
    console.log(`\t${chalk.blue(source)}`);

    log('Title too short', title.length >= MIN_TITLE_LENGTH, title.length);
    log('Title too long', title.length <= MAX_TITLE_LENGTH, title.length);

    log('No category', CATEGORIES.includes(titleCase(category)), category);
    log('No image', image != undefined, image);
    log('Image URL problem', image && image.match(IMAGE_URL_PATTERN), image);
    log('Image path problem', image && image.includes(IMAGE_URL_PATTERN), image);
    log('No date updated', dateUpdated != undefined, dateUpdated);
    log('Date updated format wrong', dateUpdated && dateUpdated.includes('-'), dateUpdated);
    log('No Date published', datePublished != undefined, datePublished);
    log('Date published format wrong', datePublished && datePublished.includes('-'), datePublished);
    log('No keywords', keywords, keywords);
    log('Not enough keywords length', keywords && keywords.length >= MIN_KEYWORDS, keywords && keywords.length);
    log('No image alt', alt, alt);
    log('Alt length is too short', alt && alt.length >= MIN_ALT_LENGTH, alt && alt.length);
    log('No tags', tags, tags);
    log('Not enough tags', tags && tags.length >= MIN_TAGS, tags && tags.length);
    log('Unsupported tags', TAGS.includes(tags), tags);
    log('No related links', related, related);
    log('No enough related links', related && related.length >= MIN_RELATED, related && related.length);
    log('Descript too short', description.length >= MIN_DESCRIPTION_LENGTH, `${description.slice(0, 80)}...`);
    log('Remove Read Time', readTime === undefined, readTime);
    log('Remove Year', year === undefined, year);
    log('Very short article', content.body.length >= MIN_CONTENT_LENGTH, content.body.length);
    log('Does not include Signup', content.body.includes('<Signup'), '');
    log('Does not include TOC', content.body.includes('<TOCContainer'), '');
    log('No Header1', content.body.match(/# /g), '');
    log('No Header2', content.body.match(/## /g), '');
    log('No Region', region, region);
    log('No Country', country, country);
    const urls = findURLs(content.body);
    log('Only relative internal URLs', urls.external.includes('homekasa'), urls.external);
    log('External URL count', urls.external.length >= MIN_EXTERNAL_URLS, `${urls.external.length} - ${urls.external}`);
    log('Internal URL count', urls.internal.length >= MIN_INTERNAL_URLS, `${urls.internal.length} - ${urls.internal}`);
    log(
      `No http`,
      urls.external.reduce((p, c) => p && !c.includes('http://'), true),
      ''
    );
    console.log('\n');
    return 0;
  });
};

const dirs = getMDXFiles('../content/blog');
const file = '';
dirs.forEach((f, index) => {
  if (f.includes(file)) getFM(f, index);
});

export {};
