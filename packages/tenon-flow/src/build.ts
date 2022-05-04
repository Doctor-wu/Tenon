import path from 'path';
import execa, { Options, SyncOptions } from 'execa';
import { BuildPhaseName, PhaseName, setPhase, waitPhase } from './flow';
import { server, createClient, pipeFile } from './connection';
import fs from 'fs';

const rootPath = path.resolve(__dirname, '../../../');
const packagesPath = path.join(rootPath, 'packages');
const cmsPath = path.join(packagesPath, 'tenon-cms');
const materialsPath = path.join(packagesPath, 'tenon-materials');
const sdkPath = path.join(packagesPath, 'tenon-sdk');

const serverTenonPath = '/www/wwwroot/source/Tenon';
const serverBFFPath = path.join(serverTenonPath, 'packages/tenon-bff');
const serverFrontendPath = `/www/wwwroot/apps/tenon`;

const cmsCommandOptions: SyncOptions<string> = {
  cwd: `${cmsPath}`,
  stdio: 'inherit',
};

const materialCommandOptions: SyncOptions<string> = {
  cwd: `${materialsPath}`,
  stdio: 'inherit',
}

const sdkCommandOptions: Options = {
  cwd: `${sdkPath}`,
  stdio: 'inherit',
}


// const socket = createClient();

const buildFlow = [
  {
    name: PhaseName.INSTALL,
    handler: () => {
      console.log(`\n>> Installing Dependencies...\n`);
      execa.commandSync(`pnpm install`);
      setPhase(createClient(), BuildPhaseName.BUILD_MATERIALS);
    },
    phase: PhaseName.INSTALL,
  },
  {
    name: BuildPhaseName.BUILD_MATERIALS,
    handler: () => {
      console.log('\n>> Compiling Materials...\n');
      execa.command(`pnpm run build`, materialCommandOptions);
    },
    phase: BuildPhaseName.BUILD_MATERIALS,
  },
  {
    name: BuildPhaseName.BUILD_CMS,
    handler: () => {
      console.log('\n>> Building CMS...\n');
      execa.command(`pnpm run build`, cmsCommandOptions);
      // setPhase(createClient(), BuildPhaseName.BUILD_MATERIALS);
    },
    phase: BuildPhaseName.BUILD_CMS,
  },
  {
    name: BuildPhaseName.TRANSFORM_CMS_DIST,
    handler: () => {
      console.log('\n>> TRANSFORM_CMS_DIST...\n');
      execa.commandSync(`rm -rf ${serverFrontendPath}`);
      execa.commandSync(`cp -r ${cmsPath}/dist ${serverFrontendPath}`);
      setPhase(createClient(), BuildPhaseName.BUILD_SDK);
      // execa.command(`pnpm run build`, cmsCommandOptions);
    },
    phase: BuildPhaseName.TRANSFORM_CMS_DIST,
  },
  {
    name: BuildPhaseName.BUILD_SDK,
    handler: () => {
      console.log('\n>> Building SDK...\n');
      execa.command(`pnpm run build`, sdkCommandOptions);
    },
    phase: BuildPhaseName.BUILD_SDK,
  },
  {
    name: BuildPhaseName.RESTART_BFF,
    handler: () => {
      console.log('\n>> RESTART_BFF...\n');
      execa.commandSync(`forever stop ${serverBFFPath}/src/index.ts`);
      execa.commandSync(`forever start -c ts-node ${serverBFFPath}/src/index.ts prod`);
      setPhase(createClient(), BuildPhaseName.END);
      // execa.command(`pnpm run build`, sdkCommandOptions);
    },
    phase: BuildPhaseName.RESTART_BFF,
  },
  {
    name: BuildPhaseName.END,
    handler: () => {
      console.log('>> Tenon生产构建完成!\n');
      
      process.exit(0);
    },
    phase: BuildPhaseName.END,
  }
];

console.log('>> 启动Tenon生产构建...');


buildFlow.forEach(async (flow) => {
  await waitPhase(flow.phase).then(() => {
    flow.handler();
  });
});

server.listen(pipeFile, () => {
  setPhase(createClient(), BuildPhaseName.INSTALL);
});
