const qiniu = require("qiniu");
const path = require("path");
const fs = require("fs");

const dist = path.resolve(__dirname, "dist");

const files = fs
  .readdirSync(dist)
  .filter(o => !o.startsWith(".") && !o.endsWith(".map"));

let accessKey = process.env.accessKey;
let secretKey = process.env.secretKey;
let bucket = "2019-ncov";
let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

const list = files.map(file => {
  const keyToOverwrite = file;
  let options = {
    scope: bucket + ":" + keyToOverwrite
  };
  const putPolicy = new qiniu.rs.PutPolicy(options);
  let config = new qiniu.conf.Config();
  let formUploader = new qiniu.form_up.FormUploader(config);
  const uploadToken = putPolicy.uploadToken(mac);
  return new Promise(r => {
    formUploader.putFile(
      uploadToken,
      file,
      path.resolve(dist, file),
      new qiniu.form_up.PutExtra(),
      r
    );
  });
});

Promise.all(list);
