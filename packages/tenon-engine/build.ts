import path from 'path';
import fs from 'fs';
import { resolveComponent } from './src/resolveComponent';
import { resolveBaseComponent } from './src/resolveBaseComponent';

const rootPath = __dirname;
const materialsPath = path.resolve(rootPath, '../tenon-materials');
const materialsSourcePath = path.join(materialsPath, 'src');

// resolveBaseComponent();
scanFiles(materialsSourcePath, '', {}, resolveComponent);


function scanFiles(dir: string, prefix: string, json: { [props: string]: any } = {}, cb?: Function) {
  fs.readdirSync(dir).forEach(file => {
    const curDir = file.split(/[\/\\]/).pop() || '';
    const fileName = file.split('.')[0];
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (!stat.isDirectory()) {
      console.log(`${fileName} is not valid, component should be a directory`);
      return;
    }
    if (/[^A-Z]/.test(curDir[0])) {
      let subJson = {};
      json[file] = subJson;
      console.log(`${prefix}-${curDir}`);
      scanFiles(filePath, prefix + "  ", subJson, cb);
    } else {
      // 大写字母开头的目录为组件
      json[fileName] = fileName;
      cb && cb(fileName, filePath);
    }
  });
  return json;
}