const fs = require("fs");
const path = require("path");
const md5 = require("md5");

const dist = path.resolve(__dirname, "dist");

const dataSource = path.resolve(__dirname, "src/data");
const files = fs
  .readdirSync(dataSource)
  .map(o => path.resolve(dataSource, o))
  .map(file => fs.readFileSync(file, { encoding: "utf-8" }))
  .join("\n");

const hash = md5(files);

console.log(`data hash is ${hash}`);

[
  "components.css.map",
  "components.css",
  "main.js",
  "main.js.map",
  "main.css"
].forEach(file => {
  if (fs.existsSync(path.join(dist, file))) {
    fs.renameSync(path.join(dist, file), path.join(dist, `${hash}-${file}`));
  }
});

let indexHtml = fs.readFileSync(path.join(dist, "index.html"), {
  encoding: "utf8"
});

["components.css", "main.js", "main.css"].forEach(file => {
  indexHtml = indexHtml.replace(file, `${hash}-${file}`);
});

fs.writeFileSync(path.join(dist, "index.html"), indexHtml);
