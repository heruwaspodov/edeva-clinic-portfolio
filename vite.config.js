const path = require("path");
const { pages, renderPage } = require("./scripts/build-pages.js");

module.exports = {
    plugins: [
        {
            name: "edeva-shared-head",
            transformIndexHtml(html, context) {
                const filename = path.basename(context.filename || "index.html");
                const page = pages[filename] || pages["index.html"];

                return renderPage(html, page, filename);
            },
        },
    ],
};
