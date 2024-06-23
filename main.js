#!/usr/bin/env node

const webpack = require("webpack")
const path = require("path");
const puppeteer = require("puppeteer");
const PugPlugin = require("pug-plugin");

const entry = path.join(process.cwd(), process.argv[2])

let browser = null, page = null

function printToPDF(compiler) {
    compiler.hooks.done.tap("PrintToPDF", async () => {
        if (browser === null || page === null) {
            browser = await puppeteer.launch({ headless: "new" });
            page = await browser.newPage();
        }

        await page.goto(
            "file://" + path.resolve(process.cwd(), "dist/source.html"),
            { waitUntil: "networkidle0" }
        );

        await page.pdf({
            path: path.resolve(
                process.cwd(),
                path.basename(entry, path.extname(entry)) + ".pdf"
            ),
            printBackground: true,
            preferCSSPageSize: true,
        });

        console.log("\n\x1b[1;32mCompilation finished!\x1b[0m");
    })
}

const config = {
    mode: "production",
    watch: true,
    entry: {
        source: entry
    },
    output: {
        path: path.resolve(path.dirname(entry), "dist"),
        assetModuleFilename: '[name].[ext]',
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
    resolveLoader: {
        modules: [
            path.resolve(__dirname, "node_modules")
        ]
    },
    plugins: [
        new PugPlugin(),
        { apply: printToPDF }
    ],
    stats: {
        warnings: true
    }
}

webpack(config, (err, stats) => {
    if (err || stats.hasErrors()) {
        console.error(err || stats.toJson().errors);
        return;
    }
})
