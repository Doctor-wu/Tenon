import { BuildPhaseName, setPhase } from '@tenon/legacy-flow';
import { createClient } from './client';
import { loadWebComponents } from '../src';

const client = createClient();

function build() {
  const b = Date.now();
  loadWebComponents().then(() => {
    console.log("\n>> 物料构建完成\n");
    setPhase(client, BuildPhaseName.BUILD_CMS);
    console.log(`构建耗时${Date.now() - b}ms`);
  });
}

build();
