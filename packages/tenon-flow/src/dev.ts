import path from 'path';
import execa, { Options, SyncOptions } from 'execa';
import { FlowName, setPhase, waitPhase } from './flow';
import { bootstrap } from './flow/server';

const rootPath = path.resolve(__dirname, '../../../');
const packagesPath = path.join(rootPath, 'packages');
const cmsPath = path.join(packagesPath, 'tenon-cms');
const materialsPath = path.join(packagesPath, 'tenon-materials');
const bffPath = path.join(packagesPath, 'tenon-bff');
const enginePath = path.join(packagesPath, 'tenon-engine');

const cmsCommandOptions: SyncOptions<string> = {
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

const buildFlow = [
  {
    name: FlowName.INSTALL,
    handler: () => {
      console.log(`>> Installing Dependencies`);
      execa.commandSync(`pnpm install`);
      setPhase(FlowName.BUILD_MATERIALS);
    },
    phase: FlowName.INSTALL,
  },
  {
    name: FlowName.BUILD_MATERIALS,
    handler: () => {
      console.log('>> Compiling Materials...');
      execa.command(`pnpm run build`, materialCommandOptions);
    },
    phase: FlowName.BUILD_MATERIALS,
  },
  {
    name: FlowName.LAUNCH_BFF,
    handler: () => {
      console.log('>> Launching BFF...');
      execa.command(`pnpm run start`, bffCommandOptions);
    },
    phase: FlowName.LAUNCH_BFF,
  },
  {
    name: FlowName.RUN_CMS,
    handler: () => {
      console.log('>> Running vite...');
      execa.command(`npx vite`, cmsCommandOptions)
    },
    phase: FlowName.RUN_CMS,
  },
];

console.log('>> 启动Tenon构建...');

bootstrap().then(() => {
  buildFlow.forEach(async (flow) => {
    await waitPhase(flow.phase).then(() => {
      flow.handler();
    });
  });
})
