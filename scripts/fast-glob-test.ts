const fg = require('fast-glob');

const content = [
  // Example content paths...
  './public/**/*.html',
  './facade/**/*.{js,jsx,ts,tsx}',
  './pages/**/*.{js,jsx,ts,tsx}',
  './lib/**/*.{js,jsx,ts,tsx}',
];

const entries = fg.sync(content, { dot: false });
console.log(entries);
