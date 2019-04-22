const fse = require("fs-extra");
const path = require("path");
const PageBuilder = require("webpage-templates").Demopage;

const SRC_DIR = path.resolve(__dirname);
const DEST_DIR = path.resolve(__dirname, "..", "docs");
const PAGE_DATA_PATH = path.resolve(SRC_DIR, "config", "page-data.json");
const minified = true;

PageBuilder.build(DEST_DIR, PAGE_DATA_PATH, !minified);

fse.copySync(path.resolve(SRC_DIR, "static"), DEST_DIR);
