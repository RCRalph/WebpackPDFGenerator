# WebpackPDFGenerator
WebpackPDFGenerator is a Webpack-based PDF creator which uses Pug + SCSS as its source.

## Features
- Webpack-based, which means with a little bit of knowledge you can add any features you need in your PDF.
- PDF compilation done by printing documents with the Chromium engine (using Puppeteer).

## Getting started
1. Clone the repository using `git clone https://github.com/RCRalph/WebpackPDFGenerator`.
2. Go into the newly created directory using `cd WebpackPDFGenerator`.
3. Install required dependencies using `npm install`.
4. Compile the **Hello World** document using `npm run build example/index.pug`.
5. Open compiled PDF, which is available under `example/index.pdf`.

## Creating new documents
1. Create a new directory inside `WebpackPDFGenerator`.
2. Inside the newly created directory create the entry file (with `.html` or `.pug` extension).
3. Run the compilation.
