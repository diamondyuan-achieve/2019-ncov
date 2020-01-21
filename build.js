const fs = require("fs");
const path = require("path");

const dist = path.resolve(__dirname, "dist");

const time = Date.now();

[
  "components.css.map",
  "components.css",
  "main.js",
  "main.js.map",
  "main.css"
].forEach(file => {
  if (fs.existsSync(path.join(dist, file))) {
    fs.renameSync(path.join(dist, file), path.join(dist, `${time}-${file}`));
  }
});

let indexHtml = fs.readFileSync(path.join(dist, "index.html"), {
  encoding: "utf8"
});

["components.css", "main.js", "main.css"].forEach(file => {
  indexHtml = indexHtml.replace(file, `${time}-${file}`);
});

fs.writeFileSync(path.join(dist, "index.html"), indexHtml);
