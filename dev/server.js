const path = require("path");
const express = require("express");

const toAbsolutePath = (relativePath) => {
  return path.join(__dirname, relativePath);
};

const buildDirectory = toAbsolutePath("../build");
const publicDirectory = toAbsolutePath("../src/public");

const app = express();
app.use(express.static(buildDirectory));
app.use(express.static(publicDirectory));

app.listen(3000, () => {
  console.log("Http server listening on port 3000...");
});
