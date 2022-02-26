import path from 'path';
import execa, { Options, SyncOptions } from 'execa';

const rootPath = path.resolve(__dirname, '../');
const packagesPath = path.join(rootPath, 'packages');
const cmsPath = path.join(packagesPath, 'tenon-cms');
const materialsPath = path.join(packagesPath, 'tenon-materials');
const bffPath = path.join(packagesPath, 'tenon-bff');
const enginePath = path.join(packagesPath, 'tenon-engine');

function createSleepFunc(time: number) {
  return () => new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

const cmsCommandOptions: Options = {
  cwd: `${cmsPath}`,
  stdio: 'inherit',
};

const materialCommandOptions: SyncOptions<string> = {
  cwd: `${materialsPath}`,
  stdio: 'inherit',
}

const engineCommandOptions: Options = {
  cwd: `${enginePath}`,
  stdio: 'inherit',
}

const bffCommandOptions: Options = {
  cwd: `${bffPath}`,
  stdio: 'inherit',
}

console.log('>> 启动CMS...');
console.log('>> pnpm install...');

execa.command(`pnpm install`, cmsCommandOptions)
  .then(() => {
    console.log('>> Compiling Materials...');
    return execa.commandSync(`ts-node build.ts`, materialCommandOptions);
  })
  .then(createSleepFunc(300))
  .then(() => {
    console.log('>> Launching BFF...');
    return execa.command(`pnpm run start`, bffCommandOptions);
  })
  .then(() => {
    console.log('>> Running vite...');
    return execa.command(`npx vite`, cmsCommandOptions);
  })
  .then(() => {
    console.log('>> 启动CMS成功');
  })
  .catch(err => {
    console.log(err);
  });
