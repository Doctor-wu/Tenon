import { BuildPhaseName, setPhase } from '@tenon/flow';
import childprocess from 'child_process';
import execa from 'execa';
import { createClient } from './client';
const client = createClient();

function build() {
  childprocess.execSync('node --max_old_space_size=40960  node_modules/vite/bin/vite.js build');
  setPhase(client, BuildPhaseName.TRANSFORM_CMS_DIST);
}

build();
export default {};