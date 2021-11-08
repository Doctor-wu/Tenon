import path from 'path';
import execa, { Options } from 'execa';

const rootPath = path.resolve(__dirname, '../');
const packagesPath = path.join(rootPath, 'packages');
const cmsPath = path.join(packagesPath, 'tenon-cms');

const cmsCommandOptions: Options = {
  cwd: `${cmsPath}`,
  stdio: 'inherit',
};

console.log('>> 启动CMS...');
console.log('>> pnpm install...');

execa.command(`pnpm install`, cmsCommandOptions)
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
