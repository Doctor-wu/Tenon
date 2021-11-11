import fs from 'fs';
import path from 'path';
import config from '@tenon/shared/config';

const baseWebPath = path.resolve(__dirname, './base/web');
const webComponentDist = config.path.webComponentDist;

export const resolveBaseComponent = () => {
  // if (fs.existsSync(webComponentDist)) {
  //   fs.rmdirSync(webComponentDist, { recursive: true });
  // }
  // fs.mkdirSync(webComponentDist);
  resolveBaseWebComponent();
  resolveBaseMpComponent();
}

function resolveBaseWebComponent() {
  // const webBaseComponentPath = path.resolve(webComponentDist, './base');
  // fs.mkdirSync(webBaseComponentPath);
  // copyDirectory(baseWebPath, webBaseComponentPath);
}

function resolveBaseMpComponent() { }

function copyDirectory(source: string, destination: string) {
  if (fs.existsSync(source)) {
    fs.readdirSync(source).forEach((file) => {
      const curSource = path.join(source, file);
      const curDestination = path.join(destination, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        fs.mkdirSync(curDestination);
        copyDirectory(curSource, curDestination);
      } else {
        fs.copyFileSync(curSource, curDestination);
      }
    });
  }
}