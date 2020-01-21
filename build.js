const fs = require("fs");
const path = require("path");
const md5 = require("md5");

const dist = path.resolve(__dirname, "dist");

const hashMap = new Map();

[
  "components.css.map",
  "components.css",
  "main.js",
  "main.js.map",
  "main.css"
].forEach(file => {
  const fileRealPath = path.join(dist, file);
  if (fs.existsSync(path.join(dist, file))) {
    const hash = md5(
      fs.readFileSync(fileRealPath, { encoding: "utf-8" })
    ).slice(0, 10);
    hashMap.set(file, hash);
    fs.renameSync(fileRealPath, path.join(dist, `${hash}-${file}`));
  }
});

let indexHtml = fs.readFileSync(path.join(dist, "index.html"), {
  encoding: "utf8"
});

["components.css", "main.js", "main.css"].forEach(file => {
  const hash = hashMap.get(file);
  indexHtml = indexHtml.replace(file, `${hash}-${file}`);
});

fs.writeFileSync(path.join(dist, "index.html"), indexHtml);
