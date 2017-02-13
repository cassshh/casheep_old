#!/usr/bin/env node
'use strict';

const fs = require('fs');
if (process.argv.length < 3) {
  console.log('File not provided');
  process.exit(1);
}

try {
  //Get ENV passing score in Travis CI
  const _SCORE = process.env.LIGHTHOUSE_PASSING_SCORE;
  console.log(`Passing Score: ${_SCORE}`);

  const path = process.argv[2];
  const data = fs.readFileSync(path);
  const aggregations = JSON.parse(data).aggregations;
  const pwa = aggregations.find(a => a.name === 'Progressive Web App');
  const avg = pwa.score.reduce((last, s) => {
    return last + s.overall;
  }, 0) / pwa.score.length;

  // Failed to get more than 60% in the PWA section, so bail.
  // This is currently super lenient because I'm not testing over HTTPS, which
  // means those tests will fail.
  console.log(`Score: ${avg}`);

  if (avg < _SCORE) {
    console.log(JSON.stringify(pwa, null, 2));
    process.exit(1);
  }

  // All good.
  process.exit(0);
} catch (e) {
  console.log(e);
  process.exit(1);
}