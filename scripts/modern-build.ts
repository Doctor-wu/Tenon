
import path from 'path';
import execa, { Options, SyncOptions } from 'execa';

const rootPath = path.resolve(__dirname, '../');
const packagesPath = path.join(rootPath, 'packages');
const appsPath = path.join(rootPath, 'apps');
const workbenchPath = path.join(packagesPath, 'tenon-workbench');
const modernEditorPath = path.join(appsPath, 'tenon-editor');


const tenonEditorCommandOptions: SyncOptions<string> = {
  cwd: `${modernEditorPath}`,
  stdio: 'inherit',
};

const tenonWorkbenchCommandOptions: SyncOptions<string> = {
  cwd: workbenchPath,
  stdio: 'inherit',
}

execa.commandSync(`pnpm run build`, tenonWorkbenchCommandOptions);
execa.command(`pnpm run local:build`, tenonEditorCommandOptions);
