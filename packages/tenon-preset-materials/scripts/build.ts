import { BuildPhaseName, setPhase } from '@tenon/flow';
import { createClient } from './client';

const client = createClient();

function build() {
  const b = Date.now();
  Promise.resolve().then(() => {
    console.log("\n>> 物料构建完成\n");
    setPhase(client, BuildPhaseName.BUILD_CMS);
    console.log(`构建耗时${Date.now() - b}ms`);
  });
}

build();
