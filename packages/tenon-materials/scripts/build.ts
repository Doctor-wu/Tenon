import path from 'path';
import execa from 'execa';
import fs from "fs";
import { PhaseName, setPhase } from '@tenon/flow';
import { debounce } from 'lodash';

const typingsPath = path.resolve(__dirname, '../typings');
const distPath = path.resolve(__dirname, '../dist');
const cachePath = path.resolve(__dirname, '../build-cache');
import { createClient } from './client';

const client = createClient();
let firstBoot = true;

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

  execa.command('tsc', {
    stdio: "inherit",
    cwd: path.resolve(__dirname),
  }).then(() => {
    console.log("物料构建完成");
    if (firstBoot) {
      setPhase(client, PhaseName.LAUNCH_BFF);
      firstBoot = false;
    } else {
      console.log('正在监听。。。');
    }
  });
}


fs.watch(
  path.resolve(__dirname, '../components'),
  {
    persistent: true,
    recursive: true,
  },
  debounce((event, fileName) => {
    if (fileName) {
      console.log(`检测到${fileName}变更，即将重新构建物料`);
      build();
    }
  }, 1000),
);

build();