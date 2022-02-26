import path from 'path';
import execa, { Options, SyncOptions } from 'execa';
import { FlowName, setPhase, waitPhase } from './flow';
import { server, createClient, pipeFile } from './connection';

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
      console.log(`\n>> Installing Dependencies...\n`);
      execa.commandSync(`pnpm install`);
      setPhase(createClient(), FlowName.BUILD_MATERIALS);
    },
    phase: FlowName.INSTALL,
  },
  {
    name: FlowName.BUILD_MATERIALS,
    handler: () => {
      console.log('\n>> Compiling Materials...\n');
      execa.command(`pnpm run build`, materialCommandOptions);
    },
    phase: FlowName.BUILD_MATERIALS,
  },
  {
    name: FlowName.LAUNCH_BFF,
    handler: () => {
      console.log('\n>> Launching BFF...\n');
      execa.command(`pnpm run start`, bffCommandOptions);
    },
    phase: FlowName.LAUNCH_BFF,
  },
  {
    name: FlowName.RUN_CMS,
    handler: () => {
      console.log('\n>> Running vite...\n');
      execa.command(`npx vite`, cmsCommandOptions)
    },
    phase: FlowName.RUN_CMS,
  },
];

console.log('>> 启动Tenon构建...');


buildFlow.forEach(async (flow) => {
  await waitPhase(flow.phase).then(() => {
    flow.handler();
  });
});

server.listen(pipeFile, () => {
  setPhase(createClient(), FlowName.INSTALL);
});
