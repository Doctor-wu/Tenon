import path from 'path';
import execa, { Options } from 'execa';
import fs from 'fs';

const rootPath = path.resolve(__dirname, '../');
const packagesPath = path.join(rootPath, 'packages');
const cmsPath = path.join(packagesPath, 'tenon-cms');
const materialsPath = path.join(packagesPath, 'tenon-materials');
const enginePath = path.join(packagesPath, 'tenon-engine');

// console.log('>> 正在编译物料库...');

// const engineCommandOptions: Options = {
//   cwd: `${enginePath}`,
//   stdio: 'inherit',
// }
// let building = false;

// console.log('>> 正在监听目录变化');
// fs.watch(path.join(enginePath, 'src/base'), {
//   recursive: true,
// }, (event, filename) => {
//   if (building) return;
//   console.log(`>> ${filename}发生变化，即将重新编译物料`);
  
//   building = true;
//   build().then(() => {
//     building = false;
//   });
// });

// async function build() {
//   return execa.command(`ts-node build.ts`, engineCommandOptions).then(() => {
//     console.log('>> 编译物料库完成');
//   });
// }
// build();