import path from 'path';
import execa from 'execa';
import fs from "fs";

const typingsPath = path.resolve(__dirname, './typings');
const distPath = path.resolve(__dirname, './dist');
const cachePath = path.resolve(__dirname, './build-cache');

function build() {
  fs.rmdirSync(cachePath, {
    recursive: true,
  });
  fs.rmdirSync(typingsPath, {
    recursive: true,
  });
  fs.rmdirSync(distPath, {
    recursive: true,
  });

  execa.commandSync('tsc', {
    stdio: "inherit"
  });
  console.log("物料构建完成");

}

build();