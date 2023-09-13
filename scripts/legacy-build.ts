import path from 'path';
import execa, { Options, SyncOptions } from 'execa';

const rootPath = path.resolve(__dirname, '../');
const packagesPath = path.join(rootPath, 'packages');
const flowPath = path.join(packagesPath, 'tenon-flow');


const flowCommandOptions: SyncOptions<string> = {
  cwd: `${flowPath}`,
  stdio: 'inherit',
};

execa.command(`pnpm run build`, flowCommandOptions);