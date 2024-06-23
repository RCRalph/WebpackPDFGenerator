# WebpackPDFGenerator
WebpackPDFGenerator is a Webpack-based PDF creator which uses Pug + SCSS as its source.

## Features
- Webpack-based, which means with a little bit of knowledge you can add any features you need in your PDF.
- PDF compilation done by printing documents with the Chromium engine (using Puppeteer).

## Getting started
1. Install package using `npm install -g webpack-pdf-generator`.
2. Create PDFs using `npx webpack-pdf-generator <file_basename>.pug`.
3. Open compiled PDF, which is available under `<file_basename>.pdf`.
