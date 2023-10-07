
import path from 'path';
import execa, { Options, SyncOptions } from 'execa';

const rootPath = path.resolve(__dirname, '../');
const packagesPath = path.join(rootPath, 'packages');
const appsPath = path.join(rootPath, 'apps');
const modernEditorPath = path.join(appsPath, 'tenon-editor');


const tenonEditorCommandOptions: SyncOptions<string> = {
  cwd: `${modernEditorPath}`,
  stdio: 'inherit',
};

execa.command(`pnpm run local:build`, tenonEditorCommandOptions);
