import Axios from 'axios';
import net from 'net';
import { Subscribe } from "@tenon/shared";
import { createClient } from './connection/client';
const instance = Axios.create();
export const sub = new Subscribe;

export const FlowName = {
  INSTALL: 'install',
  BUILD_MATERIALS: 'build-materials',
  LAUNCH_BFF: 'launch-bff',
  RUN_CMS: 'run-cms',
}

export const waitPhase = (phase: string): Promise<void> => {
  return new Promise((resolve) => {
    sub.on(phase, resolve);
  })
}

export const setPhase = (client, phase: string) => {
  client.write(Buffer.from(phase));
}
