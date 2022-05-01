import path from 'path';
import execa from 'execa';
import fs from "fs";
import { PhaseName, setPhase } from '@tenon/flow';
import { debounce } from 'lodash';
import chokidar from 'chokidar';

const typingsPath = path.resolve(__dirname, '../typings');
const distPath = path.resolve(__dirname, '../dist');
const cachePath = path.resolve(__dirname, '../build-cache');
import { createClient } from './client';
import { loadWebComponents, materialsChanged } from '../src';

const client = createClient();
let firstBoot = true;

function build() {
  // if (fs.existsSync(cachePath)) {
  //   fs.rmdirSync(cachePath, {
  //     recursive: true,
  //   });
  // }
  // if (fs.existsSync(typingsPath)) {
  //   fs.rmdirSync(typingsPath, {
  //     recursive: true,
  //   });
  // }
  // if (fs.existsSync(distPath)) {
  //   fs.rmdirSync(distPath, {
  //     recursive: true,
  //   });
  // }

  const b = Date.now();
  loadWebComponents().then(() => {
    console.log("\n>> 物料构建完成\n");
    if (firstBoot) {
      setPhase(client, PhaseName.LAUNCH_BFF);
      firstBoot = false;
    }
    console.log(`构建耗时${Date.now() - b}ms`);
  });
}

const handler = debounce((event, fileName) => {
  if (fileName) {
    console.log(`\n检测到${fileName}变更，即将重新构建物料`);
    materialsChanged.value = true;
    build();
  }
}, 1000);

chokidar.watch(path.resolve(__dirname, '../components')).on('all', (event, path) => {
  handler(event, path);
});

// build();