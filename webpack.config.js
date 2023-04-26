const path = require("path");
const puppeteer = require("puppeteer");
const PugPlugin = require("pug-plugin");

let browser = null, page = null;
const entry = process.env.npm_config_entry;

module.exports = {
    mode: "production",
    entry: {
        source: path.resolve(__dirname, entry)
    },
    output: {
        path: path.resolve(__dirname, path.dirname(entry), "dist"),
        assetModuleFilename: '[path][name].[ext]',
    },
    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: PugPlugin.loader,
            },
            {
                test: /\.scss$/,
                use: [
                    "css-loader",
                    "sass-loader",
                ]
            },
            {
                test: /\.css$/,
                loader: "css-loader",
            },
            {
                test: /\.(woff|woff2|eot|tff|svg|png|jpg)$/,
                type: "asset/resource",
            },
        ]
    },
    plugins: [
        new PugPlugin(),
        { // Print document to PDF after build
            apply: (compiler) => {
                compiler.hooks.done.tap("PrintToPDF", async () => {
                    if (browser === null || page === null) {
                        browser = await puppeteer.launch({ headless: "new" });
                        page = await browser.newPage();
                    }

                    const input = path.resolve(__dirname, path.dirname(entry), "dist/source.html"),
                        output = path.resolve(__dirname, path.dirname(entry));

                    await page.goto("file://" + input, { waitUntil: "networkidle0" });

                    await page.pdf({
                        path: path.resolve(output, path.basename(entry, path.extname(entry)) + ".pdf"),
                        printBackground: true,
                        preferCSSPageSize: true,
                    });

                    console.log("\n\x1b[1;32mCompilation finished!\x1b[0m");
                })
            }
        }
    ],
    stats: {
        warnings: false
    }
}
